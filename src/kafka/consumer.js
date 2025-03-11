import { Kafka } from 'kafkajs';
import {processInventory} from '../services/inventory.js';
import {paymentService} from '../services/payment.js';
import {shippingService} from '../services/shipping.js';

const kafka = new Kafka({
    clientId: 'ecom-order-consumer',
    brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'order-processing-group' });

async function consumeOrderCreatedEvent(){
    try {
        await consumer.connect();
        await consumer.subscribe({topic: 'order-created', fromBeginning: true});
        await consumer.run({
            eachMessage: async ({message}) =>{
                try {
                const order = JSON.parse(message.value.toString());
                console.log('Order received:', order);
                await processInventory.updateStock(order);
                await paymentService.processPayment(order);
                await shippingService.initiateShipping(order);
                } catch (error) {
                    console.error('Error processing message:', error);
                }                
            },
        });
    } catch (error) {
        console.error('Error consuming order created events:', error);
    }
}

export { consumeOrderCreatedEvent };