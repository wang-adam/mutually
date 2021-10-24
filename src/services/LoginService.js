import axios from 'axios';

const LoginService = data => (
	axios.post('/api/login', data)
		.then((res) => {
			localStorage.setItem('access_token', res.data.token);
			localStorage.setItem('username', res.data.username);
			return res.status;
		})
);

export default LoginService;