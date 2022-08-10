import React from 'react';
import './App.css';
import { useFacade } from './app.hooks';

const App = () => {
    const [
        state,
    ] = useFacade();

    const {
        isLoading,
        modules
    } = state;

    if (isLoading) {
        return <></>
    }

    return (
        <div className="App">

            
        </div>
    );
}

export default App;
