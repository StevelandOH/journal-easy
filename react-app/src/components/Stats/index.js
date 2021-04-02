import React from 'react';
import './Stats.css';

const Stats = ({
    entries,
    setOne,
    setTwo,
    setThree,
    setFour,
    setFive,
    setSix,
    setSeven,
    setEight,
    toggleGraph,
    toggleModal,
    toggleNav,
}) => {
    const cancel = () => {
        toggleModal();
        toggleGraph();
        toggleNav();
        setOne(true);
        setTwo(true);
        setThree(true);
        setFour(true);
        setFive(true);
        setSix(true);
        setSeven(true);
        setEight(true);
    };

    return (
        <div className="stat-container">
            <ul>
                {Object.entries(entries).map(([k, v]) => {
                    return (
                        <div key={k}>
                            <li key={`${k}a`} className="stat-list-item">
                                {v.prompt}
                            </li>
                            <li key={`${k}b`} className="stat-list-item">
                                {v.res}
                            </li>
                            <li key={`${k}c`} className="stat-list-item">
                                {v.type}
                            </li>
                        </div>
                    );
                })}
            </ul>
            <div>
                <button onClick={cancel}>back</button>
            </div>
        </div>
    );
};

export default Stats;
