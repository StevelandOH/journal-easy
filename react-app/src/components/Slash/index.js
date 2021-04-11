import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LineChart } from 'react-chartkick';
import { addEntry } from '../../store/entries';
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
    const dispatch = useDispatch();
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
    const [data, setData] = useState('');
    const [type, setType] = useState('none');
    const [okModal, setOkModal] = useState(false);

    const updateData = (e) => setData(e.target.value);
    const updateType = (e) => {
        setType(e.target.value);
    };
    const sessionUser = useSelector((state) => state.users.user);
    const ratings = useSelector((state) => state.ratings);
    const entries = useSelector((state) => state.entries);
    const affirmations = useSelector((state) => state.affirmations);
    const a = Object.values(affirmations)[
        Math.floor(Math.random() * Object.values(affirmations).length - 1)
    ];

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

    const getAverage = () => {
        let total = 0;
        Object.values(ratings).map((el, i) => (total += parseInt(el.rating)));
        return Math.floor(total / Object.values(ratings).length);
    };
    getAverage();
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

    const toggleOk = () => setOkModal(!okModal);

    const freeformEntry = async (e) => {
        e.preventDefault();
        let x = new Date();
        let date = x.toLocaleDateString();
        let prompt = 'free form';
        await dispatch(addEntry({ prompt, data, type, date }));
        await setType('none');
        await setData('');
        toggleOk();
    };

    if (sessionUser && !errors) {
        return (
            <div className="page-container">
                <div className={rateGraph ? 'freeform' : 'freeform inactive'}>
                    <div className="freeform-container">
                        <div className="freeform-left">{dashTitle()}</div>
                        <div className="freeform-right">
                            <form
                                className="freeform-form"
                                onSubmit={freeformEntry}
                            >
                                <div>
                                    <textarea
                                        value={data}
                                        onChange={updateData}
                                        placeholder="...freeform journaling"
                                        style={{
                                            fontSize: '14pt',
                                            textAlign: 'right',
                                            padding: '10px',
                                            border: 'none',
                                            resize: 'none',
                                            height: '175px',
                                            width: '250px',
                                            borderRadius: '10px',
                                            backgroundColor:
                                                'rgba(0, 0, 0, 0.0)',
                                            overflow: 'scroll',
                                        }}
                                    />
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <button
                                        className="ent-b"
                                        type="submit"
                                        style={{
                                            padding: '5px',
                                            margin: '0px 15px 0px 0px',
                                            fontSize: '14pt',
                                            borderRadius: '10px',
                                            border: '1px solid white',
                                            backgroundColor:
                                                'rgba(179, 230, 164, 0.6)',
                                            color: 'rgba(104, 104, 104, 0.9)',
                                        }}
                                    >
                                        Add to
                                    </button>
                                    <select
                                        value={type}
                                        onChange={updateType}
                                        style={{
                                            width: '170px',
                                            border: 'none',
                                            borderRadius: '10px',
                                            padding: '5px',
                                            color: 'rgba(104, 104, 104, 0.9)',
                                            fontSize: '12pt',
                                            textAlignLast: 'center',
                                        }}
                                    >
                                        <option value="none">
                                            choose entry type
                                        </option>
                                        <option value="todo">to do</option>
                                        <option value="general">general</option>
                                        <option value="remember">
                                            things to remember
                                        </option>
                                        <option value="goal">goals</option>
                                        <option value="other">...other</option>
                                    </select>
                                </div>
                            </form>
                            <Modal
                                appElement={document.getElementById('root')}
                                isOpen={okModal}
                                style={{
                                    textAlign: 'center',
                                    background: 'rgba(0,0,0, 0.7)',
                                    zIndex: '1000',
                                    margin: '100px',
                                }}
                                className="newModal"
                            >
                                <div
                                    style={{
                                        borderRadius: '10px',
                                        border: '1px solid black',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor:
                                            'rgba(212, 134, 142, 0.7)',
                                        height: '150px',
                                        width: '450px',
                                        marginTop: '300px',
                                        marginLeft: '35%',
                                        boxShadow:
                                            '10px 10px 10px rgba(0,0,0,0.7)',
                                        color: 'rgba(104, 104, 104, 0.9)',
                                    }}
                                >
                                    <div
                                        style={{
                                            fontSize: '16pt',
                                            margin: '20px 20px 10px 20px',
                                        }}
                                    >
                                        ENTRY SUBMITTED, KEEP UP THE GREAT WORK!
                                    </div>
                                    <div
                                        style={{
                                            margin: '10px 20px 20px 20px',
                                        }}
                                    >
                                        <button
                                            className="ent-b"
                                            style={{
                                                padding: '10px',
                                                borderRadius: '10px',
                                                border: '1px solid grey',
                                                backgroundColor:
                                                    'rgba(186, 234, 237, 0.8)',
                                            }}
                                            onClick={toggleOk}
                                        >
                                            thanks
                                        </button>
                                    </div>
                                </div>
                            </Modal>
                        </div>
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
                <div className="b-container">
                    <button
                        className={rateGraph ? 'date-b' : 'date-b inactive'}
                        ref={button}
                        onClick={handleDate}
                    >
                        Review Date
                    </button>
                </div>
                <div
                    className={
                        rateGraph
                            ? 'chart-container'
                            : 'chart-container inactive'
                    }
                >
                    <div className="container">
                        <LineChart
                            colors={['#a872b8cc', '#000000']}
                            download={true}
                            data={graphData}
                        />
                        <div className="legend-container">
                            <div className="ratings-legend">
                                <div className="rating-p">Ratings</div>
                                <div className="rating-box"></div>
                            </div>
                            <div className="rating-avg">{`30 Day Average ( ${getAverage()} )`}</div>
                        </div>
                    </div>
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
                    <div className="bottom-top">
                        <div className="land">
                            <div className="land-title">Affirmations</div>
                            <div className="explination left">
                                <p>Create and store</p>
                                <p>your own custom </p>
                                <p>affirmations for</p>
                                <p>daily reminders...</p>
                            </div>
                        </div>
                        <div className="land-right">
                            <div className="land-title">Journaling</div>
                            <div className="explination">
                                <p>Respond to daily</p>
                                <p>gratitude, dream</p>
                                <p>and "one thing"</p>
                                <p>prompts...</p>
                            </div>
                        </div>
                    </div>
                    <div className="bottom-mid ">
                        <div className="land rat">
                            <div className="land-title">Rate the Day</div>
                            <div className="explination left rat ">
                                <p>Rate each day </p>
                                <p>and keep up on </p>
                                <p>your last 30 days</p>
                                <p>with a downloadable </p>
                                <p>dashboard line graph...</p>
                            </div>
                        </div>
                        <div className="land-right brain">
                            <div className="land-title">Brain Boosters</div>
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
