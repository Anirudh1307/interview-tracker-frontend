import React from 'react';
import { Box, Typography } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import SectionCard from '../UI/SectionCard';
import { statusVisuals } from '../../theme';

function StatusChart({ statusCounts }) {
  const data = Object.entries(statusCounts)
    .filter(([_, count]) => count > 0)
    .map(([status, count]) => ({
      name: statusVisuals[status]?.label || status,
      key: status,
      value: count
    }));

  if (data.length === 0) {
    return (
      <SectionCard
        title="Status Distribution"
        subtitle="See how applications are spread across stages."
        sx={{ height: '100%' }}
      >
        <Typography color="text.secondary" align="center" sx={{ py: 6 }}>
            No data available
        </Typography>
      </SectionCard>
    );
  }

  return (
    <SectionCard
      title="Status Distribution"
      subtitle="A quick snapshot of your current pipeline."
      sx={{ height: '100%' }}
    >
      <Box sx={{ width: '100%', height: 300 }}>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={92}
              innerRadius={50}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={statusVisuals[entry.key]?.color || statusVisuals.APPLIED.color}
                />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [value, 'Applications']} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </SectionCard>
  );
}

export default StatusChart;
