import * as fs from 'fs';
import 'reflect-metadata';

import { Container } from 'typedi';
import { TodoStore } from './logic/TodoStore';

import * as persistedTodos from '../todoStore.json';
const persistTodos = (todos) => {
  fs.writeFile('todoStore.json', JSON.stringify(todos), 'utf8', (error) => {
    if (error) {
      throw error;
    }
  });
};
Container.set(TodoStore, new TodoStore(persistedTodos, persistTodos));

import app from './app';

app.listen(3000);

console.log('Server running on port 3000'); // tslint:disable-line:no-console
