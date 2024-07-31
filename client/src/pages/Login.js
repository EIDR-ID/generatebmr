const Login = (props) => {
	const AUTH_URL = "http://localhost:3001/auth/github";

	return (
		<div className='Login'>
			<h1>GameHub</h1>
			<center>
				<a href={AUTH_URL}>
					<button className='headerBtn'> 🔒 Login via Github </button>
				</a>
			</center>
		</div>
	);
};

export default Login;
