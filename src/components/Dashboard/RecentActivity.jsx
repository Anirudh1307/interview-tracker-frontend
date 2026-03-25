import React from 'react';
import { Box, Chip, List, ListItem, ListItemText, Typography } from '@mui/material';
import SectionCard from '../UI/SectionCard';
import { statusVisuals } from '../../theme';

function RecentActivity({ recentApplications }) {
  if (!recentApplications || recentApplications.length === 0) {
    return (
      <SectionCard
        title="Recent Activity"
        subtitle="Your latest applications at a glance."
        sx={{ height: '100%' }}
      >
        <Typography color="text.secondary" align="center" sx={{ py: 6 }}>
            No recent applications
        </Typography>
      </SectionCard>
    );
  }

  return (
    <SectionCard
      title="Recent Activity"
      subtitle="The newest additions to your pipeline."
      sx={{ height: '100%' }}
    >
        <List>
          {recentApplications.map((job, index) => (
            <ListItem
              key={job.id}
              divider={index < recentApplications.length - 1}
              sx={{ px: 0, py: 1.5 }}
            >
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {job.companyName}
                    </Typography>
                    <Chip
                      label={statusVisuals[job.status]?.label || job.status}
                      color={statusVisuals[job.status]?.chipColor || 'default'}
                      size="small"
                    />
                  </Box>
                }
                secondary={
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, mt: 1 }}>
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
    </SectionCard>
  );
}

export default RecentActivity;
