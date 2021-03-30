import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authenticate, logout } from '../../store/users';

import './Navigation.css';

const NavBar = ({ setAuthenticated }) => {
    const dispatch = useDispatch();
    const [nav, setNav] = useState(false);

    const onLogout = async (e) => {
        await dispatch(logout());
        setAuthenticated(false);
    };

    const toggleNav = () => setNav(!nav);

    return (
        <>
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
                                to="/login"
                                exact={true}
                                activeClassName="active"
                            >
                                Login
                            </NavLink>
                        </li>
                        <li className="nav-text">
                            <NavLink
                                to="/sign-up"
                                exact={true}
                                activeClassName="active"
                            >
                                Sign Up
                            </NavLink>
                        </li>
                        <li className="nav-text">
                            <NavLink
                                to="/users"
                                exact={true}
                                activeClassName="active"
                            >
                                Users
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
        </>
    );
};

export default NavBar;
