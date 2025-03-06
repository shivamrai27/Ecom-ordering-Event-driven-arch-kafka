const { Kafka } = require('kafkajs');
const inventoryService = require('../services/inventory');
const paymentService = require('../services/payment');
const shippingService = require('../services/shipping');

const kafka = new Kafka({
    clientId: 'ecom-order-consumer',
    brokers: ['localhost:9092'],
})

const consumer = kafka.consumer({ groupId: 'order-processing-group' });
async function consumeOrderCreatedEvent(){
    try {
        await consumer.connect();
        await consumer.subscribe({topic: 'order-created', fromBeginning: true});
        await consumer.run({
            eachMessage: async ({message}) =>{
                const order = JSON.parse(message.value.toString());
                console.log('Order received:', order);
                await inventoryService.updateStock(order);
                await paymentService.processPayment(order);
                await shippingService.initiateShipping(order);
            }
        })
    } catch (error) {
        console.error('Error consuming order created events:', error);
    }
}
module.exports = {consumeOrderCreatedEvent};