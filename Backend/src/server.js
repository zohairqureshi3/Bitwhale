require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require("passport");
const path = require("path");
const routes = require('./routes/index');
const Wallet = require('./controllers/wallet');
const InternalOrderHistory = require('./controllers/internalOrderHistory');
const Cronjob = require('./controllers/cronjob');
const router = express.Router();

// Setting up port
const connUri = process.env.MONGO_LOCAL_CONN_URL;
let PORT = process.env.PORT || 5000;
let URL = process.env.SITE_URL

//=== 1 - CREATE APP
// Creating express app and configuring middleware needed for authentication
const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

///////     Socket.io code started

// const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const socket_port = process.env.SOCKET_PORT || 4000;
// const index = require("./routes/index");

// // const app = express();
// app.use(index);

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: URL
  }
});

// io.on('connection', (socket) => {
//   console.log('a user connected');
//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
// });

let interval;
io.on("connection", (socket) => {
  console.log(">>>>>>> New client connected <<<<<<<");

  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 20000);
  // Disconnect listener
  // socket.on('disconnect', function() {
  //   console.log('Client disconnected.');
  // });
});

const getApiAndEmit = async socket => {
  let response = await Cronjob.getMarketData();
  socket.emit("FromAPI", response);
};

server.listen(socket_port, () => console.log(`Listening on port ${socket_port}`));

///////     Socket.io code ended

var cron = require('node-cron');

// cron.schedule('* * * * 5', () => {
//   Wallet.getWalletTransactions();
// });

// cron.schedule('* * * * 5', () => {
//   InternalOrderHistory.resolveOrders();
// });

// cron.schedule('* * * * *', () => {
//   Cronjob.getMarketData();
// });

app.use('/images', express.static(path.join(__dirname, '../upload')))

app.use('/api', routes);

// Admin Site Build Path
app.use('/admin/', express.static(path.join(__dirname, '../admin/build')))
app.get('/admin/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../admin/build', 'index.html'));
});

// Front Site Build Path
app.use('/', express.static(path.join(__dirname, '../client/build')))
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//=== 2 - SET UP DATABASE
//Configure mongoose's promise to global promise

mongoose.promise = global.Promise;

mongoose.connect(process.env.MONGO_LOCAL_CONN_URL);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use(passport.initialize());
require("./middlewares/jwt")(passport);


//=== 5 - START SERVER
app.listen(PORT, () => console.log('Server running on http://localhost:' + PORT + '/'));
