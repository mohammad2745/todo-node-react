const pool = require('../db'); 

const create = async (title, description, due_date, status, priority, user_id) => {
  try {
    const { rows } = await pool.query(
      'INSERT INTO todos (title, description, due_date, status, priority, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', 
      [title, description, due_date, status, priority, user_id]
    );
    return rows[0];
  } catch (error) {
    console.error('Error creating todo:', error);
    throw error;
  }
};

const index = async () => {
  try {
    const { rows } = await pool.query('SELECT * FROM todos');
    return rows;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};

const show = async (id) => {
  try {
    const { rows } = await pool.query('SELECT * FROM todos WHERE id = $1', [id]);
    return rows[0];
  } catch (error) {
    console.error('Error fetching todo:', error);
    throw error;
  }
};

const update = async (id, status, priority) => {
  try {
    const { rows } = await pool.query(
      'UPDATE todos SET status = $1, priority = $2 WHERE id = $3 RETURNING *',
      [status, priority, id]
    );
    return rows[0];
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error;
  }
};

const destroy = async (id) => {
  try {
    const { rows } = await pool.query('DELETE FROM todos WHERE id = $1 RETURNING *', [id]);
    return rows[0];
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
};

module.exports = { create, index, show, update, destroy };