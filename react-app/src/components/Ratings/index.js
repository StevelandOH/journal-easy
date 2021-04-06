import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addRating } from '../../store/ratings';
import { restoreUser } from '../../store/users';
import './Ratings.css';

const Ratings = ({ toggleGraph, toggleDates, toggleRating, toggleNav }) => {
    const dispatch = useDispatch();
    const [currRating, setCurrRating] = useState(0);
    const [rating, setRating] = useState(0);

    const stars = document.getElementsByName('star');

    Array.from(stars).forEach((star) => {
        star.className =
            star.dataset.value <= rating ? 'fas fa-star active' : 'fas fa-star';
    });

    const handleRating = (e) => {
        setRating(parseInt(e.target.dataset.value));
        Array.from(stars).forEach((star) => {
            star.className =
                rating >= parseInt(star.dataset.value)
                    ? 'fas fa-star active'
                    : 'fas fa-star';
        });
    };

    const hoverRating = (e) => {
        setRating(parseInt(e.target.dataset.value));
        Array.from(stars).forEach((star) => {
            star.className =
                e.target.dataset.value >= parseInt(star.dataset.value)
                    ? 'fas fa-star active'
                    : 'fas fa-star';
        });
    };

    const clickHandler = (e) => {
        console.log(rating);
        let x = new Date();
        let date = x.toLocaleDateString();
        dispatch(addRating({ rating, date }));
        dispatch(restoreUser());
        toggleRating();
        toggleNav();
        toggleGraph();
        toggleDates();
    };

    return (
        <div className="ratings-container">
            <div className="star-container">
                <div>
                    {[...Array(10).keys()].map((n) => {
                        return (
                            <i
                                data-value={n + 1}
                                name="star"
                                key={n + 1}
                                onClick={handleRating}
                                onMouseOver={hoverRating}
                                class="fas fa-star"
                            ></i>
                        );
                    })}
                </div>
            </div>
            <div className="button-container">
                <button className="submit-button rating" onClick={clickHandler}>
                    ✓
                </button>
                <button
                    className="cancel-button rating"
                    onClick={toggleRating}
                    onMouseUp={toggleNav}
                    onClickCapture={toggleDates}
                    onMouseUpCapture={toggleGraph}
                >
                    ⬅
                </button>
            </div>
        </div>
    );
};

export default Ratings;
