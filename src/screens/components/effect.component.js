import axios from "axios";
import React from "react";
import { baseUrl } from "../../constants";
import LottieGenerator from "./lottie-generator.component";
export default function LottieEffect({ effect, effects, actions, effectName }) {
  return (
    <React.Fragment>
      {effects.map((value, index) => {

        return (
          effectName === value.keywork && (
            <LottieGenerator
              effect={effect}
              key={value._id}
              path={value.url}
              actions={actions}
            />
          )
        );
      })}
    </React.Fragment>
  );
}
