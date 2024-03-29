import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Modal from 'react-modal';
import DailyJournal from '../DailyJournal';
import Ratings from '../Ratings';
import daily from '../../promptData/daily';
import './Evening.css';

const Evening = ({
    toggleDates,
    toggleGraph,
    toggleEvening,
    slideEvening,
    toggleNav,
    date,
    sleepTip,
}) => {
    const [journalModal, setJournalModal] = useState(false);
    const [ratingModal, setRatingModal] = useState(false);
    const [sleepModal, setSleepModal] = useState(false);
    const dailyPrompt = daily[Math.floor(Math.random() * 15)];
    const ratings = useSelector((state) => state.ratings);
    let validRating = true;
    Object.values(ratings).map((el) => {
        if (el.date === date.toLocaleDateString()) validRating = false;
    });
    console.log(validRating);
    const style = {
        overlay: {
            textAlign: 'center',
            backgroundColor: 'rgba(0,0,0, 0.7)',
            zIndex: '1000',
        },
    };
    const toggleSleep = () => setSleepModal(!sleepModal);
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
                    <a
                        onClick={toggleJournal}
                        onClickCapture={toggleGraph}
                        onMouseUp={toggleDates}
                        activeClassName="active"
                    >
                        Daily Journal
                    </a>
                </li>
                <li className="evening-text">
                    <a
                        onClick={toggleRating}
                        onClickCapture={toggleGraph}
                        onMouseUp={toggleDates}
                        activeClassName="active"
                    >
                        Rate Today
                    </a>
                </li>
                <li className="evening-text tip">
                    <a
                        onClick={toggleSleep}
                        onClickCapture={toggleGraph}
                        onMouseUp={toggleDates}
                        activeClassName="active"
                    >
                        {'Sleep Tips'}
                    </a>
                    from Shawn Stevenson
                </li>
                <div>
                    <button
                        className="cancel-button morning"
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
                            prompt={dailyPrompt}
                            toggleGraph={toggleGraph}
                            toggleDates={toggleDates}
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
                            validRating={validRating}
                            toggleGraph={toggleGraph}
                            toggleDates={toggleDates}
                            toggleNav={toggleNav}
                            toggleRating={toggleRating}
                        />
                    </div>
                </Modal>
                <Modal
                    appElement={document.getElementById('root')}
                    className="sleep-modal"
                    style={style}
                    isOpen={sleepModal}
                >
                    <div className="sleep-container">
                        <div>
                            <button
                                className="sleep-cancel-b"
                                onClick={toggleSleep}
                                onMouseUp={toggleNav}
                                onClickCapture={toggleDates}
                                onMouseUpCapture={toggleGraph}
                            >
                                <i class="fas fa-arrow-left "></i>
                            </button>
                        </div>
                        <div>{sleepTip}</div>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default Evening;
