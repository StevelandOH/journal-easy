import React from 'react';
import { useSelector } from 'react-redux';

const Slash = ({ date }) => {
    const sessionUser = useSelector((state) => state.users.user);
    const errors = useSelector((state) =>
        sessionUser ? sessionUser.errors : null
    );

    // const thirtyDays = () => {
    //     const data = [date];
    //     Array.from() {
    //         const prior = new Date(
    //             new Date().setDate(new Date().getDate() - )
    //         );
    //         data.unshift(prior.toLocaleDateString());
    //     }
    //     return data;
    // };

    if (sessionUser && !errors) {
        return (
            <div>
                <h1 style={{ color: 'white' }}>{}</h1>
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
