import React, { useState } from 'react';
import Modal from 'react-modal';
import Dream from '../Dream';
import Gratitude from '../Gratitude';
import './Morning.css';

const Morning = ({ toggleMorning, slideMorning, toggleNav }) => {
    const [dreamModal, setDreamModal] = useState(false);
    const [gratModal, setGratModal] = useState(false);

    const style = {
        overlay: {
            textAlign: 'center',
            backgroundColor: 'rgba(118,118,118, 0.9)',
            zIndex: '1000',
        },
    };

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
                    <a onClick={toggleDreamModal}>Dream Journal</a>
                </li>
                <li className="morning-text">
                    <a activeClassName="active">Brain Boosters</a>
                </li>
                <li className="morning-text">
                    <a onClick={toggleGratModal} activeClassName="active">
                        Gratitude
                    </a>
                </li>
                <li className="morning-text">
                    <a activeClassName="active">Daily Health Tips</a>
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
                    className="dream-modal"
                    style={style}
                    isOpen={dreamModal}
                >
                    <div>
                        <Dream
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
