import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/users';

import './Navigation.css';

const NavBar = ({
    toggleLogin,
    nav,
    toggleNav,
    setAuthenticated,
    toggleSignup,
}) => {
    const dispatch = useDispatch();

    const sessionUser = useSelector((state) => state.users.user);
    const errors = useSelector((state) =>
        sessionUser ? sessionUser.errors : null
    );

    const onLogout = async (e) => {
        await dispatch(logout());
        setAuthenticated(false);
    };

    if (sessionUser && !errors) {
        return (
            <div className="navbar">
                <div className="menu-bars" onMouseEnter={toggleNav}>
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
