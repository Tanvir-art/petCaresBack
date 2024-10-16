// import cookieParser from 'cookie-parser';
// import cors from 'cors';
import express, { Application } from "express";
import router from "./app/routes";

import cors from "cors";
import notFound from "./app/middleware/notFound";
import globalErrorHandler from "./app/middleware/globalErrorhandler";
const app: Application = express();

//parsers
app.use(express.json());

app.use(cors());

// application routes
app.use("/api", router);
app.use(globalErrorHandler);
app.use(notFound);

export default app;
