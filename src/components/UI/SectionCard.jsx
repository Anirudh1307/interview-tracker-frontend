import React from 'react';
import { Card, CardContent, Stack, Typography } from '@mui/material';

function SectionCard({ title, subtitle, action, children, contentSx = {}, ...props }) {
  return (
    <Card {...props}>
      <CardContent sx={{ p: { xs: 2.5, sm: 3 }, ...contentSx }}>
        {(title || subtitle || action) ? (
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1.5}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            sx={{ mb: 3 }}
          >
            <Stack spacing={0.5}>
              {title ? <Typography variant="h4">{title}</Typography> : null}
              {subtitle ? (
                <Typography variant="body2" color="text.secondary">
                  {subtitle}
                </Typography>
              ) : null}
            </Stack>
            {action || null}
          </Stack>
        ) : null}
        {children}
      </CardContent>
    </Card>
  );
}

export default SectionCard;
