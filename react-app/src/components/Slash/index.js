import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { LineChart } from 'react-chartkick';
import Modal from 'react-modal';
import Stats from '../Stats';
import 'chart.js';
import './Slash.css';

const Slash = ({
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
    const [oneDone, setOneDone] = useState(false);

    const sessionUser = useSelector((state) => state.users.user);
    const ratings = useSelector((state) => state.ratings);
    const entries = useSelector((state) => state.entries);

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
    };

    const change = (e) => {
        setDayOne(e.target.value);
        setOneDone(true);
    };

    if (sessionUser && !errors) {
        return (
            <div className="page-container">
                <div
                    className={rateGraph ? 'line-chart' : 'line-chart inactive'}
                >
                    <LineChart
                        label="RATING"
                        legend={true}
                        legend="bottom"
                        colors={['#a872b8cc', '#000000']}
                        download={true}
                        data={graphData}
                    />
                </div>

                <div className="date-entry-container">
                    <div>
                        <input
                            id="one"
                            value={dayOne}
                            onChange={(e) => setDayOne(e.target.value)}
                            placeholder="d"
                            className={
                                one ? 'number one' : 'number one inactive'
                            }
                            type="text"
                        ></input>
                    </div>
                    <div>
                        <input
                            value={dayTwo}
                            onChange={(e) => setDayTwo(e.target.value)}
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
                            value={monthOne}
                            onChange={(e) => setMonthOne(e.target.value)}
                            placeholder="m"
                            className={
                                three ? 'number three' : 'number three inactive'
                            }
                            type="text"
                        ></input>
                    </div>
                    <div>
                        <input
                            value={monthTwo}
                            onChange={(e) => setMonthTwo(e.target.value)}
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
                            value={yearOne}
                            onChange={(e) => setYearOne(e.target.value)}
                            placeholder="y"
                            className={
                                five ? 'number five' : 'number five inactive'
                            }
                            type="text"
                        ></input>
                    </div>
                    <div>
                        <input
                            value={yearTwo}
                            onChange={(e) => setYearTwo(e.target.value)}
                            placeholder="y"
                            className={
                                six ? 'number six' : 'number six inactive'
                            }
                            type="text"
                        ></input>
                    </div>
                    <div>
                        <input
                            value={yearThree}
                            onChange={(e) => setYearThree(e.target.value)}
                            placeholder="y"
                            className={
                                seven ? 'number seven' : 'number seven inactive'
                            }
                            type="text"
                        ></input>
                    </div>
                    <div>
                        <input
                            value={yearFour}
                            onChange={(e) => setYearFour(e.target.value)}
                            placeholder="y"
                            className={
                                eight ? 'number eight' : 'number eight inactive'
                            }
                            type="text"
                        ></input>
                    </div>
                </div>
                <button onClick={handleDate}>date</button>
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
            <div>
                <h1 style={{ color: 'white' }}>LANDINGPAGE</h1>
            </div>
        );
    }
};

export default Slash;
