import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { doc, setDoc, getDoc } from 'firebase/firestore';

import { IUserLoginInput, IFirebaseLoginResponse, ITodoListSetToDb, ITodosSortOrderSetToDb, TodosSortOrder } from '../types/types';

export const firebaseApp = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
});

export const dataBase = getFirestore();

export const auth = getAuth();

setPersistence(auth, browserLocalPersistence);

export const userAuth = async (data: IUserLoginInput): Promise<IFirebaseLoginResponse> => {
  const { user } = data.isSignedForm ?
    await createUserWithEmailAndPassword(auth, data.userEmail, data.password) :
    await signInWithEmailAndPassword(auth, data.userEmail, data.password);

  if (data.isSignedForm) {
    setTodosSortOrderToDb({ userId: user.uid, sortOrder: TodosSortOrder.ALL });
  }

  return { uid: user.uid };
};

export const saveTodosToDb = async (todos: ITodoListSetToDb) => {
  await setDoc(doc(dataBase, 'users', todos.userId, 'todos', 'todoList'), { todoList: todos.todoList } );
};

export const getTodosFromDb = async (userId: string) => {
  const todos = await getDoc(doc(dataBase, 'users', userId, 'todos', 'todoList'));
  return todos.data();
};

export const setTodosSortOrderToDb = async (sortOrder: ITodosSortOrderSetToDb) => {
  await setDoc(doc(dataBase, 'users', sortOrder.userId, 'todos', 'todosSortOrder'), { todosSortOrder: sortOrder.sortOrder });
};

export const getTodosSortOrderFromDb = async (userId: string) => {
  const sortOrder = await getDoc(doc(dataBase, 'users', userId, 'todos', 'todosSortOrder'));
  return sortOrder.data();
};
