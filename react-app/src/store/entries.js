const SET_ENTRY = 'entry/setEntry';
const GET_ENTRIES = 'entry/setEntries';

export const setEntry = (entry) => ({
    type: SET_ENTRY,
    payload: entry,
});

export const setEntries = (entries) => ({
    type: GET_ENTRIES,
    payload: entries,
});

export const getEntries = (userID) => async (dispatch) => {
    const res = await fetch('/api/entry/');
    const data = await res.json();
    dispatch(setEntries(data));
};

export const addEntry = (entry, userId) => async (dispatch) => {
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
            date,
        }),
    });
    const x = await res.json();
    return dispatch(setEntry(x));
};

export const deleteEntry = (entry) => async (dispatch) => {
    const res = await fetch('/api/entry/', {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({ entry }),
    });
    const x = res.json();
    return dispatch(setEntries(x));
};

const entryReducer = (state = {}, action) => {
    let newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case SET_ENTRY:
            newState[action.payload.id] = action.payload;
            return newState;
        case GET_ENTRIES:
            for (let entry in action.payload) {
                newState[action.payload[entry].id] = action.payload[entry];
            }
            return newState;
        default:
            return state;
    }
};

export default entryReducer;
