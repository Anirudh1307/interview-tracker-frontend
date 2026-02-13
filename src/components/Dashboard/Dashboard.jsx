import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Skeleton, Alert } from '@mui/material';
import { Work, EmojiEvents, TrendingUp, Assignment, Add } from '@mui/icons-material';
import { analyticsService } from '../../services/api';
import StatCard from './StatCard';
import StatusChart from './StatusChart';
import RecentActivity from './RecentActivity';
import TrendChart from './TrendChart';

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
        console.log('Analytics data:', data);
        setAnalytics(data.data || data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Analytics error:', err);
        setError('Failed to load analytics');
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>Dashboard</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 3, mb: 3 }}>
          {[1, 2, 3, 4, 5].map(i => (
            <Skeleton key={i} variant="rectangular" height={120} sx={{ borderRadius: 2 }} />
          ))}
        </Box>
        <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 2 }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>Dashboard</Typography>
        <Alert severity="error" action={
          <Button color="inherit" size="small" onClick={loadAnalytics}>Retry</Button>
        }>
          {error}
        </Alert>
      </Box>
    );
  }

  if (!analytics) return null;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Dashboard</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setView('jobs')}
        >
          Add Application
        </Button>
      </Box>

      {/* KPI Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 3, mb: 3 }}>
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

      {/* Charts and Activity */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 3 }}>
        <StatusChart statusCounts={analytics.statusCounts || {}} />
        <RecentActivity recentApplications={analytics.recentApplications || []} />
      </Box>

      {/* Trend Chart */}
      <TrendChart monthlyTrends={analytics.monthlyTrends || []} />
    </Box>
  );
}

export default Dashboard;
