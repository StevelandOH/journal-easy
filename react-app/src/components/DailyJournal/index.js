import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEntry } from '../../store/entries';
import '../Dream/Dream.css';
import './Journal.css';

const Gratitude = ({ journalModal, toggleJournal, toggleNav }) => {
    const dispatch = useDispatch();
    const [data, setData] = useState('');

    const prompt = 'Talk about one thing that made you happy today';

    const handleEntry = async (e) => {
        e.preventDefault();
        let type = 'journal';
        let x = new Date();
        let date = x.toLocaleDateString();
        await dispatch(addEntry({ prompt, data, type, date }));
        toggleJournal();
    };

    const updateEntry = (e) => {
        setData(e.target.value);
    };
    return (
        <div className="journal-form-container">
            <form className="dream-form" onSubmit={handleEntry}>
                <div className="dream-prompt-container">
                    <label className="dream-prompt">{prompt}</label>
                </div>

                <div className="dream-input-container">
                    <textarea
                        className="dream dream-input"
                        name="entry"
                        value={data}
                        onChange={updateEntry}
                        placeholder="... |"
                    />
                </div>

                <div className="dream-button-container">
                    <button type="submit" className="dream-button">
                        <i class="fas fa-check-circle"></i>
                    </button>
                </div>
            </form>
            <button
                className="cancel-button"
                onClick={toggleJournal}
                onMouseUp={toggleNav}
            >
                ⬅
            </button>
        </div>
    );
};

export default Gratitude;
