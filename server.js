const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const authRouter = require('./routes/auth');
const usersRouter = require('./routes/usersRouter');
const todosRouter = require('./routes/todosRouter');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authRouter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/users', usersRouter);
app.use('/todos', todosRouter);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
