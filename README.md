# atypical_assignment# Real-Time Order Notification System

## Overview

This project demonstrates a real-time event-driven system where clients automatically receive updates whenever data in the Orders table changes.

The solution avoids polling and instead uses PostgreSQL LISTEN/NOTIFY together with Socket.IO to push updates instantly to connected clients.

---

## Features

* Real-time order updates
* Supports INSERT, UPDATE and DELETE operations
* No client polling
* Event-driven architecture
* Lightweight browser client
* PostgreSQL Trigger based notifications

---

## Tech Stack

* Node.js
* Express.js
* PostgreSQL
* Socket.IO

---

## Architecture

Orders Table
→ PostgreSQL Trigger
→ pg_notify()
→ LISTEN order_updates
→ Node.js Listener
→ Socket.IO
→ Connected Clients

---

## Database Schema

Orders

* id (Primary Key)
* customer_name
* product_name
* status
* updated_at

---

## Real-Time Flow

1. User creates, updates, or deletes an order.
2. PostgreSQL Trigger executes automatically.
3. Trigger sends a notification using pg_notify().
4. Node.js service receives the event using LISTEN.
5. Socket.IO broadcasts the update.
6. Connected clients receive the update instantly.

---

## Why This Approach?

Traditional polling requires clients to repeatedly request data from the server.

Problems:

* Increased database load
* Unnecessary network traffic
* Delayed updates

This implementation uses an event-driven architecture where updates are pushed only when data changes.

Benefits:

* Real-time communication
* Better resource utilization
* Lower latency
* Easier scalability

---

## Scalability Considerations

For larger systems, PostgreSQL LISTEN/NOTIFY can be replaced with:

* Redis Pub/Sub
* RabbitMQ
* Apache Kafka

The overall event-driven architecture remains unchanged.

---

## Running the Project

1. Clone the repository

2. Install dependencies

npm install

3. Configure PostgreSQL database

4. Start the server

npm start

5. Open browser client

[http://localhost:PORT](http://localhost:PORT)

---

## Demo

When an order is inserted, updated, or deleted:

* Database trigger fires
* Notification is generated
* Server receives event
* Connected clients instantly receive updates

No polling is required.
