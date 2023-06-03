import { Box, FormControl, InputLabel, MenuItem, Select, Button } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [users, setUsers] = useState([]);
  const [modules, setModules] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedModule, setSelectedModule] = useState('');
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    // Fetch users, modules, and assignments data from the backend
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get('/api/auth/users/2');
        const modulesResponse = await axios.get('/api/modules/all');
        const assignmentsResponse = await axios.get('/api/auth/users/assignements');

        setUsers(usersResponse.data);
        setModules(modulesResponse.data);
        setAssignments(assignmentsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleAssignModule = async () => {
    try {
      await axios.post(`/api/auth/users/${selectedUser}/modules/${selectedModule}`);
      console.log('Module assigned successfully!');
      // Refresh the assignments data
      const assignmentsResponse = await axios.get('/api/auth/users/assignements');
      setAssignments(assignmentsResponse.data);
    } catch (error) {
      console.error('Error assigning module:', error);
    }
  };

  const handleUnassignModule = async (assignmentId) => {
    try {
      await axios.delete(`/api/auth/users/delete/${assignmentId}`);
      console.log('Module unassigned successfully!');
      // Remove the unassigned module from the assignments state
      setAssignments(assignments.filter((assignment) => assignment.id !== assignmentId));
    } catch (error) {
      console.error('Error unassigning module:', error);
    }
  };

  // Function to find the user name based on the user ID
  const findUserName = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.username : '';
  };

  // Function to find the module name based on the module ID
  const findModuleName = (moduleId) => {
    const module = modules.find((module) => module.id === moduleId);
    return module ? module.nom : '';
  };

  return (
    <Box m="20px" display="flex" flexDirection="column" alignItems="center">
      <Header title="Assign Modules to Teachers" />
      <Box m="20px">
        <FormControl sx={{ minWidth: 200, marginBottom: "10px" }}>
          <InputLabel id="userSelectLabel">Select User:</InputLabel>
          <Select
            labelId="userSelectLabel"
            id="userSelect"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <MenuItem value="">Select a user</MenuItem>
            {users.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.username}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 200, marginBottom: "10px" }}>
          <InputLabel id="moduleSelectLabel">Select Module:</InputLabel>
          <Select
            labelId="moduleSelectLabel"
            id="moduleSelect"
            value={selectedModule}
            onChange={(e) => setSelectedModule(e.target.value)}
          >
            <MenuItem value="">Select a module</MenuItem>
            {modules.map((module) => (
              <MenuItem key={module.id} value={module.id}>
                {module.nom}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" onClick={handleAssignModule} sx={{ margin: "10px" }}>
          Assign Module
        </Button>
      </Box>
      <Table sx={{ width: "80%", margin: "20px auto" }}>
        <TableHead>
          <TableRow>
            <TableCell>Teacher</TableCell>
            <TableCell>Module</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {assignments.map((assignment) => (
            <TableRow key={assignment.id}>
              <TableCell>{findUserName(assignment.userId)}</TableCell>
              <TableCell>{findModuleName(assignment.moduleId)}</TableCell>
              <TableCell>
                <Button sx={{bgcolor:'red'}} variant="contained" onClick={() => handleUnassignModule(assignment.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default Contacts;