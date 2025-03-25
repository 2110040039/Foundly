# Lost and Found Website 

## Overview
This is a Spring Boot-based backend for a Lost and Found website. Currently, only the user management functionality is implemented. The backend follows a layered architecture with well-structured packages for controllers, services, repositories, DTOs, entities, exceptions, and configurations.

## Features
The REST Controller provides the following user-related operations:

1. **Add New User**
2. **List All Users**
3. **Search User by ID**
4. **Delete User by ID**
5. **Update User by ID**

## Project Structure
```
com.example.lostandfound
├── config            # Contains configurations such as password hashing
├── controller        # Handles HTTP requests related to users
├── service           # Business logic layer for user management
├── repository        # Data access layer using Spring Data JPA
├── dto               # Data Transfer Objects for request and response handling
├── entity/model      # Defines the User entity
├── exception         # Custom exceptions for error handling
```

## Configurations
- The `config` package includes utility classes for password hashing to enhance security.

## Technologies Used
- Java
- Spring Boot
- Spring Data JPA
- Hibernate
- MySQL (for database)
- Swagger (for API documentation)

## Setup and Installation
### Prerequisites
- Java 17 or later
- Maven
- MySQL/PostgreSQL

### Steps to Run the Application
1. Clone the repository:
   ```sh
   https://github.com/2110040039/Foundly.git
   cd Foundly
   ```
2. Update `application.properties` with database details.
3. Build the project:
   ```sh
   mvn clean install
   ```
4. Run the application:
   ```sh
   mvn spring-boot:run
   ```
5. Access API documentation at:
   ```sh
   http://localhost:8082/swagger-ui.html
   ```

## API Endpoints (User Module)
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | `/users` | Add a new user |
| GET | `/users` | List all users |
| GET | `/users/{id}` | Get user by ID |
| PUT | `/users/{id}` | Update user by ID |
| DELETE | `/users/{id}` | Delete user by ID |

## Future Enhancements
- Implementation of Lost Item and Found Item modules
- User authentication and authorization
- Notifications for matched lost and found items

## License
This project is licensed under the MIT License.

---
**Author:** Team-2
**Contact:** Null

