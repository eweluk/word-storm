import React, { useState } from 'react';
import styles from './WordForm.styles';

function WordList({ words, onRemove, sortColumn, sortDirection, onSort, selectedFileName }) {
    const arrow = dir => dir === 'asc' ? '▲' : '▼';
    if (words.length === 0) return null;
    return (
        <>
            {selectedFileName && (
                <div style={{
                    fontFamily: 'Courier New, Courier, monospace',
                    color: '#2e3192',
                    fontSize: 14,
                    background: '#fff',
                    border: '2px solid #2e3192',
                    borderRadius: 6,
                    padding: '4px 8px',
                    maxWidth: 180,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    marginBottom: 8,
                }}>{selectedFileName}</div>
            )}
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={{ ...styles.th, width: '40%', cursor: 'pointer' }} onClick={() => onSort('word')}>
                            Word {sortColumn === 'word' && arrow(sortDirection)}
                        </th>
                        <th style={{ ...styles.th, width: '40%', cursor: 'pointer' }} onClick={() => onSort('translation')}>
                            Translation {sortColumn === 'translation' && arrow(sortDirection)}
                        </th>
                        <th style={{ ...styles.th, width: '20%' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {words.map((pair, idx) => (
                        <tr key={idx}>
                            <td style={{ ...styles.td, width: '40%' }}>{pair.word}</td>
                            <td style={{ ...styles.td, width: '40%' }}>{pair.translation}</td>
                            <td style={{ ...styles.td, width: '20%' }}>
                                <button
                                    style={styles.removeBtn}
                                    onClick={() => onRemove(idx)}
                                >
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

function WordForm({ words, setWords, selectedFileName, setSelectedFileName }) {
    const [word, setWord] = useState('');
    const [translation, setTranslation] = useState('');
    const [sortColumn, setSortColumn] = useState('word');
    const [sortDirection, setSortDirection] = useState('asc');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (word && translation) {
            setWords([...words, { word, translation }]);
            setWord('');
            setTranslation('');
        }
    };

    const handleRemove = (idx) => {
        setWords(words.filter((_, i) => i !== idx));
    };

    const handleSort = (column) => {
        const direction = sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc';
        setSortColumn(column);
        setSortDirection(direction);
    };

    const sortedWords = [...words].sort((a, b) => {
        const modifier = sortDirection === 'asc' ? 1 : -1;
        if (a[sortColumn] < b[sortColumn]) return -1 * modifier;
        if (a[sortColumn] > b[sortColumn]) return 1 * modifier;
        return 0;
    });

    return (
        <div style={styles.container}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
                <div style={{
                    background: 'linear-gradient(135deg, #fbb03b 0%, #f7e967 100%)',
                    borderRadius: 12,
                    border: '2px solid #2e3192',
                    boxShadow: '0 2px 8px #2e3192',
                    padding: 20,
                    marginBottom: 0,
                    fontFamily: 'Courier New, Courier, monospace',
                }}>
                    <form onSubmit={handleSubmit} style={styles.form}>
                        <input
                            type="text"
                            placeholder="Word"
                            value={word}
                            onChange={e => setWord(e.target.value)}
                            style={styles.input}
                        />
                        <input
                            type="text"
                            placeholder="Translation"
                            value={translation}
                            onChange={e => setTranslation(e.target.value)}
                            style={styles.input}
                        />
                        <button type="submit" style={styles.button}>Add</button>
                    </form>
                </div>
                <div style={styles.heading}>Word List</div>
                <WordList
                    words={sortedWords}
                    onRemove={handleRemove}
                    sortColumn={sortColumn}
                    sortDirection={sortDirection}
                    onSort={handleSort}
                    selectedFileName={selectedFileName}
                />
            </div>
        </div>
    );
}

export default WordForm;