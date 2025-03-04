const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const ticketRoutes = require('./routes/tickets');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Database Connection
const db = new sqlite3.Database('./parking.db', (err) => {
    if (err) {
        console.error('SQLite database connection error:', err.message);
        return;
    }
    console.log('Connected to the SQLite database.');
    
    // Create tickets table if it doesn't exist
    db.run(`CREATE TABLE IF NOT EXISTS tickets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        vehicleNumber TEXT NOT NULL,
        vehicleType TEXT DEFAULT 'car',
        entryTime DATETIME DEFAULT CURRENT_TIMESTAMP,
        exitTime DATETIME,
        amount NUMERIC
    )`, (err) => {
        if (err) {
            console.error('Error creating tickets table:', err.message);
        } else {
            console.log('Tickets table is ready');
        }
    });
});

// Make db accessible to routes
app.use((req, res, next) => {
    req.db = db;
    next();
});

// Routes
app.use('/api/tickets', ticketRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Close database connection on process exit
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('Error closing SQLite database:', err.message);
        } else {
            console.log('SQLite database connection closed.');
        }
        process.exit(0);
    });
});
