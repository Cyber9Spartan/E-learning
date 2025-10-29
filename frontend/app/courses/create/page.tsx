'use client';
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  MenuItem,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import { Add, Delete, CloudUpload } from '@mui/icons-material';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { PageHeader } from '@/components/common/PageHeader';
import { useSnackbar } from '@/context/SnackbarContext';
import { useAuth } from '@/hooks/useAuth';
import { courseService } from '@/services/courseService';
import { useRouter } from 'next/navigation';

interface Lesson {
  title: string;
  description: string;
  videoUrl: string;
  duration: number;
}

export default function CreateCoursePage() {
  useAuth(['teacher', 'admin']);
  const { showSnackbar } = useSnackbar();
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    duration: '',
    thumbnail: '',
  });

  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [currentLesson, setCurrentLesson] = useState<Lesson>({
    title: '',
    description: '',
    videoUrl: '',
    duration: 0,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLessonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentLesson({
      ...currentLesson,
      [e.target.name]: e.target.value,
    });
  };

  const addLesson = () => {
    if (currentLesson.title && currentLesson.videoUrl) {
      setLessons([...lessons, currentLesson]);
      setCurrentLesson({
        title: '',
        description: '',
        videoUrl: '',
        duration: 0,
      });
      showSnackbar('Lesson added successfully', 'success');
    } else {
      showSnackbar('Please fill in all lesson fields', 'error');
    }
  };

  const removeLesson = (index: number) => {
    setLessons(lessons.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const courseData = {
        ...formData,
        price: parseFloat(formData.price),
        duration: parseFloat(formData.duration),
        lessons,
      };

      await courseService.createCourse(courseData);
      showSnackbar('Course created successfully!', 'success');
      router.push('/courses/my-courses');
    } catch (error) {
      console.error('Failed to create course:', error);
      showSnackbar('Failed to create course', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <PageHeader
        title="Create New Course"
        subtitle="Share your knowledge with students around the world"
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Courses', href: '/courses' },
          { label: 'Create Course' },
        ]}
      />

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Course Information
                </Typography>

                <TextField
                  fullWidth
                  label="Course Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  margin="normal"
                  required
                />

                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  margin="normal"
                  multiline
                  rows={4}
                  required
                />

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      select
                      label="Category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      margin="normal"
                      required
                    >
                      <MenuItem value="programming">Programming</MenuItem>
                      <MenuItem value="design">Design</MenuItem>
                      <MenuItem value="business">Business</MenuItem>
                      <MenuItem value="marketing">Marketing</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Price ($)"
                      name="price"
                      type="number"
                      value={formData.price}
                      onChange={handleChange}
                      margin="normal"
                      required
                    />
                  </Grid>
                </Grid>

                <TextField
                  fullWidth
                  label="Total Duration (hours)"
                  name="duration"
                  type="number"
                  value={formData.duration}
                  onChange={handleChange}
                  margin="normal"
                  required
                />

                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="outlined"
                    startIcon={<CloudUpload />}
                    component="label"
                  >
                    Upload Thumbnail
                    <input type="file" hidden accept="image/*" />
                  </Button>
                </Box>
              </CardContent>
            </Card>

            <Card sx={{ mt: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Course Curriculum
                </Typography>

                <Box sx={{ mb: 3 }}>
                  <TextField
                    fullWidth
                    label="Lesson Title"
                    name="title"
                    value={currentLesson.title}
                    onChange={handleLessonChange}
                    margin="normal"
                  />

                  <TextField
                    fullWidth
                    label="Lesson Description"
                    name="description"
                    value={currentLesson.description}
                    onChange={handleLessonChange}
                    margin="normal"
                    multiline
                    rows={2}
                  />

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={8}>
                      <TextField
                        fullWidth
                        label="Video URL"
                        name="videoUrl"
                        value={currentLesson.videoUrl}
                        onChange={handleLessonChange}
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        label="Duration (minutes)"
                        name="duration"
                        type="number"
                        value={currentLesson.duration}
                        onChange={handleLessonChange}
                        margin="normal"
                      />
                    </Grid>
                  </Grid>

                  <Button
                    variant="outlined"
                    startIcon={<Add />}
                    onClick={addLesson}
                    sx={{ mt: 2 }}
                  >
                    Add Lesson
                  </Button>
                </Box>

                {lessons.length > 0 && (
                  <>
                    <Typography variant="subtitle1" gutterBottom>
                      Lessons ({lessons.length})
                    </Typography>
                    <List>
                      {lessons.map((lesson, index) => (
                        <ListItem key={index} divider>
                          <ListItemText
                            primary={`${index + 1}. ${lesson.title}`}
                            secondary={`${lesson.duration} minutes`}
                          />
                          <ListItemSecondaryAction>
                            <IconButton
                              edge="end"
                              onClick={() => removeLesson(index)}
                            >
                              <Delete />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      ))}
                    </List>
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Publish
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Review your course details before publishing
                </Typography>

                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  type="submit"
                  disabled={loading || lessons.length === 0}
                >
                  {loading ? 'Creating...' : 'Create Course'}
                </Button>

                <Button
                  fullWidth
                  variant="outlined"
                  size="large"
                  sx={{ mt: 2 }}
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </form>
    </DashboardLayout>
  );
}