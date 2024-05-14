import React, { useState, useEffect } from 'react';

import StoryBoard from './StoryBoard';

function App() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: 'max(350px, 70%)' }}>
        <StoryBoard />
      </div>
    </div>
  );
}

export default App;
