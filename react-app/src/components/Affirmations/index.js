import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAffirmation, deleteAffirmation } from '../../store/affirmations';

import './Affirmations.css';

const Affirmations = ({ toggle }) => {
    const dispatch = useDispatch();
    const [affirmation, setAffirmation] = useState('');

    const updateAffirmation = (e) => setAffirmation(e.target.value);

    const handleAffirmation = async (e) => {
        e.preventDefault();
        e.target.reset();
        await dispatch(addAffirmation(affirmation));
    };

    const deleteAff = async (e, v) => {
        e.preventDefault();
        await dispatch(deleteAffirmation(v));
        await window.location.reload(true);
    };

    return (
        <div className="affirmation-container">
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
            <div className="aff-cont">
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
            </div>
            <button className="cancel-button aff" onClick={toggle}>
                ⬅
            </button>
        </div>
        // </div>
    );
};

export default Affirmations;
