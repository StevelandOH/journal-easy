import React from 'react';
import './Evening.css';

const Evening = ({ toggleEvening, slideEvening }) => {
    return (
        <div
            className={
                slideEvening ? 'evening-container active' : 'evening-container'
            }
        >
            <ul onClick={toggleEvening} className="evening-menu-items">
                <li className="evening-text">
                    <a activeClassName="active">Daily Journal</a>
                </li>
                <li className="evening-text">
                    <a activeClassName="active">Rate Today </a>
                </li>
                <li className="evening-text">
                    <a activeClassName="active">Sleep Tips</a>
                </li>
                <div>
                    <button className="cancel-button" onClick={toggleEvening}>
                        ⬅
                    </button>
                </div>
            </ul>
        </div>
    );
};

export default Evening;
