import React, {useState} from 'react';
import WordForm from './WordForm';
import WordExam from './WordExam';
import SideMenu from './SideMenu';
import './App.css';
import FlashCard from "./FlashCard";

const switcherStyles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 24,
        padding: '24px 0 16px 0',
        background: 'linear-gradient(90deg, #f7e967 0%, #a7e9f7 100%)',
        borderBottom: '4px solid #2e3192',
        boxShadow: '0 4px 24px #2e3192',
    },
    button: {
        padding: '12px 32px',
        borderRadius: 8,
        border: '3px solid #2e3192',
        background: 'linear-gradient(90deg, #d4145a 0%, #fbb03b 100%)',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 22,
        cursor: 'pointer',
        fontFamily: 'Impact, Charcoal, sans-serif',
        boxShadow: '2px 2px 0 #fff',
        textShadow: '1px 1px 0 #2e3192',
        transition: 'background 0.2s',
        outline: 'none',
    },
    buttonActive: {
        background: 'linear-gradient(90deg, #a7e9f7 0%, #2e3192 100%)',
        color: '#fff',
        border: '3px solid #d4145a',
    },
};

function App() {
    const [view, setView] = useState('form');
    const [words, setWords] = useState([]);
    const [selectedFileName, setSelectedFileName] = useState('');

    return (
        <div>
            <SideMenu words={words} setWords={setWords} setSelectedFileName={setSelectedFileName}/>
            <div style={switcherStyles.container}>
                <button
                    style={{
                        ...switcherStyles.button,
                        ...(view === 'form' ? switcherStyles.buttonActive : {}),
                    }}
                    onClick={() => setView('form')}
                >
                    Word List
                </button>
                <button
                    style={{
                        ...switcherStyles.button,
                        ...(view === 'exam' ? switcherStyles.buttonActive : {}),
                    }}
                    onClick={() => setView('exam')}
                >
                    Word Exam
                </button>
                <button
                    style={{
                        ...switcherStyles.button,
                        ...(view === 'flash-cards' ? switcherStyles.buttonActive : {}),
                    }}
                    onClick={() => setView('flash-cards')}
                >
                    Flash Cards
                </button>
            </div>
            {
                view === 'exam' ? (
                    <WordExam words={words} setWords={setWords}/>
                ) : view === 'flash-cards' ? (
                    <FlashCard words={words} setWords={setWords}/>
                ) : (
                    <WordForm words={words} setWords={setWords} selectedFileName={selectedFileName}
                              setSelectedFileName={setSelectedFileName}/>
                )}
        </div>
    );
}

export default App;
