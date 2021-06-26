import React from "react";
import { Image } from "react-bootstrap";
import { room } from "../../assets";
export default function SelectRoomIcon() {
  const [active, setActive] = React.useState();
  const handleSelect = (value) => {
    setActive(value);
    localStorage.setItem("roomIcon", value);
  };
  return (
    <div>
      {room.map((value, index) => {
        return (
          <Image
            onClick={() => handleSelect(value)}
            key={index}
            src={value}
            style={{
              objectFit: "cover",
            }}
            roundedCircle
            width={40}
            height={40}
            className={`mr-1 img-thumbnail-customize ${
              active === value ? "room-icon-active" : ""
            }`}
          />
        );
      })}
    </div>
  );
}
