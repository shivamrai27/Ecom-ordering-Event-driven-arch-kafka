import { Kafka } from 'kafkajs';

const kafka = new Kafka({
    clientId: 'ecom-order-producer',
    brokers: ['localhost:9092'],
});

const producer = kafka.producer();

async function produceOrderCreatedEvent(order){
    try {
        await producer.connect();
        await producer.send({
            topic: 'order-created',
            messages: [{ value: JSON.stringify(order) }],
        });
        console.log('Order created event published:', order);
    } catch (error) {
        console.error('Error publishing order created event:', error);
        throw error;
    }
    finally {
        try {
          await producer.disconnect();
        } catch (disconnectError) {
          console.error("Error disconnecting producer:", disconnectError);
        }
      }
}

export { produceOrderCreatedEvent };