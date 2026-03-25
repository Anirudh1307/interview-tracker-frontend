import React, { useState, useEffect } from 'react';
import { Alert, Box, Button, Skeleton, Stack } from '@mui/material';
import {
  AddRounded as Add,
  AssignmentRounded as Assignment,
  EmojiEventsRounded as EmojiEvents,
  TrendingUpRounded as TrendingUp,
  WorkOutlineRounded as Work
} from '@mui/icons-material';
import { analyticsService } from '../../services/api';
import StatCard from './StatCard';
import StatusChart from './StatusChart';
import RecentActivity from './RecentActivity';
import TrendChart from './TrendChart';
import PageHeader from '../UI/PageHeader';

function Dashboard({ setView }) {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = () => {
    setLoading(true);
    setError(null);

    analyticsService.get()
      .then(({ data }) => {
        setAnalytics(data.data || data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load analytics. Please login again.');
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <Stack spacing={3}>
        <PageHeader
          title="Dashboard"
          description="A polished overview of your applications, interviews, and offers."
        />
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 3
          }}
        >
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} variant="rectangular" height={156} />
          ))}
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 1fr) minmax(0, 0.92fr)' },
            gap: 3
          }}
        >
          <Skeleton variant="rectangular" height={320} />
          <Skeleton variant="rectangular" height={320} />
        </Box>
        <Skeleton variant="rectangular" height={340} />
      </Stack>
    );
  }

  if (error) {
    return (
      <Stack spacing={3}>
        <PageHeader
          title="Dashboard"
          description="A polished overview of your applications, interviews, and offers."
        />
        <Alert severity="error" action={
          <Button color="inherit" size="small" onClick={loadAnalytics}>Retry</Button>
        }>
          {error}
        </Alert>
      </Stack>
    );
  }

  if (!analytics) return null;

  return (
    <Stack spacing={3}>
      <PageHeader
        title="Dashboard"
        description="Track progress, spot momentum, and jump back into your application pipeline quickly."
        actions={(
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setView('jobs')}
          >
            Add Application
          </Button>
        )}
      />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 3
        }}
      >
        <StatCard
          title="Total Applications"
          value={analytics.totalApplications || 0}
          icon={Work}
          color="primary"
        />
        <StatCard
          title="Total Interviews"
          value={analytics.totalInterviews || 0}
          icon={Assignment}
          color="info"
        />
        <StatCard
          title="Total Offers"
          value={analytics.totalOffers || 0}
          icon={EmojiEvents}
          color="success"
        />
        <StatCard
          title="Offer Rate"
          value={`${(analytics.offerRate || 0).toFixed(1)}%`}
          icon={TrendingUp}
          color="warning"
        />
        <StatCard
          title="Active Applications"
          value={analytics.activeApplications || 0}
          icon={Work}
          color="secondary"
        />
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 1fr) minmax(0, 0.92fr)' },
          gap: 3
        }}
      >
        <StatusChart statusCounts={analytics.statusCounts || {}} />
        <RecentActivity recentApplications={analytics.recentApplications || []} />
      </Box>

      <TrendChart monthlyTrends={analytics.monthlyTrends || []} />
    </Stack>
  );
}

export default Dashboard;
