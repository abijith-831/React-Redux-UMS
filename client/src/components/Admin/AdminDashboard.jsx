import React, { useState, useEffect } from 'react';
import { Table, Button, Spinner, Alert  ,FormControl , Modal , Form} from 'react-bootstrap';
import axiosInstance from '../../api/axios'; 
import '../css/dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../../redux/adminSlice';


const AdminDashboard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const [searchItems , setSearchItems] = useState('')

  const [showModal , setShowModal] = useState(false)
  const [selected , setSelected] = useState(null)
  const [newName , setNewName] = useState('')
  const [newEmail , setNewEmail] = useState('')

  

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        };
        const response = await axiosInstance.get('http://localhost:5002/api/admin/dashboard', config);
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        const message =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          'Failed to fetch users.';
        setError(message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);



  const handleEditUser = (user)=>{
    setShowModal(true)
    setSelected(user)
    setNewName(user.name)
    setNewEmail(user.email)
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
  
    const updatedUser = {
      name: newName,
      email: newEmail,
      id: selected._id,
    };
  
    try {
      await dispatch(updateUser(updatedUser));

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === updatedUser.id ? { ...user, name: newName, email: newEmail } : user
        )
      );
      setShowModal(false);
      setSelected(null);
  
      toast.success('Profile updated successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      
    } catch (error) {
      toast.error('Failed to update profile', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  

  const handleCloseModal = () => {
    setShowModal(false);
    setSelected(null);
  };






  const handleSearch = (e)=>{
    setSearchItems(e.target.value)
  }

  const searchedUsers = users.filter(user=> 
    user.name.toLowerCase().includes(searchItems.toLowerCase()) 
  )

  return (
    <div className='dashboard'>
      <div className="container">
        <h2 className="mb-4 text-center text-white">User Management</h2>
        <br />
        <div className="mb-4">
          <FormControl
            type="search"
            placeholder="Search Users"
            className="me-2"
            aria-label="Search"
            value={searchItems} 
            onChange={handleSearch}
          />
        </div>
        
        <Table >
          
          <thead>
            <tr>
              <th>No.</th>
              <th>Username</th>
              <th>Email</th>
              <th>Created Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {searchedUsers.length > 0 ? (
              searchedUsers.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td>
                    <Button onClick={()=>handleEditUser(user)} variant="warning" size="sm" className="me-2">
                      Edit
                    </Button>
                    <Button variant="danger" size="sm">
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">No users found.</td>
              </tr>
            )}
          </tbody>

        </Table>
      </div>
      {selected && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleUpdate}>
              <Form.Group controlId="formUserName" className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  name="name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formUserEmail" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" >
                submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default AdminDashboard;
