import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/users';

import './Navigation.css';

const NavBar = ({ authenticated, setAuthenticated }) => {
    const dispatch = useDispatch();
    const [nav, setNav] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);
    const sessionUser = useSelector((state) => state.users.user);
    const errors = useSelector((state) =>
        sessionUser ? sessionUser.errors : null
    );

    const onLogout = async (e) => {
        await dispatch(logout());
        setAuthenticated(false);
    };

    const toggleLogin = () => setLoginOpen(!loginOpen);

    const toggleNav = () => setNav(!nav);

    if (sessionUser && !errors) {
        return (
            <div className="navbar">
                <div className="menu-bars" onClick={toggleNav}>
                    <i class="fas fa-bars"></i>
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
                            <NavLink
                                to="/"
                                onClick={onLogout}
                                activeClassName="active"
                            >
                                Logout
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    } else {
        return (
            <div className="navbar">
                <div className="menu-bars" onClick={toggleNav}>
                    <i class="fas fa-bars"></i>
                </div>

                <nav className={nav ? 'nav-menu active' : 'nav-menu'}>
                    <ul onClick={toggleNav} className="nav-menu-items">
                        <li className="nav-text">
                            <NavLink
                                to="/login"
                                exact={true}
                                activeClassName="active"
                            >
                                Login
                            </NavLink>
                        </li>
                        <li className="nav-text">
                            <NavLink
                                to="/signup"
                                exact={true}
                                activeClassName="active"
                            >
                                Sign Up
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
};

export default NavBar;
