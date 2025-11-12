import React, { useState } from 'react';

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 420,
        margin: '48px auto',
        padding: 28,
        background: 'linear-gradient(135deg, #f7e967 0%, #a7e9f7 100%)',
        borderRadius: 12,
        border: '4px solid #2e3192',
        boxShadow: '0 0 0 8px #fff, 0 8px 32px #2e3192',
        fontFamily: 'Courier New, Courier, monospace',
        color: '#2e3192',
        textShadow: '1px 1px 0 #fff, 2px 2px 0 #a7e9f7',
        position: 'relative',
    },
    heading: {
        fontSize: 32,
        fontWeight: 'bold',
        letterSpacing: 2,
        marginBottom: 18,
        textAlign: 'center',
        color: '#d4145a',
        textShadow: '2px 2px 0 #fff, 4px 4px 0 #f7e967',
        fontFamily: 'Impact, Charcoal, sans-serif',
    },
    button: {
        padding: '10px 24px',
        borderRadius: 6,
        border: '2px solid #2e3192',
        background: 'linear-gradient(90deg, #d4145a 0%, #fbb03b 100%)',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
        cursor: 'pointer',
        marginRight: 10,
        fontFamily: 'Impact, Charcoal, sans-serif',
        boxShadow: '2px 2px 0 #fff',
        textShadow: '1px 1px 0 #2e3192',
        transition: 'background 0.2s',
    },
    buttonSecondary: {
        background: 'linear-gradient(90deg, #a7e9f7 0%, #2e3192 100%)',
        color: '#fff',
        border: '2px solid #2e3192',
        padding: '10px 24px',
        margin: '16px 0',
    },
};

function getRandomIndex(length) {
    return Math.floor(Math.random() * length);
}

export default function FlashCard({ words }) {
    const [index, setIndex] = useState(() => getRandomIndex(words.length));
    const [showTranslation, setShowTranslation] = useState(false);

    if (!words.length) return <div>No words available.</div>;

    const current = words[index];

    const nextCard = () => {
        setShowTranslation(false);
        setIndex(getRandomIndex(words.length));
    };

    return (
        <div style={styles.container}>
            <div style={styles.heading}>FlashCard</div>
            <div style={{ fontSize: 28, margin: 24 }}>
                {current.word}
            </div>
            {showTranslation ? (
                <div style={{ fontSize: 22, color: '#d4145a', marginBottom: 16 }}>
                    {current.translation}
                </div>
            ) : (
                <button style={styles.buttonSecondary} onClick={() => setShowTranslation(true)}>
                    Show Translation
                </button>
            )}
            <button style={styles.button} onClick={nextCard}>
                Next
            </button>
        </div>
    );
}
