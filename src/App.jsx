import { useState } from 'react'
import reactLogo from './assets/react.svg'
import appLogo from '/favicon.svg'
import PWABadge from './PWABadge.jsx'

function App() {
  const [count, setCount] = useState(4)

  const buttonStyle = {
    width: '150px',
    height: '150px',
    background: 'linear-gradient(135deg, #d3c0b6, #b8a89e)', // 莫兰迪色系渐变
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    color: '#fff',
    cursor: 'pointer',
    transition: 'transform 0.2s',
  };

  const handleButtonClick = () => {
    setCount(count + 1);
  };

  return (
    <>
      <div className="flex flex-row justify-center">
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <h1>witness</h1>
      </div>
      
      <PWABadge />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <div
          style={buttonStyle}
          onClick={handleButtonClick}
          onMouseDown={() => (buttonStyle.transform = 'scale(0.95)')}
          onMouseUp={() => (buttonStyle.transform = 'scale(1)')}
        >
          {count}
        </div>
      </div>
    </>
  )
}

export default App
