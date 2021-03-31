import React from 'react';
import { useSelector } from 'react-redux';

const Slash = () => {
    const sessionUser = useSelector((state) => state.users.user);
    const errors = useSelector((state) =>
        sessionUser ? sessionUser.errors : null
    );
    if (sessionUser && !errors) {
        return (
            <div>
                <h1 style={{ color: 'white' }}>DASHBOARD</h1>
            </div>
        );
    } else {
        return (
            <div>
                <h1 style={{ color: 'white' }}>LANDINGPAGE</h1>
            </div>
        );
    }
};

export default Slash;
