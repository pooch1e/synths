import { createContext, useContext, useRef, useCallback } from "react";

const AudioCtx = createContext(null);

export function AudioProvider({ children }) {
  const audioRef = useRef(null);

  const initAudio = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioRef.current;
  }, []);

  return (
    <AudioCtx.Provider value={{ audioContext: audioRef, initAudio }}>
      {children}
    </AudioCtx.Provider>
  );
}

export function useAudio() {
  return useContext(AudioCtx);
}