import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signUp } from '../../store/users';
import './Signup.css';

const SignUpForm = ({ slideSignup, toggleSignup, setNav }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const onSignUp = async (e) => {
        e.preventDefault();
        const user = await dispatch(signUp({ name, username, password }));
        if (!user.payload.errors) {
            toggleSignup();
            setNav(true);
            history.push('/');
        } else {
            setErrors(user.payload.errors);
        }
    };

    const updateUsername = (e) => {
        setUsername(e.target.value);
    };

    const updateName = (e) => {
        setName(e.target.value);
    };

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

    return (
        <div
            className={
                slideSignup ? 'signup-container active' : 'signup-container'
            }
        >
            <div className="signup-form-container">
                <form onSubmit={onSignUp}>
                    <div className="name-container">
                        <input
                            className="name"
                            placeholder="Name"
                            type="text"
                            name="name"
                            onChange={updateName}
                            value={name}
                        ></input>
                    </div>
                    <div className="username-container">
                        <input
                            className="username"
                            placeholder="Username"
                            type="text"
                            name="username"
                            onChange={updateUsername}
                            value={username}
                        ></input>
                    </div>
                    <div className="password-container">
                        <input
                            className="password"
                            placeholder="Password"
                            type="password"
                            name="password"
                            onChange={updatePassword}
                            value={password}
                        ></input>
                    </div>

                    <div className="button-container">
                        <button className="login-signup-button" type="submit">
                            Signup
                        </button>
                    </div>
                </form>
                <div>
                    <button className="cancel-button" onClick={toggleSignup}>
                        ⬅
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignUpForm;
