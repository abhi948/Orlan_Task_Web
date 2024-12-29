# Project README

## Introduction

This project is a platform designed to manage organizations, teams, and members within those organizations. The system aims to streamline the administration of organizational structures and foster better collaboration and resource management.

### Key Features:
- Manage Organizations and their details.
- Create and manage Teams within Organizations.
- Assign Members to Teams.
- View and display Organization, Team, and Member relationships.

---

## File Structure

```
project-directory/
│
├── backend/          
│   ├── controller/       
│   ├── models/       
│   ├── routes/       
│   ├── index.js  
│   └── package.json   
│
├── frontend/           
│   ├── public/        
│   ├── src/           
│   │   ├── components/   
│   │   ├── assets/           
│   │   ├── App.jsx     
│   │   ├── index.jsx   
│   ├── package.json
│   └──  vite.config.js 
│
├── .gitignore            
└── README.md          
```

---

## Technologies Used

- **Frontend**:
  - **React.js**: A JavaScript library for building user interfaces.
  - **Vite**: A modern build tool that optimizes frontend assets.
  
- **Backend**:
  - **Node.js**: JavaScript runtime for server-side development.
  - **Express.js**: A web framework for Node.js to handle RESTful APIs.
  - **MongoDB**: A NoSQL database to store organization, team, and member data.

---

## How to Run the Project

### 1. **Clone the Repository**
   - Download the project folder from the repository.
   
### 2. **Frontend Setup**
   - Navigate to the `frontend` directory.
   
   ```bash
   cd frontend
   ```
   
   - Install the required npm packages:
   
   ```bash
   npm install
   ```
   
   - Start the development server:
   
   ```bash
   npm run dev
   ```

   This will run the frontend application at `http://localhost:3000`.

### 3. **Backend Setup**
   - Navigate to the `backend` directory.
   
   ```bash
   cd backend
   ```
   
   - Install the required npm packages:
   
   ```bash
   npm install
   ```
   
   - Run the server:
   
   ```bash
   node index.js
   ```

   This will start the backend server at `http://localhost:3000`.

---

## API Endpoints

### **Backend API Endpoints:**

1. **Create Organization**:
   - `POST /api/organization`
   
2. **Create Team**:
   - `POST /api/addTeam`
   
3. **Get Teams**:
   - `GET /api/getTeam` - Fetches all teams with populated members and organization.
   
4. **Get Employees**:
   - `GET /api/getEmployee` - Fetches all employees.

---

## Contributing

Contributions are welcome! If you'd like to contribute to this project, feel free to fork the repository and submit a pull request.

---