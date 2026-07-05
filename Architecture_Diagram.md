# System Architecture & Flow Diagram

The following diagram illustrates the high-level architecture and data flow of the Employee Task Management System.

```mermaid
graph TD
    %% Frontend Layer
    subgraph Frontend [Frontend - React + TailwindCSS]
        UI[User Interface / Pages]
        State[React State & Auth Context]
        Axios[Axios API Client]
        
        UI -->|Interacts| State
        State -->|Triggers Requests| Axios
    end

    %% Backend Layer
    subgraph Backend [Backend - Node.js + Express]
        Router[Express Routes]
        AuthMW[Auth & Role Middleware]
        Controllers[Controllers]
        Services[Business Logic Services]
        
        Router -->|Checks JWT| AuthMW
        AuthMW -->|Routes Request| Controllers
        Controllers -->|Executes Logic| Services
    end

    %% Database Layer
    subgraph DB [Database Layer]
        Prisma[Prisma ORM]
        MySQL[(MySQL Database)]
        
        Prisma -->|Reads/Writes| MySQL
    end

    %% Message Broker Layer
    subgraph Broker [Asynchronous Processing]
        RabbitMQ((RabbitMQ Broker))
        Worker[Notification Worker]
        
        RabbitMQ -->|Consumes Messages| Worker
    end

    %% Connecting the Layers
    Axios -->|HTTP REST API| Router
    Services -->|Queries| Prisma
    Services -->|Publishes Events| RabbitMQ
    Worker -->|Saves Notifications| Prisma
```

### Components Description:
1. **Frontend**: The React application sends RESTful HTTP requests via Axios to the Node.js backend. State management handles JWT tokens for session persistence.
2. **Backend**: Express routes requests through authentication middleware to verify JWT tokens and roles. Controllers pass the request parameters to the Services layer.
3. **Database**: The Services layer uses Prisma ORM to execute type-safe queries on the MySQL database.
4. **Message Broker (RabbitMQ)**: When a critical event happens (like a Task being assigned), the Service layer publishes a message to RabbitMQ. A separate worker process consumes these messages in the background and saves notifications to the database, ensuring the API response isn't delayed by heavy processing.
