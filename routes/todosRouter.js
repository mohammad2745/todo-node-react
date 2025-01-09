const express = require('express');
const router = express.Router();
const todosController = require('../controller/todosController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, todosController.create);
router.get('/', authMiddleware, todosController.index);
router.get('/:id', authMiddleware, todosController.show);
router.put('/:id', authMiddleware, todosController.update);
router.delete('/:id', authMiddleware, todosController.destroy);

module.exports = router;