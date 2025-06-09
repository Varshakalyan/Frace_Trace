import React, { useState } from 'react';

function IDVerifier() {
  const [features, setFeatures] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/verify-id', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ features: JSON.parse(features) }), 
      });

      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      console.error('Error verifying ID:', error);
      setResult('Error verifying ID');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Features (JSON array):
          <input
            type="text"
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
          />
        </label>
        <button type="submit">Verify ID</button>
      </form>
      {result && <p>Result: {result}</p>}
    </div>
  );
}

export default IDVerifier;
