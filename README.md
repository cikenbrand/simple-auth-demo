# Next.js App with NextAuth and MongoDB

- This is a sample Next.js application with **authentication** powered by **NextAuth.js** and **MongoDB** as the database.

---

## Features

- User authentication with credentials using **NextAuth.js**.
- MongoDB for user data storage.

---

## Installation

### Prerequisites

- Node.js v18+ installed on your machine.
- MongoDB installed locally or access to a MongoDB Atlas database.

### Setup

npm install
Setup Environment Variables
Create a .env.local file in the root directory of the project.
Use the env.example file as a reference. You can copy it like this:
cp .env.example .env.local
Update the values in .env.local:
NEXTAUTH_SECRET=your-secret-key
MONGODB_URI=your-mongodb-connection-string
Running the App
Start Development Server
npm run dev
Open http://localhost:3000 in your browser.
