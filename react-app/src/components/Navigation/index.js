import React, { useState } from 'react';
import Modal from 'react-modal';
import Affirmations from '../Affirmations';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/users';

import './Navigation.css';

const NavBar = ({
    toggleEvening,
    toggleMorning,
    toggleLogin,
    nav,
    toggleNav,
    toggleSignup,
}) => {
    const dispatch = useDispatch();
    const [affirmationModal, setAffirmationModal] = useState(false);

    const sessionUser = useSelector((state) => state.users.user);
    const errors = useSelector((state) =>
        sessionUser ? sessionUser.errors : null
    );

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

    if (sessionUser && !errors) {
        return (
            <div className="navbar">
                <div className="menu-bars" onClick={toggleNav}>
                    <i class="fas fa-bars"></i>h
                </div>

                <nav className={nav ? 'nav-menu active' : 'nav-menu'}>
                    <ul onClick={toggleNav} className="nav-menu-items">
                        <li className="nav-text">
                            <NavLink
                                to="/"
                                exact={true}
                                activeClassName="active"
                            >
                                Home
                            </NavLink>
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
                            <a
                                onClick={toggleNav}
                                onClickCapture={toggleAffirmation}
                                activeClassName="active"
                            >
                                Affirmations
                            </a>
                        </li>
                    </ul>
                    <NavLink to="/" onClick={onLogout} activeClassName="active">
                        <button className="logout-b">Logout</button>
                    </NavLink>

                    <Modal
                        appElement={document.getElementById('root')}
                        className="affirmation-modal"
                        style={style}
                        isOpen={affirmationModal}
                    >
                        <div>
                            <Affirmations
                                toggleNav={toggleNav}
                                toggleAffirmation={toggleAffirmation}
                            />
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
