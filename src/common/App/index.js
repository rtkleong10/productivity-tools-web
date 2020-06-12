import React from 'react';
import { Provider } from 'react-redux';

import AppRouter from '../AppRouter';
import store from '../../redux/store';

/** This component is the entrypoint of the react app */
function App() {
    return (
        <Provider store={store}>
            <AppRouter />
        </Provider>
    );
}

export default App;