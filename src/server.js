const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { PORT } = require('./config');

const app = express();

// MiddleWare
app.use(morgan('dev'));
app.use(express.json());
// app.use(showBody);
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello, success!');
});

app.all('*', (req, res) => {
  res.status(404).json({ error: 'Page not found' });
});

app.listen(PORT, () => console.log('Server is online on port', PORT));
