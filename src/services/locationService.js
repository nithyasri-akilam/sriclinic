import axios from 'axios';

const locationService = {
  getLocationByPincode: async (pincode) => {
    const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
    return response.data;
  }
};

export default locationService;
