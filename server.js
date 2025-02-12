const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { chats } = require('./data/data');

dotenv.config();

const app = express();

// ✅ Improved CORS setup (Allows all origins but with better control)
const corsOptions = {
  origin: '*', // Allows public access (Change to specific domains if needed)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

app.use(express.json());

// ✅ Basic API Route
app.get('/', (req, res) => {
  res.send('Hello World! Server is running 🚀');
});

// ✅ Get all chats
app.get('/api/chat', (req, res) => {
  if (!chats || !Array.isArray(chats)) {
    return res.status(500).json({ message: 'Internal Server Error: Chats data is missing!' });
  }
  res.json(chats);
});

// ✅ Get chat by ID with error handling
app.get('/api/chat/:id', (req, res) => {
  const singleChat = chats.find((c) => c._id === req.params.id);

  if (!singleChat) {
    return res.status(404).json({ message: 'Chat not found' });
  }

  res.json(singleChat);
});

// ✅ Define PORT and start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
