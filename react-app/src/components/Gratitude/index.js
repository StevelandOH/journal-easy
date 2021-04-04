import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEntry } from '../../store/entries';
import gratitude from '../../promptData/gratitude';
import '../Dream/Dream.css';
import './Gratitude.css';

const Gratitude = ({
    prompt,
    toggleDates,
    toggleGraph,
    toggleGratModal,
    toggleNav,
}) => {
    const dispatch = useDispatch();
    const [data, setData] = useState('');

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
        <div className="grat-form-container">
            <div className="grat-top">
                <div>
                    <button
                        className="grat-cancel-b"
                        onClick={toggleGratModal}
                        onMouseUp={toggleNav}
                        onClickCapture={toggleDates}
                        onMouseUpCapture={toggleGraph}
                    >
                        <i class="fas fa-arrow-left "></i>
                    </button>
                </div>
                <form className="grat-form" onSubmit={handleEntry}>
                    <div className="grat-input-container">
                        <textarea
                            className="grat grat-input"
                            name="entry"
                            value={data}
                            onChange={updateEntry}
                            placeholder="...gratitude"
                        />
                    </div>

                    <div className="grat-b-container">
                        <button type="submit" className="grat-b">
                            <i class="fas fa-arrow-right"></i>
                        </button>
                    </div>
                </form>
            </div>
            <div className="grat-prompt-container">
                <label className="grat-prompt">{prompt}</label>
            </div>
        </div>
    );
};

export default Gratitude;
