import React from "react";
import { Modal, Image } from "react-bootstrap";

export default function OpenImage({ image, onClose }) {
  return (
    <Modal show={image ? true : false} centered onHide={onClose}>
      <Image fluid src={image} rounded />
    </Modal>
  );
}
