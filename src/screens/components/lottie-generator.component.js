import React from "react";
import Lottie from "lottie-react";
import { lottie } from "../../assets";
const style = {
    poisition:"ablusote"
}
export default function LottieGenerator() {
  return (
  
      <Lottie  style={style} loop={false} animationData={lottie.congratulation} />

  );
}
