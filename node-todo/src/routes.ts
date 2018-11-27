import * as Router from 'koa-router';
import controller = require('./controller');

const router = new Router();

router.get('/todos', controller.todo.getTodos);
router.get('/todos/:id', controller.todo.getTodo);
router.post('/todos', controller.todo.create);
router.put('/todos/:id', controller.todo.update);
router.delete('/todos/:id', controller.todo.delete);

export { router };
