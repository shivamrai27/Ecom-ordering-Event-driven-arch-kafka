import express from 'express';
import orderRoutes from './api/orders.js';
import { consumeOrderCreatedEvent } from './kafka/consumer.js';
const app = express();
const port = 3000;

app.use(express.json());
app.use('/orders', orderRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  consumeOrderCreatedEvent(); // Start the consumer
});

