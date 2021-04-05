import React, { useState } from 'react';
import Modal from 'react-modal';
import Dream from '../Dream';
import Gratitude from '../Gratitude';
import dreams from '../../promptData/dreams';
import gratitude from '../../promptData/gratitude';
import './Morning.css';
import healthTips from '../../healthTipsData/healthTips';

const Morning = ({
    healthTip,
    toggleDates,
    toggleGraph,
    toggleMorning,
    slideMorning,
    toggleNav,
}) => {
    const [dreamModal, setDreamModal] = useState(false);
    const [healthModal, setHealthModal] = useState(false);
    const [gratModal, setGratModal] = useState(false);
    const gratPrompt = gratitude[Math.floor(Math.random() * 14)];
    const dreamPrompt = dreams[Math.floor(Math.random() * 3)];
    const style = {
        overlay: {
            textAlign: 'center',
            backgroundColor: 'rgba(255,255,255, 0.9)',
            zIndex: '1000',
        },
    };

    const toggleHealth = () => setHealthModal(!healthModal);
    const toggleDreamModal = () => setDreamModal(!dreamModal);
    const toggleGratModal = () => setGratModal(!gratModal);

    return (
        <div
            className={
                slideMorning ? 'morning-container active' : 'morning-container'
            }
        >
            <ul onClick={toggleMorning} className="morning-menu-items">
                <li className="morning-text">
                    <a
                        onClick={toggleDreamModal}
                        onClickCapture={toggleGraph}
                        onMouseUp={toggleDates}
                    >
                        {'dream  notes'}
                    </a>
                </li>
                <li className="morning-text">
                    <a activeClassName="active">{'brain  booster'}</a>
                </li>
                <li className="morning-text">
                    <a
                        onClick={toggleGratModal}
                        onClickCapture={toggleGraph}
                        onMouseUp={toggleDates}
                        activeClassName="active"
                    >
                        {'gratitude'}
                    </a>
                </li>
                <li className="morning-text">
                    <a
                        onClick={toggleHealth}
                        onClickCapture={toggleGraph}
                        onMouseUp={toggleDates}
                        activeClassName="active"
                    >
                        {'health  tips'}
                    </a>
                </li>
                <div>
                    <button
                        className="cancel-button"
                        onClick={toggleMorning}
                        onMouseUp={toggleNav}
                    >
                        ⬅
                    </button>
                </div>
            </ul>
            <div>
                <Modal
                    appElement={document.getElementById('root')}
                    className="health-modal"
                    style={style}
                    isOpen={healthModal}
                >
                    <div className="health-container">
                        <div>
                            <button
                                className="health-cancel-b"
                                onClick={toggleHealth}
                                onMouseUp={toggleNav}
                                onClickCapture={toggleDates}
                                onMouseUpCapture={toggleGraph}
                            >
                                <i class="fas fa-arrow-left "></i>
                            </button>
                        </div>
                        <div>{healthTip}</div>
                    </div>
                </Modal>
                <Modal
                    appElement={document.getElementById('root')}
                    className="dream-modal"
                    style={style}
                    isOpen={dreamModal}
                >
                    <div>
                        <Dream
                            prompt={dreamPrompt}
                            toggleGraph={toggleGraph}
                            toggleDates={toggleDates}
                            toggleNav={toggleNav}
                            toggleDreamModal={toggleDreamModal}
                        />
                    </div>
                </Modal>
            </div>
            <div>
                <Modal
                    appElement={document.getElementById('root')}
                    className="grat-modal"
                    style={style}
                    isOpen={gratModal}
                >
                    <div>
                        <Gratitude
                            prompt={gratPrompt}
                            toggleGraph={toggleGraph}
                            toggleDates={toggleDates}
                            toggleNav={toggleNav}
                            toggleGratModal={toggleGratModal}
                        />
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default Morning;
