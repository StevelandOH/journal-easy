import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './Morning.css';

const Morning = ({
    dream,
    setDream,
    toggleDream,
    toggleMorning,
    slideMorning,
    toggleNav,
}) => {
    return (
        <div
            className={
                slideMorning ? 'morning-container active' : 'morning-container'
            }
        >
            <ul onClick={toggleMorning} className="morning-menu-items">
                <li className="morning-text">
                    <a onClick={toggleDream}>Dream Journal</a>
                </li>
                <li className="morning-text">
                    <a activeClassName="active">Brain Boosters</a>
                </li>
                <li className="morning-text">
                    <a activeClassName="active">Gratitude</a>
                </li>
                <li className="morning-text">
                    <a activeClassName="active">Daily Health Tips</a>
                </li>
                <div onClick={toggleNav}>
                    <button className="cancel-button" onClick={toggleMorning}>
                        ⬅
                    </button>
                </div>
            </ul>
        </div>
    );
};

export default Morning;
