import React, { useState } from 'react';
import Modal from 'react-modal';
import Dream from '../Dream';
import './Morning.css';

const Morning = ({ toggleMorning, slideMorning, toggleNav }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const style = {
        overlay: {
            textAlign: 'center',
            backgroundColor: 'rgba(0,0,0, 0.9)',
            zIndex: '1000',
        },
    };

    const toggleModal = () => setModalIsOpen(!modalIsOpen);

    return (
        <div
            className={
                slideMorning ? 'morning-container active' : 'morning-container'
            }
        >
            <ul onClick={toggleMorning} className="morning-menu-items">
                <li className="morning-text">
                    <a onClick={toggleModal}>Dream Journal</a>
                </li>
                <li className="morning-text">
                    <a activeClassName="active">Brain Boosters</a>
                </li>
                <li className="morning-text">
                    <a activeClassName="active">Gratitude</a>
                </li>
                <li className="morning-text">
                    <a activeClassName="active">Daily Health Tips</a>
                </li>
                <div onClick={toggleNav}>
                    <button className="cancel-button" onClick={toggleMorning}>
                        ⬅
                    </button>
                </div>
            </ul>
            <div>
                <Modal
                    // appElement={document.getElementById('root')}
                    className="dream-modal"
                    style={style}
                    isOpen={modalIsOpen}
                >
                    <div>
                        <Dream toggleModal={toggleModal} />
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default Morning;
