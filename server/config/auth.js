import GitHubStrategy from "passport-github2";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
console.log("This is ", process.env);
const CALLBACK_URL =
	process.env.ENV === "local"
		? "http://localhost:3001/auth/github/callback"
		: "/auth/github/callback";
const options = {
	clientID: process.env.GITHUB_CLIENT_ID,
	clientSecret: process.env.GITHUB_CLIENT_SECRET,
	callbackURL: CALLBACK_URL,
};

const verify = async (accessToken, refreshToken, profile, callback) => {
	const {
		_json: { id, name, login, avatar_url },
	} = profile;

	const userData = {
		githubId: id,
		username: login,
		avatarUrl: avatar_url,
		accessToken,
	};

	// try {
	// 	const results = await pool.query(
	// 		"SELECT * FROM users WHERE username = $1",
	// 		[userData.username]
	// 	);
	// 	const user = results.rows[0];

	// 	if (!user) {
	// 		const results = await pool.query(
	// 			`INSERT INTO users (githubid, username, avatarurl, accesstoken)
	//       VALUES($1, $2, $3, $4)
	//       RETURNING *`,
	// 			[userData.githubId, userData.username, userData.avatarUrl, accessToken]
	// 		);

	// 		const newUser = results.rows[0];
	// 		return callback(null, newUser);
	// 	}

	// 	return callback(null, user);
	// } catch (error) {
	// 	return callback(error);
	// }
	return callback(null, userData);
};

export const GitHub = new GitHubStrategy(options, verify);
