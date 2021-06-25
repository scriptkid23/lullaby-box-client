import React, { useState } from "react";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import { useHistory } from "react-router";
import { SocketContext } from "../../context/socket.context";
export default function JoinRoomComponent() {
  const [show, setShow] = useState(false);
  const {actions} = React.useContext(SocketContext);
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const onSubmit = (data) => {
    const userId  =uuidv4();
    localStorage.setItem("userId",userId);
    localStorage.setItem("name", data.name);
    localStorage.setItem("avatar", data.avatar);
    localStorage.setItem("roomId",data.roomId);
    actions.joinRoom({
      roomId: data.roomId,
      reconnect: false,
      participant: {
        userId: userId,
        name: data.name,
        avatar: data.avatar,
      },
    });
    history.push("/room/"+data.roomId);
  };
  return (
    <>
      <button className="btn btn-gradient-random btn-block" onClick={handleShow}>
        Join Room
      </button>
      <Modal
        centered
        show={show}
        onHide={handleClose}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Modal.Header closeButton>
          <Modal.Title className="font-weight-normal">Join Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>What is your name ?</Form.Label>
              <Form.Control
                {...register("name")}
                type="text"
                placeholder="Enter your name."
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Room id</Form.Label>

              <Form.Control
                {...register("roomId")}
                type="text"
                placeholder="Enter your room."
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Avatar</Form.Label>
              <Form.Control
                {...register("avatar")}
                type="text"
                placeholder="Select Avatar"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit(onSubmit)}>
            Join
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
