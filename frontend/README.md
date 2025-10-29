# 🎓 E-Learning Platform - Complete Frontend

A fully-featured, production-ready E-Learning platform built with Next.js 14, TypeScript, Material-UI, Redux Toolkit, and Context API.

## ✨ Features

### 🔐 Authentication & Authorization
- JWT-based authentication with auto-refresh
- Role-based access control (Admin, Teacher, Student)
- Protected routes with Next.js middleware
- Persistent sessions with cookies

### 👥 User Roles

#### Student Features
- Browse and search courses
- Enroll in courses
- Watch video lectures
- Track learning progress
- Take quizzes and assignments
- Participate in discussions
- View personalized dashboard

#### Teacher Features
- Create and manage courses
- Upload lessons and materials
- Track student performance
- View course analytics
- Manage enrolled students
- Communicate with students

#### Admin Features
- Manage all users
- Oversee all courses
- Platform-wide analytics
- System configuration
- Handle support tickets

### 🎨 UI/UX Features
- Responsive design (mobile, tablet, desktop)
- Dark/Light theme toggle
- Material Design components
- Smooth animations and transitions
- Loading states and skeletons
- Toast notifications
- Breadcrumb navigation

### 📊 State Management
- Redux Toolkit for global state
- Context API for UI state
- Optimized selectors and reducers
- Middleware for async operations

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **UI Library**: Material-UI (MUI) v5
- **State Management**: Redux Toolkit + Context API
- **HTTP Client**: Axios with interceptors
- **Forms**: Native React with validation
- **Styling**: Emotion (MUI's styling solution)
- **Charts**: Recharts
- **Icons**: Material Icons

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── (auth)/            # Authentication pages
│   │   ├── login/
│   │   ├── signup/
│   │   └── forgot-password/
│   ├── dashboard/         # Role-based dashboards
│   │   ├── student/
│   │   ├── teacher/
│   │   └── admin/
│   ├── courses/           # Course pages
│   │   ├── [id]/         # Course detail
│   │   ├── create/       # Create course
│   │   └── my-courses/   # User courses
│   ├── profile/           # User profile
│   ├── layout.tsx         # Root layout
│   └── providers.tsx      # Context providers
├── components/            # Reusable components
│   ├── common/           # Shared components
│   │   ├── PageHeader.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── StatCard.tsx
│   ├── layout/           # Layout components
│   │   ├── AppBar.tsx
│   │   └── Sidebar.tsx
│   └── courses/          # Course components
│       └── CourseCard.tsx
├── layouts/              # Page layouts
│   └── DashboardLayout.tsx
├── context/              # Context API providers
│   ├── ThemeContext.tsx
│   ├── LayoutContext.tsx
│   └── SnackbarContext.tsx
├── redux/                # Redux store
│   ├── store.ts
│   ├── hooks.ts
│   └── slices/
│       ├── authSlice.ts
│       ├── userSlice.ts
│       ├── courseSlice.ts
│       ├── quizSlice.ts
│       └── notificationSlice.ts
├── services/             # API services
│   ├── apiClient.ts
│   ├── authService.ts
│   ├── courseService.ts
│   ├── userService.ts
│   └── quizService.ts
├── hooks/                # Custom hooks
│   └── useAuth.ts
├── utils/                # Utility functions
└── middleware.ts         # Route protection
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Backend API running (configure endpoint in `.env`)

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd elearning-platform
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NODE_ENV=development
```

4. **Run the development server**
```bash
npm run dev
# or
yarn dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 🔌 API Integration

The application expects the following API endpoints:

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `POST /api/auth/logout` - User logout
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password` - Reset password
- `POST /api/auth/refresh` - Refresh token
- `GET /api/auth/me` - Get current user

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course by ID
- `POST /api/courses` - Create course (Teacher/Admin)
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course
- `POST /api/courses/:id/enroll` - Enroll in course
- `GET /api/courses/my-courses` - Get user's courses

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `PUT /api/users/password` - Change password
- `POST /api/users/avatar` - Upload avatar

### Quizzes
- `GET /api/quizzes/course/:courseId` - Get course quizzes
- `GET /api/quizzes/:id` - Get quiz by ID
- `POST /api/quizzes/:id/submit` - Submit quiz answers
- `POST /api/quizzes` - Create quiz (Teacher)

## 🎨 Theming & Customization

### Changing Theme Colors

Edit `src/context/ThemeContext.tsx`:

```typescript
primary: {
  main: '#1976d2', // Change to your brand color
},
secondary: {
  main: '#dc004e', // Change secondary color
}
```

### Adding Custom Components

1. Create component in appropriate directory
2. Export from index file
3. Import and use in pages

### Modifying Layouts

Edit `src/layouts/DashboardLayout.tsx` to change overall structure.

## 🔒 Security Features

- JWT token management with auto-refresh
- HTTP-only cookies for tokens
- Protected routes via middleware
- Role-based access control
- XSS protection via React
- CSRF protection ready

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- Mobile: < 600px
- Tablet: 600px - 960px
- Desktop: > 960px

## 🧪 Testing (Recommended Setup)

Add testing libraries:

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom jest
```

Create tests in `__tests__` directory alongside components.

## 📈 Performance Optimization

- Next.js automatic code splitting
- Image optimization with Next.js Image
- Lazy loading components
- Memoization with useMemo/useCallback
- Redux selector optimization
- Tree shaking for unused code

## 🌐 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms

Build the project:
```bash
npm run build
```

Deploy the `.next` folder to your hosting platform.

## 🔧 Configuration

### API Client Configuration

Edit `src/services/apiClient.ts`:
- Change base URL
- Modify timeout
- Add custom headers
- Configure interceptors

### Redux Store

Add new slices in `src/redux/slices/` and import in `store.ts`.

### Navigation

Modify navigation items in `src/components/layout/Sidebar.tsx`.

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Failed**
   - Check `.env.local` file
   - Verify backend is running
   - Check CORS settings

2. **Authentication Not Working**
   - Clear browser cookies
   - Check token expiration
   - Verify API endpoints

3. **Build Errors**
   - Delete `.next` folder
   - Clear node_modules
   - Reinstall dependencies

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Material-UI Documentation](https://mui.com/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Support

For support, email support@elearning.com or join our Slack channel.

---

## 🎯 Next Steps

1. **Connect to Backend API**
   - Update `.env.local` with your API URL
   - Test all endpoints

2. **Customize Branding**
   - Update colors in theme
   - Add your logo
   - Change favicon

3. **Add More Features**
   - Payment integration
   - Video player
   - Real-time chat
   - Advanced analytics

4. **Set Up Testing**
   - Unit tests
   - Integration tests
   - E2E tests

5. **Deploy to Production**
   - Set up CI/CD
   - Configure monitoring
   - Add error tracking

## 🏆 Best Practices Implemented

✅ TypeScript for type safety  
✅ Modular component architecture  
✅ Separation of concerns  
✅ Custom hooks for reusability  
✅ Error boundaries  
✅ Loading states  
✅ Responsive design  
✅ Accessibility standards  
✅ SEO optimization  
✅ Code splitting  
✅ Lazy loading  
✅ Clean code principles  

---

**Built with ❤️ using Next.js and Material-UI**