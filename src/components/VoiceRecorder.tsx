import { useState } from "react";
import Siriwave from "react-siriwave";

const VoiceRecorder = () => {
  const [counter, setCounter] = useState(false);

  return (
    <div className="h-10 w-10">
      <Siriwave theme="ios9" />
      <button onClick={() => setCounter(!counter)}>start/stop</button>
    </div>
  );
};

export default VoiceRecorder;
