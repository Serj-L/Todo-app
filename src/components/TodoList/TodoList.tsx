import { FC, useState, useRef, SyntheticEvent } from 'react';

import { ITodoItem, TodosSortOrder } from '../../types/types';
import { CustomCheckbox, CrossIcon } from '../index';

import styles from './TodoList.module.css';

interface TodoListProps {
  todos: ITodoItem[];
  todosSortOrder: string;
  isMobile: boolean;
  isTouchDevice: boolean;
  isDraggable?: boolean;
  toggleCheckBoxHandler: (todoId: string) => void;
  deleteBtnHandler: (todoId: string, todoTitle: string) => void;
  sortBtnHandler: (sortOrderValue: string) => void;
  clrCompletedBtnHandler: () => void;
  editTodoHandler: (todoId: string, todoTitle: string) => void;
  dragEnterEvent?: (reorderedList: ITodoItem[]) => void;
  dragEndEvent?: () => void;
}

const TodoList: FC<TodoListProps> = ({
  todos,
  todosSortOrder,
  isMobile,
  isTouchDevice,
  isDraggable = false,
  toggleCheckBoxHandler,
  deleteBtnHandler,
  sortBtnHandler,
  clrCompletedBtnHandler,
  editTodoHandler,
  dragEnterEvent = () => undefined,
  dragEndEvent = () => undefined,
}) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragItemIdx = useRef<number | null>(null);
  const dragItemNode = useRef<HTMLElement | null>(null);
  let activeTodosQuantity = todos.filter(todo => todo.isCompleted === false).length;

  const dragStartHandler = (e: SyntheticEvent<HTMLElement>, itemIdx: number): void => {
    dragItemNode.current = e.currentTarget;
    dragItemNode.current.addEventListener('dragend', dragEndHandler);
    dragItemIdx.current = itemIdx;

    setTimeout(() => {
      setIsDragging(true);
    }, 0);
  };

  const dragEnterHandler = (e: SyntheticEvent<HTMLElement>, targetItemIdx: number) => {
    if (dragItemNode.current !== e.target) {
      const reorderedTodoList = JSON.parse(JSON.stringify(todos));
      reorderedTodoList.splice(targetItemIdx, 0, reorderedTodoList.splice(dragItemIdx.current, 1)[0]);
      dragItemIdx.current = targetItemIdx;
      dragEnterEvent(reorderedTodoList);
    }
  };

  const dragEndHandler = () => {
    setIsDragging(false);
    dragItemIdx.current = null;
    dragItemNode.current?.removeEventListener('dragend', dragEndHandler);
    dragItemNode.current = null;
    dragEndEvent();
  };

  return (
    <div
      className={styles.wrapper}>
      <div className={styles.listWrapper}>
        <ul className={styles.list}>
          {
            todos.map((todo, todoIdx) => {
              return todosSortOrder === TodosSortOrder.ALL || (todosSortOrder === TodosSortOrder.ACTIVE && !todo.isCompleted) || (todosSortOrder === TodosSortOrder.COMPLETED && todo.isCompleted)
                ?
                <li
                  key={todo.id}
                  className={styles.listItem}
                  data-is-completed={todo.isCompleted}
                  data-is-dragging={isDragging ? dragItemIdx.current === todoIdx : false}
                  draggable={isDraggable}
                  onDragStart={isDraggable ? (e) => dragStartHandler(e, todoIdx) : undefined}
                  onDragEnter={isDraggable ? isDragging ? (e) => dragEnterHandler(e, todoIdx) : undefined : undefined}
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
      {
        !isTouchDevice
          ?
          <div
            className={styles.listFooter}>
            <span className={styles.listFooterText}>Drag and drop to reorder list</span>
          </div>
          :
          null
      }
    </div>
  );
};

export default TodoList;
