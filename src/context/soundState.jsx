import { createContext, useRef, useEffect, useState, useCallback } from 'react';

export const SOUND_SOURCES = [
  { name: 'Ring', value: './sounds/clock-01.mp3' },
  { name: 'Bell', value: './sounds/clock-02.mp3' },
  { name: 'Beep', value: './sounds/beep.wav' },
  { name: 'Fog Horn', value: './sounds/fog-horn.mp3' },
  { name: 'Shutdown', value: './sounds/win-xp-shutdown.mp3' },
];

export const SoundContext = createContext({});

export function SoundProvider({ children }) {
  const [volume, setVolume] = useState(0.5);
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);

  const mediaElement = useRef(null);

  const play = useCallback(() => {
    if (!loaded || mediaElement.current === null) return;

    setPlaying(true);
    mediaElement.current.play();
  }, [mediaElement.current, loaded]);

  const stop = useCallback(() => {
    setPlaying(false);
    mediaElement.current.pause();
    mediaElement.current.currentTime = 0;
  }, [mediaElement.current]);

  const stopped = () => {
    setPlaying(false);
  };

  const updateSource = useCallback(
    (value) => {
      if (mediaElement.current === null) return;

      setPlaying(false);
      setLoaded(false);
      mediaElement.current.src = value;
    },
    [mediaElement.current]
  );

  const loadedSource = () => {
    setLoaded(true);
  };

  const updateVolume = useCallback(
    (value) => {
      if (mediaElement.current === null) return;

      setVolume(value);
      mediaElement.current.volume = value;
    },
    [mediaElement.current]
  );

  useEffect(() => {
    mediaElement.current.src = SOUND_SOURCES[0].value;
    mediaElement.current.volume = volume;
    mediaElement.current.addEventListener('canplay', loadedSource);
    mediaElement.current.addEventListener('ended', stopped);

    return () => {
      console.log('removed');
      mediaElement.current.removeEventListener('canplay', loadedSource);
      mediaElement.current.removeEventListener('ended', stopped);
    };
  }, []);

  useEffect(() => {
    console.count('Updated audio context');
    // console.log(volume, loaded, playing, mediaElement.current)
  });

  return (
    <SoundContext.Provider
      value={{
        volume,
        loaded,
        playing,
        play,
        stop,
        updateSource,
        updateVolume,
      }}>
      <audio id="beep" ref={mediaElement} preload="auto" />
      {children}
    </SoundContext.Provider>
  );
}
