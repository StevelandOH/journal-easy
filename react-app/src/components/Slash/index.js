import React from 'react';
import { useSelector } from 'react-redux';
import { LineChart } from 'react-chartkick';
import 'chart.js';
import './Slash.css';

const Slash = ({ date }) => {
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
                <div className="line-chart">
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
                            className="number one"
                            type="text"
                        ></input>
                    </div>
                    <div>
                        <input
                            placeholder="d"
                            className="number two"
                            type="text"
                        ></input>
                    </div>
                    <div className="number-slash">/</div>
                    <div>
                        <input
                            placeholder="m"
                            className="number three"
                            type="text"
                        ></input>
                    </div>
                    <div>
                        <input
                            placeholder="m"
                            className="number four"
                            type="text"
                        ></input>
                    </div>
                    <div className="number-slash">/</div>
                    <div>
                        <input
                            placeholder="y"
                            className="number five"
                            type="text"
                        ></input>
                    </div>
                    <div>
                        <input
                            placeholder="y"
                            className="number six"
                            type="text"
                        ></input>
                    </div>
                    <div>
                        <input
                            placeholder="y"
                            className="number seven"
                            type="text"
                        ></input>
                    </div>
                    <div>
                        <input
                            placeholder="y"
                            className="number eight"
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
