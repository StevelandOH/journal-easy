import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRating } from '../../store/ratings';
import './Ratings.css';

const Ratings = ({ toggleRating }) => {
    const dispatch = useDispatch();
    const [currRating, setCurrRating] = useState(0);
    const [rating, setRating] = useState(0);
    const user = useSelector((state) => state.users.user);
    let userId;
    if (user) {
        userId = user.id;
    }

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
        dispatch(addRating(userId, { rating, date }));
    };

    let clear = () => {
        setCurrRating(0);
        Array.from(stars).forEach((star) => {
            star.className = 'fas fa-star';
        });
    };

    return (
        <div className="ratings-container">
            <div>
                <p>How was today?</p>
            </div>
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
                                onClick={clickHandler}
                                class="fas fa-star"
                            ></i>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Ratings;
