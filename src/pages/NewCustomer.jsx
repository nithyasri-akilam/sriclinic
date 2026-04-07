import React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  MenuItem,
  Snackbar,
  Alert,
  CircularProgress,
  Container,
  useMediaQuery,
  FormControl,
  InputLabel,
  Select,
  Card,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { useCustomerForm } from "../hooks/useCustomerForm";

const NewCustomer = () => {
  const {
    formData,
    isLoading,
    errorMessage,
    openSnackbar,
    snackbarMessage,
    snackbarSeverity,
    isSubmitting,
    handleChange,
    handleSubmit,
    setOpenSnackbar
  } = useCustomerForm();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container >
      <Card
        sx={{
          padding: isMobile ? 1 : 5,
          boxShadow: 3,
          borderRadius: 5,
          borderColor: grey,
        }}
      >
        <Box component="form" onSubmit={handleSubmit}>
          <Typography variant={isMobile ? "h6" : "h5"} color="primary" mb={2}>
            Registration Forms
          </Typography>

          {errorMessage && (
            <Typography variant="body1" color="error" mb={2}>
              {errorMessage}
            </Typography>
          )}

          <Grid container spacing={isMobile ? 1 : 2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="name"
                label="Customer Name *"
                placeholder="Customer Name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Mobile Number"
                name="mobileno"
                type="tel"
                value={formData.mobileno}
                onChange={handleChange}
                inputProps={{ maxLength: 10 }}
                required
                fullWidth
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, "");
                }}
                error={formData.mobileno && formData.mobileno.length !== 10}
              />
            </Grid>

            {/* <Grid item xs={12} sm={6}>
              <TextField
                label="Date of Birth"
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
            
                fullWidth
              />
            </Grid> */}

            <Grid item xs={12} sm={4}>
              <TextField
                label="Age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                inputProps={{ maxLength: 10 }}
             
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                select
                label="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                fullWidth
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Select Doctor</InputLabel>
                <Select
                  name="doctor"
                  value={formData.doctor}
                  onChange={handleChange}
                  label="Select Doctor"
                >
                  <MenuItem value="Dr. Keshava Balaji">Dr. Keshava Balaji</MenuItem>
                  <MenuItem value="Dr. Remughi">Dr. Remughi</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Pincode"
                name="pincode"
                type="number"
                value={formData.pincode}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                value={formData.city}
                label="City Name"
                name="city"
                required
                fullWidth
                disabled={isLoading}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="State Name"
                name="state"
                value={formData.state}
                required
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                multiline
                rows={3}
                required
                fullWidth
              />
            </Grid>
          </Grid>

          <Box sx={{ textAlign: "center", mt: 2, color: "white" }}>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              sx={{ fontWeight: "500px" }}
              disabled={
                !formData.name ||
                !formData.mobileno ||
                !formData.city ||
                formData.mobileno.length !== 10 ||
                isSubmitting
              }
            >
              {isSubmitting ? <CircularProgress size={24} /> : "Submit"}
            </Button>
          </Box>

          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={() => setOpenSnackbar(false)}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              severity={snackbarSeverity}
              sx={{ width: "100%" }}
              onClose={() => setOpenSnackbar(false)}
            >
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </Box>
      </Card>
    </Container>
  );
};

export default NewCustomer;
