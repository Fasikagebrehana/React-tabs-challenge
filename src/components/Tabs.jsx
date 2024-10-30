import React, { useState } from 'react';
import './Tabs.css';

const Tabs = () => {
    const [dataList, setDataList] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState(1);

    const fetchData = async (endpoint, tabId) => {
        setLoading(true);
        setError(null);
        setActiveTab(tabId);

        try {
            const response = await fetch(`https://baconipsum.com/api/?type=meat-and-filler&sentences=${endpoint}`);
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            const data = await response.json();
            setDataList(data.join(' '));
        } catch (error) {
            setError(`Failed to fetch: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };
    const tabs = [
        { id: 1, title: 'Tab 1', endpoint: 4 },
        { id: 2, title: 'Tab 2', endpoint: 6 },
        { id: 3, title: 'Tab 3', endpoint: 8 },
        { id: 4, title: 'Tab 4', endpoint: 10 },
    ];

    return (
        <div className="container">
            <div className="tabs">
                {tabs.map(tab => (
                    <button 
                        key={tab.id} 
                        onClick={() => fetchData(tab.endpoint, tab.id)}
                        className={activeTab === tab.id ? 'active' : ''}>
                        {tab.title}
                    </button>
                ))}
            </div>
            <div className="content">
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                {!loading && !error && dataList && (
                    <>
                        <h2>Title {activeTab}</h2>
                        <p>{dataList}</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default Tabs;
