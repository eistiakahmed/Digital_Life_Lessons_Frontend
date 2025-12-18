# Digital Life Lessons

**Transform Experiences into Wisdom. Capture, Organize, and Share Knowledge that Matters.**

Digital Life Lessons is a modern platform for preserving and sharing real-life insights. Whether it’s personal growth, career lessons, relationship wisdom, or health breakthroughs, this platform ensures valuable experiences aren’t lost and helps others learn from them.

🌐 **Live Site:** [{https://digital-life-lessons.netlify.app/)(https://digital-life-lessons.netlify.app/)]

---

## 🎯 Problem Statement

Every day, people learn critical lessons from their experiences—but most of this knowledge is forgotten or inaccessible to others. Meanwhile, many face similar challenges without guidance.

**Digital Life Lessons solves this problem by providing a platform to:**

* Capture wisdom before it’s lost.
* Organize lessons by category and emotional context.
* Share insights with a wider audience.
* Build a supportive learning community.
* Preserve knowledge for future reference.

---

## 🌟 Key Features

### For Individual Users
* **📝 Personal Knowledge Base:** Store and organize your lessons securely.
* **🎯 Smart Organization:** Categorize by topics (Career, Relationships, Personal Growth) and emotions (Motivational, Reflective, Gratitude).
* **📊 Track Your Growth:** Analytics and progress tracking to measure your learning journey.
* **🔒 Privacy Control:** Choose what to share publicly and what remains private.
* **⭐ Curated Learning:** Save and organize lessons from other contributors.

### For the Community
* **🌍 Shared Wisdom Hub:** Access thousands of lessons from diverse experiences.
* **🔍 Smart Discovery:** Advanced search and filtering by category, emotion, and engagement.
* **💬 Meaningful Discussions:** Engage with authors through comments and conversations.
* **🏆 Recognition System:** Highlight top contributors and most impactful lessons.

### For Organizations & Educators
* **👑 Premium Features:** Advanced analytics, unlimited content, priority support.
* **📈 Impact Measurement:** Track engagement and learning outcomes.
* **🎨 Custom Branding:** Export lessons in professional formats.
* **🛡️ Content Moderation:** Admin tools for managing and curating content.

---

## 🛠️ Technical Stack

* **Frontend:** React 19, Vite, TailwindCSS, Framer Motion
* **Backend:** Node.js, Express, MongoDB
* **Authentication:** Firebase Auth (Email/Password + Google)
* **Payments:** Stripe Integration
* **State Management:** TanStack Query
* **UI Components:** DaisyUI + Custom Components

**Highlights:**
* Fully responsive design (mobile, tablet, desktop).
* Real-time updates and notifications.
* Role-based access control (User/Admin).
* Modular, scalable architecture optimized for performance.

---

## 🚀 Core Functionality

### User Flow
1.  **Sign Up/Login:** Quick registration with email or Google.
2.  **Create Lessons:** Rich text editor with categorization.
3.  **Discover Content:** Browse public lessons with smart filters.
4.  **Engage & Learn:** Like, comment, save, and share insights.
5.  **Track Progress:** Personalized dashboard with analytics.

### Key Pages
* **🏠 Home:** Hero banner, featured lessons, top contributors, community statistics.
* **📖 Public Lessons:** Search, filter, sort by popularity or recency.
* **📝 Lesson Details:** Full content, author profile, engagement tools.
* **🎛️ User Dashboard:** Activity overview, analytics, quick actions.
* **👑 Admin Panel:** Platform analytics, user management, content moderation.
* **💳 Pricing:** Free vs premium comparison, Stripe-powered checkout.

---

## 🎨 UI/UX Design

* **Clean & Modern:** Minimalist and content-focused.
* **Accessible:** WCAG compliant.
* **Intuitive:** Logical hierarchy and easy navigation.
* **Visual Enhancements:** * Dark/Light theme detection.
    * Smooth animations using Framer Motion.
    * Skeleton screens for loading states.
    * Toast notifications for feedback.

---

## 🔧 Installation & Setup

### Prerequisites
* Node.js 18+ and npm
* MongoDB
* Firebase project
* Stripe account

### Quick Start
```bash
# Clone the repository
git clone [https://github.com/eistiakahmed/Digital_Life_Lessons_Frontend.git]
cd digital-life-lessons

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env

# Start development server
npm run dev

```

### Environment Variables

```env
# Firebase Authentication
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id

# Backend API
VITE_API_URL=http://localhost:3000

# Stripe Payments
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key

```

---

## 📊 Implementation Status

**✅ Completed Features:**

* Firebase authentication & Google integration.
* Full lesson CRUD operations.
* Community engagement (comments, likes, favorites).
* Stripe-based premium system.
* Admin dashboard & moderation tools.



## 📞 Support & Contact

* **GitHub Issues:** Bug reports & feature requests
* **Email:** [eistiakahmedmeraj@gmail.com]

---

**Built with ❤️ to help people learn from each other’s experiences and grow together.**

```
