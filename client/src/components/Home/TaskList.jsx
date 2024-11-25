import React from 'react';
import { 
  Box, 
  Typography, 
  useMediaQuery, 
  useTheme 
} from '@mui/material';
import { 
  School, 
  Science, 
  Language, 
  Link as LinkIcon 
} from '@mui/icons-material';
import { useUserContext } from '../../context/context';

const getIconForCourse = (course) => {
  const iconMap = {
    'Math': <School />,
    'Science': <Science />,
    'English': <Language />
  };
  return iconMap[course] || <School />;
};

const TaskList = () => {
  const { tasksData } = useUserContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',  // Center the boxes horizontally
        gap: 4,                    // Add space between boxes
        p: 2,
        width: '100%',
      }}
    >
      {tasksData.map((data) => (
        <Box 
          key={data.id} 
          sx={{ 
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: isMobile ? 180 : 220,
            p: 2,
            borderRadius: 3,
            boxShadow: 2,
            transition: 'transform 0.2s',
            '&:hover': {
              transform: 'scale(1.05)'
            }
          }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'linear-gradient(145deg, #e6e9f0, #d1d9e6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 2,
              boxShadow: 1
            }}
          >
            {getIconForCourse(data.course)}
          </Box>
          <Typography variant="h6" sx={{ textAlign: 'center', mb: 1 }}>
            {data.course}
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              textAlign: 'center', 
              mb: 1,
              color: 'text.secondary' 
            }}
          >
            {data.text}
          </Typography>
          {data.link && (
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mt: 1 
              }}
            >
              <LinkIcon 
                color="primary" 
                sx={{ mr: 1 }} 
              />
              <Typography 
                variant="caption" 
                color="primary" 
                component="a" 
                href={data.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Assignment
              </Typography>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default TaskList;
