import React from "react";
import logo from "./logo.svg";
import "./App.css";
import AudioPlayer from "../audio/audio.player";
import { SocketContext } from "../context/socket.context";
const tracks = [
  {
    title: "Cali",
    artist: "Wataboi",
    audioSrc:
      "https://cf-media.sndcdn.com/KOjOJXYKGde1.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLW1lZGlhLnNuZGNkbi5jb20vS09qT0pYWUtHZGUxLjEyOC5tcDMiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE2MjQ0MjA1Mzd9fX1dfQ__&Signature=FdTAQVI5VkpO9BjjaCEogFFP8efEUyq-JaC52sGWnRBEYmFJ3MkAyw47AFQz16JVcPSi2UdD6ilq756wtdm8fJwolhWRhib6oGakjI650SP8kbz-DRjqEazlyeIqoJn-cjABLx2n6ZGY01qBi6~7Ddmi9PZmo-hHGwRH4wvEXuEktQ87fnP1ERlUWaDnI-Y57bM-nct1W6WUGKaIUkCRrG6u6dPCyMI-lTXCrRrxPwpPD8MR6qHyEkqiVuEuxyPq3y4UwceJ4rVnWnt4w~77PCYINPBOoWchftzlMw6~RAY~SC1p561e3rEhYxKaDszLMdKkXeBnydUYubi0OXjqYw__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ",
    image: "https://i1.sndcdn.com/avatars-eZz2vSyDPYLl6J1Y-0LETkg-original.jpg",
    color: "#00aeb0",
  },
];
function App() {
  const socket = React.useContext(SocketContext);
  console.log(socket)
  return (
    <>
      <AudioPlayer tracks={tracks} />
    </>
  );
}

export default App;
