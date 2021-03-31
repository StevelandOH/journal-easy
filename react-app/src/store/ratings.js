const SET_RATING = 'rating/setRating';
const GET_RATINGS = 'rating/setRatings';

export const setRating = (rating) => ({
    type: SET_RATING,
    payload: rating,
});

export const setRatings = (ratings) => ({
    type: GET_RATINGS,
    payload: ratings,
});

export const getRatings = () => async (dispatch) => {
    const res = await fetch('/api/rating/');
    const data = await res.json();
    dispatch(setRatings(data));
};

export const addRating = (userId, data) => async (dispatch) => {
    const { rating, date } = data;
    const res = await fetch(`/api/rating/`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            rating,
            date,
            userId,
        }),
    });
    const x = await res.json();
    return dispatch(setRating(x));
};

const ratingReducer = (state = {}, action) => {
    let newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case SET_RATING:
            newState[action.payload.id] = action.payload;
            return newState;
        case GET_RATINGS:
            for (let rating in action.payload) {
                newState[action.payload[rating].id] = action.payload[rating];
            }
            return newState;
        default:
            return state;
    }
};
export default ratingReducer;
