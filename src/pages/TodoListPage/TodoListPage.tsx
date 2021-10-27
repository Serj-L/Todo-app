import React, { FC, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { RootState } from '../../store/index';
import { addTodo, toggleTodoComplete, setTodosErrMsg } from '../../store/todosSlice';
import { AddTodoForm, TodoList } from '../../components/index';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import styles from './TodoListPage.module.css';

interface TodoListPageProps {}

const TodoListPage: FC<TodoListPageProps> = () => {
  const [todoTitle, setTodoTitle] = useState<string>('');
  const { todoList, isLoading, isError, updateDb, sortOrder } = useAppSelector((state: RootState) => state.todos);
  const reduxDispatch = useAppDispatch();

  const onTitleChange = (value: string) => setTodoTitle(value);
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (todoList.find(todo => todo.title.toLowerCase() === todoTitle.trim().toLowerCase() && !todo.isCompleted)) {
      reduxDispatch(setTodosErrMsg('Todo with same title is already exist!'));
      return;
    }

    reduxDispatch(addTodo({
      id: uuidv4(),
      title: todoTitle.trim(),
      isCompleted: false,
    }));

    if (!isError) {
      setTodoTitle('');
    }
  };
  const toggleCheckBoxHandler = (todoId: string) => {
    reduxDispatch(toggleTodoComplete({ id: todoId }));
  };
  return (
    <div className={styles.wrapper}>
      <AddTodoForm
        onSubmit = {onSubmit}
        onTitleChange = {onTitleChange}
        todoTitle = {todoTitle}
      />
      {isLoading && !updateDb ?
        <h3>LOADING...</h3>
        :
        todoList.length
          ?
          <TodoList
            todos = {todoList}
            todosSortOrder = {sortOrder}
            toggleCheckBoxHandler = {toggleCheckBoxHandler}
          />
          :
          isError
            ?
            <h3>Error loading Todos from cloud store!</h3>
            :
            <h3>Add new Todo...</h3>
      }
    </div>
  );
};

export default TodoListPage;
