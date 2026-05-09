module.exports = (projectName) => `PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/${projectName}
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
`;