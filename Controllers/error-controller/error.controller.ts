import { NextFunction, Request, Response } from "express";

const sendError = (err: any, res: Response): Response => {
  if (res.headersSent) {
    return res.end();
  }
  return res.status(err.statusCode || 500).json({
    status: err.status || "error",
    message: err.message || "Internal Server Error",
  });
};

export default (err: any, req: Request, res: Response, next: NextFunction) => {
  sendError(err, res);
};
