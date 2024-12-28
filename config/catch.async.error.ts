import { Request, Response, NextFunction } from "express";

const catchAsyncErrors = (
  fun: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fun(req, res, next).catch(next);
  };
};
export default catchAsyncErrors;
