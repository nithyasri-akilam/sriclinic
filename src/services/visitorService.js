import api from './api';

const visitorService = {
  getVisitHistory: async (params) => {
    const response = await api.get('/auth/getVisitHistory', { params });
    return response.data;
  },
  getTodayPatients: async () => {
    const response = await api.get('/auth/salesretail/getTodaypatient');
    return response.data;
  },
  updateVisitEntry: async (formData) => {
    const response = await api.put('/auth/salesretail/updateVisitEntry', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },
  updateActiveStatus: async (data) => {
    const response = await api.put('/auth/salesretail/updateActiveStatus', data);
    return response.data;
  }
};

export default visitorService;
