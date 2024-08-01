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
					<button className='bg-gray-500 text-white rounded-lg shadow-lg p-2 transition duration-500 hover:bg-gray-600'>
						🔒 Login via Github to use this app
					</button>
				</a>
			</center>
		</div>
	);
};

export default Login;
