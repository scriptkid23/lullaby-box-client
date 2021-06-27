import React, { useState, useEffect } from "react";
import { Button, Modal, Form, ListGroup } from "react-bootstrap";
import { SocketContext } from "../context/socket.context";
import * as FeatherIcon from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";
import Axios from "axios";
import { baseUrl } from "../constants";
import _, { filter } from "lodash";
import { PanelContext } from "../context/panel.context";
function AddTrack() {
  const [show, setShow] = useState(false);
  const [scrollEl, setScrollEl] = useState();
  const [list, setList] = useState([]);
  const [track, setTrack] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [id, setId] = useState(null);
  const { actions } = React.useContext(PanelContext);
  const [query, setQuery] = React.useState("");
  const filterItems = (query) => {
    const items = list.filter((result) => {
      return result.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
    });
    return items;
  };
  const fetchTracks = async () => {
    const { data } = await Axios.get(baseUrl + "/audio", {
      params: { search: query },
    });
    let result = [];
    for (let i in data) {
      result.push(data[i]);
    }
    setList(result);
  };
  React.useEffect(() => {
    fetchTracks();
  }, []);
  const selectTrack = (value) => {
    setId(value._id);
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
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Search</Form.Label>
              <Form.Control
                type="text"
                value={query}
                placeholder="Enter title"
                onChange={(e) => setQuery(e.target.value)}
              />
            </Form.Group>
            <div className="list-track-body">
              <PerfectScrollbar containerRef={(ref) => setScrollEl(ref)}>
                <ListGroup variant="flush">
                  {filterItems(query).map((value, index) => {
                    return (
                      <ListGroup.Item
                        key={value._id}
                        type="button"
                        active={id === value._id ? true : false}
                        onClick={() => selectTrack(value)}
                      >
                        {value.name} | {value.artist}
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              </PerfectScrollbar>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>
            Let'go
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddTrack;
