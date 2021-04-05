import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEntry } from '../../store/entries';

import './Dream.css';

const Dream = ({
    prompt,
    toggleDates,
    toggleGraph,
    toggleDreamModal,
    toggleNav,
}) => {
    const dispatch = useDispatch();
    const [data, setData] = useState('');
    const user = useSelector((state) => state.users.user);
    let userId;
    if (user) {
        userId = user.id;
    }

    const handleEntry = async (e) => {
        e.preventDefault();
        let type = 'dream';
        let x = new Date();
        let date = x.toLocaleDateString();
        await dispatch(addEntry({ prompt, data, type, date }));
        toggleDreamModal();
        toggleNav();
        toggleGraph();
        toggleDates();
    };

    const updateEntry = (e) => {
        setData(e.target.value);
    };

    const toggle = () => {
        toggleDreamModal();
        toggleNav();
        toggleDates();
        toggleGraph();
    };

    return (
        <div className="dream-form-container">
            <div className="dream-top">
                <div>
                    <button className="dream-cancel-b" onClick={toggle}>
                        <i class="fas fa-arrow-left "></i>
                    </button>
                </div>
                <form className="dream-form" onSubmit={handleEntry}>
                    <div className="dream-input-container">
                        <textarea
                            className="dream dream-input"
                            name="entry"
                            value={data}
                            onChange={updateEntry}
                        />
                    </div>
                    <div className="dream-b-container">
                        <button type="submit" className="dream-b">
                            <i class="fas fa-arrow-right"></i>
                        </button>
                    </div>
                </form>
            </div>
            <div className="dream-prompt-container">
                <label className="dream-prompt">{prompt}</label>
            </div>
        </div>
    );
};

export default Dream;
