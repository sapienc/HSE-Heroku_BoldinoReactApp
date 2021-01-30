/* ========== [ПОДКЛЮЧЕНИЕ БИБЛИОТЕК] ========== */
const express = require('express');
const bodyParser = require('body-parser'); // Для парсинга body в объекты JS у запросов для фреймворка Express
const path = require('path');

/* ----------------------------------- */

/* ========== [НАСТРОЙКИ ПРИЛОЖЕНИЯ] ========== */
const app = express();

app.use(require('cors')()); // для возможности обрабатывать запросы с других доменов (допустим клиент на другом домене)
app.use(bodyParser.urlencoded({ extended: true })); // защищаем URL от некоторых символов
app.use(bodyParser.json()); // чтобы превращать пришедшие с responce'a json объекты в объекты javascript

module.exports = app;