import React, {useState }from "react";
import {
  Button,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";
import * as FeatherIcon from "react-feather";


export default function Emoji() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () =>
    setDropdownOpen((prevState) => {
      return !prevState;
    });
  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle
        tag="span"
        data-toggle="dropdown"
        aria-expanded={dropdownOpen}
      >
        <Button color="light" className="mr-3" title="Emoji">
          <FeatherIcon.Smile />
        </Button>
      </DropdownToggle>
      <DropdownMenu>
        <h1>dropdown</h1>
      </DropdownMenu>
    </Dropdown>
  );
}
