const Login = (props) => {
	const API_URL =
		process.env.NODE_ENV === "production"
			? "https://bmrtemplate-production.up.railway.app"
			: "http://localhost:3001";
	const AUTH_URL = `${API_URL}/auth/github`;

	return (
		<div className='Login back'>
			<center>
				<a href={AUTH_URL}>
					<button className='bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white text-lg py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300'>
						{" "}
						🔒 Login via Github to use this app
					</button>
				</a>
			</center>
		</div>
	);
};

export default Login;
