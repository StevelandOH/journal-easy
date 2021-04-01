import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEntry } from '../../store/entries';
import '../Dream/Dream.css';
import './Gratitude.css';

const Gratitude = ({ gratModal, toggleGratModal, toggleNav }) => {
    const dispatch = useDispatch();
    const [data, setData] = useState('');

    const prompt =
        'Try to remember back to your first job and think about what it was like when you were new there...';

    const handleEntry = async (e) => {
        e.preventDefault();
        let type = 'gratitude';
        let x = new Date();
        let date = x.toLocaleDateString();
        await dispatch(addEntry({ prompt, data, type, date }));
        toggleGratModal();
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
            >
                ⬅
            </button>
        </div>
    );
};

export default Gratitude;
