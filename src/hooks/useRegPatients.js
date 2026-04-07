import { useState, useEffect } from "react";
import patientService from "../services/patientService";
export const useRegPatients = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleEdit = async (regid) => {
    try {
      // Navigate to edit page or handle edit logic
      console.log("Editing patient with ID:", regid);
    } catch (error) {
      console.error("Error editing patient:", error);
    }
  };

  const handleDelete = async (regid) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      try {
        await patientService.deleteRegPatient(regid);
        fetchCustomers(); // Refresh the list after deletion
      } catch (error) {
        console.error("Error deleting patient:", error);
      }
    }
  };

  const columns = [
    // { field: "index", headerName: "S.No", width: 100,renderCell: (params) => filteredCustomers.indexOf(params.row) + 1 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      renderCell: (params) => ({
        regid: params.row.regid,
        render: true
      })
    },
    { field: "regid", headerName: "Reg ID", width: 100 },
    { field: "name", headerName: "Name", width: 180 },
    { field: "mobileno", headerName: "Mobile No", width: 140 },
    { field: "address", headerName: "Address", width: 220 },
    { field: "city", headerName: "City", width: 120 },
    { field: "state", headerName: "State", width: 120 },
    { field: "country", headerName: "Country", width: 120 },
    { field: "pincode", headerName: "Pincode", width: 100 },
    { field: "age", headerName: "Age", width: 80 },
  
    { field: "lastvisited", headerName: "Last Visited", width: 170 ,
      renderCell: (params) => {
        const value = params.row.lastvisited;
        if (!value) return 'Null';
        try {
          const date = new Date(value);
          return date.toLocaleDateString();
        } catch {
          return value;
        }
      }
    }
  
  ];

  const fetchCustomers = async () => {
    try {
      const responseData = await patientService.getRegCustomers();
      setCustomers(responseData.data);
      setFilteredCustomers(responseData.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === "") {
      setFilteredCustomers(customers);
    } else {
      const filtered = customers.filter(
        (customer) =>
          customer.name.toLowerCase().includes(query) ||
          customer.mobileno.includes(query) ||
          customer.city.toLowerCase().includes(query) ||
          customer.state.toLowerCase().includes(query)
      );
      setFilteredCustomers(filtered);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return {
    filteredCustomers,
    searchQuery,
    handleSearch,
    columns,
    handleEdit,
    handleDelete
  };
};