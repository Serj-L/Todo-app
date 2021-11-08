import { FC, useState, useRef, SyntheticEvent, TouchEvent, useEffect } from 'react';

import { ITodoItem, TodosSortOrder, IRectOffsets, ITouchDuration } from '../../types/types';
import { CustomCheckbox, CrossIcon } from '../index';

import styles from './TodoList.module.css';

interface TodoListProps {
  todos: ITodoItem[];
  todosSortOrder: string;
  isSortControlsExternal: boolean;
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
  isSortControlsExternal,
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
  const listContainer = useRef<HTMLUListElement | null>(null);
  const dragItemIdx = useRef<number | null>(null);
  const dragItemNode = useRef<HTMLElement | null>(null);
  const dragItemNodeClone = useRef<HTMLElement | null>(null);
  const dragItemRect = useRef<DOMRect | null>(null);
  const dragItemRectOffsets = useRef<IRectOffsets>({ xOffset: 0, yOffset: 0 });
  const touchDuration = useRef<ITouchDuration>({
    touchStartEvtTime: 0,
    isFirstTouchMoveEvt: true,
    touchMoveFirstEvtTime: 0,
    touchMoveStartDelay: 0,
  });
  let activeTodosQuantity: number = todos.filter(todo => todo.isCompleted === false).length;
  const sortOrderControlsMarkup = (
    <div
      className={styles.listControlsSortBtnWrapper}
      data-is-external={isSortControlsExternal}
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
  );

  useEffect(() => {
    if (!isTouchDevice) {
      return;
    }
    document.body.style.overflow = isDragging ? 'hidden' : 'scroll';
  }, [isDragging, isTouchDevice]);

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

  const onTouchStartHandler = (e: TouchEvent<HTMLElement>, itemIdx: number) => {
    touchDuration.current.touchStartEvtTime = e.timeStamp;
    dragItemNode.current = e.currentTarget;
    dragItemIdx.current = itemIdx;
    dragItemRect.current = dragItemNode.current.getBoundingClientRect();
    dragItemRectOffsets.current.xOffset = e.changedTouches[0].clientX - dragItemRect.current.left;
    dragItemRectOffsets.current.yOffset = e.changedTouches[0].clientY - dragItemRect.current.top;
    dragItemNodeClone.current = dragItemNode.current.cloneNode(true) as HTMLElement;
    dragItemNodeClone.current.setAttribute('data-is-drag-clone', 'true');
    dragItemNodeClone.current.style.width = `${dragItemRect.current?.width}px`;
  };
  const onTouchMoveHandler = (e: TouchEvent<HTMLElement>) => {
    if (touchDuration.current.isFirstTouchMoveEvt) {
      touchDuration.current.isFirstTouchMoveEvt = false;
      touchDuration.current.touchMoveFirstEvtTime = e.timeStamp;
      touchDuration.current.touchMoveStartDelay = touchDuration.current.touchMoveFirstEvtTime - touchDuration.current.touchStartEvtTime;
    }
    if (touchDuration.current.touchMoveStartDelay < 150) {
      return;
    }
    if (listContainer.current && dragItemNodeClone.current) {
      setIsDragging(true);

      if (dragItemRectOffsets.current.xOffset && dragItemRectOffsets.current.yOffset) {
        dragItemNodeClone.current.style.left = `${e.changedTouches[0].clientX - dragItemRectOffsets.current.xOffset}px`;
        dragItemNodeClone.current.style.top = `${e.changedTouches[0].clientY - dragItemRectOffsets.current.yOffset}px`;
      } else {
        if (dragItemRect.current) {
          dragItemNodeClone.current.style.left = `${e.changedTouches[0].clientX - dragItemRect.current.width / 2}px`;
          dragItemNodeClone.current.style.top = `${e.changedTouches[0].clientY - dragItemRect.current.height / 2}px`;
        } else {
          dragItemNodeClone.current.style.left = `${e.changedTouches[0].clientX}px`;
          dragItemNodeClone.current.style.top = `${e.changedTouches[0].clientY}px`;
        }
      }

      dragItemNodeClone.current.setAttribute('data-is-dragging', 'true');
      listContainer.current.appendChild<HTMLElement>(dragItemNodeClone.current);

      const todosNodeCollection = listContainer.current.querySelectorAll('li[data-is-dragging=false]');

      todosNodeCollection.forEach(todo => {
        if (
          dragItemNodeClone.current && dragItemNodeClone.current.getAttribute('data-order-number') !== todo.getAttribute('data-order-number') &&
          dragItemNodeClone.current.getBoundingClientRect().top + dragItemNodeClone.current.getBoundingClientRect().height / 2 < todo.getBoundingClientRect().bottom &&
          dragItemNodeClone.current.getBoundingClientRect().bottom - dragItemNodeClone.current.getBoundingClientRect().height / 2 > todo.getBoundingClientRect().top
        ) {
          const targetItemIdx = Number(todo.getAttribute('data-order-number'));
          const reorderedTodoList = JSON.parse(JSON.stringify(todos));

          reorderedTodoList.splice(targetItemIdx, 0, reorderedTodoList.splice(dragItemIdx.current, 1)[0]);
          dragItemIdx.current = targetItemIdx;
          dragItemNodeClone.current.setAttribute('data-order-number', `${targetItemIdx}`);
          dragEnterEvent(reorderedTodoList);
        }
      });
    }
  };
  const onTouchEndHandler = (e: TouchEvent<HTMLElement>) => {
    if (isDragging) {
      if (listContainer.current && dragItemNodeClone.current) {
        listContainer.current.removeChild<HTMLElement>(dragItemNodeClone.current);
      }
      dragEndEvent();
      setIsDragging(false);
    }

    dragItemNode.current = null;
    dragItemNodeClone.current = null;
    dragItemIdx.current = null;
    dragItemRect.current = null;
    dragItemRectOffsets.current = {
      xOffset: 0,
      yOffset: 0,
    };
    touchDuration.current = {
      touchStartEvtTime: 0,
      isFirstTouchMoveEvt: true,
      touchMoveFirstEvtTime: 0,
      touchMoveStartDelay: 0,
    };
  };

