import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Tooltip,
  IconButton
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
// Add new import at the top
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Edit } from '@mui/icons-material';
import visitorService from '../services/visitorService';
const apiUrl = import.meta.env.VITE_API_URL;

function TodayVisitor() {
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [newPrescription, setNewPrescription] = useState(null);
  const [newPrescriptionPreview, setNewPrescriptionPreview] = useState(null);

  // Update the handleFileChange function
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewPrescription(file);
      setEditedData({ ...editedData, prescriptionimg: file.name });
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setNewPrescriptionPreview(previewUrl);
    }
  };
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

  // Add cleanup for preview URL in handleClose
  const handleClose = () => {
    setOpenEditDialog(false);
    setSelectedVisitor(null);
    setEditedData({});
    if (newPrescriptionPreview) {
      URL.revokeObjectURL(newPrescriptionPreview);
      setNewPrescriptionPreview(null);
    }
    setNewPrescription(null);
  };
  useEffect(() => {
    return () => {
      if (newPrescriptionPreview) {
        URL.revokeObjectURL(newPrescriptionPreview);
      }
    };
  }, [newPrescriptionPreview]);

   const handleSave = async () => {
    try {
      const formData = new FormData();
      
      // Append all edited fields
      Object.keys(editedData).forEach(key => {
        if (key !== 'prescriptionimg' || !newPrescription) {
          formData.append(key, editedData[key]);
        }
      });
      
      // Append the new prescription file if it exists
      if (newPrescription) {
        formData.append('prescriptionImage', newPrescription);
      }

      const data = await visitorService.updateVisitEntry(formData);
      
      if (data.success) {
        // Refresh the visitors list
        const fetchVisitors = async () => {
          const data = await visitorService.getTodayPatients();
          if (data.success) {
            setVisitors(data.data.map((visitor) => ({
              ...visitor,
              id: visitor.patientid
            })));
          }
        };
        fetchVisitors();
        handleClose();
      } else {
        alert('Failed to update visitor details');
      }
    } catch (error) {
      console.error('Error updating visitor:', error);
      alert('Error updating visitor details');
    }
  };

  const handleImageClose = () => {
    setOpenImageDialog(false);
    setSelectedImage(null);
  };


  const handleActiveChange = async (id, newValue) => {

     console.log("id",id);
     
    try {
      const data = await visitorService.updateActiveStatus({
        id: id,
        isActive: newValue
      });
      if (data.success) {
        // Update local state only after successful API call
        // const updatedVisitors = visitors.map(visitor => {
        //   if (visitor.id === id) {
        //     return { ...visitor, isActive: newValue };
        //   }
        //   return visitor;
        // });
        // setVisitors(updatedVisitors);
      
          // Refresh the visitors list
          const fetchVisitors = async () => {
            const data = await visitorService.getTodayPatients();
            if (data.success) {
              setVisitors(data.data.map((visitor) => ({
                ...visitor,
                id: visitor.patientid
              })));
            }
          };
          fetchVisitors();
       
        
      } else {
        console.error('Failed to update active status:', data.message);
      }
    } catch (error) {
      console.error('Error updating active status:', error);
    }
  };


  const columns = [
    {
      field: 'prescriptionimg',
      headerName: 'Prescription',
      
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        params.row.prescriptionimg ? (
          // <Button
          //   startIcon={<VisibilityIcon />}
          //   variant="contained"
          //   color="secondary"
          //   size="small"
          //   onClick={() => {
          //     setSelectedImage(params.row.prescriptionimg);
          //     setOpenImageDialog(true);
          //   }}
          // >
          
          // </Button>
           <Box>
           <Tooltip title="Edit">
             <IconButton color="primary" 
             onClick={() => {
              setSelectedImage(params.row.prescriptionimg);
              setOpenImageDialog(true);
            }}
             
             >
               <VisibilityIcon />
             </IconButton>
           </Tooltip>
         </Box>
        ) : (
          <Typography color="textSecondary" align='center'>No Prescription</Typography>
        )
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      renderCell: (params) => (
        <Box>
          <Tooltip title="Edit">
            <IconButton color="primary" 
            onClick={() => {
              setSelectedVisitor(params.row);
              setEditedData(params.row);
              setOpenEditDialog(true);
            }}
            
            >
              <Edit />
            </IconButton>
          </Tooltip>
        </Box>
       
      )
    },
    {
      field: 'isActive',
      headerName: 'IN-Active',
     
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <input
          type="checkbox"
          checked={params.row.isActive === false}
          onChange={(e) => {
            handleActiveChange(params.row.Todayid, !params.row.isActive);
          }}
        />
      ),
    },
    { field: 'dayvisitcount', headerName: 'Token Id',  headerAlign: 'center', align: 'center' },
    { field: 'regid', headerName: 'Reg ID',  width: 180, headerAlign: 'center', align: 'center' },
    { field: 'customername', headerName: 'Patient Name', width: 200,  headerAlign: 'center', align: 'center' },
    { field: 'mobileno', headerName: 'Mobile No',width: 200,  headerAlign: 'center', align: 'center' },
    { field: 'doctorname', headerName: 'Doctor Name', width: 200, headerAlign: 'center', align: 'center' },
    {
      field: 'dateofvisit',
      headerName: 'Visit Date',
      width: 180,  
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
    { field: 'reasonofvisit', headerName: 'Reason', width: 260,  headerAlign: 'center', align: 'center' },

  ];

  return (
    <Box sx={{ height: 700, width: '100%' }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Today's Visitors</Typography>
      <DataGrid
        rows={visitors}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        disableSelectionOnClick
        getRowId={(row) => row.dayvisitcount}
        loading={loading}
        sx={{
          '& .MuiDataGrid-cell': {
            borderRight: '1px solid #e0e0e0',
            borderBottom: '1px solid #e0e0e0'
          },
          '& .MuiDataGrid-columnHeader': {
            borderRight: '1px solid #e0e0e0',
            borderBottom: '2px solid #e0e0e0',
            backgroundColor: '#1976d2',
            color: 'white'
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#1976d2',
            color: 'white'
          }
        }}
      />

      <Dialog open={openEditDialog} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Edit Visitor Details</DialogTitle>
        <DialogContent>
          {selectedVisitor && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              <TextField
                label="Patient Name"
                defaultValue={selectedVisitor.customername}
                onChange={(e) => setEditedData({ ...editedData, customername: e.target.value })}
              />
              <TextField
                label="Mobile No"
                defaultValue={selectedVisitor.mobileno}
                onChange={(e) => setEditedData({ ...editedData, mobileno: e.target.value })}
              />
              <TextField
                label="Doctor Name"
                defaultValue={selectedVisitor.doctorname}
                onChange={(e) => setEditedData({ ...editedData, doctorname: e.target.value })}
              />
              <TextField
                label="Reason"
                defaultValue={selectedVisitor.reasonofvisit}
                onChange={(e) => setEditedData({ ...editedData, reasonofvisit: e.target.value })}
              />
            
            {/* Prescription Preview */}
            {selectedVisitor.prescriptionimg && (
              <Box sx={{ mt: 2, mb: 2 }}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>Current Prescription:</Typography>
                {selectedVisitor.prescriptionimg.toLowerCase().endsWith('.pdf') ? (
                  <iframe
                    src={`${apiUrl}/uploads/prescription/${selectedVisitor.prescriptionimg}`}
                    style={{ width: '100%', height: '300px', border: '1px solid #ccc' }}
                    title="Current Prescription"
                  />
                ) : (
                  <Box
                    component="img"
                    src={`${apiUrl}/uploads/prescription/${selectedVisitor.prescriptionimg}`}
                    alt="Current Prescription"
                    sx={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'contain' }}
                  />
                )}
              </Box>
            )}

            {/* Upload New Prescription */}
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>Upload New Prescription:</Typography>
              <Button
                component="label"
                variant="outlined"
                startIcon={<CloudUploadIcon />}
                sx={{ mb: 1 }}
              >
                Choose File
                <input
                  type="file"
                  hidden
                  accept=".pdf,image/*"
                  onChange={handleFileChange}
                />
              </Button>
              {newPrescription && (
        <>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
            Selected file: {newPrescription.name}
          </Typography>
          <Box sx={{ mt: 2, border: '1px solid #ccc', p: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>Preview:</Typography>
            {newPrescription.type === 'application/pdf' ? (
              <iframe
                src={newPrescriptionPreview}
                style={{ width: '100%', height: '300px', border: 'none' }}
                title="New Prescription Preview"
              />
            ) : (
              <Box
                component="img"
                src={newPrescriptionPreview}
                alt="New Prescription Preview"
                sx={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'contain' }}
              />
            )}
          </Box>
        </>
      )}
            </Box>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">Save</Button>
      </DialogActions>
    </Dialog>

      <Dialog open={openImageDialog} onClose={handleImageClose} maxWidth="md" fullWidth>
        <DialogTitle>Prescription Image</DialogTitle>
        <DialogContent>
          {selectedImage && (
           selectedImage.toLowerCase().endsWith('.pdf') ? (
            <iframe
              src={`${apiUrl}/uploads/prescription/${selectedImage}`}
              style={{
                width: '100%',
                height: '500px',
                border: 'none'
              }}
              title="Prescription PDF"
            />
          ) : (
            <Box
              component="img"
              src={`${apiUrl}/uploads/prescription/${selectedImage}`}
              alt="Prescription"
              sx={{
                maxWidth: '100%',
                maxHeight: '500px',
                objectFit: 'contain'
              }}
            />
          )
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleImageClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default TodayVisitor;
