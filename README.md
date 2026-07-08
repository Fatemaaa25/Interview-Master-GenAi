# 🚀 Interview Master - GenAI

An AI-powered interview preparation platform that analyzes a candidate's resume against a job description and generates a personalized interview preparation report using **Google Gemini AI**.

The application helps job seekers prepare smarter by generating technical interview questions, behavioral questions, identifying skill gaps, creating a personalized preparation roadmap, and even generating an ATS-friendly resume tailored to the target job.

---

## ✨ Features

### 🔐 Authentication

* Secure User Registration & Login
* JWT Authentication
* Protected Routes
* Persistent User Sessions

### 📄 Resume Analysis

* Upload Resume in PDF format
* Extract resume content automatically
* Compare resume with a job description
* Analyze candidate profile using Gemini AI

### 🤖 AI Interview Report

Generate a personalized interview report that includes:

* 🎯 Resume Match Score
* 💻 Technical Interview Questions
* 🗣️ Behavioral Interview Questions
* 📈 Skill Gap Analysis
* 📅 Personalized Preparation Roadmap

### 📑 AI Resume Generator

* Generates an ATS-friendly resume
* Tailors resume according to the job description
* Converts AI-generated HTML into PDF
* One-click Resume Download

---

# 🛠️ Tech Stack

## Frontend

* React.js
* React Router
* Axios
* SCSS

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Multer
* PDF Parsing
* Puppeteer

## AI & APIs

* Google Gemini 2.5 Flash
* Google GenAI SDK
* Zod

---

# 📂 Project Structure

```
Interview-Master-GenAI
│
├── Backend
│   ├── src
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── services
│   │   ├── config
│   │   └── app.js
│   │
│   └── server.js
│
├── Frontend
│   ├── src
│   │   ├── features
│   │   ├── hooks
│   │   ├── services
│   │   ├── styles
│   │   └── App.jsx
│
└── README.md
```

---

# ⚙️ Installation

## Clone the Repository

```bash
git clone https://github.com/Fatemaaa25/Interview-Master-GenAi.git

cd Interview-Master-GenAi
```

---

## Backend Setup

```bash
cd Backend

npm install
```

Create a `.env` file inside the Backend folder.

```env
PORT=3000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

GOOGLE_GENAI_API_KEY=your_google_gemini_api_key
```

Run the backend

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd Frontend

npm install

npm run dev
```

---

# 🚀 Usage

1. Register or log in to your account.
2. Upload your resume in PDF format.
3. Enter a short self-description.
4. Paste the job description.
5. Generate the AI Interview Report.
6. Review:

   * Match Score
   * Technical Questions
   * Behavioral Questions
   * Skill Gaps
   * Preparation Roadmap
7. Download your AI-generated ATS-friendly resume.

---

# 📌 API Endpoints

## Authentication

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login               |
| POST   | `/api/auth/logout`   | Logout              |
| GET    | `/api/auth/get-me`   | Get logged-in user  |

---

## Interview

| Method | Endpoint                             | Description               |
| ------ | ------------------------------------ | ------------------------- |
| POST   | `/api/interview`                     | Generate Interview Report |
| GET    | `/api/interview`                     | Get All Reports           |
| GET    | `/api/interview/:interviewId`        | Get Interview Report      |
| GET    | `/api/interview/:interviewId/resume` | Download Generated Resume |

---

# 🧠 How It Works

```
Upload Resume (PDF)
        │
        ▼
Extract Resume Text
        │
        ▼
Self Description
        │
        ▼
Job Description
        │
        ▼
Google Gemini AI
        │
        ▼
AI Interview Analysis
        │
 ┌──────┼──────────────┐
 │      │              │
 ▼      ▼              ▼
Questions   Skill Gaps   Match Score
        │
        ▼
Preparation Roadmap
        │
        ▼
ATS-Friendly Resume (PDF)
```

---

# 🎯 Future Improvements

* AI Mock Interviews
* Voice-Based Interview Practice
* AI Feedback on Spoken Answers
* Cover Letter Generator
* LinkedIn Profile Optimizer
* Company-Specific Interview Preparation
* Resume Templates
* Interview Progress Dashboard
* Dark Mode

---

# 📸 Screenshots
* Register
  <img width="1736" height="1176" alt="image" src="https://github.com/user-attachments/assets/e1d095bb-5950-4233-b7a8-799a9a7570e2" />
* Login
  <img width="1712" height="1176" alt="image" src="https://github.com/user-attachments/assets/140b4198-4e00-4091-ac17-55ea713e01d7" />
* Resume Upload
  <img width="1711" height="1211" alt="image" src="https://github.com/user-attachments/assets/d06a039b-07d5-4d12-b7a4-9bc7485f6057" />
* Interview Report
  <img width="1638" height="1306" alt="image" src="https://github.com/user-attachments/assets/95cee1e2-26cd-416b-8b17-202794a8dcc2" />
* Preparation Roadmap
* <img width="804" height="993" alt="image" src="https://github.com/user-attachments/assets/c3619268-986c-4c49-b441-f9be235e3bce" />
* Generated Resume
  <img width="478" height="1040" alt="image" src="https://github.com/user-attachments/assets/302185b7-3764-4ac6-9ddd-b5fef67b25e6" />


---

# 💡 Learning Outcomes

This project strengthened my understanding of:

* MERN Stack Development
* Authentication with JWT
* RESTful API Design
* File Uploads using Multer
* PDF Parsing
* Google Gemini API Integration
* Prompt Engineering
* Schema Validation using Zod
* AI-powered Resume Analysis
* Dynamic PDF Generation with Puppeteer

---

# 👩‍💻 Author

**Fatema Mufaddal Shakir**

Computer Science Engineering Student

📧 Email: fatema.mshakir25@gmail.com

💼 GitHub: https://github.com/Fatemaaa25


---

# ⭐ Support

If you found this project useful, consider giving the repository a ⭐ on GitHub.

It motivates me to keep building and sharing more projects!