  return (
    <div
      className={styles.wrapper}>
      <div className={styles.listWrapper}>
        <ul
          className={styles.list}
          ref={listContainer}
        >
          {
            todos.map((todo, todoIdx) => {
              return todosSortOrder === TodosSortOrder.ALL || (todosSortOrder === TodosSortOrder.ACTIVE && !todo.isCompleted) || (todosSortOrder === TodosSortOrder.COMPLETED && todo.isCompleted)
                ?
                <li
                  key={todo.id}
                  className={styles.listItem}
                  data-is-completed={todo.isCompleted}
                  data-is-dragging={isDragging ? dragItemIdx.current === todoIdx : false}
                  data-order-number={todoIdx}
                  draggable={isDraggable}
                  onDragStart = {isDraggable && !isTouchDevice ? (e) => dragStartHandler(e, todoIdx) : undefined}
                  onDragEnter = {isDraggable && !isTouchDevice ? isDragging ? (e) => dragEnterHandler(e, todoIdx) : undefined : undefined}
                  onTouchStart = {isDraggable && isTouchDevice ? (e) => onTouchStartHandler(e, todoIdx) : undefined}
                  onTouchMove = {isDraggable && isTouchDevice ? (e) => onTouchMoveHandler(e) : undefined}
                  onTouchEnd = {isDraggable && isTouchDevice ? (e) => onTouchEndHandler(e) : undefined}
                >
                  <CustomCheckbox
                    isChecked = {todo.isCompleted}
                    isTouchDevice = {isTouchDevice}
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
                    data-is-touch-device={isTouchDevice}
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
            !isSortControlsExternal ? sortOrderControlsMarkup : null
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
        isSortControlsExternal ? sortOrderControlsMarkup : null
      }
      <div
        className={styles.listFooter}>
        <span className={styles.listFooterText}>
          {isTouchDevice ? 'Long tap on Todo to drag and drop it and reorder list' : 'Drag and drop to reorder list'}
        </span>
      </div>
    </div>
  );
};

export default TodoList;
