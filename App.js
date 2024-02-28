import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import CryptoList from './components/CryptoList';

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/crypto-List" element={<CryptoList />} />
                    {}
                    <Route path="*" element={<CryptoList />} /> {/* Default route for the root path */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;
