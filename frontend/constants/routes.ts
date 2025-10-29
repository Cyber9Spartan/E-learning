
export const ROUTES = {
  HOME: '/',
  COURSES: '/courses',
  COURSE_DETAIL: (id: string) => `/courses/${id}`,
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
  FORGOT_PASSWORD: '/auth/forgot-password',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  CREATE_COURSE: '/courses/create',
  MY_COURSES: '/my-courses',
  ADMIN_DASHBOARD: '/dashboard/admin',
  TEACHER_DASHBOARD: '/dashboard/teacher',
  STUDENT_DASHBOARD: '/dashboard/student',
};
