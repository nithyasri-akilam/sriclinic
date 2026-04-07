import { useState, useEffect } from 'react';

import visitorService from "../services/visitorService";
export const useTodayVisitor = () => {
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedVisitor, setSelectedVisitor] = useState(null);

  const columns = [
    { 
      field: 'dayvisitcount', 
      headerName: 'Token Id', 
      flex: 1,
      headerAlign: 'center',
      align: 'center'
    },
    { 
      field: 'regid', 
      headerName: 'Reg ID', 
      flex: 1,
      headerAlign: 'center',
      align: 'center'
    },
    { 
      field: 'customername', 
      headerName: 'Patient Name', 
      flex: 1,
      headerAlign: 'center',
      align: 'center'
    },
    { 
      field: 'mobileno', 
      headerName: 'Mobile No', 
      flex: 1,
      headerAlign: 'center',
      align: 'center'
    },
    { 
      field: 'doctorname', 
      headerName: 'Doctor Name', 
      flex: 1,
      headerAlign: 'center',
      align: 'center'
    },
    { 
      field: 'dateofvisit', 
      headerName: 'Visit Date', 
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        const value = params.row.dateofvisit;
        if (!value) return 'Null';
        try {
          const date = new Date(value);
          return date.toLocaleDateString();
        } catch {
          return value;
        }
      }
    },
    { 
      field: 'reasonofvisit', 
      headerName: 'Reason', 
      flex: 1,
      headerAlign: 'center',
      align: 'center'
    },
    
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      renderCell: (params) => ({
        params,
        handleEdit: () => {
          setSelectedVisitor(params.row);
          setOpenEditDialog(true);
        }
      })
    }
  ];

  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const data = await visitorService.getTodayPatients();
        if (data.success) {
          setVisitors(data.data.map((visitor) => ({
            ...visitor,
            id: visitor.patientid
          })));
        }
      } catch (error) {
        console.error('Error fetching visitors:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchVisitors();
  }, []);

  return {
    visitors,
    loading,
    columns,
    openEditDialog,
    setOpenEditDialog,
    selectedVisitor,
    setSelectedVisitor
  };
};
