module.exports = pool;

const mysql = require('mysql2');

mysq12.connect('Mariadb://localhost:3000/my_database', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Database connected'))
    .catch((error) => console.error('Database connection error:', error));

module.exports = mysq12;

