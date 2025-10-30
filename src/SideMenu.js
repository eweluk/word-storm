import React, { useState } from 'react';

const styles = {
    sidebar: {
        position: 'fixed',
        left: 0,
        top: 0,
        height: '100%',
        width: 140,
        background: 'linear-gradient(135deg, #a7e9f7 0%, #f7e967 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 120,
        boxShadow: '2px 0 8px #2e3192',
        zIndex: 1000,
        transition: 'transform 0.3s ease',
        borderRight: '4px solid #2e3192',
    },
    sidebarOpen: {
        transform: 'translateX(0)'
    },
    sidebarClosed: {
        transform: 'translateX(-150px)'
    },
    burger: {
        position: 'fixed',
        top: 16,
        left: 16,
        zIndex: 1100,
        background: 'linear-gradient(90deg, #fbb03b 0%, #d4145a 100%)',
        border: '2px solid #2e3192',
        borderRadius: 6,
        cursor: 'pointer',
        padding: 0,
        width: 40,
        height: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '2px 2px 0 #fff',
    },
    burgerIcon: {
        fontSize: 28,
        color: '#2e3192',
        lineHeight: 1,
        fontFamily: 'Impact, Charcoal, sans-serif',
    },
    sidebarBtn: {
        padding: '10px 24px',
        borderRadius: 6,
        border: '2px solid #2e3192',
        background: 'linear-gradient(90deg, #d4145a 0%, #fbb03b 100%)',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        width: '90%',
        margin: '10px 0',
        fontFamily: 'Impact, Charcoal, sans-serif',
        boxShadow: '2px 2px 0 #fff',
        textShadow: '1px 1px 0 #2e3192',
        transition: 'background 0.2s',
    },
    sidebarFileInputWrapper: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        width: '90%',
        justifyContent: 'center',
        margin: '10px 0',
    },
    sidebarFileInputLabel: {
        padding: '10px 18px',
        borderRadius: 6,
        border: '2px solid #2e3192',
        background: 'linear-gradient(90deg, #fbb03b 0%, #d4145a 100%)',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
        cursor: 'pointer',
        fontFamily: 'Impact, Charcoal, sans-serif',
        boxShadow: '2px 2px 0 #fff',
        textShadow: '1px 1px 0 #2e3192',
        transition: 'background 0.2s',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
    },
    sidebarFileInputHidden: {
        display: 'none',
    },
};

function SideMenu({ words, setWords, setSelectedFileName }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Provide a fallback if setSelectedFileName is not passed
    const safeSetSelectedFileName = typeof setSelectedFileName === 'function' ? setSelectedFileName : () => {};

    const handleDownload = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(words, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "words.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        safeSetSelectedFileName(file.name);
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const loadedWords = JSON.parse(event.target.result);
                if (Array.isArray(loadedWords)) {
                    setWords(loadedWords);
                }
            } catch (err) {
                alert('Invalid file format.');
            }
        };
        reader.readAsText(file);
    };

    const handleClearAll = () => {
        setWords([]);
        safeSetSelectedFileName('');
    };

    return (
        <>
            <button
                aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
                style={styles.burger}
                onClick={() => setSidebarOpen(!sidebarOpen)}
            >
                <span style={styles.burgerIcon}>☰</span>
            </button>
            <div
                style={{
                    ...styles.sidebar,
                    ...(sidebarOpen ? styles.sidebarOpen : styles.sidebarClosed)
                }}
            >
                <button
                    onClick={handleDownload}
                    disabled={words.length === 0}
                    style={styles.sidebarBtn}
                >
                    Download
                </button>
                <div style={styles.sidebarFileInputWrapper}>
                    <label htmlFor="sidemenu-file" style={styles.sidebarFileInputLabel}>
                        <span role="img" aria-label="upload">📁</span> Choose File
                    </label>
                    <input
                        id="sidemenu-file"
                        type="file"
                        accept="application/json"
                        onChange={handleFileChange}
                        style={styles.sidebarFileInputHidden}
                    />
                </div>
                <button
                    onClick={handleClearAll}
                    disabled={words.length === 0}
                    style={{ ...styles.sidebarBtn, background: '#d4145a' }}
                >
                    Clear All
                </button>
            </div>
        </>
    );
}

export default SideMenu;
