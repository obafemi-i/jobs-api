require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

//security
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');


app.set('trust proxy', 1);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
)
app.use(helmet())
app.use(cors())
app.use(xss())

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
