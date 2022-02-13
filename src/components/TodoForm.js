import React, { useState } from 'react';
import { Row, Form, Button, Alert } from 'react-bootstrap';
import { useUserAuth } from '../contexts/user-auth-context';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';
const TodoForm = props => {
  const [todoName, setTodoName] = useState('');
  const [todoDesc, setTodoDesc] = useState('');
  const [todoDate, setTodoDate] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [show, setShow] = useState(false);
  const setUpdated = props.setUpdated;
  const updated = props.updated;

  const { user } = useUserAuth();
  const cardColor = ['Primary', 'Danger', 'Warning', 'Info', 'Success'];
  const randomNumber = Math.floor(Math.random() * cardColor.length);
  const randomCardColor = cardColor[randomNumber].toLowerCase();
  const navigate = useNavigate();
  const todoCollection = collection(db, 'todos');

  const getTodoName = e => {
    setTodoName(e.target.value);
  };
  const getTodoDesc = e => {
    setTodoDesc(e.target.value);
  };
  const getTodoDate = e => {
    setTodoDate(e.target.value);
  };
  const addTodoHandle = async e => {
    e.preventDefault();
    setError('');

    if (todoName.length == 0) {
      setError('The fields are Empty!');
      return;
    }

    if (todoDesc.length == 0) {
      setError('The fields are Empty!');
      return;
    }
    try {
      await addDoc(todoCollection, {
        todo_name: todoName,
        todo_description: todoDesc,
        todo_date: todoDate,
        todo_bg_color: randomCardColor,
        user_email: user.email,
      });
      setSuccess('Upload successful');
    } catch (err) {
      setError(err.message);
    }
    // window.location.reload(false);
    navigate('/');
    setTodoName('');
    setTodoDesc('');
    setTodoDate('');
    setUpdated(!updated);
    setShow(true);
  };
  return (
    <>
      <Row>
        {error && <Alert variant='danger'>{error}</Alert>}
        {success && show && (
          <Alert variant='success' onClose={() => setShow(false)} dismissible>
            {success}
          </Alert>
        )}
        <div className='d-flex justify-content-center'>
          <Form onSubmit={addTodoHandle} style={{ width: '500px' }}>
            <Form.Group className='mb-3' controlId='formBasicName'>
              <Form.Label>Todo Name</Form.Label>
              <Form.Control
                onChange={getTodoName}
                type='text'
                placeholder='Enter todo name'
                value={todoName}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicDescription'>
              <Form.Label>Todo Description</Form.Label>
              <Form.Control
                onChange={getTodoDesc}
                type='text'
                placeholder='Enter todo description'
                value={todoDesc}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicDate'>
              <Form.Label>Todo Date</Form.Label>
              <Form.Control onChange={getTodoDate} type='date' />
            </Form.Group>

            <Button className='w-100' variant='primary' type='submit'>
              Submit
            </Button>
          </Form>
        </div>
      </Row>
    </>
  );
};

export default TodoForm;
