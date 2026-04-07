import React, { useState } from "react";
import {
  Box,
  Container,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { useVisitorHistory } from "../hooks/useVisitorHistory";
import { Button, Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
const apiUrl=import.meta.env.VITE_API_URL;
const VisitorHistory = () => {
  const {
    filterDate,
    setFilterDate,
    filterName,
    setFilterName,
    data,
    tableHeaders
  } = useVisitorHistory();
  const [openPreview, setOpenPreview] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handlePreviewOpen = (prescription) => {
    setSelectedFile(prescription);
    setOpenPreview(true);
  };

  const handlePreviewClose = () => {
    setOpenPreview(false);
    setSelectedFile(null);
  };
  
   
  return (
    <Container maxWidth="lg">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          Visitor History
        </Typography>

        <Card variant="outlined" sx={{ mb: 4, p: 2 }}>
          <CardContent>
            <Box display="flex" gap={2} flexWrap="wrap">
              <TextField
                label="Filter by Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                sx={{ flex: 1, minWidth: 200 }}
              />
              <TextField
                label="Filter by Name"
                type="text"
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
                sx={{ flex: 1, minWidth: 200 }}
              />
            </Box>
          </CardContent>
        </Card>

        <Paper elevation={3}>
          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: "#1976d2" }}>
                <TableRow>
                  {tableHeaders.map((head) => (
                    <TableCell
                      key={head}
                      sx={{ color: "#fff", fontWeight: "bold" }}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.length > 0 ? (
                  data.map((row,index) => (
                    <TableRow key={row.id} hover>
                      <TableCell>{index+1}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>{row.reason}</TableCell>
                      <TableCell>{row.doctor}</TableCell>
                      <TableCell>{row.age}</TableCell>
                      <TableCell>{row.gender}</TableCell>
                      <TableCell>{row.mobileno}</TableCell>
                      <TableCell>
                        {row.prescription ? (
                          <Button
                            startIcon={<VisibilityIcon />}
                            onClick={() => handlePreviewOpen(row.prescription)}
                            variant="contained"
                            size="small"
                            color="primary"
                          >
                            View
                          </Button>
                        ) : (
                          "No prescription"
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      No data available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
      <Dialog
        open={openPreview}
        onClose={handlePreviewClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Prescription Preview
          <IconButton
            onClick={handlePreviewClose}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedFile && (
            selectedFile.toLowerCase().endsWith('.pdf') ? (
              <iframe
                src={`${apiUrl}/uploads/prescription/${selectedFile}`}
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
                src={`${apiUrl}/uploads/prescription/${selectedFile}`}
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
      </Dialog>
    </Container>
  );
};

export default VisitorHistory;
