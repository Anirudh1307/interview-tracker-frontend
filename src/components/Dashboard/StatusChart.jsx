import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const STATUS_COLORS = {
  APPLIED: '#1976d2',
  OA: '#9c27b0',
  INTERVIEW: '#ed6c02',
  HR: '#0288d1',
  OFFERED: '#2e7d32',
  REJECTED: '#d32f2f'
};

function StatusChart({ statusCounts }) {
  const data = Object.entries(statusCounts)
    .filter(([_, count]) => count > 0)
    .map(([status, count]) => ({
      name: status,
      value: count
    }));

  if (data.length === 0) {
    return (
      <Card elevation={2}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Status Distribution</Typography>
          <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
            No data available
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card elevation={2}>
      <CardContent>
        <Typography variant="h6" gutterBottom>Status Distribution</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.name]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default StatusChart;
