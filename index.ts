import app from "./app";
const port: number = parseInt(process.env.PORT) || 8000;
const server = app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});

server.on("error", (err: Error) => {
  console.error("Server error:", err.message);
});

server.on("clientError", (err: Error) => {
  console.error("Client error:", err.message);
});

process.on("uncaughtException", (err: Error) => {
  console.error("Uncaught exception:", err.message);
  console.log("Gracefully shutting down server...");
  server.close(() => {
    console.log("Server closed");
    process.exit(1);
  });
});

process.on("unhandledRejection", (reason: any, promise: Promise<any>) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  console.log("Gracefully shutting down server...");
  server.close(() => {
    console.log("Server closed");
    process.exit(1);
  });
});
