//src/services/inventory.js
const inventory = {
  "789": 10,
};

async function updateStock(order) {
    console.log('Inventory service processing order:', order);
    for(const item of order.items) {
        const productId = item.productId;
        const quantity = item.quantity;

        if(inventory[productId] >= quantity) {
            inventory[productId] -= quantity;
            console.log(`Inventory updated: Product ${productId}, Remaining: ${inventory[productId]}`);
        } else {
            console.log(`Insufficient inventory for product ${productId}`);
        }
    }
}

export const processInventory = {
    updateStock
};
  
