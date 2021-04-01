import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    addAffirmation,
    deleteAffirmation,
    getAffirmations,
} from '../../store/affirmations';

import './Affirmations.css';

const Affirmations = ({ toggleAffirmation, toggleNav }) => {
    const dispatch = useDispatch();
    const [affirmation, setAffirmation] = useState('');

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
            <div className="aff-header">affirmations</div>

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
                            <i class="fas fa-check-circle aff"></i>
                        </button>
                    </div>
                </div>
            </form>
            <button
                className="cancel-button aff"
                onClick={toggleAffirmation}
                onMouseUp={toggleNav}
            >
                ⬅
            </button>
        </div>
        // </div>
    );
};

export default Affirmations;
