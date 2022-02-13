import React, { useRef, useState } from 'react';
import signupImage from '../assets/3.jpg';
import { Link } from 'react-router-dom';
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
const Signup = () => {
  const { signup } = useUserAuth();
  console.log(signup);
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    e.preventDefault();
    setError('');
    try {
      if (password !== confirmPassword) {
        setError('Password didnt match !');
        return;
      }
      await signup(email, password);
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <>
      <Container fluid className='login'>
        <Row style={{ height: '100vh' }}>
          <Col className='d-flex flex-column align-items-center justify-content-center'>
            <div className='login-headings'>
              <h1>Registration</h1>
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

                  <Form.Group className='mb-2' controlId='formBasicPassword'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      ref={passwordRef}
                      type='password'
                      placeholder='Password'
                    />
                  </Form.Group>

                  <Form.Group
                    className='mb-3'
                    controlId='formBasicComfirmPassword'
                  >
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type='password'
                      placeholder='Confirm Password'
                      ref={confirmPasswordRef}
                    />
                    <Form.Text className='text-muted'>
                      Forgot your password?{' '}
                      <Link to='/reset-password'>Recovery</Link>
                    </Form.Text>
                  </Form.Group>

                  <Button className='w-100' variant='primary' type='submit'>
                    Register
                  </Button>
                </Form>
                <p className='text-center'>
                  You have account? <Link to='/login'>Login</Link>
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col className='col-hero-image p-0 m-0'>
            <Image className='login-hero-image' src={signupImage} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Signup;
