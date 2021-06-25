import React, { useState, useEffect } from "react";
import { Button, Modal, Form, ListGroup } from "react-bootstrap";
import { SocketContext } from "../context/socket.context";
import * as FeatherIcon from "react-feather";
import Axios from "axios";
import { baseUrl } from "../constants";
import _, { filter } from "lodash";
import { PanelContext } from "../context/panel.context";
function AddTrack() {
  const [show, setShow] = useState(false);
  const [list, setList] = useState([]);
  const [track, setTrack] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { state, actions } = React.useContext(PanelContext);
  const [query, setQuery] = React.useState("");
  const search = async (e) => {
    e.preventDefault();
    const { data } = await Axios.get(baseUrl + "/audio", {
      params: { search: query },
    });
    console.log(data);
    let result = [];
    for (let i in data) {
      result.push(data[i]);
    }
    setList(result);
  };
  const selectTrack = (value) => {
    var filtered = list.filter((data, index, arr) => {
      return data.title !== value.title;
    });
    setList(filtered);
    console.log(value);
    setTrack(value);
  };
  const handleSubmit = () => {
    let obj = {
      roomId: localStorage.getItem("roomId"),
      track: track,
    };
    actions.addTrack(obj);
    setTrack([]);
    setShow(false);
  };

  return (
    <>
      <a
        href="#/"
        onClick={handleShow}
        className="btn btn-outline-light sidebar-close"
      >
        <FeatherIcon.Plus />
      </a>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Track</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => search(e)}>
            <Form.Group className="mb-3">
              <Form.Label>Search</Form.Label>
              <Form.Control
                type="text"
                value={query}
                placeholder="Enter title"
                onChange={(e) => setQuery(e.target.value)}
              />
            </Form.Group>
            <ListGroup>
              {list.map((value, index) => {
                return (
                  <ListGroup.Item
                    key={value._id}
                    type="button"
                    onClick={() => selectTrack(value)}
                  >
                    {value.name} | {value.artist}
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={search}>
            Search
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Let'go
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddTrack;
