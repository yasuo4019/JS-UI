import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Container, Nav, ButtonGroup } from "react-bootstrap";
import TableViewDropdown from "./navigation/TableViewDropdown";
import TableEditDropdown from "./navigation/TableEditDropdown";
import UploadDropdown from "./navigation/UploadDropdown";
import AuthButton from "../../Components/auth/AuthButton";

const Navigation = () => (
    <div id="id_appNavigation">
        <Navbar variant="light">
            <Container>
                <Navbar.Brand>
                    <strong>HGSV</strong>
                </Navbar.Brand>
                <Nav className="me-auto" as="ul" defaultActiveKey="/">
                    <Nav.Item as="li">
                        <Nav.Link as="span">
                            <NavLink to="/">Home</NavLink>
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                        <Nav.Link as="span">
                            <NavLink to="/contacts">Contacts</NavLink>
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                        <Nav.Link as="span">
                            <NavLink to="/about">About us</NavLink>
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
                <div className="justify-content-end">
                    <ButtonGroup>
                        <TableViewDropdown className="mx-2" />
                        <TableEditDropdown className="mx-2" />
                        <UploadDropdown className="mx-2" />
                    </ButtonGroup>
                    <AuthButton />
                </div>
            </Container>
        </Navbar>
    </div>
);

export default Navigation;
