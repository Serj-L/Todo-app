import React, { FC, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { RootState } from '../../store/index';
import { addTodo } from '../../store/todosSlice';
import { AddTodoForm } from '../../components/index';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import styles from './TodoListPage.module.css';

interface TodoListPageProps {}

const TodoListPage: FC<TodoListPageProps> = () => {
  const [todoTitle, setTodoTitle] = useState<string>('');
  const { todoList, isError } = useAppSelector((state: RootState) => state.todos);
  const reduxDispatch = useAppDispatch();

  const onTitleChange = (value: string) => setTodoTitle(value);
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!todoTitle) {
      return;
    }
    if (todoList.find(todo => todo.title.toLowerCase() === todoTitle.trim().toLowerCase() && !todo.isCompleted)) {
      console.log('duplicate todo title');
      return;
    }
    console.log('submit', todoTitle);
    reduxDispatch(addTodo({
      id: uuidv4(),
      title: todoTitle.trim(),
      isCompleted: false,
    }));
    if (!isError) {
      setTodoTitle('');
    } else {
      console.log('Update todos error');
    }
  };

  return (
    <div className={styles.wrapper}>
      <AddTodoForm
        onSubmit={onSubmit}
        onTitleChange={onTitleChange}
        todoTitle={todoTitle}
      />
    </div>
  );
};

export default TodoListPage;
