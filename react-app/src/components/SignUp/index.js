import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signUp } from '../../store/users';

const SignUpForm = () => {
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
        <form onSubmit={onSignUp}>
            <div>
                <label>Name</label>
                <input
                    type="text"
                    name="name"
                    onChange={updateName}
                    value={name}
                ></input>
            </div>
            <div>
                <label>Username</label>
                <input
                    type="text"
                    name="username"
                    onChange={updateUsername}
                    value={username}
                ></input>
            </div>
            <div>
                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    onChange={updatePassword}
                    value={password}
                ></input>
            </div>

            <button type="submit">Sign Up</button>
        </form>
    );
};

export default SignUpForm;
