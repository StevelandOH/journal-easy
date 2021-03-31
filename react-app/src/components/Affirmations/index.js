import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    addAffirmation,
    deleteAffirmation,
    getAffirmations,
} from '../../store/affirmations';

import './Affirmations.css';

const Affirmations = ({ setAffirmationModal, toggleAffirmation }) => {
    const dispatch = useDispatch();
    const [affirmation, setAffirmation] = useState('');

    const affirmations = useSelector((state) => state.affirmations);

    const updateAffirmation = (e) => setAffirmation(e.target.value);

    const handleAffirmation = async (e) => {
        e.preventDefault();
        await dispatch(addAffirmation(affirmation));
    };

    const deleteAff = async (e, v) => {
        e.preventDefault();
        await dispatch(deleteAffirmation(v));
        await window.location.reload(true);
    };

    return (
        <div className="affirmation-container">
            <div className="aff-left">
                <div className="cancel-div aff">
                    <i
                        onClick={toggleAffirmation}
                        class="far fa-times-circle aff"
                    ></i>
                </div>
                <div className="aff-header">Affirmations</div>
                <p>are positive in nature</p>
                <p>and help you overcome</p>
                <p>negativity. Think of </p>
                <p>something you'd like to</p>
                <p>change in your life or</p>
                <p>your career...</p>
            </div>
            <div className="aff-right">
                <div>
                    <div className="aff-list">
                        {Object.entries(
                            useSelector((state) => state.affirmations)
                        ).map(([k, v]) => {
                            return (
                                <div>
                                    <div
                                        className="aff-list-item"
                                        key={k}
                                        value={v}
                                    >
                                        {v.affirmations}{' '}
                                        <i
                                            onClick={(e) => deleteAff(e, v)}
                                            class="fas fa-minus-circle"
                                        ></i>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <form onSubmit={handleAffirmation}>
                    <div className="aff-form-submit">
                        <input
                            className="aff-input"
                            type="text"
                            onChange={updateAffirmation}
                        ></input>
                        <div>
                            <button type="submit" className="dream-button aff">
                                <i class="fas fa-check-circle"></i>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Affirmations;
