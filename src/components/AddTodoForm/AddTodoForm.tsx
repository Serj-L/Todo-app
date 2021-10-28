import React, { FC } from 'react';

import styles from './AddTodoForm.module.css';

interface AddTodoFormProps {
  onSubmit: (e: React.FormEvent) => void;
  onTitleChange: (value: string) => void;
  todoTitle: string;
}

const AddTodoForm: FC<AddTodoFormProps> = ({
  onSubmit,
  onTitleChange,
  todoTitle = '',
}) => {

  return (
    <form
      className={styles.addTodoForm}
      onSubmit = {(e) => onSubmit(e)}
    >
      <button
        className={styles.addTodoFormBtn}
        disabled={todoTitle ? false : true}
        onClick = {(e) => e.currentTarget.blur()}
      ></button>
      <input
        className={styles.todoTitleInput}
        type="text"
        value = {todoTitle}
        onChange = {(e) => onTitleChange(e.target.value)}
        placeholder='Create a new todo...'
      />
    </form>
  );
};

export default AddTodoForm;
