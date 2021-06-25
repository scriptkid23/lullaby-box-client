import React, { useRef, useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import AudioControls from "../../audio/audio.control";

import { Badge } from "reactstrap";

import AddTrack from "../../track/add.track";
import { PanelContext } from "../../context/panel.context";

export default function Panel() {
  console.log("panel render");
  const { state, actions } = React.useContext(PanelContext);

  const { title, artist, image, audioSrc } = state.tracks[state.trackIndex];
  const [trackProgress, setTrackProgress] = useState(0);
  const audioRef = useRef(new Audio(audioSrc));
  const intervalRef = useRef();
  const isReady = useRef(false);
  const { duration } = audioRef.current;
  const currentPercentage = duration
    ? `${(trackProgress / duration) * 100}%`
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
        setTrackProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  };
  const onScrub = (value) => {
    // Clear any timers already running
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
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
      state.socket.sendSetTrackIndex({
        roomId: localStorage.getItem("roomId"),
        trackIndex: state.tracks.length - 1,
      });
    } else {
      // actions.setTrackIndex(state.trackIndex - 1);
      state.socket.sendSetTrackIndex({
        roomId: localStorage.getItem("roomId"),
        trackIndex: state.trackIndex - 1,
      });
    }
  };

  const toNextTrack = () => {
    if (state.trackIndex < state.tracks.length - 1) {
      // actions.setTrackIndex(state.trackIndex + 1);
      state.socket.sendSetTrackIndex({
        roomId: localStorage.getItem("roomId"),
        trackIndex: state.trackIndex + 1,
      });
    } else {
      // actions.setTrackIndex(0);
      state.socket.sendSetTrackIndex({
        roomId: localStorage.getItem("roomId"),
        trackIndex: 0,
      });
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
    setTrackProgress(audioRef.current.currentTime);

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

  console.log(state);
  return (
    <div className={`sidebar-group`}>
      <div className="sidebar active">
        <header>
          <div className="d-flex align-items-center">
            <span className="sidebar-title">Track</span>
          </div>
          <ul className="list-inline">
            <li className="list-inline-item">
              <AddTrack />
            </li>
          </ul>
        </header>
        <div className="sidebar-body">
          <PerfectScrollbar>
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
                value={trackProgress}
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
            <div className="d-flex flex-wrap justify-content-center">
              {state.participants &&
                state.participants.map((value, index) => {
                  return (
                    <Badge className="m-2" color="primary" key={value.userId}>
                      {value.name}
                    </Badge>
                  );
                })}
            </div>
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  );
}
