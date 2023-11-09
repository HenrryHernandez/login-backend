const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { AuthRoute, TestRoute } = require("./routes");

class Server {
  app;
  port;

  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(
      cors({
        origin: (origin = "", cb) => {
          const allowedOrigins = [
            "http://localhost:3000",
            "http://localhost:3001",
            "http://localhost:3002",
          ];
          if (allowedOrigins.includes(origin) || !origin) {
            cb(null, true);
          } else {
            cb(new Error("Not allowed by CORS"));
          }
        },
        credentials: true,
        // origin: "http://localhost:3000", // Allow requests from any origin
        // credentials: true, // Allow credentials (cookies, authorization headers)
      })
    );
    this.app.use(express.json());
    this.app.use(cookieParser());
  }

  routes() {
    this.app.use("/api/auth", AuthRoute);
    this.app.use("/api/test", TestRoute);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("listening on port:", this.port);
    });
  }
}

module.exports = {
  Server,
};
