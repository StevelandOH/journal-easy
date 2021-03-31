const SET_AFFIRMATION = 'affirmation/setAffirmation';

export const setAffirmation = (affirmation) => ({
    type: SET_AFFIRMATION,
    payload: affirmation,
});

export const addAffirmation = (data) => async (dispatch) => {
    const { userId, affirmation } = data;
    const res = await fetch('/api/affirmation/', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            affirmation,
            userId,
        }),
    });
    const x = await res.json();
    return dispatch(setAffirmation(x));
};

const affirmationReducer = (state = {}, action) => {
    let newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case SET_AFFIRMATION:
            newState[action.payload.id] = action.payload;
            return newState;
        default:
            return state;
    }
};

export default affirmationReducer;
