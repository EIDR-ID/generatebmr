import GitHubStrategy from "passport-github2";

const options = {
	clientID: "Ov23liBJ8My2glYmMAKI",
	clientSecret: "286d0c82a8161cb230083db5925d2c7023ef0537",
	callbackURL: "http://localhost:3001/auth/github/callback",
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
