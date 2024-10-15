import React from 'react'
import { Navbar , Nav , Container , Form , FormControl , Button , Image } from 'react-bootstrap'


const AdminNavbar = () => {
  return (
    <div>
      <Navbar bg="transparent" variant="dark" expand="lg" className="mb-4">
      <Container fluid>
        <Navbar.Brand href="/admin/dashboard">Hello , Admin</Navbar.Brand>
        <Navbar.Toggle aria-controls="admin-navbar-nav" />
        <Navbar.Collapse id="admin-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Form className="d-flex me-3">
            <FormControl
              type="search"
              placeholder="Search Users"
              className="me-2"
              aria-label="Search"
              
            />
            
          </Form>
          <Nav className="align-items-center">
            <Image
              
              roundedCircle
              width="40"
              height="40"
              className="me-2"
              alt="Profile"
            />
            <Button variant="outline-light" style={{backgroundColor:'red'}} >
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default AdminNavbar
