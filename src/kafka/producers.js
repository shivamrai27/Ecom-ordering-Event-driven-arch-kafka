const {Kafka} = require('kafkajs');

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
            messages: [{values: JSON.stringify(order)}],
        })
        console.log('Order created event published:', order);
    } catch (error) {
        console.error('Error publishing order created event:', error);
        throw error;
    }
    finally{
        await producer.disconnect();
    }
}
module.exports = {produceOrderCreatedEvent};