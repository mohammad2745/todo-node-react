const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/usersRouter');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authRouter);
app.use('/users', usersRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});