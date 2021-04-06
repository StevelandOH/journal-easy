import React, { useState } from 'react';
import Modal from 'react-modal';
import Affirmations from '../Affirmations';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/users';
import { updateUser } from '../../store/users';

import './Navigation.css';

const NavBar = ({
    toggleEvening,
    toggleMorning,
    toggleLogin,
    nav,
    toggleNav,
    toggleSignup,
    toggleGraph,
    toggleDates,
}) => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [affirmationModal, setAffirmationModal] = useState(false);
    const [settings, setSettings] = useState(false);
    const sessionUser = useSelector((state) => state.users.user);
    const errors = useSelector((state) =>
        sessionUser ? sessionUser.errors : null
    );

    const toggleSettings = () => {
        setSettings(!settings);
        toggleGraph();
        toggleDates();
        toggleNav();
    };
    const toggle = () => {
        toggleGraph();
        toggleDates();
        toggleAffirmation();
        toggleNav();
    };

    const style = {
        overlay: {
            textAlign: 'center',
            backgroundColor: 'rgba(255,255,255, 0.9)',
            zIndex: '1000',
        },
    };

    const toggleAffirmation = () => setAffirmationModal(!affirmationModal);

    const onLogout = async (e) => {
        e.preventDefault();
        await dispatch(logout());
        await window.location.reload(true);
    };

    const updateName = (e) => {
        e.preventDefault();
        dispatch(updateUser(['name', name]));
    };

    const updateUsername = (e) => {
        e.preventDefault();
        dispatch(updateUser(['username', username]));
    };

    if (sessionUser && !errors) {
        return (
            <div className="navbar">
                <div className="menu-bars" onClick={toggleNav}>
                    <i class="fas fa-bars"></i>h
                </div>

                <nav className={nav ? 'nav-menu active' : 'nav-menu'}>
                    <ul onClick={toggleNav} className="nav-menu-items">
                        <li className="nav-text">
                            <a
                                onClick={toggleSettings}
                                activeClassName="active"
                            >
                                Settings
                            </a>
                        </li>
                        <li className="nav-text">
                            <a
                                onClick={toggleNav}
                                onClickCapture={toggleMorning}
                                activeClassName="active"
                            >
                                Morning
                            </a>
                        </li>
                        <li className="nav-text">
                            <a
                                onClick={toggleNav}
                                onClickCapture={toggleEvening}
                                activeClassName="active"
                            >
                                Evening
                            </a>
                        </li>
                        <li className="nav-text">
                            <a onClick={toggle} activeClassName="active">
                                Affirmations
                            </a>
                        </li>
                    </ul>
                    <NavLink to="/" onClick={onLogout} activeClassName="active">
                        <button className="logout-b">Logout</button>
                    </NavLink>
                    <Modal
                        appElement={document.getElementById('root')}
                        className="settings-modal"
                        style={style}
                        isOpen={settings}
                    >
                        <div>
                            <div className="delete-account">
                                <button>delete account</button>
                            </div>
                            <div className="update-name">
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                ></input>
                                <button onClick={updateName}>
                                    update name
                                </button>
                            </div>
                            <div className="update-username">
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                ></input>
                                <button onClick={updateUsername}>
                                    update username
                                </button>
                            </div>

                            <div>
                                <button
                                    className="cancel-button rating"
                                    onClick={toggleSettings}
                                >
                                    ⬅
                                </button>
                            </div>
                        </div>
                    </Modal>
                    <Modal
                        appElement={document.getElementById('root')}
                        className="affirmation-modal"
                        style={style}
                        isOpen={affirmationModal}
                    >
                        <div>
                            <Affirmations toggle={toggle} />
                        </div>
                    </Modal>
                </nav>
            </div>
        );
    } else {
        return (
            <div className="navbar">
                <div className="menu-bars" onClick={toggleNav}>
                    <i class="fas fa-bars"></i>
                </div>

                <nav
                    className={nav ? 'nav-menu active login' : 'nav-menu login'}
                >
                    <ul onClick={toggleNav} className="nav-menu-items">
                        <li className="nav-text">
                            <a onClick={toggleLogin} activeClassName="active">
                                Login
                            </a>
                        </li>
                        <li className="nav-text">
                            <a onClick={toggleSignup} activeClassName="active">
                                Signup
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
};

export default NavBar;
