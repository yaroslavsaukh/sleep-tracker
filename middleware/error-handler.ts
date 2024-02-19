import { Request, Response, NextFunction } from 'express';
// Обработчик ошибок
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('\x1b[31m%s', String('-').repeat(50));
  console.log(err.status);
  console.log(`Message: ${err.message}`);
  console.log(`Path: ${req.path}`);
  console.log('\x1b[31m%s', String('-').repeat(50));

  res
    .status(err?.status || 500)
    .json({ message: err.message, path: req.path, key: err.code, ...err });
};
