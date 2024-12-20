# YorkU E-Commerce Project - EECS 4413

## Overview
This project is an e-commerce application developed for the EECS 4413 course at York University. It features:
- **Frontend**: React.js
- **Backend**: Spring Boot
- **Database**: MySQL

---

## Source Code and SQL Scripts
The source code and SQL scripts are available on GitHub:  
**[YorkU-Ecommerce-EECS4413 Repository](https://github.com/gnettt/YorkU-Ecommerce-EECS4413)**

To download the repository:
1. Visit the link above.
2. Click on the green "Code" button and select "Download ZIP" or clone the repository using:
   ```bash
   git clone https://github.com/gnetc/YorkU-Ecommerce-EECS4413.git
   ```

## How to Run the Application via Docker

### 1. Pull the Images
Pull the necessary Docker images from Docker Hub:

```bash
docker pull gnettt/yorku-ecommerce-eecs4413-backend:latest
docker pull gnettt/yorku-ecommerce-eecs4413-frontend:latest
```

### 2. Create a Docker Network (Optional)
If the containers need to communicate with each other:

```bash
docker network create ecommerce-network
```

### 3. Run the Database
Start the MySQL database container:

```bash
docker run --name ecommerce-database --network ecommerce-network \
  -e MYSQL_DATABASE=ecommerce_db \
  -e MYSQL_USER=eecs4413login \
  -e MYSQL_PASSWORD=michellegnetrayEECS4413 \
  -e MYSQL_ROOT_PASSWORD=rootpassword \
  -p 3306:3306 mysql:8.0
```

### 4. Run the Backend
Start the backend container and connect it to the database:

```bash
docker run --name ecommerce-backend --network ecommerce-network \
  -p 8080:8080 gnettt/yorku-ecommerce-eecs4413-backend:latest
```

### 5. Run the Frontend
Start the frontend container:

```bash
docker run --name ecommerce-frontend --network ecommerce-network \
  -p 3000:80 gnettt/yorku-ecommerce-eecs4413-frontend:latest
```

### 6. Access the Application
- **Frontend:** Access the frontend at `http://localhost:3000`
- **Backend:** Access the backend API at `http://localhost:8080`

---

## SQL Scripts
If the database needs to be reinitialized or restored, the SQL scripts can be found in the [SQL Scripts Folder](./sql).

---

## GitHub Repository
The source code and additional resources for this project are available in the following GitHub repository:

[GitHub - YorkU-Ecommerce-EECS4413](https://github.com/gnetc/YorkU-Ecommerce-EECS4413)

---

## Notes
Ensure Docker is running on your machine before executing the commands. For any issues or queries, please contact the project contributors through the GitHub repository.
