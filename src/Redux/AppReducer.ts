import {getAuthUserData} from "./AuthReducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

export type InitialStateType = {
    initialized: boolean,
}
let initialState: InitialStateType = {
    initialized: false,
};

const AppReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS: {
            return {
                ...state,
                initialized: true,
            }
        }
        default:
            return {
                ...state
            }
    }
}

export type initializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}
export const initializedSuccess = ():initializedSuccessActionType => ({type: INITIALIZED_SUCCESS});

// ниже это thunk creator:
export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData()); // диспатчим получение авторизационных данных. Из thunk вернтся promise, т.е. дожидаемся окончания thunk.
    Promise.all([promise]).then(() => { // когда все промисы из массивы выпонены(но пока у нас один), то...
        dispatch(initializedSuccess());
    })

}

export default AppReducer;