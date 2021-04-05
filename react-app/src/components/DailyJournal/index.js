import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEntry } from '../../store/entries';
import './Journal.css';

const Gratitude = ({
    prompt,
    toggleGraph,
    toggleDates,
    toggleJournal,
    toggleNav,
}) => {
    const dispatch = useDispatch();
    const [data, setData] = useState('');

    const handleEntry = async (e) => {
        e.preventDefault();
        let type = 'journal';
        let x = new Date();
        let date = x.toLocaleDateString();
        await dispatch(addEntry({ prompt, data, type, date }));
        toggleJournal();
        toggleNav();
        toggleGraph();
        toggleDates();
    };

    const toggle = () => {
        toggleJournal();
        toggleNav();
        toggleDates();
        toggleGraph();
    };

    const updateEntry = (e) => {
        setData(e.target.value);
    };
    return (
        <div className="journal-form-container">
            <div className="journal-top">
                <div>
                    <button className="jour-cancel-b" onClick={toggle}>
                        <i class="fas fa-arrow-left "></i>
                    </button>
                </div>
                <form className="jour-form" onSubmit={handleEntry}>
                    <div className="jour-input-container">
                        <textarea
                            className="jour jour-input"
                            name="entry"
                            value={data}
                            onChange={updateEntry}
                        />
                    </div>
                    <div className="jour-b-container">
                        <button type="submit" className="jour-b">
                            <i class="fas fa-arrow-right"></i>
                        </button>
                    </div>
                </form>
            </div>
            <div className="jour-prompt-container">
                <label className="jour-prompt">{prompt}</label>
            </div>
        </div>
    );
};

export default Gratitude;
