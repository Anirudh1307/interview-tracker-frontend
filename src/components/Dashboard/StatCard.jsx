import React from 'react';
import { alpha, useTheme } from '@mui/material/styles';
import { Box, Card, CardContent, Typography } from '@mui/material';

function StatCard({ title, value, icon: Icon, color = 'primary' }) {
  const theme = useTheme();
  const paletteColor = theme.palette[color] || theme.palette.primary;

  return (
    <Card
      sx={{
        height: '100%',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: theme.shadows[4]
        }
      }}
    >
      <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2 }}>
          <Box sx={{ minWidth: 0 }}>
            <Typography
              color="text.secondary"
              variant="body2"
              sx={{ mb: 1, textTransform: 'uppercase', letterSpacing: '0.06em' }}
            >
              {title}
            </Typography>
            <Typography
              variant="h2"
              component="div"
              sx={{ color: paletteColor.main, fontSize: { xs: '1.8rem', sm: '2rem' } }}
            >
              {value}
            </Typography>
          </Box>
          <Box
            sx={{
              bgcolor: alpha(paletteColor.main, 0.12),
              borderRadius: 3,
              p: 1.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <Icon sx={{ fontSize: 28, color: paletteColor.main }} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default StatCard;
