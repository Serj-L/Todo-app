import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { doc, setDoc, getDoc } from 'firebase/firestore';

import { IUserLoginInput, IFirebaseLoginResponse, ITodoListFirebase } from '../types/types';

export const firebaseApp = initializeApp({
  apiKey: 'AIzaSyDGmhjDViXDcauYtXU6H7BJkmGekgJCfcg',
  authDomain: 'todo-list-app-bb89a.firebaseapp.com',
  projectId: 'todo-list-app-bb89a',
  storageBucket: 'todo-list-app-bb89a.appspot.com',
  messagingSenderId: '958201388501',
  appId: '1:958201388501:web:a3538848f5df0a77bcb15c',
});

export const dataBase = getFirestore();

export const auth = getAuth();

setPersistence(auth, browserLocalPersistence);

export const userAuth = async (data: IUserLoginInput): Promise<IFirebaseLoginResponse> => {
  const { user } = data.isSignedForm ?
    await createUserWithEmailAndPassword(auth, data.userEmail, data.password) :
    await signInWithEmailAndPassword(auth, data.userEmail, data.password);

  return { uid: user.uid };
};

export const saveTodosToDb = async (todos: ITodoListFirebase) => {
  await setDoc(doc(dataBase, 'users', todos.userId), { todos: todos.todoList });
};

export const getTodosFromDb = async (userId: string) => {
  const favorites = await getDoc(doc(dataBase, 'users', userId));
  return favorites.data();
};
