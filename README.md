<div align="center">

# 🎓 CSE 18th Batch Academic Portal

### *A Production-Ready Academic Management System*
### *Khwaja Yunus Ali University — Computer Science & Engineering*

[![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-2088FF?style=flat-square&logo=github-actions)](https://github.com)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=flat-square&logo=node.js)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=flat-square&logo=mysql)](https://mysql.com)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat-square&logo=docker)](https://docker.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

**Built for CSE 18th Batch — KYAU**

[Features](#-features) · [Tech Stack](#-tech-stack) · [Quick Start](#-quick-start) · [API Docs](#-api-documentation) · [Deployment](#-deployment)

</div>

---

## 📌 Overview

The **CSE 18th Batch Academic Portal** is a full-stack, enterprise-grade academic management platform built exclusively for the Computer Science and Engineering 18th Batch at Khwaja Yunus Ali University (KYAU).

It provides a centralized platform for managing courses, assignments, notices, routines, events, and student resources — with role-based access for Students, Co-CRs, CRs, and Admins.

### ✨ Key Highlights

- 🔐 **Secure Authentication** — JWT + OTP + KYAU Email Verification
- 👥 **Role-Based Access Control** — Student, Co-CR, CR, Admin
- 📄 **Assignment Cover Page Generator** — Auto-filled from student profile (integrated with [KYAU PDF Builder](https://kyau-pdf-builder.netlify.app/))
- 📚 **Complete Course Management** — Slides, Notes, Books, Previous Questions
- 📢 **Notice Board** — Pinned & categorized notices
- 📅 **Routine Viewer** — Weekly, Lab, Exam routines
- 📊 **Admin Analytics** — Charts, logs, user management
- 🌙 **Dark Mode** — Premium dark-first design
- 📱 **Mobile Responsive** — Works perfectly on all devices

---

## 🎭 User Roles

| Role | Permissions |
|------|-------------|
| **Student** | View courses, download materials, submit assignments, view notices/routine/events |
| **Co-CR** | Everything + Upload materials, Publish assignments, Course notices |
| **CR** | Everything + Batch notices, Pin notices, Edit/Delete content |
| **Admin** | Everything + User management, Analytics, System settings |

---

## 🚀 Tech Stack

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| React.js | 18.x | UI Framework |
| TypeScript | 5.x | Type Safety |
| Vite | 5.x | Build Tool |
| Tailwind CSS | 3.x | Styling |
| Framer Motion | 11.x | Animations |
| Redux Toolkit | 2.x | State Management |
| TanStack Query | 5.x | Server State |
| React Router | 6.x | Routing |
| React Hook Form | 7.x | Form Management |
| Zod | 3.x | Validation |
| Recharts | 2.x | Charts |
| html2pdf.js | 0.10.x | PDF Generation |
| Lucide React | Latest | Icons |

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| Node.js | 20.x | Runtime |
| Express.js | 4.x | Web Framework |
| TypeScript | 5.x | Type Safety |
| Prisma ORM | 5.x | Database ORM |
| MySQL | 8.0 | Database |
| JWT | 9.x | Authentication |
| bcryptjs | 2.x | Password Hashing |
| Nodemailer | 6.x | Email Service |
| Cloudinary | 2.x | File Storage |
| Winston | 3.x | Logging |
| Zod | 3.x | Validation |
| Helmet | 7.x | Security Headers |
| swagger-ui-express | 5.x | API Docs |

### DevOps
| Technology | Purpose |
|-----------|---------|
| Docker | Containerization |
| Docker Compose | Multi-container orchestration |
| NGINX | Reverse Proxy |
| GitHub Actions | CI/CD Pipeline |

---

## 📁 Project Structure

```
cse-batch18-portal/
├── 📁 frontend/                    # React + Vite + TypeScript
│   ├── src/
│   │   ├── assets/                 # Images, fonts
│   │   ├── components/             # Reusable components
│   │   │   ├── ui/                 # Base UI components
│   │   │   ├── layout/             # App layout (Sidebar, Topbar)
│   │   │   ├── common/             # Shared components
│   │   │   └── dashboard/          # Dashboard widgets
│   │   ├── features/               # Feature-based modules
│   │   ├── hooks/                  # Custom React hooks
│   │   ├── pages/                  # Page components
│   │   │   ├── auth/               # Login, Register, OTP
│   │   │   ├── dashboard/          # Role dashboards
│   │   │   ├── courses/            # Course pages
│   │   │   ├── assignments/        # Assignment pages
│   │   │   │   └── CoverPagePage   # 📄 Cover page generator
│   │   │   ├── notices/            # Notice board
│   │   │   ├── routines/           # Class routines
│   │   │   ├── events/             # Events
│   │   │   ├── gallery/            # Photo gallery
│   │   │   ├── admin/              # Admin panel
│   │   │   └── cr/                 # CR/Co-CR management
│   │   ├── services/               # Axios API services
│   │   ├── store/                  # Redux store + slices
│   │   ├── types/                  # TypeScript types
│   │   └── utils/                  # Helper utilities
│   └── package.json
│
├── 📁 backend/                     # Node.js + Express + TypeScript
│   ├── prisma/
│   │   ├── schema.prisma           # Database schema
│   │   └── seed.ts                 # Seed data (real students)
│   ├── src/
│   │   ├── config/                 # App configuration
│   │   │   ├── env.ts              # Environment validation
│   │   │   ├── database.ts         # Prisma client
│   │   │   ├── cloudinary.ts       # File storage config
│   │   │   ├── email.ts            # Email service + templates
│   │   │   └── logger.ts           # Winston logger
│   │   ├── middleware/             # Express middleware
│   │   │   ├── auth.middleware.ts  # JWT + RBAC
│   │   │   ├── error.middleware.ts # Global error handler
│   │   │   ├── validate.middleware.ts # Zod validation
│   │   │   └── activity.middleware.ts # Activity logging
│   │   ├── modules/                # Feature modules
│   │   │   ├── auth/               # Authentication
│   │   │   ├── users/              # User management (Admin)
│   │   │   ├── students/           # Student profiles
│   │   │   ├── teachers/           # Teacher management
│   │   │   ├── semesters/          # Semester management
│   │   │   ├── courses/            # Courses + materials
│   │   │   ├── assignments/        # Assignment workflow
│   │   │   ├── notices/            # Notice board
│   │   │   ├── routines/           # Class routines
│   │   │   ├── events/             # Events
│   │   │   ├── gallery/            # Photo gallery
│   │   │   ├── notifications/      # Push notifications
│   │   │   ├── analytics/          # Admin analytics
│   │   │   ├── search/             # Global search
│   │   │   └── upload/             # File upload (Cloudinary)
│   │   ├── types/                  # TypeScript types
│   │   ├── utils/                  # Utility functions
│   │   ├── app.ts                  # Express app
│   │   └── server.ts               # Server entry point
│   └── package.json
│
├── 📁 docker/
│   ├── nginx/nginx.conf            # NGINX configuration
│   └── mysql/init.sql              # MySQL init script
│
├── 📁 docs/                        # Documentation
│   ├── API.md                      # API reference
│   ├── ARCHITECTURE.md             # System architecture
│   └── DEPLOYMENT.md               # Deployment guide
│
├── 📁 .github/workflows/           # GitHub Actions
│   └── ci.yml                      # CI/CD pipeline
│
├── docker-compose.yml              # Production Docker setup
├── docker-compose.dev.yml          # Development (DB only)
├── .env.example                    # Environment template
├── .gitignore
└── README.md
```

---

## ⚡ Quick Start

### Prerequisites

- **Node.js** 20.x or later ([Download](https://nodejs.org))
- **MySQL** 8.0 or Docker ([Download](https://www.mysql.com))
- **npm** 11.x (comes with Node.js)

### Option 1: Local Development (Without Docker)

**1. Clone the repository**
```bash
git clone https://github.com/yourusername/cse18-batch-portal.git
cd cse18-batch-portal
```

**2. Setup MySQL Database**

Using Docker (recommended):
```bash
docker-compose -f docker-compose.dev.yml up -d
```

Or install MySQL locally and create database:
```sql
CREATE DATABASE cse18_portal CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

**3. Setup Backend**
```bash
cd backend

# Copy environment file
cp .env.example .env
# Edit .env with your values

# Install dependencies
npm install

# Generate Prisma client
npm run db:generate

# Run migrations
npm run db:push

# Seed database with real student data
npm run db:seed

# Start development server
npm run dev
```

✅ Backend running at: `http://localhost:5000`
📚 API Docs at: `http://localhost:5000/api/docs`

**4. Setup Frontend**
```bash
cd ../frontend

# Copy environment file
cp .env.example .env

# Install dependencies
npm install

# Start development server
npm run dev
```

✅ Frontend running at: `http://localhost:5173`

### Option 2: Docker (Production)

```bash
# Copy and edit environment variables
cp .env.example .env
nano .env  # Set your secrets

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f
```

✅ Application running at: `http://localhost`

---

## 🔑 Default Login Credentials

> ⚠️ Change these immediately in production!

| Role | Email | Password |
|------|-------|----------|
| **Admin** | admin@kyau.edu.bd | Admin@12345 |
| **CR** | 06224205101005@student.kyau.edu.bd | Student@12345 |
| **Co-CR** | 06224205101001@student.kyau.edu.bd | Student@12345 |
| **Student** | 06224205101002@student.kyau.edu.bd | Student@12345 |

---

## 📚 API Documentation

The API is documented with Swagger UI. After starting the backend:

- **Swagger UI**: `http://localhost:5000/api/docs`
- **Base URL**: `http://localhost:5000/api/v1`

### Key Endpoints

#### Authentication
```
POST /api/v1/auth/register         Register with KYAU email
POST /api/v1/auth/verify-otp       Verify email OTP
POST /api/v1/auth/set-password     Set password after OTP
POST /api/v1/auth/login            Login
POST /api/v1/auth/refresh-token    Refresh access token
POST /api/v1/auth/logout           Logout
POST /api/v1/auth/forgot-password  Send password reset email
POST /api/v1/auth/reset-password   Reset password
```

#### Courses
```
GET  /api/v1/courses               List all courses
GET  /api/v1/courses/:id           Get course details
POST /api/v1/courses               Create course (Admin)
GET  /api/v1/courses/:id/materials List course materials
POST /api/v1/courses/:id/materials Upload material (Co-CR+)
```

#### Assignments
```
GET  /api/v1/assignments           List assignments
GET  /api/v1/assignments/:id       Get assignment details
POST /api/v1/assignments           Publish assignment (Co-CR+)
POST /api/v1/assignments/:id/submit Submit assignment (Student)
PATCH /api/v1/assignments/:id/grade Grade submission (CR+)
```

---

## 🔒 Security Features

- ✅ JWT Access Token (15 min) + Refresh Token (7 days) with rotation
- ✅ HttpOnly secure cookies for refresh tokens
- ✅ bcrypt password hashing (12 rounds)
- ✅ OTP-based email verification (5 min expiry, 3 attempts max)
- ✅ KYAU email validation (only @student.kyau.edu.bd allowed)
- ✅ Account lockout after 5 failed login attempts
- ✅ RBAC middleware on every protected route
- ✅ Helmet.js security headers
- ✅ CORS whitelisting
- ✅ Rate limiting (10 req/min for auth endpoints)
- ✅ Input validation via Zod
- ✅ SQL injection prevention via Prisma ORM
- ✅ XSS protection
- ✅ Audit logs for all write operations

---

## 📄 Assignment Cover Page Generator

The portal includes a built-in cover page generator that **auto-fills** from the student's profile:

1. Student opens an assignment
2. Clicks **"Generate Cover Page"**
3. System auto-fills: Name, Student ID, Batch, Semester, Course Code, Course Title, Teacher Name
4. Student enters: Topic name, Season, Year
5. Click **"Generate PDF"** → Download ready!

This integrates with the existing [KYAU PDF Builder](https://kyau-pdf-builder.netlify.app/) design.

---

## 🛠️ Development Commands

### Backend
```bash
npm run dev          # Start dev server with hot reload
npm run build        # Build TypeScript
npm run start        # Run production build
npm run db:generate  # Generate Prisma client
npm run db:migrate   # Run migrations
npm run db:push      # Push schema to DB (no migration history)
npm run db:seed      # Seed database
npm run db:studio    # Open Prisma Studio (GUI)
npm test             # Run tests
npm run lint         # Lint code
```

### Frontend
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Lint code
```

---

## 🚀 Deployment Guide

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed deployment instructions.

**Quick Production Deploy:**

1. Set up a VPS (Ubuntu 22.04 recommended)
2. Install Docker + Docker Compose
3. Clone the repository
4. Configure `.env` with production values
5. Run `docker-compose up -d`
6. Point your domain to the server
7. Configure SSL with Let's Encrypt

---

## 🗄️ Database Schema

The database includes **23 normalized tables**:

`users` · `students` · `teachers` · `semesters` · `courses` · `course_materials` · `assignments` · `assignment_submissions` · `notices` · `routines` · `events` · `gallery` · `notifications` · `login_logs` · `activity_logs` · `email_verifications` · `password_resets` · `refresh_tokens` · `system_settings`

---

## 🤝 Contributing

This project is for CSE 18th Batch, KYAU. Contact the CR/Admin to contribute.

---

## 📞 Contact

- **CR**: Md. Sojib Ahmed — 06224205101005@student.kyau.edu.bd
- **Admin**: admin@kyau.edu.bd
- **University**: Khwaja Yunus Ali University, Enayetpur, Sirajganj

---

## 📄 License

This project is licensed under the MIT License — see [LICENSE](LICENSE) for details.

---

<div align="center">

**Made with ❤️ for CSE 18th Batch, KYAU**

*Khwaja Yunus Ali University — Computer Science & Engineering*

</div>
