import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../store/users';
import './Login.css';

const LoginForm = ({ toggleLogin, slideLogin }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [errors, setErrors] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = async (e) => {
        e.preventDefault();
        const user = await dispatch(login({ username, password }));
        if (!user.payload.errors) {
            history.push('/');
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
        <div
            className={
                slideLogin ? 'login-container active' : 'login-container'
            }
        >
            <div>
                <form onSubmit={onLogin}>
                    <div className="errors-container">
                        {errors &&
                            errors.map((error, idx) => (
                                <div className="error" key={idx} value={error}>
                                    {error}
                                </div>
                            ))}
                    </div>
                    <div className="username-container">
                        <input
                            className="username"
                            name="username"
                            type="text"
                            placeholder="username"
                            value={username}
                            onChange={updateUsername}
                        />
                    </div>
                    <div className="password-container">
                        <input
                            className="password"
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={updatePassword}
                        />
                        <div className="button-container">
                            <button type="submit">Login</button>
                        </div>
                    </div>
                </form>
            </div>
            <div>
                <button onClick={toggleLogin}>cancel</button>
            </div>
        </div>
    );
};

export default LoginForm;
