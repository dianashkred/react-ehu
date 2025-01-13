import React, { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { login, updateUsername, updatePassword, setErrorMessage } from '../../features/user/userSlice';
import { fetchUsers } from '../../features/firebase/firebaseSlice';

const Login: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { users, status } = useSelector((state: RootState) => state.firebase);
  const username = useSelector((state: RootState) => state.user.username);
  const password = useSelector((state: RootState) => state.user.password);
  const errorMessage = useSelector((state: RootState) => state.user.errorMessage);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [dispatch, status]);
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
     const user = users.find((user: { login: string; password: string }) => user.login === username && user.password === password);

    if (user) {
      dispatch(login({ username: user.login }));
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
              onChange={(e) => dispatch(updateUsername(e.target.value))}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => dispatch(updatePassword(e.target.value))}
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

