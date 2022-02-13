import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import './TodoList.css';
import {
  Button,
  Form,
  Container,
  Row,
  Col,
  Card,
  Badge,
} from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import {
  collection,
  getDocs,
  where,
  query,
  deleteDoc,
  updateDoc,
  doc,
} from 'firebase/firestore';
import { useUserAuth } from '../contexts/user-auth-context';

const TodoList = props => {
  const { user } = useUserAuth();
  const [todos, setTodos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [todoNameUpdate, setTodoNameUpdate] = useState('');
  const [todoDescUpdate, setTodoDescUpdate] = useState('');
  const [todoDateUpdate, setTodoDateUpdate] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const todosPerPage = 8;
  const pagesVisited = pageNumber * todosPerPage;
  const pageCount = Math.ceil(todos.length / todosPerPage);
  const displayTodosWithPagination = todos.slice(
    pagesVisited,
    pagesVisited + todosPerPage
  );

  const updated = props.updated;
  const setUpdated = props.setUpdated;

  const todoCollection = query(
    collection(db, 'todos'),
    where('user_email', '==', user.email)
  );

  useEffect(() => {
    const getTodos = async () => {
      const data = await getDocs(todoCollection);
      setTodos(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };
    getTodos();
    console.log('get todos request');
  }, [updated]);

  const getTodoNameUpdate = e => {
    setTodoNameUpdate(e.target.value);
  };
  const getTodoDescUpdate = e => {
    setTodoDescUpdate(e.target.value);
  };
  const getTodoDateUpdate = e => {
    setTodoDateUpdate(e.target.value);
  };
  const deleteTodo = async id => {
    setUpdated(!updated);
    const todosDoc = doc(db, 'todos', id);
    await deleteDoc(todosDoc);
  };
  const updateTodo = async id => {
    setUpdated(!updated);
    const todosDoc = doc(db, 'todos', id);
    const newCard = {
      todo_name: todoNameUpdate,
      todo_description: todoDescUpdate,
      todo_date: todoDateUpdate,
    };
    await updateDoc(todosDoc, newCard);
    setShowModal(false);
  };
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <>
      {todos.length > 0 && (
        <Container fluid className='mt-1 p-5 text-center'>
          <h3>
            How many tasks do i have? <Badge bg='danger'>{todos.length}</Badge>
          </h3>

          <Button
            variant='dark'
            className='mt-2'
            onClick={
              !showModal ? () => setShowModal(true) : () => setShowModal(false)
            }
          >
            {!showModal ? 'Update Todos' : 'Close'}
          </Button>
        </Container>
      )}

      <Row className='mt-1'>
        {displayTodosWithPagination.map(todo => {
          return (
            <Col key={todo.id} sm={3}>
              <Card
                bg={todo.todo_bg_color.toLowerCase()}
                text='dark'
                style={{ width: '100%' }}
                className='mb-2 todo-card'
              >
                <Card.Header>
                  {!showModal ? (
                    capitalizeFirstLetter(todo.todo_name)
                  ) : (
                    <Form.Control
                      onChange={getTodoNameUpdate}
                      type='text'
                      placeholder={todo.todo_name}
                    />
                  )}
                </Card.Header>
                <Card.Body>
                  <Card.Title>
                    {!showModal ? (
                      capitalizeFirstLetter(todo.todo_description)
                    ) : (
                      <Form.Control
                        onChange={getTodoDescUpdate}
                        type='text'
                        placeholder={todo.todo_description}
                      />
                    )}
                  </Card.Title>
                  <Card.Text>
                    {!showModal ? (
                      todo.todo_date ? (
                        todo.todo_date
                      ) : (
                        'no date'
                      )
                    ) : (
                      <Form.Control onChange={getTodoDateUpdate} type='date' />
                    )}
                  </Card.Text>
                  {showModal && (
                    <div>
                      <Button
                        className='w-100 mb-2'
                        variant='primary'
                        onClick={() => updateTodo(todo.id)}
                      >
                        Update
                      </Button>
                      <Button
                        className='w-100 mb-2'
                        variant='danger'
                        onClick={() => deleteTodo(todo.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          );
        })}
        <div className='d-flex justify-content-center mt-5 text-center'>
          {todos.length > 8 && (
            <ReactPaginate
              previousLabel={'prev'}
              nextLabel={'next'}
              pageCount={pageCount}
              onPageChange={changePage}
              pageClassName='page-item'
              pageLinkClassName='page-link'
              previousClassName='page-item'
              previousLinkClassName='page-link'
              nextClassName='page-item'
              nextLinkClassName='page-link'
              breakLabel='...'
              breakClassName='page-item'
              breakLinkClassName='page-link'
              containerClassName='pagination'
              activeClassName='active'
            />
          )}
        </div>
      </Row>
    </>
  );
};

export default TodoList;
