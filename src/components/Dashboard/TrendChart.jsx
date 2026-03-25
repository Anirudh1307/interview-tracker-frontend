import React from 'react';
import { Box, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import SectionCard from '../UI/SectionCard';

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function TrendChart({ monthlyTrends }) {
  if (!monthlyTrends || monthlyTrends.length === 0) {
    return (
      <SectionCard
        title="Application Trends"
        subtitle="Track momentum across the last six months."
      >
        <Typography color="text.secondary" align="center" sx={{ py: 6 }}>
            No trend data available
        </Typography>
      </SectionCard>
    );
  }

  const data = monthlyTrends.map(stat => ({
    name: `${MONTH_NAMES[stat.month - 1]} ${stat.year}`,
    Applications: stat.applications,
    Interviews: stat.interviews,
    Offers: stat.offers
  }));

  return (
    <SectionCard
      title="Application Trends"
      subtitle="Applications, interviews, and offers across the last six months."
    >
      <Box sx={{ width: '100%', height: 320 }}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="4 4" stroke="#E2E8F0" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Applications" stroke="#4F46E5" strokeWidth={3} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="Interviews" stroke="#0EA5E9" strokeWidth={3} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="Offers" stroke="#22C55E" strokeWidth={3} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </SectionCard>
  );
}

export default TrendChart;
