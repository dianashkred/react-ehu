import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../Button/Button';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import { initializeApp } from 'firebase/app';

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCS1ZgmagWnYny-g_NFwM8r_MqiHI_F31k",
  authDomain: "reacr-esde.firebaseapp.com",
  databaseURL: "https://reacr-esde-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "reacr-esde",
  storageBucket: "reacr-esde.firebasestorage.app",
  messagingSenderId: "181081983087",
  appId: "1:181081983087:web:3e664da57900e5631de59a",
  measurementId: "G-LP27H7XMKZ"
};

const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

function Login() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const populateFirebase = async () => {
      try {
        const response = await fetch('https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1/orders');
        const data = await response.json();
        const validUsers = data.filter((user) => user.login && user.password);
        validUsers.forEach((user) => {
          set(ref(database, `users/${user.id}`), { login: user.login, password: user.password });
        });
      } catch (error) {
        console.error('Error populating Firebase:', error);
      }
    };

    populateFirebase();
  }, []);

  useEffect(() => {
    const usersRef = ref(database, 'users');
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      const userList = data ? Object.keys(data).map((key) => ({ id: key, ...data[key] })) : [];
      setUsers(userList);
    });
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find((user) => user.login === login && user.password === password);

    if (user) {
      alert('Login successful!');
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
              id="login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
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
}

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

export default Login;
