import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEntry } from '../../store/entries';
import './Dream.css';

const Dream = ({ dreamModal, toggleModal }) => {
    const dispatch = useDispatch();
    const [data, setData] = useState('');
    const user = useSelector((state) => state.users.user);
    let userId;
    if (user) {
        userId = user.id;
    }
    const prompt =
        'Talk a little about your dream, what emotions did they make you feel?';

    const handleEntry = async (e) => {
        e.preventDefault();
        let type = 'dream';
        let x = new Date();
        let date = x.toLocaleDateString();
        await dispatch(addEntry(userId, { prompt, data, type, date }));
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
                            <h1 className="dream header">The Dream Journal</h1>
                        </div>
                        <div className="dream-prompt-container">
                            <label className="dream">{prompt}</label>
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
                    <i onClick={toggleModal} class="far fa-times-circle"></i>
                </div>
            </div>
        </div>
    );
};

export default Dream;
