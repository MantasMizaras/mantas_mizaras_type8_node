const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { PORT } = require('./config');
const userRoute = require('./routes/userRoutes');
const { accountRoute } = require('./routes/accountRoutes');
const billRoute = require('./routes/billRoutes');

const app = express();

// MiddleWare
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello, success!');
});

// Routes
app.use('/', userRoute);
app.use('/', accountRoute);
app.use('/', billRoute);

// 404 route
app.all('*', (req, res) => {
  res.status(404).json({ error: 'Page not found' });
});

app.listen(PORT, () => console.log('Server is online on port', PORT));
