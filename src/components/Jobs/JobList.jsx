import React, { useState, useEffect } from 'react';
import {
  Box, Card, CardContent, Typography, TextField, Button, Select, MenuItem,
  FormControl, InputLabel, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Chip, IconButton, Dialog, DialogTitle,
  DialogContent, DialogActions, CircularProgress, Stack
} from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { jobService } from '../../services/api';

function JobList({ onJobAdded }) {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({ companyName: '', role: '', appliedDate: '', status: 'APPLIED' });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, jobId: null });

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = () => {
    setLoading(true);
    jobService.getAll()
      .then(({ data }) => {
        setJobs(data.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.companyName || !form.role || !form.appliedDate) {
      toast.error('Please fill all fields');
      return;
    }
    
    setSubmitting(true);
    try {
      const response = await jobService.create(form);
      console.log('Create response:', response);
      toast.success(response.data?.message || 'Job application added successfully!');
      setForm({ companyName: '', role: '', appliedDate: '', status: 'APPLIED' });
      loadJobs();
      if (onJobAdded) onJobAdded(); // Refresh dashboard
    } catch (error) {
      console.error('Create error:', error);
      const errorMsg = error.response?.data?.message || error.message || 'Failed to create job';
      toast.error(errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      await jobService.delete(deleteDialog.jobId);
      toast.success('Job application deleted');
      setDeleteDialog({ open: false, jobId: null });
      loadJobs();
    } catch (error) {
      toast.error('Failed to delete job');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      APPLIED: 'primary',
      OA: 'secondary',
      INTERVIEW: 'warning',
      HR: 'info',
      OFFERED: 'success',
      REJECTED: 'error'
    };
    return colors[status] || 'default';
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Job Applications
      </Typography>

      <Card elevation={2} sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Add New Application
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <TextField
                fullWidth
                label="Company"
                value={form.companyName}
                onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                disabled={submitting}
              />
              <TextField
                fullWidth
                label="Role"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                disabled={submitting}
              />
              <TextField
                fullWidth
                type="date"
                label="Applied Date"
                value={form.appliedDate}
                onChange={(e) => setForm({ ...form, appliedDate: e.target.value })}
                InputLabelProps={{ shrink: true }}
                disabled={submitting}
              />
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={form.status}
                  label="Status"
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  disabled={submitting}
                >
                  <MenuItem value="APPLIED">Applied</MenuItem>
                  <MenuItem value="OA">OA</MenuItem>
                  <MenuItem value="INTERVIEW">Interview</MenuItem>
                  <MenuItem value="HR">HR</MenuItem>
                  <MenuItem value="OFFERED">Offered</MenuItem>
                  <MenuItem value="REJECTED">Rejected</MenuItem>
                </Select>
              </FormControl>
              <Button
                type="submit"
                variant="contained"
                startIcon={submitting ? <CircularProgress size={20} /> : <AddIcon />}
                disabled={submitting}
                sx={{ minWidth: '120px', height: '56px' }}
              >
                Add
              </Button>
            </Stack>
          </Box>
        </CardContent>
      </Card>

      {jobs.length === 0 ? (
        <Card elevation={2}>
          <CardContent>
            <Typography variant="h6" align="center" color="text.secondary">
              No job applications yet. Add your first one above!
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <TableContainer component={Paper} elevation={2}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'primary.main' }}>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Company</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Role</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Applied Date</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jobs.map((job) => (
                <TableRow key={job.id} hover>
                  <TableCell>{job.companyName}</TableCell>
                  <TableCell>{job.role}</TableCell>
                  <TableCell>{job.appliedDate}</TableCell>
                  <TableCell>
                    <Chip
                      label={job.status}
                      color={getStatusColor(job.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="error"
                      onClick={() => setDeleteDialog({ open: true, jobId: job.id })}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, jobId: null })}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this job application?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, jobId: null })}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default JobList;
