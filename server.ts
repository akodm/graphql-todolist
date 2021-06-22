import dotenv from 'dotenv';
dotenv.config();
import { createServer } from 'http';
import next from 'next';
import sequelize from "./src/sequelize";
import "./pages/api/graphql";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const { pm_id, DB_FORCE = "false", NODE_ENV = "development" } = process.env;

app.prepare().then(() => {
  createServer((req, res) => {
    handle(req, res);
  }).listen(process.env.PORT, () => {
    console.log(`Ready On Next Server. ${process.env.PORT}`);

    // DB Force Init.
    let pmInit = false;
    if(NODE_ENV === "production") {
      if(pm_id === "0") {
        pmInit = true;
      } else {
        pmInit = false;
      }
    } else {
      pmInit = true;
    }

    const force = DB_FORCE === "true" ? true : false;
    
    // DB Sync.
    if(force && pmInit) {
      sequelize.sync({ force });
    } else {
      sequelize.sync();
    }

    console.log("mysql database sync.");
  });
});