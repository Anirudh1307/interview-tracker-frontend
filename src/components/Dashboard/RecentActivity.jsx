import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Chip, Box } from '@mui/material';

const STATUS_COLORS = {
  APPLIED: 'primary',
  OA: 'secondary',
  INTERVIEW: 'warning',
  HR: 'info',
  OFFERED: 'success',
  REJECTED: 'error'
};

function RecentActivity({ recentApplications }) {
  if (!recentApplications || recentApplications.length === 0) {
    return (
      <Card elevation={2}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Recent Activity</Typography>
          <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
            No recent applications
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card elevation={2}>
      <CardContent>
        <Typography variant="h6" gutterBottom>Recent Activity</Typography>
        <List>
          {recentApplications.map((job, index) => (
            <ListItem
              key={job.id}
              divider={index < recentApplications.length - 1}
              sx={{ px: 0 }}
            >
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="subtitle1" fontWeight="medium">
                      {job.companyName}
                    </Typography>
                    <Chip
                      label={job.status}
                      color={STATUS_COLORS[job.status]}
                      size="small"
                    />
                  </Box>
                }
                secondary={
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                    <Typography variant="body2" color="text.secondary">
                      {job.role}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {job.appliedDate}
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

export default RecentActivity;
