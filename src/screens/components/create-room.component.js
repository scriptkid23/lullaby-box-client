import React, { useState } from "react";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router";
import { SocketContext } from "../../context/socket.context";
import Axios from "axios";
import { baseUrl } from "../../constants";
export default function CreateRoomComponent() {
  const [show, setShow] = useState(false);
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { state, actions } = React.useContext(SocketContext);
  const copyId = () => {
    /* Get the text field */
    var copyText = document.getElementById("roomId");

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    document.execCommand("copy");

    /* Alert the copied text */
  };
  const onSubmit = async (data) => {
    let userId = uuidv4();
    let result = await Axios.post(baseUrl + "/room/create", {
      roomId: data.roomId,
      name: data.room,
    });
    if (result) {
      actions.joinRoom({
        roomId: data.roomId,
        reconnect: false,
        participant: {
          userId: userId,
          name: data.name,
          avatar: data.avatar,
        },
      });
      localStorage.setItem("userId", userId);
      localStorage.setItem("name", data.name);
      localStorage.setItem("room", data.room);
      localStorage.setItem("avatar", data.avatar);
      localStorage.setItem("roomId", data.roomId);
      history.push("/room/" + data.roomId);
    }
  };
  return (
    <>
      <button
        className="btn btn-gradient-primary btn-block"
        onClick={handleShow}
      >
        Create Room
      </button>
      <Modal
        centered
        show={show}
        onHide={handleClose}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Modal.Header closeButton>
          <Modal.Title className="font-weight-normal">Create Room</Modal.Title>
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
              <Form.Label>Room name</Form.Label>

              <Form.Control
                {...register("room")}
                type="text"
                placeholder="Enter your room."
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Room Id</Form.Label>
              <InputGroup>
                <Form.Control
                  id="roomId"
                  readonly="readonly"
                  {...register("roomId")}
                  type="text"
                  defaultValue={uuidv4()}
                />
                <InputGroup.Prepend onClick={copyId}>
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faClipboard} />
                  </InputGroup.Text>
                </InputGroup.Prepend>
              </InputGroup>
              <Form.Text className="text-muted">
                Send room id for your friend
              </Form.Text>
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
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
