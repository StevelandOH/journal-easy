import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEntry } from '../../store/entries';

const Dream = ({ dream, setDream, toggleDream }) => {
    const dispatch = useDispatch();
    const [data, setData] = useState('');
    const user = useSelector((state) => state.users.user);
    let userId;
    if (user) {
        userId = user.id;
    }
    const prompt =
        'Talk a little about your dream, what emotions did they make you feel?';
    let type;
    let date;
    const handleEntry = async (e) => {
        e.preventDefault();
        type = 'dream';
        let x = new Date();
        date = x.toLocaleDateString();
        await dispatch(addEntry(userId, { prompt, data, type, date }));
    };

    const updateEntry = (e) => {
        setData(e.target.value);
    };
    return (
        <div className={dream ? 'dream-container active' : 'dream-container'}>
            <form onSubmit={handleEntry}>
                <h1>The Dream Journal</h1>
                <label>{prompt}</label>
                <div className="dream-input-container">
                    <textarea
                        className="dream-input"
                        name="entry"
                        placeholder="..."
                        value={data}
                        onChange={updateEntry}
                    />
                </div>
                <div className="dream-button-container">
                    <button className="dream-button" type="submit">
                        submit
                    </button>
                </div>
            </form>
            <div>
                <button onClick={toggleDream} className="cancel-button">
                    ⬅
                </button>
            </div>
        </div>
    );
};

export default Dream;
