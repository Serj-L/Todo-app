import React, { FC, useState } from 'react';

import { AddTodoForm } from '../../components/index';

import styles from './TodoListPage.module.css';

interface TodoListPageProps {}

const TodoListPage: FC<TodoListPageProps> = () => {
  const [todoTitle, setTodoTitle] = useState<string>('');

  const onTitleChange = (value: string) => setTodoTitle(value);
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('submit', todoTitle);
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
