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
    const a =
        Object.values(affirmations)[
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
};

export default Slash;
