import React, { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../Button/Button';
import { useUser } from '../../context/UserContext';
import { ref, set, onValue, get } from 'firebase/database';
import { database } from '../../data/firebase';


interface User {
  id: string;
  login: string;
  password: string;
}

const Login: FC = () => {
  const { login } = useUser();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [users, setUsers] = useState<User[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const populateFirebase = async () => {
      try {
        const response = await fetch('https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1/orders');
        const data = await response.json();
        const usersRef = ref(database, 'users');
        const snapshot = await get(usersRef);
        const existingUsers = snapshot.val() || {};

        const validUsers = data.filter((user: User) => user.login && user.password);
        const newUsers = validUsers.filter((user: User) => !existingUsers[user.id]);
        
        newUsers.forEach((user: User) => {
          set(ref(database, `users/${user.id}`), { login: user.login, password: user.password });
        });
  
        console.log('Firebase updated with new users:', newUsers);
      } catch (error) {
        console.error('Error populating Firebase:', error);
      }
    };
  
    populateFirebase();
  }, []);
  

  //// Downloading users from Firebase
  useEffect(() => {
    const usersRef = ref(database, 'users');
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      const userList = data ? Object.keys(data).map((key) => ({ id: key, ...data[key] })) : [];
      setUsers(userList);
    });
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = users.find((user) => user.login === username && user.password === password);

    if (user) {
      login(user.login);
      alert(`Login successful for ${username}`);
      window.location.href = '/';
    } else {
      setErrorMessage('Invalid login or password');
    }
  };

  return (
    <PageContainer>
      <PageTitle>Log in</PageTitle>
      <Container>
        <Form onSubmit={handleLogin}>
          <FormGroup>
            <Label htmlFor="login">User name</Label>
            <Input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          <ButtonGroup>
            <Button
              label="Submit"
              isActive={true}
              onClick={handleLogin}
              style={{ marginRight: '20px' }}
            />
            <Button
              label="Cancel"
              isActive={false}
              onClick={() => window.location.reload()}
            />
          </ButtonGroup>
        </Form>
      </Container>
    </PageContainer>
  );
};

export default Login;

const PageContainer = styled.div`
  max-width: 1215px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f4fcfe;
  padding: 150px;
  clip-path: polygon(0 5%, 100% 0, 100% 100%, 0 100%);

`;

const PageTitle = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: #4cafb4;
  margin-bottom: 20px;
`;

const Container = styled.div`
  width: 600px;
  padding: 30px;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(53, 184, 190, 0.15);     
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const FormGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 15px;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: 500;
  color: #333;
  text-align: right;
  margin-right: 10px;
`;

const Input = styled.input`
  width: 350px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 14px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  text-align: center;
`;

