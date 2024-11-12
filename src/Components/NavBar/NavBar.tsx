import { FC, useContext } from "react";
import { Container, Nav, Navbar, NavDropdown, Offcanvas } from "react-bootstrap";
import styles from "./NavBar.module.css"
import { UserContext } from "../../Contexts/Context";
import UserAvatar from "../UserAvatar/UserAvatar"

const NavBar: FC = () => {
    const expand = false;
    const WEB_SITE_NAME = "Web Site";
    // const user = null;
    const {user} = useContext(UserContext);
    
    return (
        <Navbar expand={expand} className="bg-body-tertiary mb-3" sticky="top" bg="dark" data-bs-theme="dark">
            <Container fluid>
                <Navbar.Brand href="/">{WEB_SITE_NAME}</Navbar.Brand>
                {/* Додаємо текст користувача зліва від Navbar.Offcanvas */}
                <div className="d-flex align-items-center">
                    {user && <><Navbar.Text className="me-3">
                        Signed in as: <span className={styles.UserNameColor}>{user.fullName}</span>
                    </Navbar.Text>
                        {/* Контейнер для фото пользователя*/}
                        <UserAvatar avatar={user.avatar}/>
                    </>
                    }

                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                </div>
                <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-${expand}`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                    placement="end"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                            {WEB_SITE_NAME}
                        </Offcanvas.Title>

                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <Nav.Link href="/">Home</Nav.Link>
                            <NavDropdown
                                title="Authorization"
                                id={`offcanvasNavbarDropdown-expand-${expand}`}
                            >
                                <NavDropdown.Item href="/login">Sing in</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/register">Sing up</NavDropdown.Item>
                            </NavDropdown>

                        </Nav>
                    </Offcanvas.Body>

                </Navbar.Offcanvas>

            </Container>
        </Navbar>
    );
}

export default NavBar;