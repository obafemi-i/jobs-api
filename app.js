require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// routes import
const authroute = require('./routes/auth');
const jobroute = require('./routes/jobs');

//database
const connectDB = require('./db/connect');
const authorization = require('./middleware/authentication')

// extra packages
app.use(express.json());

// routes
app.use('/api/v1/auth', authroute)
app.use('/api/v1/jobs', authorization, jobroute)


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 4500;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
