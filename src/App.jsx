import React, { useState } from "react";
import LandingPage from './components/LandingPage';
import CircleSection from './components/CircleSection';

function App() {
  const [started, setStarted] = useState(false);
  return (
    <div>
      {started ? <CircleSection onHome={() => setStarted(false)} /> : <LandingPage onStart={() => setStarted(true)} />}
    </div>
  );
}

export default App;
