import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import axios from 'axios';

function App() {
  const [userId, setUserId] = useState(null);
  const [status, setStatus] = useState('');

  const backendURL = 'https://your-backend-url.onrender.com'; // <-- Replace this with your real backend URL

  const createPass = async () => {
    const res = await axios.post(`${backendURL}/api/create-pass`);
    setUserId(res.data.userId);
  };

  const clockIn = async () => {
    await axios.post(`${backendURL}/api/clock-in`, { userId });
    setStatus('Clocked in');
  };

  const clockOut = async () => {
    const res = await axios.post(`${backendURL}/api/clock-out`, { userId });
    setStatus(`Clocked out, duration: ${res.data.durationHours.toFixed(2)} hrs`);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Venue Access Pass</h1>
      <button onClick={createPass}>Create Pass</button>
      {userId && (
        <div>
          <QRCode value={userId} />
          <div style={{ marginTop: '1rem' }}>
            <button onClick={clockIn}>Clock In</button>
            <button onClick={clockOut} style={{ marginLeft: '1rem' }}>
              Clock Out
            </button>
          </div>
          <p>{status}</p>
        </div>
      )}
    </div>
  );
}

export default App;
