'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  Chip,
  Rating,
  Divider,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Tab,
  Tabs,
} from '@mui/material';
import {
  PlayCircleOutline,
  Schedule,
  Person,
  Star,
  CheckCircle,
} from '@mui/icons-material';
import LoadingSpinner from '@/app/components/common/LoadingSpinner';
import { courseService, Course } from '@/services/courseService';
import { useSnackbar } from '@/context/SnackbarContext';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div hidden={value !== index} {...other}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { showSnackbar } = useSnackbar();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [enrolled, setEnrolled] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await courseService.getCourseById(Number(params.id));
        setCourse(data as Course | null);
      } catch (error) {
        console.error('Failed to fetch course:', error);
        showSnackbar('Failed to load course details', 'error');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchCourse();
    }
  }, [params.id]);

  const handleEnroll = async () => {
    try {
      await courseService.enrollCourse(params.id as string);
      setEnrolled(true);
      showSnackbar('Successfully enrolled in course!', 'success');
    } catch (error) {
      console.error('Failed to enroll:', error);
      showSnackbar('Failed to enroll in course', 'error');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!course) {
    return <Typography>Course not found</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
        {course.title}
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardMedia
              component="img"
              height="400"
              image={course.thumbnail || 'https://via.placeholder.com/800x400'}
              alt={course.title}
            />
            <CardContent>
              <Box sx={{ mb: 2 }}>
                <Chip label={course.category} color="primary" />
              </Box>

              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)}>
                  <Tab label="Overview" />
                  <Tab label="Curriculum" />
                  <Tab label="Instructor" />
                </Tabs>
              </Box>

              <TabPanel value={tabValue} index={0}>
                <Typography variant="h6" gutterBottom>
                  About this course
                </Typography>
                <Typography variant="body1" paragraph>
                  {course.description}
                </Typography>

                <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                  What you'll learn
                </Typography>
                <List>
                  <ListItem>
                    <CheckCircle color="success" sx={{ mr: 1 }} />
                    <ListItemText primary="Master the fundamentals" />
                  </ListItem>
                  <ListItem>
                    <CheckCircle color="success" sx={{ mr: 1 }} />
                    <ListItemText primary="Build real-world projects" />
                  </ListItem>
                  <ListItem>
                    <CheckCircle color="success" sx={{ mr: 1 }} />
                    <ListItemText primary="Get hands-on experience" />
                  </ListItem>
                </List>
              </TabPanel>

              <TabPanel value={tabValue} index={1}>
                <Typography variant="h6" gutterBottom>
                  Course Curriculum
                </Typography>
                <List>
                  {course.lessons?.map((lesson, index) => (
                    <ListItem key={lesson.id} divider>
                      <PlayCircleOutline sx={{ mr: 2 }} />
                      <ListItemText
                        primary={`${index + 1}. ${lesson.title}`}
                        secondary={`${lesson.duration} minutes`}
                      />
                    </ListItem>
                  ))}
                </List>
              </TabPanel>

              <TabPanel value={tabValue} index={2}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ width: 60, height: 60, mr: 2 }}>
                    {course.instructor.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="h6">{course.instructor}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Professional Instructor
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body1">
                  Experienced educator with a passion for teaching and helping
                  students achieve their goals.
                </Typography>
              </TabPanel>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h4" color="primary" gutterBottom>
                ${course.price}
              </Typography>

              <Button
                fullWidth
                variant="contained"
                size="large"
                sx={{ mb: 2 }}
                onClick={handleEnroll}
                disabled={enrolled}
              >
                {enrolled ? 'Enrolled' : 'Enroll Now'}
              </Button>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Person sx={{ mr: 1 }} />
                  <Typography variant="body2">
                    {course.enrolledCount} students enrolled
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Schedule sx={{ mr: 1 }} />
                  <Typography variant="body2">
                    {course.duration} total hours
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Rating value={course.rating} readOnly size="small" />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    {course.rating} rating
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle2" gutterBottom>
                This course includes:
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText primary="Lifetime access" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Certificate of completion" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Downloadable resources" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
