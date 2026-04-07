// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect,useCallback } from "react";
import patientService from "../services/patientService";
import {
  TextField,
  Typography,
  Box,
  Button,
  Card,
  Avatar,
  Grid,
  Divider,
  Link,
  Container,
  IconButton,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import "../styles/CustomerPage.css"; 
import {  AppRegistrationTwoTone } from "@mui/icons-material";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
// Api url imported implicitly by patientService

const CustomerPage = () => {
 
  const [mobileNumber, setMobileNumber] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [customerDetails, setCustomerDetails] = useState([]);
  const [prescriptionImage, setPrescriptionImage] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (mobileNumber) {
      checkMobileNumber(mobileNumber);
    } else {
      setMessage("Please enter Mobile Number or Name or Registration ID");
      setError(true);
      setCustomerDetails([]);
    }
    console.log("mobilenumber",mobileNumber);
  }, [mobileNumber]);
console.log(customerDetails);

  const checkMobileNumber = async (searchValue) => {
    try {
      const responseData = await patientService.checkMobileNumberClinic(searchValue);

      if (responseData && responseData.data) {
        const customerArray = responseData.data;

        if (customerArray.length > 0) {
          setCustomerDetails(customerArray);
          console.log("Customer Data:", responseData.data);
          setMessage("");
          setError(false);
        } else {
          setCustomerDetails([]);
          setMessage(
            "No registered subscription found for this mobile number."
          );
          setError(true);
        }
      } else {
        setMessage("Invalid response format.");
        setError(true);
      }
    } catch (error) {
      console.error("API Error:", error);
      setMessage("Error checking mobile number. Please try again later.");
      setError(true);
      setCustomerDetails([]);
    }
  };

