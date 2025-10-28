"use client";
import { useEffect, useState } from "react";
import {
  Typography, Card, CardContent, CardMedia,
  Button, Box, CircularProgress, Rating,
} from "@mui/material";
import Grid from '@mui/material/Grid';
import Link from "next/link";

interface Course {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  rating: number;
}

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=6")
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
      <Typography variant="h4" fontWeight="bold" gutterBottom align="center">
        Featured Courses
      </Typography>
      <Grid container spacing={3}>
        {courses.map((c) => (
          <Grid item xs={12} sm={6} md={4} key={c.id}>
            <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
              <CardMedia component="img" height="180" image={c.thumbnail} alt={c.title} />
              <CardContent>
                <Typography variant="h6" noWrap>{c.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {c.description.slice(0, 60)}...
                </Typography>
                <Rating value={c.rating} readOnly precision={0.5} sx={{ mt: 1 }} />
                <Typography variant="h6" color="primary" mt={1}>
                  ${c.price}
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ mt: 1 }}
                  component={Link}
                  href={`/course/${c.id}`}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
