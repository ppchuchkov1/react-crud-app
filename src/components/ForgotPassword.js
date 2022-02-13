import React, { useRef, useState } from 'react';
import resetImage from '../assets/3.jpg';
import { useNavigate, Link } from 'react-router-dom';
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
import './ForgotPassword.css';
import { useUserAuth } from '../contexts/user-auth-context';
const ForgotPassword = () => {
  const { forgotPassword } = useUserAuth();
  const [error, setError] = useState('');
  const [sendMessage, setSendMessage] = useState('');
  const emailRef = useRef();
  const handleReset = async e => {
    e.preventDefault();
    const email = emailRef.current.value;
    setError('');
    try {
      await forgotPassword(email);

      setSendMessage('Checkout your email adress');
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <>
      <Container fluid className='forgotpassword'>
        <Row style={{ height: '100vh' }}>
          <Col className='d-flex flex-column align-items-center justify-content-center'>
            <div className='forgotpassword-headings'>
              <h1>Reset Password</h1>
              <p className='text-muted'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
            {error && <Alert variant='danger'>{error}</Alert>}
            {sendMessage && <Alert variant='success'>{sendMessage}</Alert>}
            <Card>
              <Card.Body>
                <Form
                  onSubmit={handleReset}
                  className='forgotpassword-form p-4'
                >
                  <Form.Group className='mb-2' controlId='formBasicEmail'>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      ref={emailRef}
                      type='email'
                      placeholder='Enter email'
                    />
                  </Form.Group>

                  <Button className='w-100' variant='primary' type='submit'>
                    Send
                  </Button>
                </Form>
                <p className='text-center'>
                  You have account? <Link to='/login'>Login</Link>
                </p>
                <p className='text-center'>
                  Dont have an account yet? <Link to='/signup'>Sign up</Link>
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col className='col-hero-image p-0 m-0'>
            <Image className='forgotpassword-hero-image' src={resetImage} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ForgotPassword;
