import React from 'react';
import { useSelector } from 'react-redux';

const Slash = () => {
    const sessionUser = useSelector((state) => state.users.user);
    const errors = useSelector((state) =>
        sessionUser ? sessionUser.errors : null
    );
    if (sessionUser && !errors) {
        return <h1 style={{ color: 'white' }}>DASHBOARD</h1>;
    } else {
        return <h1 style={{ color: 'white' }}>LANDING PAGE</h1>;
    }
};

export default Slash;
