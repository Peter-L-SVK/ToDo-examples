# Todo List Comparison Project

This project demonstrates a minimal todo list application implemented with two different backend technologies:

- **Django** (Python) - A batteries-included web framework
- **Rust** (Axum) - A high-performance systems language

Both backends serve the same Vue.js/React frontend, showcasing how different technologies can implement identical functionality.

## System Requirements

### Common Requirements
- Linux/macOS with Bash (Windows users can use WSL2)
- SQLite3 (usually pre-installed on Linux/macOS)
- Node.js
- Git 

### Django Backend Requirements
- Python 3.8+
- Django 4.2+
- Python packages:
  ```bash
  pip install django djangorestframework django-cors-headers
  ```

### Rust Backend Requirements
- Rust 1.65+ (install via [rustup](https://rustup.rs/))
- Cargo (Rust's package manager, included with Rust)
- SQLx CLI (for database migrations):
  ```bash
  cargo install sqlx-cli --features native-tls,postgres,sqlite,mysql
  ```
- Required Rust crates (automatically handled by Cargo):
  - Axum 
  - Tokio 
  - SQLx 
  - Serde 

### Frontend Requirements
- npm 
- Vite + React
- Axios 1.0+

## Project Structure

```
ToDo-example/
├── todo-app/      # Django/Python implementation
│   ├── requirements.txt
│   ├── manage.py
│   └── todo/
│   |   ├── models.py
│   |   ├── views.py
│   |   └── urls.py
|   ├── frontend/           # Separated Vite frontend for urls diffence 
│   ├── src/
│   |   ├── components/
│   |   ├── api/
│   |   └── App.jsx
│
├── rust-backend/        # Rust/Axum implementation
│   ├── Cargo.toml
│   ├── src/
│   │   ├── main.rs
│   │   ├── routes.rs
│   │   └── models.rs
|   ├── frontend/           # Separated Vite frontend for urls diffence
│   ├── src/
│   |   ├── components/
│   |   ├── api/
│   |   └── App.jsx
│
└── README.md
```

## Features

Both implementations provide:
✅ Create, read, update, delete tasks  
✅ Task completion toggle  
✅ CSRF protection  
✅ SQLite database persistence  
✅ REST API endpoints  

## Key Differences

| Aspect        | Django Implementation | Rust Implementation |
|--------------|----------------------|---------------------|
| Language     | Python               | Rust                |
| Framework    | Django               | Axum                |
| ORM          | Django ORM           | SQLx                |
| Performance  | Moderate             | High                |
| Safety       | GC-managed           | Compile-time checks |
| Boilerplate  | More                 | Less                |

## Setup Instructions

### Django Backend
```bash
cd /ToDo-example/todo-app/backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend
```bash
cd /ToDo-example/todo-app/frontend
npm install
npm run dev
```

### Rust Backend
```bash
cd /ToDo-example/todo-app-rs/backend
sqlx migrate run
cargo build --release
cargo run
```

### Frontend
```bash
cd /ToDo-example/todo-app-rs/frontend
npm install
npm run dev
```

## API Endpoints

Both backends implement the same API:

- `GET /api/tasks` - List all tasks
- `POST /api/tasks` - Create new task
- `PATCH /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Remove task
- `GET /api/csrf` - Get CSRF token

## Why This Comparison?

This project serves as:
- A learning resource for comparing web frameworks
- A reference implementation for both stacks
- A demonstration of REST API design principles
- An example of decoupled frontend/backend architecture

## Contributing

Pull requests welcome! Please maintain:
1. Feature parity between implementations
2. Clean, documented code
3. Consistent API responses
```
