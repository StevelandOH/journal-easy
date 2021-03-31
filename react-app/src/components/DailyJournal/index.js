import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEntry } from '../../store/entries';
import '../Dream/Dream.css';

const Gratitude = ({ journalModal, toggleJournal }) => {
    const dispatch = useDispatch();
    const [data, setData] = useState('');
    const user = useSelector((state) => state.users.user);
    let userId;
    if (user) {
        userId = user.id;
    }
    const prompt = 'Talk about one thing that made you happy today';

    const handleEntry = async (e) => {
        e.preventDefault();
        let type = 'journal';
        let x = new Date();
        let date = x.toLocaleDateString();
        await dispatch(addEntry(userId, { prompt, data, type, date }));
        toggleJournal();
    };

    const updateEntry = (e) => {
        setData(e.target.value);
    };
    return (
        <div className="dream-container">
            <div className="dream-form-container">
                <form className="dream-form" onSubmit={handleEntry}>
                    <div className="dream-left">
                        <div className="dream-header-container">
                            <div className="dream header">One Thing...</div>
                        </div>
                        <div className="dream-prompt-container">
                            <label className="dream-prompt">{prompt}</label>
                        </div>
                    </div>
                    <div className="dream-right">
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
                    </div>
                </form>
                <div className="cancel-div">
                    <i onClick={toggleJournal} class="far fa-times-circle"></i>
                </div>
            </div>
        </div>
    );
};

export default Gratitude;
