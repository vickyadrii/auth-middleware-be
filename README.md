# Auth Middleware for Backend

## Technologies used:
[![My Skills](https://skillicons.dev/icons?i=express,ts,prisma,postgres)](https://skillicons.dev)

## Getting Started

Follow the steps below to run this project on your machine.

### Prerequisites

Make sure you have installed the following prerequisites before proceeding:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

## Installation

1. Clone this repository to your local machine:

   ```git clone https://github.com/vickyadrii/technical-test-be-indive.git```

2. Navigate to the project directory:

   ```cd technical-test-be-indive```
3. Install all the required dependencies using npm or Yarn:
   ````bash
   npm install
   # or
   yarn
   ````

## Configuration

1. Create PostgreSQL Database, namely: ```technical-test-indive```
2. Configured PostgreSQL database connection in the .env file:

   ```DATABASE_URL="postgresql://root:postgres@localhost:5432/technical-test-indive"```

3. Run migrations to initialize the database schema:

   ```npx prisma migrate dev --name init```

## Usage

Start the Express server:

````bash
   npm run dev
   # or
   yarn dev
   ````

## Link Postman
[Click here](https://www.postman.com/vickyadriii/workspace/public-workspace/collection/31750513-46a5047f-a80b-4686-8389-91431592f351?action=share&creator=31750513)

## Built With
- [Express](https://expressjs.com/) - Web framework for Node.js
- [TypeScript](https://www.typescriptlang.org/) - Programming language
- [Prisma](https://www.prisma.io/) - Modern ORM (Object-Relational Mapping) for Node.js and TypeScript
- [PostgreSQL](https://www.postgresql.org/) - Open-source relational database management system
- [Cloudinary](https://cloudinary.com/) - Cloud services for image, download, and CDN (Content Delivery Network)
