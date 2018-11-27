import 'reflect-metadata';

import { Container } from 'typedi';
import { TodoStore } from './logic/TodoStore';

Container.set(TodoStore, new TodoStore([]));

import app from './app';

app.listen(3000);

console.log('Server running on port 3000'); // tslint:disable-line:no-console
