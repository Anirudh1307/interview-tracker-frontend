import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function TrendChart({ monthlyTrends }) {
  if (!monthlyTrends || monthlyTrends.length === 0) {
    return (
      <Card elevation={2}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Application Trends</Typography>
          <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
            No trend data available
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const data = monthlyTrends.map(stat => ({
    name: `${MONTH_NAMES[stat.month - 1]} ${stat.year}`,
    Applications: stat.applications,
    Interviews: stat.interviews,
    Offers: stat.offers
  }));

  return (
    <Card elevation={2}>
      <CardContent>
        <Typography variant="h6" gutterBottom>Application Trends (Last 6 Months)</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Applications" stroke="#1976d2" strokeWidth={2} />
            <Line type="monotone" dataKey="Interviews" stroke="#ed6c02" strokeWidth={2} />
            <Line type="monotone" dataKey="Offers" stroke="#2e7d32" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default TrendChart;
