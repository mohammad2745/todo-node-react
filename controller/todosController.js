const todosModel = require('../models/todosModel');
const validation = require('../validation/todoValidation');

const create = async (req, res) => {
  try {
    const { title, description, due_date, status, priority } = req.body;
    const user_id = req.user.id

    // Body data validation
    const validationError = validation.todoValidate(req.body);
    if (validationError) {
      return res.status(400).json({
        message: 'Validation error',
        errors: validationError.details.map((detail) => detail.message),
      });
    }

    const todo = await todosModel.create(title, description, due_date, status, priority, user_id);
    res.status(201).json({ message: 'Todo created successfully', todo });
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const index = async (req, res) => {
  try {
    const todos = await todosModel.index();
    res.status(200).json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const show = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await todosModel.show(id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json(todo);
  } catch (error) {
    console.error('Error fetching todo:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, priority } = req.body;

    // Body data validation
    const validationError = validation.todoValidate(req.body);
    if (validationError) {
      return res.status(400).json({
        message: 'Validation error',
        errors: validationError.details.map((detail) => detail.message),
      });
    }
    
    const todo = await todosModel.update(id, status, priority);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json({ message: 'Todo updated successfully', todo });
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await todosModel.destroy(id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  create, index, show, update, destroy
};