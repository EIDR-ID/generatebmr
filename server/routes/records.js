import express from "express";
import path from "path";
import RecordsController from "../controllers/records.js";
import { fileURLToPath } from "url";

import eidrDataById from "../data/records.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

//modify below code to take in parameters from the client url
router.post("/resolve/:envId", RecordsController.getRecordsById);
router.post("/modify/:envId", RecordsController.getModificationBase);
// router.post("/register", RecordsController.createEidrRecord);

// router.get('/:giftId', (req, res) => {
//   res.status(200).sendFile(path.resolve(__dirname, '../public/gift.html'))
// })
// router get by url parameter

export default router;
