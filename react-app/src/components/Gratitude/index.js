import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEntry } from '../../store/entries';
import '../Dream/Dream.css';

const Gratitude = ({ gratModal, toggleGratModal }) => {
    const dispatch = useDispatch();
    const [data, setData] = useState('');
    const user = useSelector((state) => state.users.user);
    let userId;
    if (user) {
        userId = user.id;
    }
    const prompt =
        'Try to remember back to your first job and think about what it was like when you were new there...';

    const handleEntry = async (e) => {
        e.preventDefault();
        let type = 'gratitude';
        let x = new Date();
        let date = x.toLocaleDateString();
        await dispatch(addEntry(userId, { prompt, data, type, date }));
        toggleGratModal();
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
                            <div className="dream header">
                                Practicing Gratitude
                            </div>
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
                    <i
                        onClick={toggleGratModal}
                        class="far fa-times-circle"
                    ></i>
                </div>
            </div>
        </div>
    );
};

export default Gratitude;
