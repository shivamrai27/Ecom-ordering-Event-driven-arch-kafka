# EDA-Kafka Project: Event-Driven Architecture with Kafka in Node.js

## Project Overview
This project demonstrates an **Event-Driven Architecture (EDA)** using **Kafka** in a **Node.js backend**. The system simulates an **E-commerce Order Processing System**, where multiple microservices interact asynchronously via Kafka events. The project is structured to ensure **scalability, resilience, and fault tolerance**, leveraging **event-driven messaging** to handle critical e-commerce processes.

### How It Works:
1. **Order Creation**: A user submits an order via the API.
2. **Event Emission**: The system publishes an `OrderCreated` event to Kafka.
3. **Microservices React**: Independent services consume the event and execute their tasks:
   - **Inventory Service**: Verifies stock availability and updates inventory.
   - **Payment Service**: Processes payments securely.
   - **Shipping Service**: Initiates shipping and updates order status.
4. **Asynchronous Processing**: Each microservice operates independently, ensuring **eventual consistency** without blocking operations.
5. **Error Handling & Recovery**: Features such as **retry mechanisms, dead-letter queues (DLQs), and idempotency checks** ensure reliable event processing.
6. **Logging & Monitoring**: Implements **structured logging (Winston), Prometheus for metrics, and OpenTelemetry for distributed tracing.**

## Features
- **Scalable Event-Driven Microservices**: Uses Kafka to decouple services.
- **Asynchronous Order Processing**: Ensures efficient handling of orders.
- **Database Integration**: Uses MongoDB to store order and inventory data.
- **Fault Tolerance**: Implements retries, dead-letter queues, and idempotency.
- **Monitoring & Logging**: Uses Prometheus, OpenTelemetry, and Winston for insights.
- **Security**: Implements JWT authentication, API keys, and role-based access control.
- **Containerized Deployment**: Uses Docker for Kafka and microservices.

## Technology Stack
- **Backend**: Node.js, Express.js
- **Messaging System**: Kafka (via KafkaJS)
- **Database**: MongoDB (via Mongoose)
- **Logging**: Winston
- **Monitoring**: Prometheus, OpenTelemetry
- **Security**: JWT, API Keys
- **Containerization**: Docker

---

## 1. Project Setup
### Install Dependencies
```sh
mkdir ecom-eda-kafka && cd ecom-eda-kafka
npm init -y
npm install express kafkajs mongoose dotenv winston swagger-ui-express swagger-jsdoc jsonwebtoken express-validator express-rate-limit prom-client @opentelemetry/api @opentelemetry/sdk-node @opentelemetry/auto-instrumentations @opentelemetry/exporter-jaeger @opentelemetry/resources @opentelemetry/semantic-conventions
```

### Directory Structure
```
ecom-eda-kafka/
├── src/
│   ├── api/
│   │   ├── orders.js
│   │   ├── health.js
│   │   ├── metrics.js
│   ├── kafka/
│   │   ├── producer.js
│   │   ├── consumer.js
│   ├── services/
│   │   ├── inventory.js
│   │   ├── payment.js
│   │   ├── shipping.js
│   ├── models/
│   │   ├── order.js
│   │   ├── inventory.js
│   │   ├── processedMessages.js
│   ├── middleware/
│   │   ├── apiKeyAuth.js
│   │   ├── jwtAuth.js
│   │   ├── authorize.js
│   │   ├── rateLimit.js
│   ├── utils/
│   │   ├── db.js
│   │   ├── logger.js
│   │   ├── metrics.js
│   │   ├── swagger.js
│   │   ├── tracing.js
│   ├── app.js
├── .env
├── package.json
├── README.md
```

---

## 2. Running Kafka with Docker
```yaml
version: '3.8'
services:
  zookeeper:
    image: confluentinc/cp-zookeeper:latest
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
    ports:
      - "2181:2181"
  kafka:
    image: confluentinc/cp-kafka:latest
    depends_on:
      - zookeeper
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://kafka:9092,PLAINTEXT_HOST://localhost:9092
    ports:
      - "9092:9092"
```
Start Kafka:
```sh
docker-compose up -d
```

---

## 3. Running the Application
### Setup Environment Variables
Create a `.env` file in the project root:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/ecom-eda
KAFKA_BROKERS=localhost:9092
JWT_SECRET=your_secret_key
API_KEY=your_generated_api_key
```

### Start Application
```sh
node src/app.js
```

---

## 4. API Endpoints
### Order API
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | `/v1/orders` | Create an order |
| GET  | `/health` | Health check |
| GET  | `/metrics` | Application metrics |
| GET  | `/api-docs` | API documentation |

### Sample Order Request
```json
{
  "orderId": "123",
  "userId": "456",
  "items": [{ "productId": "789", "quantity": 1 }]
}
```

---

## 5. Testing
Run Jest tests:
```sh
npm test
```

---

## 6. Monitoring & Logging
### Running Prometheus
```sh
docker run -p 9090:9090 prom/prometheus
```
### Running Jaeger for Tracing
```sh
docker run -d -p 16686:16686 -p 14268:14268 jaegertracing/all-in-one:latest
```
View traces at [http://localhost:16686](http://localhost:16686)

---

## 7. Security Measures
- **API Key Authentication**: `x-api-key` header required for requests.
- **JWT Authentication**: Secure endpoints with JSON Web Tokens.
- **Role-Based Access Control (RBAC)**: Protect sensitive operations.
- **Rate Limiting**: Prevent abuse with request throttling.

---

## 8. Future Enhancements
- Implement CI/CD with Docker & Kubernetes.
- Integrate real payment gateways (Stripe, PayPal).
- Improve scalability with Kafka partitioning.

---

## 9. Contributors
- **Project Author**: Shivam Rai
- **GitHub**: [shivamrai27](https://github.com/shivamrai27)

---

## 10. License
This project is licensed under the MIT License.

---

### Happy Coding! 🚀
