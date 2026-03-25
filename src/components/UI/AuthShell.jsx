import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Stack,
  Typography
} from '@mui/material';
import { TipsAndUpdatesRounded } from '@mui/icons-material';

function AuthShell({ title, subtitle, children }) {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, sm: 5, md: 7 } }}>
      <Card sx={{ overflow: 'hidden' }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1.05fr 0.95fr' }
          }}
        >
          <Box
            sx={{
              position: 'relative',
              px: { xs: 3, sm: 4, md: 5 },
              py: { xs: 4, md: 5 },
              color: 'common.white',
              background: 'linear-gradient(145deg, #312E81 0%, #4F46E5 55%, #22C55E 140%)'
            }}
          >
            <Stack spacing={3}>
              <Chip
                icon={<TipsAndUpdatesRounded sx={{ color: 'inherit !important' }} />}
                label="Track every interview milestone"
                sx={{
                  alignSelf: 'flex-start',
                  color: 'common.white',
                  bgcolor: 'rgba(255,255,255,0.12)',
                  borderColor: 'rgba(255,255,255,0.18)'
                }}
                variant="outlined"
              />
              <Box>
                <Typography variant="h2" sx={{ color: 'common.white', mb: 1.5 }}>
                  Interview Tracker
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: 'rgba(255,255,255,0.82)', maxWidth: 420 }}
                >
                  Keep your applications, interviews, and offers organized in one calm,
                  easy-to-scan workspace.
                </Typography>
              </Box>
              <Stack spacing={1.5}>
                <Typography variant="subtitle2" sx={{ color: 'rgba(255,255,255,0.74)' }}>
                  What you get
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                  A clearer dashboard for progress tracking
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                  Cleaner application management with better hierarchy
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                  Faster scanning across statuses, dates, and recent activity
                </Typography>
              </Stack>
            </Stack>
          </Box>

          <CardContent
            sx={{
              p: { xs: 3, sm: 4, md: 5 },
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Box sx={{ width: '100%' }}>
              <Stack spacing={1} sx={{ mb: 4 }}>
                <Typography variant="h3">{title}</Typography>
                <Typography color="text.secondary">{subtitle}</Typography>
              </Stack>
              {children}
            </Box>
          </CardContent>
        </Box>
      </Card>
    </Container>
  );
}

export default AuthShell;
