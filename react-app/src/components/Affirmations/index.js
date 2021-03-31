import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAffirmation } from '../../store/affirmations';

const Affirmations = ({ toggleAffirmation }) => {
    const dispatch = useDispatch();
    const [affirmation, setAffirmation] = useState('');
    const user = useSelector((state) => state.users.user);
    let userId;
    if (user) {
        userId = user.id;
    }
    const updateAffirmation = (e) => setAffirmation(e.target.value);

    const handleAffirmation = async (e) => {
        e.preventDefault();
        console.log(userId, affirmation);
        await dispatch(addAffirmation({ userId, affirmation }));
    };

    return (
        <div className="affirmation-container">
            <div className="aff-header">
                <h1>Affirmations</h1>
                <p>are positive in nature</p>
                <p>and help you overcome</p>
                <p>negativity. Think of </p>
                <p>something you'd like to</p>
                <p>change in your life or</p>
                <p>your career...</p>
            </div>
            <div>
                <form onSubmit={handleAffirmation}>
                    <div>
                        <input type="text" onChange={updateAffirmation}></input>
                    </div>
                    <div className="dream-button-container">
                        <button type="submit" className="dream-button">
                            <i class="fas fa-check-circle"></i>
                        </button>
                    </div>
                </form>
            </div>
            <div className="cancel-div">
                <i onClick={toggleAffirmation} class="far fa-times-circle"></i>
            </div>
        </div>
    );
};

export default Affirmations;
