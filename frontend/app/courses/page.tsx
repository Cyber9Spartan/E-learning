'use client';
import React, { useEffect, useState } from 'react';
import {
  Grid,
  TextField,
  MenuItem,
  Box,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  Typography,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import LoadingSpinner from '@/app/components/common/LoadingSpinner';
import {CourseCard} from '@/app/courses/CourseCard';
import { courseService, Course } from '@/services/courseService';

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await courseService.getAllCourses();
        setCourses(data);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'all' || course.category === category;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
        Browse Courses
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
        Explore our wide range of courses and start learning today
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                label="Category"
              >
                <MenuItem value="all">All Categories</MenuItem>
                <MenuItem value="programming">Programming</MenuItem>
                <MenuItem value="design">Design</MenuItem>
                <MenuItem value="business">Business</MenuItem>
                <MenuItem value="marketing">Marketing</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={3}>
        {filteredCourses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <CourseCard {...course} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
