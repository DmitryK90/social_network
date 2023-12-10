import store from './Redux/reduxStore';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
let rerenderEntireTree = (state) => { // state - передаём store из redux созданный.
    root.render(
        <React.StrictMode>
            <App 
                state={state} // наш state, см выше.
                dispatch={store.dispatch.bind(store)}
                store={store} // это наши reducers.
            />
        </React.StrictMode>
    );
} // функция для ререндера при изменение state.
rerenderEntireTree(store.getState()); // getState - этот метом получается прописан под капотом store в redux, и передаёт наш initialState и след стейты.

store.subscribe(() => {
    let state = store.getState();
    rerenderEntireTree(state);
});
