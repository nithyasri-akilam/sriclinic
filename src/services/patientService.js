import api from './api';

const patientService = {
  getRegCustomers: async () => {
    const response = await api.get('/auth/getRegCustomers');
    return response.data;
  },
  deleteRegPatient: async (id) => {
    const response = await api.delete(`/auth/deleteRegPatient/${id}`);
    return response.data;
  },
  updateRegPatient: async (id, data) => {
    const response = await api.put(`/auth/updatereg-Patient/${id}`, data);
    return response.data;
  },
  updateActiveStatusByRegPatient: async (data) => {
    const response = await api.put('/auth/salesretail/updateActiveStatusByregpatient', data);
    return response.data;
  },
  checkMobileNumberClinic: async (searchValue) => {
    const response = await api.get('/auth/checkMobileNumberClinic', {
      params: { mobileno: searchValue, name: searchValue, regid: searchValue }
    });
    return response.data;
  },
  visitEntry: async (formData) => {
    const response = await api.post('/auth/visitEntry', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    return response.data;
  },
  addCustomerClinic: async (data) => {
    const response = await api.post('/auth/addCustomerClinic', data);
    return response.data;
  }
};

export default patientService;
