import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addRating } from '../../store/ratings';
import './Ratings.css';

const Ratings = ({ toggleRating, toggleNav }) => {
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
        toggleRating();
    };

    let clear = () => {
        setCurrRating(0);
        Array.from(stars).forEach((star) => {
            star.className = 'fas fa-star';
        });
    };

    return (
        <div className="ratings-container">
            <div onMouseLeave={handleRating} className="star-container">
                <div>
                    {[...Array(10).keys()].map((n) => {
                        return (
                            <i
                                data-value={n + 1}
                                name="star"
                                key={n + 1}
                                onMouseOver={hoverRating}
                                onMouseLeave={clear}
                                class="fas fa-star"
                            ></i>
                        );
                    })}
                </div>
            </div>
            <div className="button-container">
                <button
                    className="submit-button rating"
                    onClick={clickHandler}
                    onClickCapture={toggleNav}
                >
                    ✓
                </button>
                <button
                    className="cancel-button rating"
                    onClick={toggleRating}
                    onClickCapture={toggleNav}
                >
                    ⬅
                </button>
            </div>
        </div>
    );
};

export default Ratings;
