export const validateCustomer = (formData) => {
  if (!formData.name?.trim()) return "Customer name is required.";
  if (!/^\d{10}$/.test(formData.mobileno)) return "Mobile number must be exactly 10 digits.";
  if (!formData.dob && !formData.age) return " Age is required.";
  if (!formData.city || !formData.address) return "Address information is incomplete.";
  return null; // valid
};