
import express from 'express';
import cors from 'cors'
import bodyParser from "body-parser";
// Load environment variables

import cvMakerRoutes from "./Routes/cv.routes.js"
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 9000;
const allowedOrigins = [
  "https://cv-maker-ui.vercel.app",
];

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json())
app.use(bodyParser.json({ limit: '100mb' }))
app.use(cors())
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       // allow server-to-server or same-origin (no origin)
//       if (!origin) return callback(new Error("Origin not allowed"));

//       if (allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );
app.use((req, res, next) => {
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});


app.get('/app', (req, res) => {
  res.status(200).send({ message: 'Welcome to Dellife server'+process.env.REACT_PORT+process.env.GROQ_API_KEY });
});
// Routes
// app.use(UserRoutes)
// app.use(QuestionRoutes)
// app.use(newsRoutes)
// app.use(uploadRoutes)
app.use(cvMakerRoutes)


const start = async () => {
  try {
    // await connectDB();
  } catch (err) {
    console.log(err);
  }
};

start();

app.listen(PORT, () => {
  console.log("App start " + PORT);
})


// const socketport = app.listen(PORT, () => {
//   console.log("App start " + PORT);
// });

// const io = new Server(socketport, {
//   cors: {
//     origin: process.env.REACT_PORT,
//     credentials: true,
//     transports: ['websocket', 'polling'],
//      methods: ["GET", "POST"],
//      reconnectionAttempts: 5,
//   reconnectionDelay: 1000
//   },
// });

// let users = {}; // Store users and their socket IDs
// io.on('connection', (socket) => {
//   console.log('A user connected:', socket.id);
//   // Register user
//   socket.on('register', (username, room,user_id,user_id_by_database) => {
//     console.log(`${username} registered with socket ID: ${room}`);
//     users[socket.id] = { username: username, id: room ,user_id:user_id,user_id_by_database:user_id_by_database}
//     // io.emit('roomUser', Object.values(users))
//     console.log(`${username} registered with socket ID: ${socket.id}`);
//     // console.log('Current users:', Object.values(users)); 
//   });
//   // Join room
//   socket.on('joinRoom', (room) => {
//     console.log(room, 'mmm', Object.values(users));

//     io.emit('roomUser2', Object.values(users).filter((item) => item.id == room))

//     // io.to(room).emit('receiveMessage', `${users[socket.id]} has joined the room.`);
//   });

//   //question answer
//   socket.on('sendQuestionAnswer', (room_id, message, create_question_sender_id) => {
//     console.log(`Message to room ${room_id}: ${message} ${create_question_sender_id}`);
//     io.emit('receiveQuestionAnswer', room_id, message, create_question_sender_id);
//   });

//   //next question
//   socket.on('sendNextQuestion', (room_id, question_id) => {
//     io.emit('receiveNextQuestion', room_id, question_id);
//   });

//   //finnish question
//   socket.on('sendFinnishQuestion', (room_id, question_finnish,calculate_data) => {
//     io.emit('receiveFinnishQuestion', room_id, question_finnish,calculate_data);
//   });

//   // Send message to a room
//   socket.on('sendMessageToRoom', (user_id, message,room) => {
//     // console.log(`Message to room ${room}: ${message}`);
//     io.emit('receiveMessage', user_id, message,room);
//   });

//   //Emojy reaction
//   socket.on('sendEmojiToRoom', (room_id,emoji_type,user_id) => {
//     // console.log(`Message to room ${room}: ${message}`);
//     io.emit('receiveEmoji', room_id,emoji_type,user_id);
//   });


//   // Disconnect
//   socket.on('disconnect', () => {
//     console.log(`${users[socket.id]?.username || 'Unknown user'} disconnected`);
//     io.emit('roomUser2', Object.values(users)); // Update room user list
//     delete users[socket.id];
//   });
// });


