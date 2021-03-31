import React, { useState } from 'react';
import Modal from 'react-modal';
import DailyJournal from '../DailyJournal';
import './Evening.css';

const Evening = ({ toggleEvening, slideEvening, toggleNav }) => {
    const [journalModal, setJournalModal] = useState(false);

    const style = {
        overlay: {
            textAlign: 'center',
            backgroundColor: 'rgba(118,118,118, 0.9)',
            zIndex: '1000',
        },
    };

    const toggleJournal = () => setJournalModal(!journalModal);

    return (
        <div
            className={
                slideEvening ? 'evening-container active' : 'evening-container'
            }
        >
            <ul onClick={toggleEvening} className="evening-menu-items">
                <li className="evening-text">
                    <a onClick={toggleJournal} activeClassName="active">
                        Daily Journal
                    </a>
                </li>
                <li className="evening-text">
                    <a activeClassName="active">Rate Today </a>
                </li>
                <li className="evening-text">
                    <a activeClassName="active">Sleep Tips</a>
                </li>
                <div onClick={toggleNav}>
                    <button className="cancel-button" onClick={toggleEvening}>
                        ⬅
                    </button>
                </div>
            </ul>
            <div>
                <Modal
                    appElement={document.getElementById('root')}
                    className="journal-modal"
                    style={style}
                    isOpen={journalModal}
                >
                    <div>
                        <DailyJournal toggleJournal={toggleJournal} />
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default Evening;
