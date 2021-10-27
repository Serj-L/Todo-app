import { FC } from 'react';

import { ITodoItem, TodosSortOrder } from '../../types/types';
import { CustomCheckbox, CrossIcon } from '../index';

import styles from './TodoList.module.css';

interface TodoListProps {
  todos: ITodoItem[];
  todosSortOrder: string;
  toggleCheckBoxHandler: (todoId: string) => void;
}

const TodoList: FC<TodoListProps> = ({
  todos,
  todosSortOrder,
  toggleCheckBoxHandler,
}) => {

  return (
    <ul className={styles.listWrapper}>
      {
        todos.map(todo => {
          switch (todosSortOrder) {
          case TodosSortOrder.ACTIVE:
            return (
              !todo.isCompleted
                ?
                <li
                  key={todo.id}
                  className={styles.listItemWrapper}
                >
                  <CustomCheckbox
                    isChecked = {todo.isCompleted}
                    toggleCheckBoxHandler = {() => toggleCheckBoxHandler(todo.id)}
                  />
                  <span
                    className={styles.listItemWrapper}
                    onClick = {() => console.log('edit todo', todo.id)}
                  >
                    {todo.title}
                  </span>
                  <div
                    className={styles.listItemIconWrapper}
                    onClick = {() => console.log('delete todo', todo.id)}
                  >
                    <CrossIcon />
                  </div>
                </li>
                :
                null
            );
          case TodosSortOrder.COMPLETED:
            return (
              todo.isCompleted
                ?
                <li
                  key={todo.id}
                  className={styles.listItemWrapper}
                >
                  <CustomCheckbox
                    isChecked = {todo.isCompleted}
                    toggleCheckBoxHandler = {() => toggleCheckBoxHandler(todo.id)}
                  />
                  <span
                    className={styles.listItemWrapper}
                    onClick = {() => console.log('edit todo', todo.id)}
                  >
                    {todo.title}
                  </span>
                  <div
                    className={styles.listItemIconWrapper}
                    onClick = {() => console.log('delete todo', todo.id)}
                  >
                    <CrossIcon />
                  </div>
                </li>
                :
                null
            );
          default:
            return (
              <li
                key={todo.id}
                className={styles.listItemWrapper}
              >
                <CustomCheckbox
                  isChecked = {todo.isCompleted}
                  toggleCheckBoxHandler = {() => toggleCheckBoxHandler(todo.id)}
                />
                <span
                  className={styles.listItemWrapper}
                  onClick = {() => console.log('edit todo', todo.id)}
                >
                  {todo.title}
                </span>
                <div
                  className={styles.listItemIconWrapper}
                  onClick = {() => console.log('delete todo', todo.id)}
                >
                  <CrossIcon />
                </div>
              </li>
            );
          }
        })
      }
    </ul>
  );
};

export default TodoList;
