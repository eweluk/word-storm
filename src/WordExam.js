import React, { useState } from 'react';

const styles = {
    container: {
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
    fileInputWrapper: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 18,
        gap: 12,
        justifyContent: 'center',
    },
    fileInputLabel: {
        padding: '10px 24px',
        borderRadius: 6,
        border: '2px solid #2e3192',
        background: 'linear-gradient(90deg, #fbb03b 0%, #d4145a 100%)',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
        cursor: 'pointer',
        fontFamily: 'Impact, Charcoal, sans-serif',
        boxShadow: '2px 2px 0 #fff',
        textShadow: '1px 1px 0 #2e3192',
        transition: 'background 0.2s',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
    },
    fileInputHidden: {
        display: 'none',
    },
    fileName: {
        fontFamily: 'Courier New, Courier, monospace',
        color: '#2e3192',
        fontSize: 16,
        background: '#fff',
        border: '2px solid #2e3192',
        borderRadius: 6,
        padding: '6px 10px',
        maxWidth: 180,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    error: {
        color: '#d4145a',
        background: '#fff',
        border: '2px dashed #d4145a',
        padding: '6px 10px',
        borderRadius: 6,
        marginBottom: 12,
        fontWeight: 'bold',
        fontFamily: 'Courier New, Courier, monospace',
    },
    score: {
        marginBottom: 18,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#39b54a',
        textShadow: '1px 1px 0 #fff',
        fontFamily: 'Courier New, Courier, monospace',
    },
    translation: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#2e3192',
        background: '#fff',
        border: '2px solid #2e3192',
        borderRadius: 6,
        padding: '8px 12px',
        marginBottom: 14,
        display: 'inline-block',
        fontFamily: 'Courier New, Courier, monospace',
    },
    input: {
        padding: '10px 16px',
        borderRadius: 6,
        border: '2px solid #d4145a',
        fontSize: 20,
        width: '100%',
        maxWidth: 300,
        margin: '0 auto 14px auto',
        display: 'block',
        fontFamily: 'Courier New, Courier, monospace',
        background: '#fff',
        color: '#2e3192',
        boxShadow: '2px 2px 0 #f7e967',
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
    },
    feedback: {
        marginBottom: 10,
        fontWeight: 'bold',
        fontSize: 18,
        padding: '6px 10px',
        borderRadius: 6,
        background: '#fff',
        border: '2px solid #2e3192',
        color: '#d4145a',
        fontFamily: 'Courier New, Courier, monospace',
        textShadow: '1px 1px 0 #f7e967',
    },
};

function getRandomIndex(max, exclude) {
    let idx;
    do {
        idx = Math.floor(Math.random() * max);
    } while (exclude !== undefined && idx === exclude && max > 1);
    return idx;
}

function WordExam({ words, setWords }) {
    const [currentIdx, setCurrentIdx] = useState(words.length > 0 ? getRandomIndex(words.length) : null);
    const [userInput, setUserInput] = useState('');
    const [score, setScore] = useState(0);
    const [count, setCount] = useState(0);
    const [answered, setAnswered] = useState(false);
    const [error, setError] = useState('');
    const [selectedFileName, setSelectedFileName] = useState('');

    React.useEffect(() => {
        if (words.length > 0) {
            setCurrentIdx(getRandomIndex(words.length));
        } else {
            setCurrentIdx(null);
        }
    }, [words]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setSelectedFileName(file.name);
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const loadedWords = JSON.parse(event.target.result);
                if (Array.isArray(loadedWords) && loadedWords.length > 0) {
                    setWords(loadedWords);
                    setScore(0);
                    setCount(0);
                    setAnswered(false);
                    setUserInput('');
                    setError('');
                } else {
                    setError('File must contain a non-empty array.');
                }
            } catch (err) {
                setError('Invalid file format.');
            }
        };
        reader.readAsText(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!words.length || currentIdx === null) return;
        setAnswered(true);
        if (userInput.trim().toLowerCase() === words[currentIdx].word.trim().toLowerCase()) {
            setScore(score + 1);
        }
        setCount(count + 1);
    };

    const handleNext = () => {
        if (words.length < 2) return;
        let idx = getRandomIndex(words.length, currentIdx);
        setCurrentIdx(idx);
        setUserInput('');
        setAnswered(false);
    };

    const handleRestart = () => {
        setScore(0);
        setCount(0);
        setAnswered(false);
        setUserInput('');
        if (words.length > 0) {
            const idx = getRandomIndex(words.length);
            setCurrentIdx(idx);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.heading}>Word Exam</div>
            {/* Removed file input UI from WordExam view, as SideMenu now handles file upload */}
            {error && <div style={styles.error}>{error}</div>}
            <div style={styles.score}>
                Score: <b>{score} / {count}{count > 0 ? `; ${Math.round((score / count) * 100)}%` : ''}</b>
            </div>
            {words.length > 0 && currentIdx !== null && (
                <form onSubmit={handleSubmit}>
                    <div style={styles.translation}>
                        Translation: <span style={{ color: '#d4145a', fontWeight: 'bold' }}>{words[currentIdx].translation}</span>
                    </div>
                    <input
                        type="text"
                        placeholder="Enter the word"
                        value={userInput}
                        onChange={e => setUserInput(e.target.value)}
                        disabled={answered}
                        style={styles.input}
                    />
                    {!answered ? (
                        <button type="submit" style={styles.button}>Submit</button>
                    ) : (
                        <>
                            <div style={{ ...styles.feedback, color: userInput.trim().toLowerCase() === words[currentIdx].word.trim().toLowerCase() ? '#39b54a' : '#d4145a' }}>
                                {userInput.trim().toLowerCase() === words[currentIdx].word.trim().toLowerCase() ? 'Correct!' : `Incorrect. The word was: ${words[currentIdx].word}`}
                            </div>
                            {words.length > 1 && <button type="button" onClick={handleNext} style={styles.button}>Next</button>}
                            <button type="button" onClick={handleRestart} style={{ ...styles.button, ...styles.buttonSecondary }}>Restart</button>
                        </>
                    )}
                </form>
            )}
        </div>
    );
}

export default WordExam;
