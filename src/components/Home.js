import React, { useState } from 'react';
import { useUserAuth } from '../contexts/user-auth-context';
import { useNavigate } from 'react-router-dom';
import { Container, Navbar, Alert } from 'react-bootstrap';

import TodoForm from './TodoForm';
import TodoList from './TodoList';
const Home = () => {
  const { user, signout } = useUserAuth();
  const [error, setError] = useState('');
  const [updated, setUpdated] = useState(false);
  const navigate = useNavigate();
  const handleSignout = async () => {
    setError('');
    try {
      await signout();
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };
  const email = user.email;

  const userName = email.substring(0, email.lastIndexOf('@'));

  return (
    <>
      <Navbar>
        <Container>
          {error && <Alert>{error}</Alert>}
          <Navbar.Brand onClick={handleSignout} style={{ cursor: 'pointer' }}>
            Logout
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className='justify-content-end'>
            <Navbar.Text>
              Signed in as: <a href='#'>{userName}</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container
        fluid
        className='p-5'
        style={{ minHeight: '100vh', backgroundColor: '#fbfbfb' }}
      >
        <TodoForm setUpdated={setUpdated} updated={updated}></TodoForm>
        <TodoList setUpdated={setUpdated} updated={updated}></TodoList>
      </Container>
    </>
  );
};
export default Home;
