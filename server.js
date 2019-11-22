const express = require('express');
const mongoose = require('mongoose');

const app = express();

const serverParams = {
  host: 'localhost',
  port: 8000
};

const dbParams = {
  protocole: 'mongodb',
  host: '127.0.0.1',
  port: 27017,
  dbName: 'user-manager',
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  getURIS: () =>
    dbParams.protocole +
    '://' +
    dbParams.host +
    ':' +
    dbParams.port +
    '/' +
    dbParams.dbName
};

// Database connection
mongoose
  .connect(dbParams.getURIS(), dbParams.options)
  .then(() => console.log(`Connected to MongoDB on: ${dbParams.getURIS()}...`))
  .catch(err => console.error(err.message));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Controllers
const UserControl = require('./controllers/UserControl');

// Routes
app.post('/api/user/create', UserControl.create);
app.post('/api/user/update', UserControl.update);
app.delete('/api/user/delete', UserControl.remove);
app.get('/api/users', UserControl.retreive);
app.get('/', (req, res) => {
  res.status(200).send('<h1>It works</h1>');
});

// Starting the server
app.listen(serverParams.port, () => {
  const { host, port } = serverParams;
  console.log(`Server started on: ${host}:${port}...`);
});
