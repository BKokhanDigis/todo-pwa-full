const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3002;


const allowedOrigins = ['http://localhost:3001', 'http://localhost:3000'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Если ваш фронтенд отправляет куки или аутентификационные данные
};

app.use(cors(corsOptions));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, Todo List API!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const todoRoutes = require('./routes/todo');
app.use('/api', todoRoutes);

const mongoose = require('mongoose');

// Подключение к MongoDB
mongoose.connect('mongodb://localhost:27017/todo-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));