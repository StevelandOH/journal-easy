const SET_AFFIRMATION = 'affirmation/setAffirmation';
const GET_AFFIRMATIONS = 'affirmation/setAffirmations';
const REMOVE_AFFIRMATION = 'affirmation/removeAffirmation';

export const setAffirmation = (affirmation) => ({
    type: SET_AFFIRMATION,
    payload: affirmation,
});

export const setAffirmations = (affirmations) => ({
    type: GET_AFFIRMATIONS,
    payload: affirmations,
});

export const getAffirmations = () => async (dispatch) => {
    const res = await fetch('/api/affirmation/');
    const data = await res.json();
    dispatch(setAffirmations(data));
};

export const addAffirmation = (affirmation) => async (dispatch) => {
    const res = await fetch('/api/affirmation/', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            affirmation,
        }),
    });
    const x = await res.json();
    return dispatch(setAffirmation(x));
};

export const deleteAffirmation = (affirmation) => async (dispatch) => {
    console.log(affirmation);
    const res = await fetch('/api/affirmation/', {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({ affirmation }),
    });
    const x = res.json();
    console.log(x);
    return dispatch(setAffirmations(x));
};

const affirmationReducer = (state = {}, action) => {
    let newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case SET_AFFIRMATION:
            newState[action.payload.id] = action.payload;
            return newState;
        case GET_AFFIRMATIONS:
            for (let affirmation in action.payload) {
                newState[action.payload[affirmation].id] =
                    action.payload[affirmation];
            }
            return newState;
        default:
            return state;
    }
};

export default affirmationReducer;
