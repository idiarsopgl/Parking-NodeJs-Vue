const { Client } = require('pg');

const connectDB = async () => {
    const client = new Client({
        user: 'your_username',
        host: 'localhost',
        database: 'parking',
        password: 'your_password',
        port: 5432,
    });
    try {
        await client.connect();
        console.log('PostgreSQL connected');
    } catch (error) {
        console.error('PostgreSQL connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
