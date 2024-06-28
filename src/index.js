import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

let fnc = () => {
    try {
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(
            <App />
        );
    }
    catch (e) {
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(
            <>
                <div className="jbg text-lg text-center p-2">
                    Something went wrong.
                    <br />
                    <hr />
                    {
                        JSON.stringify(e)
                    }
                </div>
            </>
        );
    }
};

fnc()