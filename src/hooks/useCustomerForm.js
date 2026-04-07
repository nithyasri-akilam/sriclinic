import { useState } from "react";
import { validateCustomer } from "../utils/validation";
import locationService from "../services/locationService";
import patientService from "../services/patientService";
export const useCustomerForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobileno: "",
    dob: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    age: "",
    doctor: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchLocationByPincode = async (pincode) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const data = await locationService.getLocationByPincode(pincode);

      if (data && data[0].Status === "Success") {
        const { PostOffice } = data[0];
        if (PostOffice && PostOffice.length > 0) {
          setFormData((prev) => ({
            ...prev,
            city: PostOffice[0].District,
            state: PostOffice[0].State,
            address: `${PostOffice[0].Name}, ${PostOffice[0].District}, ${PostOffice[0].State}`,
            country: PostOffice[0].Country,
          }));
        }
      } else {
        setErrorMessage("Invalid pincode. Please enter a valid pincode.");
      }
    } catch (error) {
      setErrorMessage("Failed to fetch location details. Please try again.");
      console.error("Error fetching location details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "pincode" && value.length === 6) {
      fetchLocationByPincode(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateCustomer(formData);
    if (validationError) {
      setSnackbarMessage(validationError);
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    try {
      setIsSubmitting(true);
      const result = await patientService.addCustomerClinic(formData);

      setSnackbarMessage(result.message || "Customer added successfully");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      setFormData({
        name: "",
        mobileno: "",
        dob: "",
        gender: "",
        address: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
        age: "",
        doctor: ""
      });
    } catch (error) {
      console.error(error);
      const errorMsg = error.response?.data?.error || "Failed to add customer. Please try again.";
      setSnackbarMessage(errorMsg);
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
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
  };
};