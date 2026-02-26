import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { RootState, AppDispatch } from '../../store';
import { login, updateUsername, updatePassword, setErrorMessage } from '../../features/user/userSlice';
import { fetchUsers } from '../../features/firebase/firebaseSlice';
import styled from 'styled-components';
import Button from '../Button/Button';

const Login: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Если в state передан параметр from – перенаправим пользователя туда, иначе по умолчанию на главную (/)
  const from = location.state?.from || '/';

  
  const { users, status } = useSelector((state: RootState) => state.firebase);
  const { username, password, errorMessage } = useSelector((state: RootState) => state.user);
  const user = users.find((user: { login: string; password: string }) => user.login === username && user.password === password);


  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  
  }, [dispatch, status]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (user) {
      dispatch(login({ username}));
      navigate(from);
    } else {
      dispatch(setErrorMessage('Invalid username or password'));
    }
  };
  
  const handleCancel = (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>) => {   
    e.preventDefault(); 
    dispatch(updateUsername(''));
    dispatch(updatePassword(''));
    dispatch(setErrorMessage(null));
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
              isActive={true}
              onClick={handleCancel}
              variant="transparent"
            />
          </ButtonGroup>
        </Form>
      </Container>
    </PageContainer>
  );
};

export default Login;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: var( --background-mlo);
  padding: 150px;
`;

const PageTitle = styled.h1`
  font-size: 50px;
  font-weight: 400;
  font-family: Inter, sans-serif;
  color: var(--text-color-turquoise);
`;

const Container = styled.div`
  width: 600px;
  padding: 30px;
  border-radius: 10px;
  background-color: var(--background-color);
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
  justify-content: space-around;
  margin-bottom: 15px;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: 500;
  color: var(--text-color-black);
  text-align: right;
  margin-right: 10px;
`;

const Input = styled.input`
  width: 350px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid var(--border-input-color); 
  font-size: 14px;
  background-color: var(--background-input);
  color: var(--text-color-black);
  transition: border 0.3s, box-shadow 0.3s;

  &:focus {
    outline: none;
    border-color: var(--text-color-turquoise); 
    box-shadow: 0 0 5px var(--text-color-turquoise);
  }
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

