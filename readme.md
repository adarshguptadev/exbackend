# Create Express Backend CLI
CLI tool to quickly create a clean and scalable Express.js backend structure.

---

## Usage

Run the CLI using **npx** (no installation required):

```bash
npx @adarshguptadev/exbackend myApp
```

---

## 📂 What it creates

```
myApp/
│
├── src/
│   ├── config/
│   │   └── DBconnect.js
│   ├── controllers/
│   ├── middlewares/
│   │   └── globalError.js
│   ├── models/
│   ├── routes/
│   │   └── home.router.js
│   ├── services/
│   ├── utils/
│   ├── app.js
│   └── server.js
│
├── .env
├── .gitignore
├── package.json
└── README.md
```

---
## Packages Used

###  Express
- Server setup and routing

###  Mongoose
- MongoDB object modeling tool

###  CORS
- Allows frontend-backend communication from different origins

###  Dotenv
- Environment variable management
---

## Features

* Clean and scalable folder structure
* Express server setup
* MongoDB connection ready
* Global error handling middleware
* Environment configuration support
* Development & production scripts

---

## After project creation

```bash
cd myApp
npm install
npm run dev
```

---

## Environment Variables

Update your `.env` file:

```
PORT=__
MONGO_URI=__
FRONTEND_URL=__
NODE_ENV=__
```

---

## Requirements

- Node.js >= 14
- MongoDB (local or cloud)

---

## Why use this?

Setting up backend structure manually is repetitive and error-prone.
This CLI automates the setup so you can focus on building features instead of boilerplate.

---

##  Author

**Adarsh Gupta**

GitHub: https://github.com/adarshguptadev

---

## License

MIT
