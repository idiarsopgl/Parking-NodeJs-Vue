// Ticket model for SQLite

const Ticket = {
    create: (db, ticketData) => {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO tickets (vehicleNumber, vehicleType, entryTime, exitTime, amount) VALUES (?, ?, ?, ?, ?)';
            const values = [
                ticketData.vehicleNumber,
                ticketData.vehicleType || 'car',
                ticketData.entryTime || new Date().toISOString(),
                ticketData.exitTime || null,
                ticketData.amount || null
            ];
            
            db.run(query, values, function(err) {
                if (err) {
                    return reject(err);
                }
                
                // Get the inserted ticket
                db.get('SELECT * FROM tickets WHERE id = ?', [this.lastID], (err, row) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(row);
                });
            });
        });
    },
    
    findAll: (db) => {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM tickets', [], (err, rows) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            });
        });
    },
    
    findById: (db, id) => {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM tickets WHERE id = ?', [id], (err, row) => {
                if (err) {
                    return reject(err);
                }
                resolve(row);
            });
        });
    },
    
    update: (db, id, ticketData) => {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE tickets SET vehicleNumber = ?, vehicleType = ?, entryTime = ?, exitTime = ?, amount = ? WHERE id = ?';
            const values = [
                ticketData.vehicleNumber,
                ticketData.vehicleType,
                ticketData.entryTime,
                ticketData.exitTime,
                ticketData.amount,
                id
            ];
            
            db.run(query, values, function(err) {
                if (err) {
                    return reject(err);
                }
                
                if (this.changes === 0) {
                    return reject(new Error('Ticket not found'));
                }
                
                // Get the updated ticket
                db.get('SELECT * FROM tickets WHERE id = ?', [id], (err, row) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(row);
                });
            });
        });
    },
    
    delete: (db, id) => {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM tickets WHERE id = ?', [id], function(err) {
                if (err) {
                    return reject(err);
                }
                
                if (this.changes === 0) {
                    return reject(new Error('Ticket not found'));
                }
                
                resolve({ id, deleted: true });
            });
        });
    }
};

module.exports = Ticket;
