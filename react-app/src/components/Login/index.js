import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../store/users';

const LoginForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [errors, setErrors] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = async (e) => {
        e.preventDefault();
        const user = await dispatch(login({ username, password }));
        if (!user.payload.errors) {
            history.push('/dashboard');
        } else {
            setErrors(user.payload.errors);
        }
    };

    const updateUsername = (e) => {
        e.preventDefault();
        setUsername(e.target.value);
    };

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

    return (
        <form onSubmit={onLogin}>
            <div>
                {errors &&
                    errors.map((error, idx) => (
                        <div key={idx} value={error}>
                            {error}
                        </div>
                    ))}
            </div>
            <div>
                <label htmlFor="username">Username</label>
                <input
                    name="username"
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={updateUsername}
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={updatePassword}
                />
                <button type="submit">Login</button>
            </div>
        </form>
    );
};

export default LoginForm;
