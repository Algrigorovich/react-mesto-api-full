const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const handleError = require('./middlewares/handle-error');
const NotFoundError = require('./errors/not-found-err');

const { PORT = 3001, DB_CONN } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);
mongoose.connect('mongodb://localhost:27017/mestodb');

const options = {
  origin: [
    'http://localhost:3000',
    'http://algrigorovich.student.nomoredomains.sbs',
    'https://algrigorovich.student.nomoredomains.sbs',
  ],
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

app.use(cors(options));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);
app.use(helmet());
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/', authRouter);

app.use(auth);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use(errorLogger);
app.use(errors());

app.use((req, res, next) => {
  Promise.reject(new NotFoundError('Запрос не может быть обработан.'))
    .catch(next);
});

app.use(handleError);

app.listen(PORT, () => {
});
