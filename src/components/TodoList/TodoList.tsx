import { FC } from 'react';

import { ITodoItem, TodosSortOrder } from '../../types/types';
import { CustomCheckbox, CrossIcon } from '../index';

import styles from './TodoList.module.css';

interface TodoListProps {
  todos: ITodoItem[];
  todosSortOrder: string;
  isMobile?: boolean;
  toggleCheckBoxHandler: (todoId: string) => void;
  deleteBtnHandler: (todoId: string, todoTitle: string) => void;
  sortBtnHandler: (sortOrderValue: string) => void;
  clrCompletedBtnHandler: () => void;
  editTodoHandler: (todoId: string, todoTitle: string) => void;
}

const TodoList: FC<TodoListProps> = ({
  todos,
  todosSortOrder,
  isMobile = false,
  toggleCheckBoxHandler,
  deleteBtnHandler,
  sortBtnHandler,
  clrCompletedBtnHandler,
  editTodoHandler,
}) => {
  let activeTodosQuantity = todos.filter(todo => todo.isCompleted === false).length;

  return (
    <div
      className={styles.wrapper}>
      <div className={styles.listWrapper}>
        <ul className={styles.list}>
          {
            todos.map(todo => {
              return todosSortOrder === TodosSortOrder.ALL || (todosSortOrder === TodosSortOrder.ACTIVE && !todo.isCompleted) || (todosSortOrder === TodosSortOrder.COMPLETED && todo.isCompleted)
                ?
                <li
                  key={todo.id}
                  className={styles.listItem}
                  data-is-completed={todo.isCompleted}
                  draggable={true}
                >
                  <CustomCheckbox
                    isChecked = {todo.isCompleted}
                    toggleCheckBoxHandler = {() => toggleCheckBoxHandler(todo.id)}
                  />
                  <span
                    className={styles.listItemTitle}
                    onClick = {() => editTodoHandler(todo.id, todo.title)}
                  >
                    {todo.title}
                  </span>
                  <div
                    className={styles.listItemIconWrapper}
                    data-is-mobile={isMobile}
                    onClick = {() => deleteBtnHandler(todo.id, todo.title)}
                  >
                    <CrossIcon />
                  </div>
                </li>
                :
                null;
            })
          }
        </ul>
        <div className={styles.listControlsWrapper}>
          <div className={styles.listControlsCounter}>
            {`${activeTodosQuantity} ${activeTodosQuantity > 1 ? 'items left' : 'item left'}`}
          </div>
          {
            !isMobile
              ?
              <div
                className={styles.listControlsSortBtnWrapper}
                data-is-mobile={isMobile}
                onClick = {(e) => sortBtnHandler((e.target as HTMLButtonElement).id)}
              >
                <button
                  className={styles.listControlsSortBtn}
                  id={TodosSortOrder.ALL}
                  data-is-active={todosSortOrder === TodosSortOrder.ALL}
                  disabled={todosSortOrder === TodosSortOrder.ALL}
                >
                  {TodosSortOrder.ALL}
                </button>
                <button
                  className={styles.listControlsSortBtn}
                  id={TodosSortOrder.ACTIVE}
                  data-is-active={todosSortOrder === TodosSortOrder.ACTIVE}
                  disabled={todosSortOrder === TodosSortOrder.ACTIVE}
                >
                  {TodosSortOrder.ACTIVE}
                </button>
                <button
                  className={styles.listControlsSortBtn}
                  id={TodosSortOrder.COMPLETED}
                  data-is-active={todosSortOrder === TodosSortOrder.COMPLETED}
                  disabled={todosSortOrder === TodosSortOrder.COMPLETED}
                >
                  {TodosSortOrder.COMPLETED}
                </button>
              </div>
              :
              null
          }
          <button
            className={styles.listControlsClrCompletedBtn}
            onClick = {clrCompletedBtnHandler}
          >
            Clear completed
          </button>
        </div>
      </div>
      {
        isMobile
          ?
          <div
            className={styles.listControlsSortBtnWrapper}
            data-is-mobile={isMobile}
            onClick = {(e) => sortBtnHandler((e.target as HTMLButtonElement).id)}
          >
            <button
              className={styles.listControlsSortBtn}
              id={TodosSortOrder.ALL}
              data-is-active={todosSortOrder === TodosSortOrder.ALL}
              disabled={todosSortOrder === TodosSortOrder.ALL}
            >
              {TodosSortOrder.ALL}
            </button>
            <button
              className={styles.listControlsSortBtn}
              id={TodosSortOrder.ACTIVE}
              data-is-active={todosSortOrder === TodosSortOrder.ACTIVE}
              disabled={todosSortOrder === TodosSortOrder.ACTIVE}
            >
              {TodosSortOrder.ACTIVE}
            </button>
            <button
              className={styles.listControlsSortBtn}
              id={TodosSortOrder.COMPLETED}
              data-is-active={todosSortOrder === TodosSortOrder.COMPLETED}
              disabled={todosSortOrder === TodosSortOrder.COMPLETED}
            >
              {TodosSortOrder.COMPLETED}
            </button>
          </div>
          :
          null
      }
      <div
        className={styles.listFooter}>
        <span className={styles.listFooterText}>Drag and drop to reorder list</span>
      </div>
    </div>
  );
};

export default TodoList;
