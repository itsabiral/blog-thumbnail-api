import { Router } from "express";
import express from "express";
import { setupThumbnailRoute } from "./api.js";

const router = Router();
const app = express();

app.use(express.json());
app.use(router);

setupThumbnailRoute(router);

app.listen(80, () => {
    console.log("Server is running on port 80");
});

