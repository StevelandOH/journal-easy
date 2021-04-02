import React from 'react';
import { useSelector } from 'react-redux';
import { LineChart } from 'react-chartkick';
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
    toggleDates,
    setEntryDate,
    entryDate,
    date,
    rateGraph,
    setRateGraph,
    toggleGraph,
}) => {
    const sessionUser = useSelector((state) => state.users.user);
    const ratings = useSelector((state) => state.ratings);

    const errors = useSelector((state) =>
        sessionUser ? sessionUser.errors : null
    );

    const thirtyDays = () => {
        const data = [date.toLocaleDateString()];
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
                            placeholder="d"
                            className={
                                one ? 'number one' : 'number one inactive'
                            }
                            type="text"
                        ></input>
                    </div>
                    <div>
                        <input
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
                            placeholder="m"
                            className={
                                three ? 'number three' : 'number three inactive'
                            }
                            type="text"
                        ></input>
                    </div>
                    <div>
                        <input
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
                            placeholder="y"
                            className={
                                five ? 'number five' : 'number five inactive'
                            }
                            type="text"
                        ></input>
                    </div>
                    <div>
                        <input
                            placeholder="y"
                            className={
                                six ? 'number six' : 'number six inactive'
                            }
                            type="text"
                        ></input>
                    </div>
                    <div>
                        <input
                            placeholder="y"
                            className={
                                seven ? 'number seven' : 'number seven inactive'
                            }
                            type="text"
                        ></input>
                    </div>
                    <div>
                        <input
                            placeholder="y"
                            className={
                                eight ? 'number eight' : 'number eight inactive'
                            }
                            type="text"
                        ></input>
                    </div>
                </div>
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