const formatDOB = (dob) => {
  if (!dob) return "N/A";

  // Check if the dob contains time or is in UTC format
  const dateObj = new Date(dob);

  if (isNaN(dateObj.getTime())) return "Invalid Date"; // Handle invalid cases

  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = dateObj.getFullYear();

  return `${day}-${month}-${year}`;
};

  const calculateAge = (dob) => {
    if (!dob) return "N/A";
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

const [reason, setReason] = useState("patient receiving medical care");
const [selectedDoctor, setSelectedDoctor] = useState("");

const [openDialog, setOpenDialog] = useState(false);
const [selectedCustomer, setSelectedCustomer] = useState(null);

const handleIconClick = (customer) => {
  console.log("Selected Customer:", customer);
  setSelectedCustomer(customer);
  setOpenDialog(true);
};

const handleCloseDialog = () => {
  setOpenDialog(false);
  setSelectedCustomer(null);
  setSelectedDoctor("");
  if (prescriptionImage) {
    URL.revokeObjectURL(URL.createObjectURL(prescriptionImage));
    setPrescriptionImage(null);
  }
};

const handleConfirmRegistration = async () => {
    console.log("Selected Customer:", selectedCustomer, reason, selectedDoctor);
    console.log("Reason:", reason);
      
    if (!selectedCustomer || !reason || !selectedDoctor) {
      setMessage("Please fill in all fields.");
      setError(true);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('customerId', selectedCustomer.id);
      formData.append('regid', selectedCustomer.regid);
      formData.append('reason', reason);
      formData.append('doctorName', selectedDoctor);
      if (prescriptionImage) {
        formData.append('prescriptionImage', prescriptionImage);
      }

      const responseData = await patientService.visitEntry(formData); 
      console.log("form:", formData);
    if (responseData && responseData.success) {
      setMessage("Customer registered successfully.");
      setError(false);
     // setReason("");
      setSelectedDoctor("");
      setMobileNumber("");
      setCustomerDetails([]);
      setError(false);
    } else {
      setMessage("Failed to register customer.");
      setError(true);
    }
  } catch (error) {
    console.error("API Error:", error);
    setMessage("Error registering customer. Please try again later.");
    setError(true);
  } finally {
    handleCloseDialog();
  }
};


  const isMobile = window.innerWidth <= 768;

  return (
    <Container sx={{ display: "block", height: "auto", width: "100%" }}>
  
  

      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          marginTop: 4,
          padding: 3,
         
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          width: "90%",
          maxWidth: "600px",
          marginX: "auto",
        }}
      >
        <Box
          fullWidth
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            marginBottom: 2,
          }}
        >
          <Avatar sx={{ bgcolor: "primary.main", width: 50, height: 50 }}>
            <PersonIcon sx={{ fontSize: 32 }} />
          </Avatar>
          <Typography variant="h5" fontWeight="bold">
            Patient Lookup
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TextField
                label="Enter Mobile Number or Reg ID Or Name"
                variant="outlined"
                value={mobileNumber}
                onChange={(e) => {
                  const value = e.target.value;
                  setMobileNumber(value);
                }}
                warn={error}
                helperText={error ? message : ""}
                sx={{ flex: 1 }}
              />
              <IconButton 
                color="primary"
                onClick={() => navigate('/NewCustomer')}
                sx={{ 
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': { bgcolor: 'primary.dark' },
                  ml: 1,
                  mb:2,
                }}
              >
                <PersonAddIcon />
              </IconButton>
            </Box>
       
        {error && message && (
          <Typography
            variant="subtitle1"
            color="error.main"
            sx={{ mt: 2, display: "flex", alignItems: "center" }}
          >
            <CancelIcon sx={{ fontSize: 20, marginRight: 1 }} color="error" />
            {message}
          </Typography>
        )}
      </Card>
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: 3,
          mt: 3,
          justifyContent: isMobile ? "center" : "start",
          flexWrap: isMobile ? "nowrap" : "wrap",
        }}
      >
        {customerDetails.length > 0
          ? customerDetails.map((customer, index) => (
              <Card
                key={index}
                sx={{ width:isMobile ? "350px" : "500px", marginTop: 3, padding: 3 }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 2,
                  }}
                >
                  <CheckCircleIcon
                    sx={{ fontSize: 20, color: "primary.main", marginRight: 1 }}
                  />
                  <Typography
                    variant="body1"
                    color="primary.main"
                    fontWeight="500px"
                  >
                    Registered Patient {index + 1}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      marginLeft: "auto",
                      boxShadow: "0px 4px 15px 0px rgba(0,0,0,0.3)",
                    }}
                    onClick={() => handleIconClick(customer)}
                  >
                    Today Register Patient
                  </Button>
                </Box>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  textAlign="center"
                  sx={{
                    textTransform: "capitalize",
                    marginBottom: 2,
                    color: "primary.main",
                  }}
                >
                  {customer.name}
                </Typography>
                <Divider sx={{ marginBottom: 2 }} />
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1">
                      <strong>Mobile:</strong> {customer.mobileno}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1">
                      <strong>DOB:</strong> {formatDOB(customer.dob)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1">
                      <strong>Age:</strong> {calculateAge(customer.dob)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1">
                      <strong>Gender:</strong> {customer.gender || "N/A"}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1">
                      <strong>Address:</strong> {customer.address}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1">
                      <strong>City:</strong> {customer.city}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1">
                      <strong>State:</strong> {customer.state}
                    </Typography>
                  </Grid>
                </Grid>
              </Card>
            ))
          : !error && (
              <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
                No customer details found. Please check the mobile number again.
              </Typography>
            )}
      </Box>
    

      <Dialog open={openDialog} onClose={handleCloseDialog} zIndex={1500}>
        <DialogTitle>Confirm Registration</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to register this Patient Entry?
          </DialogContentText>
         
          <FormControl fullWidth margin="dense" variant="outlined">
            <InputLabel>Select Doctor</InputLabel>
            <Select
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              label="Select Doctor"
            >
              <MenuItem value="Dr. Keshava Balaji">Dr. Keshava Balaji</MenuItem>
              <MenuItem value="Dr. Remughi">Dr. Remughi</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ mt: 2 }}>
            <input
              accept=".pdf,image/*"
              style={{ display: 'none' }}
              id="prescription-file"
              type="file"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setPrescriptionImage(file);
                }
              }}
            />
            <label htmlFor="prescription-file">
              <Button
                variant="outlined"
                component="span"
                fullWidth
                sx={{ mt: 1 }}
              >
                Upload Prescription (PDF or Image)
              </Button>
            </label>
            {prescriptionImage && (
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Selected file: {prescriptionImage.name}
                </Typography>
                {prescriptionImage.type.includes('pdf') ? (
                  <Box
                    component="iframe"
                    src={URL.createObjectURL(prescriptionImage)}
                    sx={{
                      width: '100%',
                      height: '200px',
                      border: '1px solid #ccc',
                      borderRadius: 1,
                    }}
                  />
                ) : (
                  <Box
                    component="img"
                    src={URL.createObjectURL(prescriptionImage)}
                    alt="Prescription Preview"
                    sx={{
                      maxWidth: '100%',
                      maxHeight: '200px',
                      objectFit: 'contain',
                      borderRadius: 1,
                    }}
                  />
                )}
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  File type: {prescriptionImage.type || 'Unknown'}
                </Typography>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleConfirmRegistration} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CustomerPage;
