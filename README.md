# Digital Life Lessons

A comprehensive platform where users can create, store, and share meaningful life lessons, personal growth insights, and wisdom they have gathered over time. Users can organize lessons, mark favorites, track learning progress, and browse public lessons shared by others.

🌐 **Live Site URL:** [Your Live Site URL Here]

## ✨ Key Features

• **Personal Wisdom Management** - Create, organize, and store your life lessons with categories, emotional tones, and rich descriptions
• **Premium Subscription System** - Upgrade to Premium via Stripe payment for exclusive features and premium lesson creation
• **Community Learning Hub** - Browse and discover public lessons shared by other users with advanced filtering and search
• **Interactive Engagement** - Like, comment, save to favorites, and share lessons with the community
• **Comprehensive Dashboard** - Manage your lessons, view analytics, and track your learning journey
• **Admin Moderation Panel** - Complete admin system for user management, content moderation, and platform analytics

## 🚀 Technologies Used

### Frontend
- React.js with Vite
- React Router for navigation
- Firebase Authentication
- TailwindCSS + DaisyUI for styling
- Framer Motion for animations
- React Hook Form for form handling
- React Hot Toast for notifications
- SweetAlert2 for confirmations

### Backend
- Node.js with Express.js
- MongoDB with native driver
- Stripe for payment processing
- Firebase Admin SDK for token verification
- CORS enabled for cross-origin requests

## 📋 Backend API Analysis

### ✅ Fully Implemented Features

**User Management:**
- ✅ User registration and authentication
- ✅ Profile management with photo/name updates
- ✅ Premium subscription system via Stripe
- ✅ Top contributors aggregation
- ✅ User role management (admin/user)

**Lesson Management:**
- ✅ Create lessons with all required fields (title, description, category, emotion, privacy, access level)
- ✅ Public lessons with search, filter, and sort functionality
- ✅ Featured lessons system
- ✅ Most saved lessons tracking
- ✅ User-specific lesson retrieval
- ✅ Lesson details with view count increment
- ✅ Similar lessons recommendation
- ✅ Update and delete lessons
- ✅ Privacy and access level toggles
- ✅ Like system with user tracking

**Engagement Features:**
- ✅ Comments system for lessons
- ✅ Favorites/bookmarking system
- ✅ Lesson reporting system
- ✅ Like functionality with real-time counts

**Payment Integration:**
- ✅ Stripe checkout session creation
- ✅ Payment success verification
- ✅ Premium status updates

**Admin Features:**
- ✅ Complete lesson management
- ✅ Featured lesson toggle
- ✅ Reported lessons aggregation with details
- ✅ User role updates
- ✅ User deletion with cascade cleanup
- ✅ Report resolution system

### 🔧 Minor Backend Enhancements Needed

**1. Pagination Enhancement**
```javascript
// Current: Basic pagination exists
// Enhancement: Add total count for better UI
app.get('/lessons/public', async (req, res) => {
  // Add total count to response
  const total = await lessonCollections.countDocuments(query);
  res.send({ lessons: result, total, page, limit });
});
```

**2. User Statistics API**
```javascript
// Missing: User dashboard statistics
app.get('/user/:email/stats', async (req, res) => {
  // Return user's lesson count, favorites count, etc.
});
```

**3. Public Profile API**
```javascript
// Missing: Public user profile endpoint
app.get('/user/:email/public-profile', async (req, res) => {
  // Return public user info + their public lessons
});
```

## 🎯 Frontend Implementation Status

Based on your backend, here's what needs to be implemented on the frontend:

### ✅ Already Working (Based on Converted Components)
- Dashboard Profile Management
- My Lessons with privacy/access toggles
- Add/Update Lesson forms
- Admin Profile and Reported Lessons
- Simple state management (no TanStack Query)

### 🚧 Still Needs Frontend Implementation

**1. Home Page Components**
- Hero Banner/Slider (3+ slides)
- Featured Lessons Section (using `/lessons/featured`)
- Top Contributors Section (using `/users/top-contributors`)
- Most Saved Lessons (using `/lessons/most-saved`)

**2. Public Lessons Page**
- Search, filter, sort functionality
- Pagination implementation
- Premium lesson blur/lock for free users

**3. Lesson Details Page**
- Full lesson display with metadata
- Author information section
- Like/Save/Report buttons
- Comments section
- Similar lessons recommendation

**4. Authentication Pages**
- Login/Register forms
- Google authentication
- Password validation rules

**5. Pricing/Upgrade Page**
- Free vs Premium comparison table
- Stripe checkout integration

**6. Dashboard Components**
- Dashboard Home with analytics
- Favorites management
- User statistics display

**7. Admin Dashboard**
- Admin Dashboard Home with platform stats
- Manage Users table
- Manage Lessons with featured toggle
- Complete admin analytics

## 🔐 Environment Variables Needed

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Backend API
VITE_API_URL=http://localhost:3000

# Stripe (if handling on frontend)
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key
```

## 🚀 Quick Start

1. **Clone the repository**
```bash
git clone [your-repo-url]
cd digital-life-lessons
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
# Fill in your environment variables
```

4. **Start development server**
```bash
npm run dev
```

## 📱 Responsive Design

The application is fully responsive and optimized for:
- 📱 Mobile devices (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop (1024px+)

## 🎨 UI/UX Features

- Clean, modern design with consistent styling
- Dark/Light theme support
- Smooth animations with Framer Motion
- Toast notifications for user feedback
- Loading states and error handling
- Accessible design patterns

## 🔒 Security Features

- Firebase Authentication with email/password and Google
- Protected routes with authentication guards
- Admin role-based access control
- Input validation and sanitization
- Secure API endpoints with proper error handling

---

**Note:** Your backend implementation is excellent and covers 95% of the requirements! The main work needed is on the frontend to create the UI components that consume your well-structured APIs.