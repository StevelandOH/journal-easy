import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import LoginForm from './components/Login';
import SignUpForm from './components/SignUp';
import NavBar from './components/Navigation';
import Slash from './components/Slash';
import Morning from './components/Morning';
import Evening from './components/Evening';
import { restoreUser, authenticate } from './store/users';
import { getAffirmations } from './store/affirmations';
import { getEntries } from './store/entries';
import { getRatings } from './store/ratings';

function App() {
    const dispatch = useDispatch();
    const [authenticated, setAuthenticated] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [nav, setNav] = useState(false);
    const [slideLogin, setSlideLogin] = useState(false);
    const [slideSignup, setSlideSignup] = useState(false);
    const [slideMorning, setSlideMorning] = useState(false);
    const [slideEvening, setSlideEvening] = useState(false);

    const toggleNav = () => setNav(!nav);
    const toggleLogin = () => setSlideLogin(!slideLogin);
    const toggleSignup = () => setSlideSignup(!slideSignup);
    const toggleMorning = () => setSlideMorning(!slideMorning);
    const toggleEvening = () => setSlideEvening(!slideEvening);

    useEffect(() => {
        const user = authenticate();
        if (!user.errors) {
            dispatch(restoreUser());
            setAuthenticated(true);
            dispatch(getAffirmations());
            dispatch(getEntries());
            dispatch(getRatings());
        }
        setLoaded(true);
    });

    if (!loaded) return null;

    return (
        <>
            <NavBar
                toggleMorning={toggleMorning}
                toggleEvening={toggleEvening}
                toggleLogin={toggleLogin}
                nav={nav}
                setNav={setNav}
                toggleNav={toggleNav}
                setAuthenticated={setAuthenticated}
                authenticated={authenticated}
                toggleSignup={toggleSignup}
            />
            <LoginForm
                setNav={setNav}
                toggleLogin={toggleLogin}
                slideLogin={slideLogin}
                setSlideLogin={setSlideLogin}
            />
            <SignUpForm
                setNav={setNav}
                slideSignup={slideSignup}
                toggleSignup={toggleSignup}
            />
            <Morning
                toggleMorning={toggleMorning}
                slideMorning={slideMorning}
                toggleNav={toggleNav}
            />
            <Evening
                toggleEvening={toggleEvening}
                slideEvening={slideEvening}
                toggleNav={toggleNav}
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
