import axios from 'axios';
import bcrypt from 'bcryptjs';

export const UserRegistration = data => {
    const password = data.password;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    data["password"] = hash;

    return axios.post('/api/register', data)
        .then((res) => {
            localStorage.setItem('access_token', res.token)
            localStorage.setItem('username', res.username)
            return res.status;
        })
};

export const UsernameValidation = data => (
    axios.post('/api/validateUsername', data)
    .then(exist => exist.status)
)