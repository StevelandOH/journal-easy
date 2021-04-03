import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEntry } from '../../store/entries';
import gratitude from '../../promptData/gratitude';
import '../Dream/Dream.css';
import './Gratitude.css';

const Gratitude = ({
    toggleDates,
    toggleGraph,
    toggleGratModal,
    toggleNav,
}) => {
    const dispatch = useDispatch();
    const [data, setData] = useState('');

    const prompt = gratitude[Math.floor(Math.random() * 14)];

    const handleEntry = async (e) => {
        e.preventDefault();
        let type = 'gratitude';
        let x = new Date();
        let date = x.toLocaleDateString();
        await dispatch(addEntry({ prompt, data, type, date }));
        toggleGratModal();
        toggleNav();
        toggleGraph();
        toggleDates();
    };

    const updateEntry = (e) => {
        setData(e.target.value);
    };
    return (
        <div className="gratitude-form-container">
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
                onClick={toggleGratModal}
                onMouseUp={toggleNav}
                onClickCapture={toggleDates}
                onMouseUpCapture={toggleGraph}
            >
                ⬅
            </button>
        </div>
    );
};

export default Gratitude;
