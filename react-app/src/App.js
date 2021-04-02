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
    const [date, setDate] = useState(new Date());
    const [rateGraph, setRateGraph] = useState(true);
    const [one, setOne] = useState(true);
    const [two, setTwo] = useState(true);
    const [three, setThree] = useState(true);
    const [four, setFour] = useState(true);
    const [five, setFive] = useState(true);
    const [six, setSix] = useState(true);
    const [seven, setSeven] = useState(true);
    const [eight, setEight] = useState(true);

    const toggleNav = () => setNav(!nav);
    const toggleLogin = () => setSlideLogin(!slideLogin);
    const toggleSignup = () => setSlideSignup(!slideSignup);
    const toggleMorning = () => setSlideMorning(!slideMorning);
    const toggleEvening = () => setSlideEvening(!slideEvening);
    const toggleGraph = () => setRateGraph(!rateGraph);
    const toggleDates = () => {
        setOne(!one);
        setTwo(!two);
        setThree(!three);
        setFour(!four);
        setFive(!five);
        setSix(!six);
        setSeven(!seven);
        setEight(!eight);
    };

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

    useEffect(() => {
        setNav(true);
    }, []);

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
                toggleNav={toggleNav}
                setNav={setNav}
                toggleLogin={toggleLogin}
                slideLogin={slideLogin}
                setSlideLogin={setSlideLogin}
            />
            <SignUpForm
                toggleNav={toggleNav}
                setNav={setNav}
                slideSignup={slideSignup}
                toggleSignup={toggleSignup}
            />
            <Morning
                // setEntryDate={setEntryDate}
                toggleDates={toggleDates}
                setRateGraph={setRateGraph}
                toggleGraph={toggleGraph}
                toggleMorning={toggleMorning}
                slideMorning={slideMorning}
                toggleNav={toggleNav}
            />
            <Evening
                // setEntryDate={setEntryDate}
                toggleDates={toggleDates}
                setRateGraph={setRateGraph}
                toggleGraph={toggleGraph}
                toggleEvening={toggleEvening}
                slideEvening={slideEvening}
                toggleNav={toggleNav}
            />
            <Switch>
                <Route path="/" exact={true}>
                    <Slash
                        one={one}
                        two={two}
                        three={three}
                        four={four}
                        five={five}
                        six={six}
                        seven={seven}
                        eight={eight}
                        // entryDate={entryDate}
                        // setEntryDate={setEntryDate}
                        toggleDates={toggleDates}
                        rateGraph={rateGraph}
                        setRateGraph={setRateGraph}
                        toggleGraph={toggleGraph}
                        date={date}
                    />
                </Route>
            </Switch>
        </>
    );
}

export default App;
