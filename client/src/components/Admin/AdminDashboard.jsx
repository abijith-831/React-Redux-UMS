import React from 'react'
import axiosInstance from '../../api/axios'
import { Table , Button , Modal , Form } from 'react-bootstrap'
import '../css/dashboard.css'

const AdminDashboard = () => {
  return (
      <div className='dashboard'>
      <div className="container">
        <h2 className="mb-4 text-center text-white">User Management</h2>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Email</th>
              <th>Created Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
           
              <tr>
                <td colSpan="5" className="text-center">No users found.</td>
              </tr>
            
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default AdminDashboard
