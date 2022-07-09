const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const handleError = require('./middlewares/handle-error');
const NotFoundError = require('./errors/not-found-err');

const { PORT = 3001, DB_CONN } = process.env;
const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);

mongoose.connect(DB_CONN);

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

app.use(requestLogger);
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

app.use('/', router);

app.use(errorLogger);
app.use(errors());

app.use((req, res, next) => {
  Promise.reject(new NotFoundError('Запрос не может быть обработан.'))
    .catch(next);
});

app.use(handleError);

app.listen(PORT, () => {
});
