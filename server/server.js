import express from "express";
import "./config/dotenv.js";
import passport from "passport";
import session from "express-session";
import { GitHub } from "./config/auth.js";
import recordRouter from "./routes/records.js";
import authRoutes from "./routes/auth.js";
import cors from "cors";
import xmlparser from "express-xml-bodyparser";

const app = express();
app.use(xmlparser());
app.use(
	session({
		secret: "eidr",
		resave: false,
		saveUninitialized: true,
	})
);
app.use(
	cors({
		origin: [
			"https://client-production-863e.up.railway.app",
			"http://localhost:3000",
		],
		methods: "GET,POST,PUT,DELETE,PATCH",
		credentials: true,
	})
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(GitHub);
passport.serializeUser((user, done) => {
	done(null, user);
});
passport.deserializeUser((user, done) => {
	done(null, user);
});
app.use(express.json());
app.use("/api", recordRouter);
app.use("/auth", authRoutes);
app.get("/", (req, res) => {
	res.redirect(process.env.REDIRECT_URI);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
	console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
