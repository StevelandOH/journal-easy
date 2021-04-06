const SET_USER = 'user/setUser';
const REMOVE_USER = 'user/removeUser';

export const setUser = (user) => ({
    type: SET_USER,
    payload: user,
});

export const removeUser = () => ({
    type: REMOVE_USER,
});

export const authenticate = () => async (dispatch) => {
    const response = await fetch('/api/auth/');
    const data = await response.json();
    return dispatch(setUser(data));
};

export const login = (user) => async (dispatch) => {
    const { username, password } = user;
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            password,
        }),
    });
    const data = await response.json();
    return dispatch(setUser(data));
};

export const logout = () => async (dispatch) => {
    const response = await fetch('/api/auth/logout', {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    dispatch(removeUser());
    return response;
};

export const signUp = (user) => async (dispatch) => {
    const { name, username, password } = user;
    const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            name,
            password,
        }),
    });
    const data = await response.json();
    return dispatch(setUser(data));
};

export const restoreUser = () => async (dispatch) => {
    const response = await fetch('/api/auth/');
    const data = await response.json();
    dispatch(setUser(data));
    return response;
};

export const updateUser = (data) => async (dispatch) => {
    console.log(data[0]);
    const res = await fetch(`/api/edit/${data[0]}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(data[1]),
    });
    const user = await res.json();
    return dispatch(setUser(user));
};

const initialState = { user: null };

const userReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_USER:
            return { ...state, ...{ user: action.payload } };
        case REMOVE_USER:
            newState = Object.assign({}, state);
            newState.user = null;
            return newState;
        default:
            return state;
    }
};

export default userReducer;
