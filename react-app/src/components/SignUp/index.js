import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signUp } from '../../store/users';
import './Signup.css';

const SignUpForm = ({ slideSignup, toggleSignup, setNav, toggleNav }) => {
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

    const createDemo = async (e) => {
        e.preventDefault();
        const num = Math.floor(Math.random() * 1000000);
        const num2 = Math.floor(Math.random() * 1000000);
        setName('demo');
        setUsername(`demo${num}`);
        setPassword(`${num}${num2}`);
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
                <div className="cancel-button-container">
                    <button
                        className="cancel-button"
                        onClickCapture={toggleNav}
                        onClick={toggleSignup}
                    >
                        ⬅
                    </button>
                </div>
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

                    <div className="signup-b-container">
                        <button className="signup-b" type="submit">
                            Signup
                        </button>
                    </div>
                    <div className="signup-b-container demo">
                        <button className="signup-b demo" onClick={createDemo}>
                            Create Demo User
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUpForm;
