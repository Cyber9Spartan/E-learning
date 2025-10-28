"use client";
import { useEffect, useState } from "react";
import { Typography, Grid, Card, CardContent, CardMedia, CircularProgress, Box } from "@mui/material";

interface Product {
  id: number;
  title: string;
  thumbnail: string;
  rating: number;
  // add additional fields from the API here if you need them
}

export default function DashboardPage() {
  const [courses, setCourses] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=3")
      .then((res) => res.json())
      .then((data) => setCourses(data.products))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" mb={4}>
        Your Enrolled Courses
      </Typography>
      <Grid container spacing={3}>
        {courses.map((c) => (
          <Grid item xs={12} sm={6} md={4} key={c.id}>
            <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
              <CardMedia component="img" height="180" image={c.thumbnail} alt={c.title} />
              <CardContent>
                <Typography variant="h6">{c.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Progress: {Math.floor(c.rating * 20)}%
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
