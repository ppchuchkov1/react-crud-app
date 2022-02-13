import React, { useState } from 'react';
import './ErrorPage.css';
import { Container, Row, Col, Spinner, Button } from 'react-bootstrap';
const ErrorPage = () => {
  const [errorStyle, setErrorStyle] = useState({ opacity: 0 });
  setTimeout(function () {
    setErrorStyle({ opacity: 1 });
  }, 3000);
  return (
    <>
      <Container fluid className='preloader'>
        <Row className='text-center h-100 '>
          <Col className='my-auto'>
            <Spinner className='mb-5' animation='border' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </Spinner>
            {/* <h3 className='loader-error-heading' style={errorStyle}>
              Maybe something went wrong
            </h3>
            <h3 className='loader-error-heading' style={errorStyle}>
              Try again later
            </h3> */}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ErrorPage;
