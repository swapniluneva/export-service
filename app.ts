import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import routes from "./routes/index";
class App {
  public app = express();
  public routeStart = "/api";
  constructor() {
    this.config();
  }

  public async config() {
    await require("./helpers/loader").default({ expressApp: this.app });
    this.app.use(cors());
    this.app.use(bodyParser.json({ limit: "50mb" }));
    this.app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
    this.app.use("/api", routes);
    //Error Handler
    this.app.use(
      (
        err: any,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        //Logging an error
        let statusCode= err.status || 500;
        switch(err.name){
          case 'accessDenied':
            statusCode= 401;
            break;
        }
        //Send the response to client.
        res.status(statusCode).send({
          success: false,
          error: {
            message: err.message
          }
        });
      }
    );
  }
}

export = new App().app;
