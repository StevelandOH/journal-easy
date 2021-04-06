import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { LineChart } from 'react-chartkick';
import Modal from 'react-modal';
import Stats from '../Stats';
import 'chart.js';
import './Slash.css';

const Slash = ({
    loaded,
    one,
    two,
    three,
    four,
    five,
    six,
    seven,
    eight,
    setOne,
    setTwo,
    setThree,
    setFour,
    setFive,
    setSix,
    setSeven,
    setEight,
    date,
    toggleNav,
    rateGraph,
    setRateGraph,
    toggleGraph,
}) => {
    const [dayOne, setDayOne] = useState('');
    const [dayTwo, setDayTwo] = useState('');
    const [monthOne, setMonthOne] = useState('');
    const [monthTwo, setMonthTwo] = useState('');
    const [yearOne, setYearOne] = useState('');
    const [yearTwo, setYearTwo] = useState('');
    const [yearThree, setYearThree] = useState('');
    const [yearFour, setYearFour] = useState('');
    const [e, setE] = useState([]);
    const [modal, setModal] = useState(false);

    const sessionUser = useSelector((state) => state.users.user);
    const ratings = useSelector((state) => state.ratings);
    const entries = useSelector((state) => state.entries);
    const affirmations = useSelector((state) => state.affirmations);
    const a = Object.values(affirmations)[
        Math.floor(Math.random() * Object.values(affirmations).length - 1)
    ];

    if (a) {
        console.log(a.affirmations);
    }
    const errors = useSelector((state) =>
        sessionUser ? sessionUser.errors : null
    );

    const toggleModal = () => setModal(!modal);

    const style = {
        overlay: {
            textAlign: 'center',
            backgroundColor: 'rgba(255,255,255, 0.7)',
            zIndex: '1000',
        },
    };

    const thirtyDays = () => {
        const data = [];
        Array.from([
            ,
            ,
            ,
            ,
            ,
            ,
            ,
            ,
            ,
            ,
            ,
            ,
            ,
            ,
            ,
            ,
            ,
            ,
            ,
            ,
            ,
            ,
            ,
            ,
            ,
            ,
            ,
            ,
            ,
            ,
        ]).map((el, i) => {
            const prior = new Date(
                new Date().setDate(new Date().getDate() - i)
            );
            data.unshift(prior.toLocaleDateString());
        });
        return data;
    };

    const thirtyRatings = () => {
        const data = {};
        const r = Object.values(ratings).reverse();

        thirtyDays()
            .reverse()
            .map((el, idx) => {
                if (r[idx]) {
                    data[el] = r[idx].rating;
                } else {
                    data[el] = null;
                }
            });
        return data;
    };

    const graphData = thirtyRatings();

    useEffect(() => {
        setRateGraph(true);
        setOne(true);
        setTwo(true);
        setThree(true);
        setFour(true);
        setFive(true);
        setSix(true);
        setSeven(true);
        setEight(true);
    }, []);

    const inputOne = useRef(null);
    const inputTwo = useRef(null);
    const inputThree = useRef(null);
    const inputFour = useRef(null);
    const inputFive = useRef(null);
    const inputSix = useRef(null);
    const inputSeven = useRef(null);
    const inputEight = useRef(null);
    const button = useRef(null);

    let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    const oneDone = (e) => {
        inputTwo.current.focus();
    };
    const twoDone = (e) => {
        inputThree.current.focus();
    };
    const threeDone = (e) => {
        inputFour.current.focus();
    };
    const fourDone = (e) => {
        inputFive.current.focus();
    };
    const fiveDone = (e) => {
        inputSix.current.focus();
    };
    const sixDone = (e) => {
        inputSeven.current.focus();
    };
    const sevenDone = (e) => {
        inputEight.current.focus();
    };
    const eightDone = (e) => {
        button.current.focus();
    };

    const entryData = [];
    const handleDate = () => {
        const input = [
            dayOne,
            dayTwo,
            '/',
            monthOne,
            monthTwo,
            '/',
            yearOne,
            yearTwo,
            yearThree,
            yearFour,
        ].join('');
        Object.values(entries).map((el) => {
            if (el.date == input) {
                console.log(el);
                entryData.push({
                    prompt: el.prompt,
                    res: el.response,
                    type: el.type,
                });
            }
        });

        setE(entryData);
        toggleNav();
        toggleGraph();
        toggleModal();
        setOne(false);
        setTwo(false);
        setThree(false);
        setFour(false);
        setFive(false);
        setSix(false);
        setSeven(false);
        setEight(false);
        setDayOne('');
        setDayTwo('');
        setMonthOne('');
        setMonthTwo('');
        setYearOne('');
        setYearTwo('');
        setYearThree('');
        setYearFour('');
    };

    const dayOneChange = (e) => {
        oneDone(e.target.value);
        if (e.target.value !== '0') {
            setDayOne(e.target.value);
        } else {
            setDayOne(null);
        }
    };

    if (!loaded) return null;

    const dashTitle = () => {
        if (a) {
            return a.affirmations;
        } else {
            return `Hope you're having a good day, ${sessionUser.name}!`;
        }
    };

    if (sessionUser && !errors) {
        return (
            <div className="page-container">
                <div
                    className={
                        rateGraph
                            ? 'affirmations-container'
                            : 'affirmations-container inactive'
                    }
                >
                    <div className="dash-title">{dashTitle()}</div>
                </div>
                <div
                    className={
                        rateGraph
                            ? 'chart-container'
                            : 'chart-container inactive'
                    }
                >
                    ratings history
                    <div className="container">
                        <LineChart
                            colors={['#a872b8cc', '#000000']}
                            download={true}
                            data={graphData}
                        />
                    </div>
                </div>

                <div
                    className={
                        rateGraph
                            ? 'date-entry-container'
                            : 'data-entry-container inactive'
                    }
                >
                    <div>
                        <input
                            ref={inputOne}
                            id="one"
                            maxLength="1"
                            value={dayOne}
                            onChange={dayOneChange}
                            placeholder="d"
                            className={
                                one ? 'number one' : 'number one inactive'
                            }
                            type="text"
                        ></input>
                    </div>
                    <div>
                        <input
                            id="two"
                            ref={inputTwo}
                            maxLength="1"
                            value={dayTwo}
                            onChange={(e) => {
                                twoDone(e.target.value);
                                setDayTwo(e.target.value);
                            }}
                            placeholder="d"
                            className={
                                two ? 'number two' : 'number two inactive'
                            }
                            type="text"
                        ></input>
                    </div>
                    <div
                        className={
                            three ? 'number-slash' : 'number-slash inactive'
                        }
                    >
                        /
                    </div>
                    <div>
                        <input
                            ref={inputThree}
                            maxLength="1"
                            value={monthOne}
                            onChange={(e) => {
                                threeDone(e.target.value);
                                setMonthOne(e.target.value);
                            }}
                            placeholder="m"
                            className={
                                three ? 'number three' : 'number three inactive'
                            }
                            type="text"
                        ></input>
                    </div>
                    <div>
                        <input
                            ref={inputFour}
                            maxLength="1"
                            value={monthTwo}
                            onChange={(e) => {
                                fourDone(e.target.value);
                                setMonthTwo(e.target.value);
                            }}
                            placeholder="m"
                            className={
                                four ? 'number four' : 'number four inactive'
                            }
                            type="text"
                        ></input>
                    </div>
                    <div
                        className={
                            three ? 'number-slash' : 'number-slash inactive'
                        }
                    >
                        /
                    </div>
                    <div>
                        <input
                            ref={inputFive}
                            maxLength="1"
                            value={yearOne}
                            onChange={(e) => {
                                fiveDone(e.target.value);
                                setYearOne(e.target.value);
                            }}
                            placeholder="y"
                            className={
                                five ? 'number five' : 'number five inactive'
                            }
                            type="text"
                        ></input>
                    </div>
                    <div>
                        <input
                            ref={inputSix}
                            maxLength="1"
                            value={yearTwo}
                            onChange={(e) => {
                                sixDone(e.target.value);
                                setYearTwo(e.target.value);
                            }}
                            placeholder="y"
                            className={
                                six ? 'number six' : 'number six inactive'
                            }
                            type="text"
                        ></input>
                    </div>
                    <div>
                        <input
                            ref={inputSeven}
                            maxLength="1"
                            value={yearThree}
                            onChange={(e) => {
                                sevenDone(e.target.value);
                                setYearThree(e.target.value);
                            }}
                            placeholder="y"
                            className={
                                seven ? 'number seven' : 'number seven inactive'
                            }
                            type="text"
                        ></input>
                    </div>
                    <div>
                        <input
                            ref={inputEight}
                            maxLength="1"
                            value={yearFour}
                            onChange={(e) => {
                                eightDone(e.target.value);
                                setYearFour(e.target.value);
                            }}
                            placeholder="y"
                            className={
                                eight ? 'number eight' : 'number eight inactive'
                            }
                            type="text"
                        ></input>
                    </div>
                </div>
                <div
                    className={rateGraph ? 'date-title' : 'date-title inactive'}
                >
                    enter a date to view entries
                </div>
                <div className="b-container">
                    <button
                        className={rateGraph ? 'date-b' : 'date-b inactive'}
                        ref={button}
                        onClick={handleDate}
                    >
                        <i class="fas fa-check"></i>
                    </button>
                </div>
                <Modal
                    appElement={document.getElementById('root')}
                    className="stat-modal"
                    style={style}
                    isOpen={modal}
                >
                    <Stats
                        toggleNav={toggleNav}
                        toggleModal={toggleModal}
                        toggleGraph={toggleGraph}
                        entries={e}
                        setOne={setOne}
                        setTwo={setTwo}
                        setThree={setThree}
                        setFour={setFour}
                        setFive={setFive}
                        setSix={setSix}
                        setSeven={setSeven}
                        setEight={setEight}
                    />
                </Modal>
            </div>
        );
    } else {
        return (
            <div className="page-container">
                <div className="title-image">J</div>
                <div className="landing-title">
                    <div className="title j">j</div>
                    <div className="title o">o</div>
                    <div className="title u">u</div>
                    <div className="title r">r</div>
                    <div className="title n">n</div>
                    <div className="title a">a</div>
                    <div className="title l">l</div>
                    <div className="title"> </div>
                    <div className="title e">E</div>
                    <div className="title a">a</div>
                    <div className="title s">s</div>
                    <div className="title y">y</div>
                </div>
                <div className="bottom-landing">
                    Create an account today and get practice with . . .
                    <div className="bottom-top">
                        <div className="land">
                            <div className="land-title">affirmations</div>
                            <div className="explination left">
                                <p>Create and store</p>
                                <p>your own custom </p>
                                <p>affirmations for</p>
                                <p>daily reminders...</p>
                            </div>
                        </div>
                        <div className="land-right">
                            <div className="land-title">journaling</div>
                            <div className="explination">
                                <p>Respond to daily</p>
                                <p>gratitude, dream</p>
                                <p>and 'one thing from</p>
                                <p>the day' prompts...</p>
                            </div>
                        </div>
                    </div>
                    <div className="bottom-mid ">
                        <div className="land rat">
                            <div className="land-title">daily ratings</div>
                            <div className="explination left rat ">
                                <p>Rate each day </p>
                                <p>and keep up on </p>
                                <p>your last 30 days</p>
                                <p>with a downloadable </p>
                                <p>dashboard line graph...</p>
                            </div>
                        </div>
                        <div className="land-right brain">
                            <div className="land-title">brain boosters</div>
                            <div className="explination brain">
                                <p>Wake up and get</p>
                                <p>your mind going</p>
                                <p>in the morning with</p>
                                <p>our vast catalog</p>
                                <p> of word problems...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default Slash;
