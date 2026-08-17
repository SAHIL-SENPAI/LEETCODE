# ⚡ LeetCode Clone

A full-stack **LeetCode-inspired coding platform** built with React, Node.js, Express, MongoDB, and the **Judge0 API** for executing user-submitted code.

🔗 **GitHub Repository:** https://github.com/SAHIL-SENPAI/LEETCODE

---

## 🚀 Features

* 👤 User authentication
* 🧑‍💻 Online code editor
* 📝 Programming problems with test cases
* ⚡ Code execution using Judge0 API
* ✅ Test case validation
* ❌ Error and execution result handling
* ⏱️ Execution time and memory information
* 🌐 Multi-language code execution
* 🔒 Protected backend routes
* 🗄️ MongoDB database integration
* 📱 Responsive interface

---

## 🛠️ Tech Stack

### Frontend

* React.js
* TypeScript
* Vite
* Tailwind CSS
* React Router
* Axios

### Backend

* Node.js
* Express.js
* JavaScript
* MongoDB
* Mongoose
* JWT

### Code Execution

* Judge0 API

Judge0 provides the isolated environment used to compile and execute submitted programs.

---

## 🏗️ Architecture

```text
┌─────────────────────┐
│      React UI       │
│     TypeScript      │
└──────────┬──────────┘
           │
           │ REST API
           ▼
┌─────────────────────┐
│     Express.js      │
│       Backend       │
└─────────┬───────────┘
          │
     ┌────┴─────┐
     │          │
     ▼          ▼
┌──────────┐ ┌──────────────┐
│ MongoDB  │ │   Judge0     │
│ Database │ │ Code Runner  │
└──────────┘ └──────────────┘
```

---

## ⚡ Code Execution Flow

```text
User writes code
       │
       ▼
Frontend submits code
       │
       ▼
Backend receives submission
       │
       ▼
Backend sends submission to Judge0
       │
       ▼
Judge0 compiles & executes code
       │
       ▼
Execution result returned
       │
       ▼
Backend processes result
       │
       ▼
Result displayed to user
```

---

## 🌐 Supported Languages

The application can execute languages supported by the configured Judge0 instance.

Examples include:

* C
* C++
* Java
* JavaScript
* TypeScript
* Python
* Go
* Rust

---

## 📁 Project Structure

```text
LEETCODE/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types/
│   │
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── server.ts
│
└── README.md
```

---

## 🔧 Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

JUDGE0_API_URL=your_judge0_api_url

JUDGE0_API_KEY=your_judge0_api_key
```

> Never commit your `.env` file or API keys to GitHub.

---

## 📦 Installation

### Clone the repository

```bash
git clone https://github.com/SAHIL-SENPAI/LEETCODE.git

cd LEETCODE
```

### Install dependencies

```bash
npm install
```

If the frontend and backend have separate `package.json` files:

```bash
cd client
npm install

cd ../server
npm install
```

### Start the development servers

```bash
npm run dev
```

---

## 🔑 Judge0 Integration

The application uses Judge0 to safely execute submitted code.

The backend sends information such as:

```text
Source Code
Language ID
Standard Input
```

to Judge0 and receives:

```text
Execution Status
Output
Error
Execution Time
Memory Usage
```

The result is then returned to the frontend and displayed to the user.

---

## 🎯 Project Goals

This project was built to gain practical experience with:

* Full-stack application development
* REST API architecture
* Authentication & authorization
* Database design
* Third-party API integration
* Code execution systems
* React state management
* TypeScript
* Backend security
* Production deployment

---

## 🔮 Future Improvements

* [ ] Add more coding problems
* [ ] Problem difficulty filtering
* [ ] Search and sorting
* [ ] User submission history
* [ ] Leaderboard
* [ ] User profiles
* [ ] Problem discussions
* [ ] Code submission statistics
* [ ] Contest system
* [ ] More language support

---

## 👨‍💻 Author

**Sahil Yadav**

GitHub:
https://github.com/SAHIL-SENPAI

---

## ⭐ Contributing

Contributions, suggestions, and improvements are welcome.

If you find this project useful, consider giving the repository a ⭐.
