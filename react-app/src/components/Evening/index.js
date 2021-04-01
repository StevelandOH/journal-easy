import React, { useState } from 'react';
import Modal from 'react-modal';
import DailyJournal from '../DailyJournal';
import Ratings from '../Ratings';
import './Evening.css';

const Evening = ({ toggleEvening, slideEvening, toggleNav }) => {
    const [journalModal, setJournalModal] = useState(false);
    const [ratingModal, setRatingModal] = useState(false);

    const style = {
        overlay: {
            textAlign: 'center',
            backgroundColor: 'rgba(118,118,118, 0.9)',
            zIndex: '1000',
        },
    };

    const toggleJournal = () => setJournalModal(!journalModal);
    const toggleRating = () => setRatingModal(!ratingModal);

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
                    <a onClick={toggleRating} activeClassName="active">
                        Rate Today{' '}
                    </a>
                </li>
                <li className="evening-text">
                    <a activeClassName="active">Sleep Tips</a>
                </li>
                <div>
                    <button
                        className="cancel-button"
                        onClick={toggleEvening}
                        onClickCapture={toggleNav}
                    >
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
                        <DailyJournal
                            toggleNav={toggleNav}
                            toggleJournal={toggleJournal}
                        />
                    </div>
                </Modal>
                <Modal
                    appElement={document.getElementById('root')}
                    className="rating-modal"
                    style={style}
                    isOpen={ratingModal}
                >
                    <div>
                        <Ratings
                            toggleNav={toggleNav}
                            toggleRating={toggleRating}
                        />
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default Evening;
