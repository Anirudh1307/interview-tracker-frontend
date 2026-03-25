import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

function PageHeader({ title, description, actions }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'flex-start', md: 'center' },
        justifyContent: 'space-between',
        gap: 2.5
      }}
    >
      <Stack spacing={0.75}>
        <Typography variant="h2">{title}</Typography>
        {description ? (
          <Typography color="text.secondary" sx={{ maxWidth: 680 }}>
            {description}
          </Typography>
        ) : null}
      </Stack>
      {actions ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            width: { xs: '100%', md: 'auto' },
            '& > *': {
              width: { xs: '100%', sm: 'auto' }
            }
          }}
        >
          {actions}
        </Box>
      ) : null}
    </Box>
  );
}

export default PageHeader;
