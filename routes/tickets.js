const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');

// Create a new ticket
router.post('/', async (req, res) => {
    try {
        const ticket = await Ticket.create(req.db, req.body);
        res.status(201).send(ticket);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Get all tickets
router.get('/', async (req, res) => {
    try {
        const tickets = await Ticket.findAll(req.db);
        res.send(tickets);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Get a ticket by ID
router.get('/:id', async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.db, req.params.id);
        if (!ticket) {
            return res.status(404).send({ error: 'Ticket not found' });
        }
        res.send(ticket);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Update a ticket
router.patch('/:id', async (req, res) => {
    try {
        const ticket = await Ticket.update(req.db, req.params.id, req.body);
        res.send(ticket);
    } catch (error) {
        if (error.message === 'Ticket not found') {
            return res.status(404).send({ error: error.message });
        }
        res.status(400).send({ error: error.message });
    }
});

// Delete a ticket
router.delete('/:id', async (req, res) => {
    try {
        const result = await Ticket.delete(req.db, req.params.id);
        res.send(result);
    } catch (error) {
        if (error.message === 'Ticket not found') {
            return res.status(404).send({ error: error.message });
        }
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;
