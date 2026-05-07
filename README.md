# Question Management System

A full-stack, Dockerized application for managing questions and answers, built with modern technologies and a professional modular architecture.

## 🚀 Tech Stack

- **Frontend**: [Angular](https://angular.dev/) (v19+) with [Tailwind CSS](https://tailwindcss.com/)
- **Backend**: [Golang](https://go.dev/) with [Gin Gonic](https://gin-gonic.com/) Framework
- **Database**: [Microsoft SQL Server 2022](https://www.microsoft.com/en-us/sql-server/sql-server-2022)
- **Infrastructure**: [Docker](https://www.docker.com/) & Docker Compose

## 📁 Project Structure

```text
├── backend/               # Golang API
│   ├── database/          # DB connection logic
│   ├── handlers/          # API route handlers
│   ├── models/            # Data structures
│   ├── main.go            # Entry point
│   └── Dockerfile         # Multi-stage build
├── frontend/              # Angular Web App
│   ├── src/app/
│   │   ├── features/      # Modular UI features (Question List/Form)
│   │   ├── services/      # API communication
│   │   └── models/        # Shared interfaces
│   └── Dockerfile         # Nginx-based build
└── docker-compose.yml     # Orchestration
```

## 🛠️ Setup & Installation

### Option 1: Running with Docker (Recommended)

The entire stack can be launched with a single command.

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/TDEV-T/Testing_Thaibev.git
    cd Testing_Thaibev
    ```

2.  **Start the application**:
    ```bash
    docker-compose up -d --build
    ```

3.  **Access the services**:
    - **Frontend**: [http://localhost:4200](http://localhost:4200)
    - **Backend API**: [http://localhost:8080/api/questions](http://localhost:8080/api/questions)
    - **SQL Server**: `localhost:1433` (User: `sa`, Pass: `YourStrong@Passw0rd`)

---

### Option 2: Local Development (Backend)

If you wish to run the backend locally while keeping the database in Docker:

1.  **Ensure DB is running**:
    ```bash
    docker-compose up -d db
    ```

2.  **Setup `.env`**:
    Ensure `backend/.env` exists with `DB_HOST=localhost`.

3.  **Run Go**:
    ```bash
    cd backend
    go run .
    ```

## 📝 Features

- **IT 08-1**: Real-time list of questions with "Running Number" logic.
- **IT 08-2**: Validated input form for creating new questions.
- **Auto Re-indexing**: Deleting a question automatically reorders the sequence of remaining questions.
- **Tailwind UI**: Modern, responsive design based on professional specifications.

## 📡 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/questions` | Fetch all questions (sorted) |
| `POST` | `/api/questions` | Create a new question |
| `DELETE` | `/api/questions/:id` | Delete and re-index sequence |

## 🛡️ License

This project is open-source and available under the MIT License.
