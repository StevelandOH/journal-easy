import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import LoginForm from './components/Login';
import SignUpForm from './components/SignUp';
import NavBar from './components/Navigation';
import SlashRoute from './components/SlashRoute';
import { restoreUser, authenticate } from './store/users';

function App() {
    const dispatch = useDispatch();
    const [authenticated, setAuthenticated] = useState(false);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const user = authenticate();
        if (!user.errors) {
            dispatch(restoreUser());
            setAuthenticated(true);
        }
        setLoaded(true);
    });
    console.log(authenticated);
    if (!loaded) return null;

    return (
        <>
            <NavBar
                setAuthenticated={setAuthenticated}
                authenticated={authenticated}
            />
            <Switch>
                <Route path="/login" exact={true}>
                    <LoginForm />
                </Route>
                <Route path="/sign-up" exact={true}>
                    <SignUpForm />
                </Route>
                <Route path="/" exact={true}>
                    <SlashRoute />
                </Route>
            </Switch>
        </>
    );
}

export default App;
