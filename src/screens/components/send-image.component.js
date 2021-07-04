import React from "react";
import { Modal, Button, Image } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
export default function SendImage({ file, actions, replyId, replyMessage }) {
  const [image, setImage] = React.useState(null);
  const onClose = () => {
    actions.setImageFile(null);
  };
  const fileToBase64 = async (file) => {
    if (file) {
      console.log(file);
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImage(e.target.result);
      };
    }
  };
  const onSend = () => {
    let request = {
      roomId: localStorage.getItem("roomId"),
      message: {
        id: uuidv4(),
        userId: localStorage.getItem("userId"),
        name: localStorage.getItem("name"),
        avatar: localStorage.getItem("avatar"),
        message: image,
        type: "image",
        replyId: replyId,
        replyMessage: replyMessage,
      },
    };
    actions.sendMessage(request);
    actions.setImageFile(null);
  };
  React.useLayoutEffect(() => {
    fileToBase64(file);
  }, [file]);

  return (
    <Modal show={file ? true : false} centered onHide={onClose}>
      <Modal.Body className="text-center">
        <Image fluid src={image} rounded />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onSend}>
          Send
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
