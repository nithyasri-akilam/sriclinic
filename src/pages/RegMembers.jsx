import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  Typography,
  Paper,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Search, Edit } from "@mui/icons-material";
import patientService from "../services/patientService";
const RegPatients = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editData, setEditData] = useState({
    regid: "",
    name: "",
    mobileno: "",
    dob: "",
    age: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  });

  const fetchCustomers = async () => {
    try {
      const responseData = await patientService.getRegCustomers();
      setCustomers(responseData.data);
      setFilteredCustomers(responseData.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === "") {
      setFilteredCustomers(customers);
    } else {
      const filtered = customers.filter(
        (customer) =>
          customer.name?.toLowerCase().includes(query) ||
          customer.mobileno?.includes(query) ||
          customer.city?.toLowerCase().includes(query) ||
          customer.state?.toLowerCase().includes(query)
      );
      setFilteredCustomers(filtered);
    }
  };

  const handleEditClick = (regid) => {
    const patient = filteredCustomers.find((p) => p.regid === regid);
    if (patient) {
      setEditData(patient);
      setOpenEditDialog(true);
    }
  };

  const handleUpdatePatient = async () => {
    try {
      await patientService.updateRegPatient(editData.regid, editData);
      fetchCustomers();
      setOpenEditDialog(false);
    } catch (error) {
      console.error("Error updating patient:", error);
    }
  };

  const handleActiveChange = async (id, newValue) => {
    try {
      const responseData = await patientService.updateActiveStatusByRegPatient({
        id: id,
        isActive: newValue,
      });

      if (responseData.success) {
        fetchCustomers();
      } else {
        console.error("Failed to update active status:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating active status:", error);
    }
  };

  const columns = [
    {
      field: "actions",
      headerName: "Actions",
      width: 100,align: 'center' ,
      renderCell: (params) => (
        <Box>
          <Tooltip title="Edit">
            <IconButton color="primary" onClick={() => handleEditClick(params.row.regid)}>
              <Edit />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
    {
      field: "isActive",
      headerName: "In-Active",
      width: 80,align: 'center' ,
      renderCell: (params) => (
        <input
          type="checkbox"
          checked={params.row.IsActive === false}
          onChange={() => handleActiveChange(params.row.regid, !params.row.IsActive)}
        />
      ),
    },
    { field: "regid", headerName: "Reg ID", width: 100 },
    { field: "name", headerName: "Name", width: 180 },
    { field: "mobileno", headerName: "Mobile No", width: 140 },
    { field: "age", headerName: "Age", width: 80 },
    {
      field: "lastvisited",
      headerName: "Last Visited",
      width: 170,
      renderCell: (params) => {
        const value = params.row.lastvisited;
        if (!value) return "Null";
        try {
          const date = new Date(value);
          return date.toLocaleDateString();
        } catch {
          return value;
        }
      },
    },
    { field: "address", headerName: "Address", width: 220 },
    { field: "city", headerName: "City", width: 120 },
    { field: "state", headerName: "State", width: 120 },
    { field: "country", headerName: "Country", width: 120 },
    { field: "pincode", headerName: "Pincode", width: 100 },
  
  
  ];

  return (
    <Box m={4}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#1976d2" }}>
        Registered Patients
      </Typography>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search by Name, Mobile, City or State..."
        value={searchQuery}
        onChange={handleSearch}
        sx={{ mb: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />

      <Paper elevation={3} sx={{ borderRadius: 3, overflow: "hidden" }}>
        <Box sx={{ height: 650, width: "100%", overflowX: "auto" }}>
          <DataGrid
            rows={filteredCustomers}
            columns={columns}
            getRowId={(row) => row.regid}
            pageSize={10}
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#1976d2",
                color: "primary.main",
                fontWeight: "bold",
                fontSize: 16,
              },
              "& .MuiDataGrid-cell": {
                fontSize: 14,
              },
            }}
          />
        </Box>
      </Paper>

      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Edit Patient Details</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Mobile Number"
                value={editData.mobileno}
                onChange={(e) => setEditData({ ...editData, mobileno: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date of Birth"
                type="date"
                value={editData.dob}
                onChange={(e) => setEditData({ ...editData, dob: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Age"
                value={editData.age}
                onChange={(e) => setEditData({ ...editData, age: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                multiline
                rows={2}
                value={editData.address}
                onChange={(e) => setEditData({ ...editData, address: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="City"
                value={editData.city}
                onChange={(e) => setEditData({ ...editData, city: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="State"
                value={editData.state}
                onChange={(e) => setEditData({ ...editData, state: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Country"
                value={editData.country}
                onChange={(e) => setEditData({ ...editData, country: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Pincode"
                value={editData.pincode}
                onChange={(e) => setEditData({ ...editData, pincode: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdatePatient} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RegPatients;
