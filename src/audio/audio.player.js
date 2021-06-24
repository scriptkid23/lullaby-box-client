import { Button } from "react-bootstrap";
import React, { useState, useEffect, useRef } from "react";
import { SocketContext } from "../context/socket.context";
import AudioControls from "./audio.control";
import AddTrack from "../track/add.track";
const AudioPlayer = ({ tracks }) => {
  // const [trackIndex, setTrackIndex] = useState(0);
  // const [trackProgress, setTrackProgress] = useState(0);

  const { state, actions } = React.useContext(SocketContext);

  const { title, artist, image, audioSrc } = tracks[state.trackIndex];

  const audioRef = useRef(new Audio(audioSrc));
  const intervalRef = useRef();
  const isReady = useRef(false);

  const { duration } = audioRef.current;
  const currentPercentage = duration
    ? `${(state.trackProgress / duration) * 100}%`
    : "0%";
  const trackStyling = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
  `;

  const startTimer = () => {
    // Clear any timers already running
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        toNextTrack();
      } else {
        actions.setTrackProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  };
  const onScrub = (value) => {
    // Clear any timers already running
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    actions.setTrackProgress(audioRef.current.currentTime);
  };
  const onScrubEnd = () => {
    // If not already playing, start
    if (!state.isPlaying) {
      actions.setIsPlaying(true);
    }
    startTimer();
  };

  const toPrevTrack = () => {
    if (state.trackIndex - 1 < 0) {
      // actions.setTrackIndex(tracks.length - 1);
      state.socket.sendSetTrackIndex({ trackIndex: tracks.length - 1 });
    } else {
      // actions.setTrackIndex(state.trackIndex - 1);
      state.socket.sendSetTrackIndex({ trackIndex: state.trackIndex - 1 });
    }
  };

  const toNextTrack = () => {
    if (state.trackIndex < tracks.length - 1) {
      // actions.setTrackIndex(state.trackIndex + 1);
      state.socket.sendSetTrackIndex({ trackIndex: state.trackIndex + 1 });
    } else {
      // actions.setTrackIndex(0);
      state.socket.sendSetTrackIndex({ trackIndex: 0 });
    }
  };

  useEffect(() => {
    if (state.isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      audioRef.current.pause();
    }
  }, [state.isPlaying]);

  // Handles cleanup and setup when changing tracks
  useEffect(() => {
    audioRef.current.pause();

    audioRef.current = new Audio(audioSrc);
    actions.setTrackProgress(audioRef.current.currentTime);

    if (isReady.current) {
      audioRef.current.play();
      actions.setIsPlaying(true);
      startTimer();
    } else {
      // Set the isReady ref as true for the next pass
      isReady.current = true;
    }
  }, [state.trackIndex]);

  useEffect(() => {
    // Pause and clean up on unmount
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);
  return (
    <div className="audio-player">
      <div className="track-info">
        <img
          className={`artwork ${state.isPlaying && "active"}`}
          src={image}
          alt={`track artwork for ${title} by ${artist}`}
        />
        <h2 className="title">{title}</h2>
        <h3 className="artist">{artist}</h3>
        <AudioControls
          isPlaying={state.isPlaying}
          onPrevClick={toPrevTrack}
          onNextClick={toNextTrack}
          onPlayPauseClick={actions.setIsPlaying}
        />
        <input
          type="range"
          value={state.trackProgress}
          step="1"
          min="0"
          max={duration ? duration : `${duration}`}
          className="progress"
          onChange={(e) => onScrub(e.target.value)}
          onMouseUp={onScrubEnd}
          onKeyUp={onScrubEnd}
          style={{ background: trackStyling }}
        />
      </div>
      <div className="d-flex justify-content-center">
        <AddTrack />
      </div>
    </div>
  );
};
export default AudioPlayer;
