import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import pino from 'pino-http';
import { connectMongoDB } from './db/connectMongoDB.js';
import { User } from "./models/user.js";
import { Item } from "./models/item.js";
import { Wishlist } from "./models/wishlist.js";

const app = express();
const PORT = process.env.PORT ?? 3030;
app.use(express.json());
app.use(cors());
app.use(
  pino({
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss',
        ignore: 'pid,hostname',
        messageFormat: '{req.method} {req.url} {res.statusCode} - {responseTime}ms',
        hideObject: true,
      },
    },
  }),
);
app.post('/users', async (req, res) => {
  try {
    const newContact = await User.create(req.body);
    res.status(201).json({
      status: 201,
      message: 'User successfully created!',
      data: newContact,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/items', async (req, res) => {
  try {
    const newContact = await Item.create(req.body);
    res.status(201).json({
      status: 201,
      message: 'Item successfully created!',
      data: newContact,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.post('/wishlist', async (req, res) => {
  try {
    const newContact = await Wishlist.create(req.body);
    res.status(201).json({
      status: 201,
      message: 'Wishlist successfully created!',
      data: newContact,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
