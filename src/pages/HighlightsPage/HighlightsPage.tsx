import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { StylesObject } from '../../shared/types/styles.types';
import { features } from '../../shared/components/FeatureTour/featureData';
import { usePageTitle } from '../../shared/hooks/usePageTitle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const styles: StylesObject = {
  container: {
    py: 4,
  },
  header: {
    mb: 4,
    textAlign: 'center',
  },
  title: {
    fontWeight: 700,
    fontSize: '2.5rem',
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    mb: 1,
  },
  subtitle: {
    color: 'text.secondary',
    fontSize: '1.1rem',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: {
      xs: '1fr',
      md: 'repeat(2, 1fr)',
    },
    gap: 3,
  },
  featureCard: {
    p: 3,
    backgroundColor: 'background.paper',
    borderRadius: 2,
    boxShadow: 2,
    transition: 'all 0.3s',
    '&:hover': {
      boxShadow: 6,
      transform: 'translateY(-4px)',
    },
  },
  icon: {
    fontSize: '2.5rem',
    mb: 2,
    display: 'block',
  },
  featureTitle: {
    fontWeight: 600,
    fontSize: '1.25rem',
    mb: 1,
  },
  description: {
    color: 'text.secondary',
    mb: 2,
    lineHeight: 1.6,
  },
  reason: {
    fontSize: '0.9rem',
    color: 'text.secondary',
    fontStyle: 'italic',
    mb: 2,
    p: 1.5,
    backgroundColor: 'action.hover',
    borderRadius: 1,
    borderLeft: '3px solid',
    borderColor: 'primary.main',
  },
  prosContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
  },
  proItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 1,
    fontSize: '0.9rem',
  },
  proIcon: {
    fontSize: '1.2rem',
    color: 'success.main',
    mt: 0.2,
  },
};

export const HighlightsPage: React.FC = () => {
  usePageTitle('Feature Highlights');

  return (
    <Container maxWidth="lg" sx={styles.container}>
      <Box sx={styles.header}>
        <Typography sx={styles.title}>✨ Feature Highlights</Typography>
        <Typography sx={styles.subtitle}>
          Implementation details, pros & cons
        </Typography>
      </Box>

      <Box sx={styles.gridContainer}>
        {features.map((feature) => (
          <Box key={feature.id} sx={styles.featureCard}>
            <Box component="span" sx={styles.icon}>
              {feature.icon}
            </Box>
            <Typography sx={styles.featureTitle}>{feature.title}</Typography>
            <Typography sx={styles.description}>
              {feature.description}
            </Typography>
            <Typography sx={styles.reason}>
              💡 <strong>Why:</strong> {feature.reason}
            </Typography>
            <Box sx={styles.prosContainer}>
              {feature.pros.map((pro, idx) => (
                <Box key={idx} sx={styles.proItem}>
                  <CheckCircleIcon sx={styles.proIcon} />
                  <Typography variant="body2">{pro}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

