import React, { useState } from 'react';
import axios from 'axios';

/**
 * Main application component that provides a chat interface with dark/light theme support.
 * 
 * @component
 * @returns {JSX.Element} The rendered App component
 * 
 * @state {string} inputValue - Stores the current value of the chat input field
 * @state {string} response - Stores the response from the server
 * @state {boolean} isDarkMode - Controls whether dark or light theme is active
 * 
 * @example
 * return (
 *   <App />
 * )
 * 
 * @description
 * The App component includes:
 * - Theme switching functionality between dark and light modes
 * - Chat input field with submit button
 * - Response display area with code block formatting
 * - Fixed header with theme toggle
 * - Fixed footer with GitHub link
 * - Responsive design with custom styling
 */
function App() {
  const [inputValue, setInputValue] = useState('');
  const [response, setResponse] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Add theme colors
  const theme = {
    dark: {
      background: '#0d1117',
      surface: '#161b22',
      surfaceAlt: '#1c2128',
      border: '#30363d',
      text: '#c9d1d9',
      textMuted: '#8b949e',
      accent: '#7ee787'
    },
    light: {
      background: '#ffffff',
      surface: '#f6f8fa',
      surfaceAlt: '#f0f2f4',
      border: '#d0d7de',
      text: '#1F2328',
      textMuted: '#656d76',
      accent: '#1a7f37'
    }
  };

  const currentTheme = isDarkMode ? theme.dark : theme.light;

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      // Send the user's input to the backend
      const res = await axios.post('https://satisfying-wobbly-wasabi.glitch.me', {
        userQuery: inputValue
      });
      // We'll store the response in the "response" state
      setResponse(res.data.reply);
      setInputValue(''); // Clear the input field after sending
    } catch (error) {
      console.error(error);
      setResponse("Error communicating with server");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const formatResponse = (text) => {
    const codeBlockRegex = /(```[\s\S]*?```|`[\s\S]*?`)/g;
    const parts = text.split(codeBlockRegex);

    return parts.map((part, index) => {
      if (part.startsWith('```') || part.startsWith('`')) {
        return (
          <pre key={index} style={{
            backgroundColor: '#0d1117',
            color: '#c9d1d9',
            padding: '1rem',
            borderRadius: '8px',
            margin: '1rem 0',
            fontFamily: 'ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace',
            fontSize: '14px',
            overflow: 'auto',
            border: '1px solid #30363d'
          }}>
            {part.replace(/```/g, '')}
          </pre>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: currentTheme.background,
      color: currentTheme.text,
      fontFamily: '"SF Pro Text", "SF Pro Display", -apple-system, system-ui, sans-serif',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      textRendering: 'optimizeLegibility',
      transition: 'background-color 0.2s ease, color 0.2s ease'
    }}>
      <header style={{
        padding: '1rem',  // Changed from 1.5rem to 1rem
        borderBottom: `1px solid ${currentTheme.border}`,
        backgroundColor: currentTheme.surface,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: '20px',  // Added fixed height
        position: 'fixed', // Make header fixed
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000, // Ensure header stays above other content
        backdropFilter: 'blur(10px)', // Add blur effect for better readability
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' // Add subtle shadow
      }}>
        <h1 style={{
          fontSize: '20px',  // Changed from 24px to 20px
          fontFamily: '"SF Pro Display", system-ui, sans-serif',
          fontWeight: '600',
          letterSpacing: '-0.021em',
          color: currentTheme.text,
          margin: '0',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <span style={{ color: currentTheme.accent }}>⚡</span> Airtist
        </h1>

        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          style={{
            padding: '6px 12px',  // Changed from 8px to 6px vertical padding
            backgroundColor: currentTheme.surfaceAlt,
            border: `1px solid ${currentTheme.border}`,
            borderRadius: '9999px', // Full rounded corners
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: currentTheme.text,
            fontSize: '13px',
            fontFamily: '"SF Pro Text", system-ui, sans-serif',
            fontWeight: '500',
            transition: 'all 0.2s ease',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
            // Add hover effect
            ':hover': {
              backgroundColor: currentTheme.surface,
              borderColor: currentTheme.textMuted,
              transform: 'translateY(-1px)',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }
          }}
        >
          {isDarkMode ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
              Light
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
              Dark
            </>
          )}
        </button>
      </header>

      <main style={{
        flex: 1,
        maxWidth: '900px',
        width: '100%',
        margin: '0 auto',
        padding: '2rem 1rem',
        paddingBottom: '80px', // Add padding to prevent content from being hidden behind footer
        letterSpacing: '-0.003em',
        backgroundColor: currentTheme.background,
        marginTop: '60px', // Add margin to prevent content from hiding under fixed header
      }}>
        <div style={{
          position: 'sticky',
          top: '20px',
          zIndex: 1,
          backgroundColor: currentTheme.surface,
          borderRadius: '12px',
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)',
          padding: '1.5rem',
          marginBottom: '2rem',
          border: `1px solid ${currentTheme.border}`,
        }}>
          <div style={{
            display: 'flex',
            gap: '10px',
            alignItems: 'center'
          }}>
            <input
              type="text"
              placeholder="Ask anything..."
              value={inputValue}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              style={{
                flex: 1,
                padding: '12px 16px',
                fontSize: '17px',
                fontFamily: '"SF Pro Text", system-ui, sans-serif',
                fontWeight: '400',
                letterSpacing: '-0.022em',
                backgroundColor: currentTheme.background,
                color: currentTheme.text,
                border: `1px solid ${currentTheme.border}`,
                borderRadius: '8px',
                outline: 'none',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
              }}
            />
            <button
              onClick={handleSubmit}
              style={{
                padding: '12px 24px',
                backgroundColor: currentTheme.accent,
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '15px',
                fontFamily: '"SF Pro Text", system-ui, sans-serif',
                fontWeight: '500',
                letterSpacing: '-0.015em',
                transition: 'background-color 0.2s ease',
                minWidth: '100px',
                whiteSpace: 'nowrap'
              }}
            >
              Send
            </button>
          </div>
        </div>

        {response && (
          <div style={{
            backgroundColor: currentTheme.surface,
            border: `1px solid ${currentTheme.border}`,
            borderRadius: '12px',
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)',
            overflow: 'hidden',
          }}>
            <div style={{
              padding: '1rem',
              borderBottom: `1px solid ${currentTheme.border}`,
              backgroundColor: currentTheme.surfaceAlt,
            }}>
              <strong style={{
                color: currentTheme.accent,
                fontSize: '15px',
                fontWeight: '500',
                letterSpacing: '-0.015em'
              }}>Response</strong>
            </div>
            <div style={{
              padding: '1.5rem',
              fontSize: '15px',
              lineHeight: '1.47059',
              letterSpacing: '-0.015em',
              color: currentTheme.text
            }}>
              {formatResponse(response)}
            </div>
          </div>
        )}
      </main>

      <footer style={{
        padding: '1rem',
        borderTop: `1px solid ${currentTheme.border}`,
        backgroundColor: currentTheme.surface,
        textAlign: 'center',
        fontSize: '13px',
        letterSpacing: '-0.01em',
        color: currentTheme.textMuted,
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backdropFilter: 'blur(10px)',
        boxShadow: '0 -1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        <a
          href="https://github.com/froster02/AI-chatbot.git"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: currentTheme.textMuted,
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'color 0.2s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.color = '#58a6ff'}
          onMouseOut={(e) => e.currentTarget.style.color = currentTheme.textMuted}
        >
          <svg height="14" viewBox="0 0 16 16" width="14" style={{ fill: 'currentColor' }}>
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
          </svg>
          froster02
        </a>
      </footer>
    </div>
  );
}

export default App;