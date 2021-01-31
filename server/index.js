/* ========== [ПОДКЛЮЧЕНИЕ БИБЛИОТЕК] ========== */
const express = require('express');
const bodyParser = require('body-parser'); // Для парсинга body в объекты JS у запросов для фреймворка Express
const path = require('path');

const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
/* ----------------------------------- */

const PORT = process.env.PORT || 4000;
const IS_DEV = process.env.NODE_ENV !== 'production';

/* ========== [НАСТРОЙКИ ПРИЛОЖЕНИЯ] ========== */
const app = express();

app.use(require('cors')()); // для возможности обрабатывать запросы с других доменов (допустим клиент на другом домене)
app.use(bodyParser.urlencoded({ extended: true })); // защищаем URL от некоторых символов
app.use(bodyParser.json()); // чтобы превращать пришедшие с responce'a json объекты в объекты javascript

/* ========== [Для использования всех ядер процессора при запуске команд Node.JS, если это возможно] ========== */
if (!IS_DEV && cluster.isMaster) {
    console.error(`Node cluster master ${process.pid} is running`);

    // Fork workers
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
    });
}
else { 

    // console.log(__dirname);
    // console.log(path.resolve(__dirname, '../client', 'build', 'index.html'));
    // console.log(path.join(__dirname, '..', 'client', 'build', 'static', 'media'));

    // используем наше построенное приложение как статику
    app.use(express.static( path.resolve(__dirname, '../client', 'build') ));

    // app.use('/mediafiles', express.static(path.join(__dirname, '..', 'client', 'build', 'static', 'media')));
    // app.use('/', (req, res, next) => {
    //     express.static(path.resolve('/static'))(req, res, next);
    // });

    // app.use('/', (req, res, next) => {
    //     express.static(
    //         path.resolve(__dirname, '..', 'client', 'build', 'static')(req, res, next)
    //     );
    // });

    // Отлавливаем и обрабатываем все-возможные маршруты нашего забилденного приложения (таким образом маршруты приложения с клиента также будут работать)
    app.get('*', (request, response) => {
        response.sendFile(
            path.resolve(__dirname, '../client', 'build', 'index.html')
        )
    });
    
    // Запуск сервера
    app.listen(PORT, () => console.log(`${IS_DEV ? '[DEV SERVER]' : '[CLUSTER_WORKER: ' + process.pid + ']'} started at localhost:${PORT}`));
}