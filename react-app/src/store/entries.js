const SET_ENTRY = 'entry/setEntry';

export const setEntry = (entry) => ({
    type: SET_ENTRY,
    payload: entry,
});

export const addEntry = (userId, entry) => async (dispatch) => {
    const { prompt, data, type, date } = entry;
    const res = await fetch(`/api/entry/`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            prompt,
            data,
            type,
            userId,
            date,
        }),
    });
    const x = await res.json();
    return dispatch(setEntry(x));
};

const entryReducer = (state = {}, action) => {
    let newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case SET_ENTRY:
            newState[action.payload.id] = action.payload;
            return newState;
        default:
            return state;
    }
};
export default entryReducer;
