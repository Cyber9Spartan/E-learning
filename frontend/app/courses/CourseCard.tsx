import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  Rating,
  Button,
  CardActions,
} from '@mui/material';
import { Person, Schedule, Star } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';

interface CourseCardProps {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  instructor: string;
  price: number;
  rating: number;
  enrolledCount: number;
  duration: number;
  category: string;
  enrolled?: boolean;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  id,
  title,
  description,
  thumbnail,
  instructor,
  price,
  rating,
  enrolledCount,
  duration,
  category,
  enrolled,
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(ROUTES.COURSE_DETAIL(String(id)));
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="180"
        image={thumbnail || 'https://via.placeholder.com/400x200'}
        alt={title}
        sx={{ cursor: 'pointer' }}
        onClick={handleClick}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ mb: 1 }}>
          <Chip label={category} size="small" color="primary" />
        </Box>
        
        <Typography
          variant="h6"
          component="h3"
          gutterBottom
          sx={{ cursor: 'pointer' }}
          onClick={handleClick}
        >
          {title}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {description.length > 100
            ? `${description.substring(0, 100)}...`
            : description}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Person fontSize="small" sx={{ mr: 0.5 }} />
          <Typography variant="body2" color="text.secondary">
            {instructor}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Rating value={rating} readOnly size="small" />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            ({enrolledCount} students)
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Schedule fontSize="small" sx={{ mr: 0.5 }} />
          <Typography variant="body2" color="text.secondary">
            {duration} hours
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          <Typography variant="h6" color="primary">
            ${price}
          </Typography>
          <Button
            variant={enrolled ? 'outlined' : 'contained'}
            size="small"
            onClick={handleClick}
          >
            {enrolled ? 'Continue' : 'Enroll Now'}
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};