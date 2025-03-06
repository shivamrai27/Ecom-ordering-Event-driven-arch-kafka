import express from 'express';
const router = express.Router();

import { produceOrderCreatedEvent } from '../kafka/producer.js';
router.post('/', async(req, res)=>{
    const order = req.body;
    try {
        await produceOrderCreatedEvent(order);
        res.status(201).send({ message: 'Order created and event published' });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).send({ error: 'Failed to create order' });
    }
});

export default router;