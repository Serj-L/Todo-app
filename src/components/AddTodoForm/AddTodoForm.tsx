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
    <div className={styles.addTodoFormWrapper}>
      <button
        className={styles.addTodoFormBtn}
        disabled={todoTitle ? false : true}
        onClick = {onSubmit}></button>
      <form
        className={styles.addTodoForm}
        onSubmit = {(e) => onSubmit(e)}
      >
        <input
          className={styles.todoTitleInput}
          type="text"
          value = {todoTitle}
          onChange = {(e) => onTitleChange(e.target.value)}
          placeholder='Create a new todo ...'
        />
      </form>
    </div>
  );
};

export default AddTodoForm;
