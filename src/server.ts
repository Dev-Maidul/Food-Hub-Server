<<<<<<< HEAD
import { Server } from "http";
import app from "./app";
import { prisma } from "./utils/prisma";

process.on("uncaughtException", (error) => {
  console.log(error);
  process.exit(1);
});

let server: Server;

async function connection() {
  try {
    await prisma.$connect();
    console.log("DB is connected succesfully ....!!");
    server = app.listen(process.env.PORT || 8080, () => {
      console.log(
        `Application is listening on port ${process.env.PORT || 8080}...!`,
      );
    });
  } catch (err) {
    console.log("server connection error", err);
  }
  process.on("unhandledRejection", (error) => {
    if (server) {
      server.close(() => {
        console.log(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}
connection();
=======
import app from './app';
import config from './config';

async function main() {
  try {
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
>>>>>>> 12c406d800755276ebafeafea08eef31879660c5
