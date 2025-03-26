# EDA-Kafka Project: Event-Driven Architecture with Kafka in Node.js

![Kafka Logo](https://upload.wikimedia.org/wikipedia/commons/0/05/Apache_kafka.svg)

## 🚀 Project Overview
This project demonstrates an **Event-Driven Architecture (EDA)** using **Kafka** in a **Node.js backend**. The system simulates an **E-commerce Order Processing System**, where multiple microservices interact asynchronously via Kafka events. The project is structured to ensure **scalability, resilience, and fault tolerance**, leveraging **event-driven messaging** to handle critical e-commerce processes.

### 🏗️ How It Works:
1. 🛒 **Order Creation**: A user submits an order via the API.
2. 🔄 **Event Emission**: The system publishes an `OrderCreated` event to Kafka.
3. 🎯 **Microservices React**: Independent services consume the event and execute their tasks:
   - 📦 **Inventory Service**: Verifies stock availability and updates inventory.
   - 💳 **Payment Service**: Processes payments securely.
   - 🚚 **Shipping Service**: Initiates shipping and updates order status.
4. ⚡ **Asynchronous Processing**: Each microservice operates independently, ensuring **eventual consistency** without blocking operations.
5. 🛠 **Error Handling & Recovery**: Features such as **retry mechanisms, dead-letter queues (DLQs), and idempotency checks** ensure reliable event processing.
6. 📊 **Logging & Monitoring**: Implements **structured logging (Winston), Prometheus for metrics, and OpenTelemetry for distributed tracing.**

![Architecture Diagram](https://raw.githubusercontent.com/your-repo/your-project/main/assets/architecture-diagram.png)

## 🏗️ Features
- **🔀 Scalable Event-Driven Microservices**: Uses Kafka to decouple services.
- **⏳ Asynchronous Order Processing**: Ensures efficient handling of orders.
- **📂 Database Integration**: Uses MongoDB to store order and inventory data.
- **🛑 Fault Tolerance**: Implements retries, dead-letter queues, and idempotency.
- **📡 Monitoring & Logging**: Uses Prometheus, OpenTelemetry, and Winston for insights.
- **🔐 Security**: Implements JWT authentication, API keys, and role-based access control.
- **🐳 Containerized Deployment**: Uses Docker for Kafka and microservices.

## 🛠️ Technology Stack
- **Backend**: Node.js, Express.js
- **Messaging System**: Kafka (via KafkaJS)
- **Database**: MongoDB (via Mongoose)
- **Logging**: Winston
- **Monitoring**: Prometheus, OpenTelemetry
- **Security**: JWT, API Keys
- **Containerization**: Docker

---

## 🎯 API Endpoints
### 📝 Order API
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | `/v1/orders` | Create an order |
| GET  | `/v1/orders/:id` | Retrieve order details |
| PUT  | `/v1/orders/:id/cancel` | Cancel an order |
| GET  | `/v1/orders/status/:id` | Get order status |
| GET  | `/health` | Health check |
| GET  | `/metrics` | Application metrics |
| GET  | `/api-docs` | API documentation |

### 📦 Inventory API
| Method | Endpoint | Description |
|--------|---------|-------------|
| GET  | `/v1/inventory/:productId` | Check product stock |
| PUT  | `/v1/inventory/update` | Update stock |

### 💳 Payment API
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST  | `/v1/payments` | Process payment |
| GET  | `/v1/payments/:orderId` | Get payment status |

### 🚚 Shipping API
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | `/v1/shipping` | Create a shipping order |
| GET  | `/v1/shipping/:orderId` | Get shipping status |

### 🔥 Sample Order Request
```json
{
  "orderId": "123",
  "userId": "456",
  "items": [{ "productId": "789", "quantity": 1 }]
}
```

---

## 🛠️ Testing
Run Jest tests:
```sh
npm test
```

---

## 📡 Monitoring & Logging
### 📊 Running Prometheus
```sh
docker run -p 9090:9090 prom/prometheus
```
### 📌 Running Jaeger for Tracing
```sh
docker run -d -p 16686:16686 -p 14268:14268 jaegertracing/all-in-one:latest
```
View traces at [http://localhost:16686](http://localhost:16686)

---

## 🔐 Security Measures
- **🔑 API Key Authentication**: `x-api-key` header required for requests.
- **🔒 JWT Authentication**: Secure endpoints with JSON Web Tokens.
- **⚖️ Role-Based Access Control (RBAC)**: Protect sensitive operations.
- **⏳ Rate Limiting**: Prevent abuse with request throttling.

---

## 🚀 Future Enhancements
- 📦 Implement CI/CD with Docker & Kubernetes.
- 💰 Integrate real payment gateways (Stripe, PayPal).
- 📈 Improve scalability with Kafka partitioning.

---

## ✨ Contributors
- **Project Author**: Shivam Rai
- **GitHub**: [shivamrai27](https://github.com/shivamrai27)

---
---

### 🎉 Happy Coding! 🚀
