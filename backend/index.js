import express from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import studentRoutes from "./routes/student.js";
import ROUTE_CONSTS from "./constants.js";
import config from "./config.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
// app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extend: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use(ROUTE_CONSTS.ROUTES.STUDENT.BASE_PATH, studentRoutes);

app.listen(config.port, () => {
  console.log(`Server started on port ${config.port}`);
});
