import React from "react";
import lottie from "lottie-web";



export default function LottieGenerator(props) {

  const effect = React.useRef(null);
  const effectContainer = React.useRef(null);
  
 
  const trigger = () => {
    effectContainer.current.classList.remove("chat-effect-hide");
    effect.current.goToAndPlay(0, true);
  };
  React.useEffect(() => {
    effectContainer.current = document.getElementById("chat-effect");
    effect.current = lottie.loadAnimation({
      wrapper: effectContainer.current,
      animType: 'svg',
      path: props.path,
      loop: false,
      autoplay: false,
    });

    effect.current.addEventListener("complete", () => {
      effectContainer.current.classList.add("chat-effect-hide");
      props.actions.setStateEffect(false);
    });
  }, []);
  React.useEffect(() => {
    if(props.effect){
      trigger();
    } 
  },[props.effect])
  return (
    <React.Fragment>
      <div className="chat-effect chat-effect-hide" id="chat-effect"></div>
    </React.Fragment>
  );
}
