import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { SocketContext } from "../context/socket.context";
function AddTrack() {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [audioSrc, setAudioSrc] = useState("");
  const [image, setImage] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { state, actions } = React.useContext(SocketContext);
  const addTrack = () => {
    actions.addTrack({
      title: title,
      artist: artist,
      audioSrc: audioSrc,
      image: image,
    });
    setShow(false);
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Track
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Track</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="email"
                value={title}
                placeholder="Enter title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Artist</Form.Label>
              <Form.Control
                type="text"
                placeholder="type artist"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Audio Source</Form.Label>
              <Form.Control
                type="text"
                placeholder="type audio source"
                value={audioSrc}
                onChange={(e) => setAudioSrc(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="type image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addTrack}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddTrack;
