import React from 'react';
import './App.css';
import { useFacade } from './app.hooks';
import { Priority } from './app.models';

const App = () => {
    const [
        state,
    ] = useFacade();

    const {
        modules,
    } = state;

    return (
        <div className="App">
            <ul>
            {
                modules.map((module, index) =>
                    <li key={index}>
                        {`${module.name} - `}

                        {<span>
                            {` Priority: ${Priority[module.priority]};`}
                        </span>}

                        {module.dependenciesNames &&
                        <span>
                            {` Dependencies: ${module.dependenciesNames?.join(', ')};`}
                        </span>}

                        <script src={module.url}/>
                    </li>
                )
            }
            </ul>
        </div>
    );
}

export default App;
