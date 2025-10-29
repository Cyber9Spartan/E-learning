'use client';
import { useEffect, useState } from 'react';
import {
  Typography,
  Button,
  Box,
  Container,
  Grid,
} from '@mui/material';
import Link from 'next/link';
import LoadingSpinner from '@/app/components/common/LoadingSpinner';
import { CourseCard } from '@/app/courses/CourseCard';
import { courseService, Course } from '@/services/courseService';
import { ROUTES } from '@/constants/routes';

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await courseService.getAllCourses();
        setCourses(data.slice(0, 3)); // Show only 3 featured courses
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          py: { xs: 8, md: 12 },
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h2"
            component="h1"
            fontWeight="bold"
            gutterBottom
          >
            Unlock Your Potential
          </Typography>
          <Typography variant="h5" component="p" sx={{ mb: 4 }}>
            Master in-demand skills with our expert-led online courses.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            component={Link}
            href={ROUTES.COURSES}
          >
            Explore Courses
          </Button>
        </Container>
      </Box>

      {/* Featured Courses Section */}
      <Container sx={{ py: 8 }}>
        <Typography
          variant="h4"
          component="h2"
          fontWeight="bold"
          gutterBottom
          align="center"
          sx={{ mb: 6 }}
        >
          Featured Courses
        </Typography>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <Grid container spacing={4}>
            {courses.map((course) => (
              <Grid item xs={12} sm={6} md={4} key={course.id}>
                <CourseCard {...course} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
