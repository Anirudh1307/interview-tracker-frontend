import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import {
  AddRounded as AddIcon,
  CalendarMonthRounded as CalendarIcon,
  DeleteOutlineRounded as DeleteIcon,
  WorkOutlineRounded as WorkIcon
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import { jobService } from '../../services/api';
import PageHeader from '../UI/PageHeader';
import SectionCard from '../UI/SectionCard';
import { statusVisuals } from '../../theme';

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
      .catch(() => {
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
      toast.success(response.data?.message || 'Job application added successfully!');
      setForm({ companyName: '', role: '', appliedDate: '', status: 'APPLIED' });
      loadJobs();
      if (onJobAdded) onJobAdded();
    } catch (error) {
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
    return statusVisuals[status]?.chipColor || 'default';
  };

  if (loading) {
    return (
      <Stack spacing={3}>
        <PageHeader
          title="Job Applications"
          description="Manage your pipeline with a cleaner, more readable view."
        />
        <Skeleton variant="rectangular" height={220} />
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 3
          }}
        >
          {[1, 2, 3].map((item) => (
            <Skeleton key={item} variant="rectangular" height={220} />
          ))}
        </Box>
      </Stack>
    );
  }

  return (
    <Stack spacing={3}>
      <PageHeader
        title="Job Applications"
        description="Add new roles, keep statuses current, and scan your opportunities with less friction."
      />

      <SectionCard
        title="Add New Application"
        subtitle="Capture the essentials once, then keep the list updated as you move through stages."
      >
        <Box component="form" onSubmit={handleSubmit}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))', xl: 'repeat(5, minmax(0, 1fr))' },
              gap: 2
            }}
          >
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
              startIcon={submitting ? <CircularProgress size={20} color="inherit" /> : <AddIcon />}
              disabled={submitting}
              sx={{ minHeight: 56 }}
            >
              {submitting ? 'Adding...' : 'Add Application'}
            </Button>
          </Box>
        </Box>
      </SectionCard>

      {jobs.length === 0 ? (
        <SectionCard title="Your job list is empty" subtitle="Add your first application above to start building momentum.">
          <Box
            sx={{
              py: 5,
              display: 'grid',
              placeItems: 'center',
              textAlign: 'center'
            }}
          >
            <Stack spacing={1.5} alignItems="center">
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: 4,
                  bgcolor: 'rgba(79, 70, 229, 0.08)',
                  color: 'primary.main',
                  display: 'grid',
                  placeItems: 'center'
                }}
              >
                <WorkIcon />
              </Box>
              <Typography variant="h5">No applications yet</Typography>
              <Typography color="text.secondary">
                Once you add a role, it will appear here as a clean, scannable card.
              </Typography>
            </Stack>
          </Box>
        </SectionCard>
      ) : (
        <Stack spacing={2}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: { xs: 'flex-start', sm: 'center' },
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 1.5
            }}
          >
            <Typography variant="h4">Applications Overview</Typography>
            <Chip
              color="primary"
              variant="outlined"
              label={`${jobs.length} ${jobs.length === 1 ? 'application' : 'applications'}`}
            />
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 3
            }}
          >
            {jobs.map((job) => (
              <SectionCard
                key={job.id}
                contentSx={{ p: 0 }}
                sx={{
                  height: '100%',
                  overflow: 'hidden',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: 5
                  }
                }}
              >
                <Box sx={{ p: { xs: 2.5, sm: 3 } }}>
                  <Stack spacing={2.5}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
                      <Box>
                        <Typography variant="h4" sx={{ mb: 0.75 }}>
                          {job.companyName}
                        </Typography>
                        <Typography color="text.secondary">{job.role}</Typography>
                      </Box>
                      <Chip
                        label={statusVisuals[job.status]?.label || job.status}
                        color={getStatusColor(job.status)}
                        size="small"
                      />
                    </Stack>

                    <Stack direction="row" spacing={1.25} alignItems="center" color="text.secondary">
                      <CalendarIcon fontSize="small" />
                      <Typography variant="body2">Applied on {job.appliedDate}</Typography>
                    </Stack>

                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: 3,
                        bgcolor: 'rgba(79, 70, 229, 0.04)',
                        border: '1px solid',
                        borderColor: 'divider'
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        Status
                      </Typography>
                      <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
                        {statusVisuals[job.status]?.label || job.status}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button
                        color="error"
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        onClick={() => setDeleteDialog({ open: true, jobId: job.id })}
                      >
                        Delete
                      </Button>
                    </Box>
                  </Stack>
                </Box>
              </SectionCard>
            ))}
          </Box>
        </Stack>
      )}

      <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, jobId: null })}>
        <DialogTitle>Delete job application?</DialogTitle>
        <DialogContent>
          <Typography color="text.secondary">
            This removes the application from your tracker. This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button onClick={() => setDeleteDialog({ open: false, jobId: null })} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}

export default JobList;
