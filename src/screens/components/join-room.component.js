import React, { useState } from "react";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";
import {Alert} from 'reactstrap'
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import { useHistory } from "react-router";
import { SocketContext } from "../../context/socket.context";
import axios from "axios";
import { baseUrl } from "../../constants";
import SelectAvatar from "./select-avatar.component";
const AlertJoinRoom = (props) => {

  return (
    <Alert color="danger" isOpen={props.visible}>
      {props.alert}
    </Alert>
  );
}

export default function JoinRoomComponent() {
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const [alert, setAlert] = useState("");
  const { actions } = React.useContext(SocketContext);
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onSubmit = async (data) => {
    let isExist = await axios.get(baseUrl + "/room/check/" + data.roomId);
    if (!isExist.data) {
      setVisible(true);
      setAlert("Room not exist 😅")
      return;
    }
    if (
      localStorage.getItem("avatar") &&
      localStorage.getItem("avatar").length > 0
    ) {
      const userId = uuidv4();
      axios.post(baseUrl + "/room/join", {
        roomId: data.roomId,
        participant: {
          userId: userId,
          name: data.name,
          avatar: localStorage.getItem("avatar"),
        },
      });
      localStorage.setItem("userId", userId);
      localStorage.setItem("name", data.name);
      // localStorage.setItem("avatar", data.avatar);
      localStorage.setItem("roomId", data.roomId);
      history.push("/room/"+data.roomId);
      setVisible(false);
      setAlert("");
    }else{
      setVisible(true);
      setAlert('Please select avatar 😉')
    }

  };
  return (
    <>
      <button
        className="btn btn-gradient-random btn-block"
        onClick={handleShow}
      >
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
              <SelectAvatar />
            </Form.Group>
          </Form>
          <AlertJoinRoom
            visible={visible}
            alert={alert}
          />
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
