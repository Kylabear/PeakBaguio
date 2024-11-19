const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'Mariadb', 
    password: 'mypasswordkylacode12A.',
    database: 'itinerary_db',
    connectionLimit: 5
});

module.exports = pool;
