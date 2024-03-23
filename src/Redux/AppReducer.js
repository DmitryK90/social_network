import {getAuthUserData} from "./AuthReducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

let initialState = {
    initialized: false,
}

const AppReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS: {
            return {
                ...state,
                initialized: true
            }
        }
        default:
            return {
                ...state
            }
    }
}

export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS});

// ниже это thunk creator:
export const initializeApp = () => (dispatch) => {
    let promise = dispatch(getAuthUserData()); // диспатчим получение авторизационных данных. Из thunk вернтся promise, т.е. дожидаемся окончания thunk.
    Promise.all([promise]).then(() => { // когда все промисы из массивы выпонены(но пока у нас один), то...
        dispatch(initializedSuccess());
    })

}

export default AppReducer;