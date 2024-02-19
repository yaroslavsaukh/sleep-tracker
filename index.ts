import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connect-db';
import { apiRouter } from './routes';
import cors from 'cors';
import { errorHandler } from './middleware/error-handler';
import swaggerAutogen from 'swagger-autogen';
import swaggerUi from 'swagger-ui-express';
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

try {
  connectDB();
  app.use(cors());
  app.use(express.json());
  app.use('/api', apiRouter);

  if(process.env.NODE_ENV !=='production'){
    const swaggerDocument = require('./swagger/swagger-output.json');
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }
  app.use(errorHandler);
} catch (e) {
  console.log(e);
}

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
