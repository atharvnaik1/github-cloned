import express from 'express'
import dotenv from "dotenv";
import cors from "cors";
import passport from 'passport';
import session from 'express-session';
import path from "path";
import "./passport/github.auth.js"

import userRoutes from "./routes/user.route.js";
import exploreRoutes from "./routes/explore.route.js";
import authRoutes from "./routes/auth.route.js";

import connectMongoDB from './db/connectMongoDB.js';
import http from 'http';
import job from "./cron.js";

// import { Server } from 'socket.io';
// import { addComment,getComments } from './controllers/comment.controller.js';
// import commentRoutes from './routes/comment.routes.js';


dotenv.config();
const app =express();

const PORT =process.env.PORT || 5000;
const __dirname =path.resolve();

const server = http.createServer(app);
// const io = new Server(server);

// console.log("dirname",__dirname);

// io.on('connection', (socket) => {
//     console.log('A user connected:', socket.id);
//     socket.on('addComment', (data) => {
//         // Attach the data to the socket object
//         socket.data = data;
//         // Call the addComment controller function
//         addComment(io, socket);
//       });
//     });
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());



app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)
app.use("/api/explore",exploreRoutes)
// app.use('/api/comment', commentRoutes);



app.use(express.static(path.join(__dirname,"/frontend/dist")));
app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","dist","index.html"));
})
server.listen(PORT,()=>{
    console.log(`Server started on http://localhost:${PORT}`);
    connectMongoDB();
});