import React, { useRef, useState } from 'react';
import GoogleButton from 'react-google-button';
import { useNavigate, Link } from 'react-router-dom';
import loginImage from '../assets/3.jpg';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Image,
  Alert,
} from 'react-bootstrap';
import './Login.css';
import { useUserAuth } from '../contexts/user-auth-context';
const Login = () => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState('');
  const { login, user, googleLogin } = useUserAuth();
  console.log(user);
  const handleSubmit = async e => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    setError('');
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };
  const handleGoogleSubmit = async () => {
    setError('');
    try {
      await googleLogin();
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <Container fluid className='login'>
        <Row style={{ height: '100vh' }}>
          <Col className='col-hero-image p-0 m-0'>
            <Image className='login-hero-image' src={loginImage} />
          </Col>
          <Col className='d-flex flex-column align-items-center justify-content-center'>
            <div className='login-headings'>
              <h1>Hello Again</h1>
              <p className='text-muted'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
            {error && <Alert variant='danger'>{error}</Alert>}
            <Card>
              <Card.Body>
                <Form onSubmit={handleSubmit} className='login-form p-4'>
                  <Form.Group className='mb-2' controlId='formBasicEmail'>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      ref={emailRef}
                      type='email'
                      placeholder='Enter email'
                    />
                  </Form.Group>

                  <Form.Group className='mb-3' controlId='formBasicPassword'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      ref={passwordRef}
                      type='password'
                      placeholder='Password'
                    />
                    <Form.Text className='text-muted'>
                      Forgot your password?{' '}
                      <Link to='/reset-password'>Recovery</Link>
                    </Form.Text>
                  </Form.Group>

                  <Button className='w-100' variant='primary' type='submit'>
                    Login
                  </Button>

                  <GoogleButton
                    type='light'
                    className='w-100 mt-3'
                    onClick={() => {
                      handleGoogleSubmit();
                    }}
                  />
                </Form>
                <p className='text-center'>
                  Dont have an account yet? <Link to='/signup'>Sign up</Link>
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
