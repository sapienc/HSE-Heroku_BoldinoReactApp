const app = require('./app');
const PORT = process.env.PORT || 4000;
const IS_DEV = process.env.NODE_ENV !== 'production';

const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

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
    app.use(express.static('client/build/')); // используем наше построенное приложение как статику

    // Отлавливаем и обрабатываем все-возможные маршруты нашего забилденного приложения (таким образом маршруты приложения с клиента также будут работать)
    app.get('*', (request, response) => {
        response.sendFile(
            path.resolve(__dirname, 'client', 'build', 'index.html')
        )
    });
    
    // Запуск сервера
    app.listen(PORT, () => console.log(`${IS_DEV ? '[DEV SERVER]' : '[CLUSTER_WORKER: ' + process.pid}] started at localhost:' + ${PORT}`));
}