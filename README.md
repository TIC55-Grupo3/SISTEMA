# SISTEMA

Sistema web full-stack com arquitetura cliente-servidor.

## Arquitetura

```
┌─────────────────────────────────────────────────────────┐
│                      CLIENTE                            │
│                                                         │
│   ┌──────────────────────────────────────────────┐      │
│   │          Browser / React (Vite)              │      │
│   │              porta 5173                      │      │
│   └──────────────────┬───────────────────────────┘      │
└──────────────────────┼──────────────────────────────────┘
                       │ HTTP/REST (JSON)
┌──────────────────────┼──────────────────────────────────┐
│                   SERVIDOR                              │
│                      │                                  │
│   ┌──────────────────▼───────────────────────────┐      │
│   │          FastAPI + Python                    │      │
│   │              porta 8000                      │      │
│   │                                              │      │
│   │  ┌─────────┐  ┌──────────┐  ┌────────────┐  │      │
│   │  │ Routes  │  │ Services │  │  Schemas   │  │      │
│   │  └────┬────┘  └────┬─────┘  └────────────┘  │      │
│   │       └────────────┘                         │      │
│   │              │ SQLAlchemy ORM                │      │
│   └──────────────┼───────────────────────────────┘      │
│                  │                                       │
│   ┌──────────────▼───────────────────────────────┐      │
│   │          PostgreSQL                           │      │
│   │              porta 5432                      │      │
│   └──────────────────────────────────────────────┘      │
└─────────────────────────────────────────────────────────┘
```

## Stack

| Camada       | Tecnologia                  |
|--------------|-----------------------------|
| Frontend     | React 18 + Vite + Axios     |
| Backend      | Python 3.12 + FastAPI       |
| ORM          | SQLAlchemy 2.0              |
| Banco        | PostgreSQL 16               |
| Container    | Docker + Docker Compose     |

## Pré-requisitos

- [Docker](https://www.docker.com/) e Docker Compose
- [Git](https://git-scm.com/)

## Como rodar

```bash
# Clone o repositório
git clone https://github.com/TIC55-Grupo3/SISTEMA.git
cd SISTEMA

# Copie os arquivos de ambiente
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Suba os contêineres
docker compose up --build
```

Acesse:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **Docs Swagger**: http://localhost:8000/docs
- **Docs ReDoc**: http://localhost:8000/redoc

## Estrutura de pastas

```
SISTEMA/
├── backend/
│   ├── app/
│   │   ├── api/routes/     # Endpoints da API
│   │   ├── core/config.py  # Configurações (pydantic-settings)
│   │   ├── db/database.py  # Conexão SQLAlchemy
│   │   ├── models/         # Modelos ORM
│   │   ├── schemas/        # Schemas Pydantic
│   │   ├── services/       # Lógica de negócio
│   │   └── main.py         # Entry point FastAPI
│   ├── tests/
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/     # Componentes reutilizáveis
│   │   ├── pages/          # Páginas da aplicação
│   │   ├── services/api.js # Cliente HTTP (Axios)
│   │   ├── hooks/          # Custom hooks
│   │   ├── context/        # Contextos React
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── Dockerfile
├── docs/
├── .github/workflows/
├── docker-compose.yml
├── .gitignore
└── README.md
```

## Desenvolvimento sem Docker

### Backend
```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Testes

```bash
cd backend
pytest tests/
```

## Contribuição

1. Crie uma branch: `git checkout -b feat/nome-da-feature`
2. Commit: `git commit -m "feat: descrição"`
3. Push: `git push origin feat/nome-da-feature`
4. Abra um Pull Request
