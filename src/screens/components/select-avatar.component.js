import React from "react";
import { Image } from "react-bootstrap";
import { unicorn } from "../../assets";

export default function SelectAvatar() {
    const [active, setActive] = React.useState();
    const handleSelect = (value) => {
        setActive(value);
        localStorage.setItem("avatar",value);
    }
  return (
    <div>
      {unicorn.map((value, index) => {
        return (
          <Image
            onClick={() => handleSelect(value)}
            key={index}
            src={value}
            thumbnail
            roundedCircle
            width={50}
            height={50}
            className={`mr-1 ${active === value ? 'avatar-active': ''}`}
          />
        );
      })}
    </div>
  );
}
