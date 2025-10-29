
import apiClient from './apiClient';

export interface Lesson {
  id: number;
  title: string;
  duration: number;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  rating: number;
  category: string;
  lessons?: Lesson[];
  instructor: string;
  enrolledCount: number;
  duration: number;
}

export const courseService = {
  getAllCourses: async (): Promise<Course[]> => {
    // In a real app, you'd fetch this from the API
    // const response = await apiClient.get('/courses');
    // return response.data;

    // For now, return dummy data
    return Promise.resolve([
      {
        id: 1,
        title: 'Introduction to React',
        description: 'Learn the fundamentals of React.js and build modern web applications.',
        thumbnail: 'https://via.placeholder.com/300x200.png?text=React',
        price: 49.99,
        rating: 4.5,
        category: 'programming',
        instructor: 'John Doe',
        enrolledCount: 1234,
        duration: 10,
        lessons: [
          { id: 1, title: 'Getting Started', duration: 15 },
          { id: 2, title: 'Components and Props', duration: 30 },
        ],
      },
      {
        id: 2,
        title: 'Advanced TypeScript',
        description: 'Master TypeScript for large-scale applications.',
        thumbnail: 'https://via.placeholder.com/300x200.png?text=TypeScript',
        price: 79.99,
        rating: 4.8,
        category: 'programming',
        instructor: 'Jane Smith',
        enrolledCount: 5678,
        duration: 15,
        lessons: [],
      },
      {
        id: 3,
        title: 'UI/UX Design Fundamentals',
        description: 'Learn the principles of user interface and user experience design.',
        thumbnail: 'https://via.placeholder.com/300x200.png?text=UI/UX',
        price: 59.99,
        rating: 4.7,
        category: 'design',
        instructor: 'Peter Jones',
        enrolledCount: 3456,
        duration: 12,
        lessons: [],
      },
      {
        id: 4,
        title: 'Digital Marketing Masterclass',
        description: 'Become a digital marketing expert.',
        thumbnail: 'https://via.placeholder.com/300x200.png?text=Marketing',
        price: 99.99,
        rating: 4.9,
        category: 'marketing',
        instructor: 'Mary Green',
        enrolledCount: 7890,
        duration: 20,
        lessons: [],
      },
    ]);
  },
  getCourseById: async (id: number): Promise<Course | undefined> => {
    const courses = await courseService.getAllCourses();
    return courses.find((course) => course.id === id);
  },
  enrollCourse: async (courseId: string): Promise<void> => {
    // In a real app, you'd make an API call to enroll the user
    console.log(`Enrolling in course ${courseId}`);
    return Promise.resolve();
  },
};
