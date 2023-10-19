import React, {useState} from "react";
import { Button } from "react-bootstrap";
import Sidebar from "../../components/Sidebar/sidebar";
import "./home.css";

export default function Home() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
      <div>
        <Sidebar show={show} onHide={handleClose} className="fixed-offcanvas" />
      </div>
    );
}