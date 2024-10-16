# PetCare Platform - Express.js & TypeScript

Welcome to the **PetCare** platform, a backend system built using **Express.js** and **TypeScript**. This project provides users with the ability to interact with pet care-related posts through upvotes, downvotes, and comments. It also includes an **Admin Dashboard** for managing platform content and users.

## Features

### User Features
- **Upvote & Downvote Posts**: Users can express their opinions on posts by either upvoting or downvoting.
- **Comment System**: Engage with the community by leaving comments on posts.
  
### Admin Features
- **Admin Dashboard**: A dedicated route for admins to manage users, posts, and comments.
  
## Project Structure

The project follows a **MVC (Model-View-Controller)** architecture to keep the code clean and modular. It is structured as follows:

- **Routes**: Define all the routes available in the system, including user interactions and admin routes.
- **Controllers**: Handle the business logic for each feature, including upvoting, downvoting, and commenting.
- **Services**: Contain reusable logic for database interactions and other utility functions.
- **Models**: Define the database schema and data relationships using TypeScript models.
  
## Technologies Used

- **Node.js**: JavaScript runtime used for building the backend API.
- **Express.js**: Minimalistic framework for building web applications and APIs.
- **TypeScript**: Provides static typing and type safety to improve code reliability and maintainability.
- **MongoDB**: NoSQL database to store post, comment, and user data.
- **Mongoose**: ODM library for MongoDB, allowing easier data manipulation and querying.

 
 

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- Node.js (v14 or higher)
- MongoDB
- TypeScript (Globally installed)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/petcare-platform.git
   cd petcare-platform
