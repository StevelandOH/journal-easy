const SET_RATING = 'rating/setRating';

export const setRating = (rating) => ({
    type: SET_RATING,
    payload: rating,
});

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
        default:
            return state;
    }
};
export default ratingReducer;
