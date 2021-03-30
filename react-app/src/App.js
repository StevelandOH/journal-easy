import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import LoginForm from './components/Login';
import SignUpForm from './components/SignUp';
import NavBar from './components/Navigation';
import Slash from './components/Slash';
import { restoreUser, authenticate } from './store/users';

function App() {
    const dispatch = useDispatch();
    const [authenticated, setAuthenticated] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [nav, setNav] = useState(false);
    const [slideLogin, setSlideLogin] = useState(false);
    const [slideSignup, setSlideSignup] = useState(false);
    const toggleNav = () => {
        if (!nav && !slideLogin && !nav && !slideSignup) {
            setNav(true);
        } else {
            setNav(false);
        }
    };
    const toggleLogin = () => setSlideLogin(!slideLogin);
    const toggleSignup = () => setSlideSignup(!slideSignup);

    useEffect(() => {
        const user = authenticate();
        if (!user.errors) {
            dispatch(restoreUser());
            setAuthenticated(true);
        }
        setLoaded(true);
    });

    if (!loaded) return null;

    return (
        <>
            <NavBar
                toggleLogin={toggleLogin}
                slideLogin={slideLogin}
                setSlideLogin={setSlideLogin}
                nav={nav}
                setNav={setNav}
                toggleNav={toggleNav}
                setAuthenticated={setAuthenticated}
                authenticated={authenticated}
                toggleSignup={toggleSignup}
                slideSignup={slideSignup}
                setSlideSignup={setSlideSignup}
            />

            <LoginForm
                nav={nav}
                setNav={setNav}
                toggleNav={toggleNav}
                toggleLogin={toggleLogin}
                slideLogin={slideLogin}
                setSlideLogin={setSlideLogin}
            />
            <SignUpForm
                nav={nav}
                setNav={setNav}
                toggleNav={toggleNav}
                slideSignup={slideSignup}
                setSlideSignup={setSlideSignup}
                toggleSignup={toggleSignup}
            />
            <Switch>
                <Route path="/" exact={true}>
                    <Slash />
                </Route>
            </Switch>
        </>
    );
}

export default App;
