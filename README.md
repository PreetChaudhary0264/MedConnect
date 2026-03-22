# MedConnect 🏥

A comprehensive healthcare platform connecting patients, hospitals, and NGOs for seamless medical services, consultations, and medicine donations.

---

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Setup](#setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Database Models](#database-models)

---

## Features

### Patient Features
- User registration and authentication
- Book medical consultations
- View available medicines
- Online payments (Razorpay)
- Access medical reports
- Video consultations

### Hospital Features
- Registration and dedicated dashboard
- Manage appointments and bookings
- Doctor management
- View analytics

### NGO Features
- Registration and dashboard
- Manage medical camps
- Track medicine donations
- Volunteer management

### Common Features
- Secure JWT authentication
- Image uploads (Cloudinary)
- Real-time video consultations
- Responsive design

---

## Tech Stack

**Backend:** Node.js, Express.js, MongoDB, JWT Authentication, Bcrypt

**Frontend:** React 19, Vite, Tailwind CSS, Axios, React Router v7

**Storage & Services:** Cloudinary (Images), Razorpay (Payments), Google Generative AI

---

## 📁 Project Structure

```
MedConnect/
├── backend/
│   ├── config/                 # Configuration files
│   │   └── cloudinary.js
│   ├── controllers/            # Business logic
│   │   ├── authController.js
│   │   ├── bookingController.js
│   │   ├── hospitalController.js
│   │   ├── ngoController.js
│   │   └── userController.js
│   ├── middleware/             # Express middlewares
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   ├── hospitalAuth.js
│   │   ├── ngoAuth.js
│   │   └── validation.js
│   ├── models/                 # Database schemas
│   │   ├── Booking.js
│   │   ├── Camp.js
│   │   ├── Hospital.js
│   │   ├── MedicineDonation.js
│   │   ├── NGO.js
│   │   ├── User.js
│   │   ├── VideoRoom.js
│   │   └── Volunteer.js
│   ├── routes/                 # API routes
│   │   ├── auth.js
│   │   ├── bookingRoutes.js
│   │   ├── camps.js
│   │   ├── doctors.js
│   │   ├── donations.js
│   │   ├── hospital.js
│   │   ├── ngo.js
│   │   ├── payment.js
│   │   ├── users.js
│   │   └── videoCall.js
│   ├── uploads/                # Local file uploads
│   ├── .env                    # Environment variables
│   ├── server.js               # Main server file
│   ├── parser.js               # Document parsing utility
│   ├── llm.js                  # LLM integration
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/         # React components
│   │   │   └── VideoCall.jsx
│   │   ├── pages/              # Page components
│   │   │   ├── About.jsx
│   │   │   ├── Camps.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Donation.jsx
│   │   │   ├── HospitalDashboard.jsx
│   │   │   ├── BookConsultation.jsx
│   │   │   ├── MyDonations.jsx
│   │   │   ├── ReportDetail.jsx
│   │   │   ├── UserProfile.jsx
│   │   │   └── ... [more pages]
│   │   ├── utils/
│   │   │   └── api.js          # API client
│   │   ├── assets/             # Images and static files
│   │   ├── styles/             # CSS files
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── package.json
│   └── index.html
│
├── package.json                # Root package.json
└── README.md                   # This file
```

---

## 🚀 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Git

### Clone the Repository
```bash
git clone <repository-url>
cd MedConnect
```

### Install Dependencies

**Root level:**
```bash
npm install
```

**Backend:**
```bash
cd backend
npm install
cd ..
```

**Frontend:**
```bash
cd frontend
npm install
cd ..
```

---

## ⚙️ Setup

### 1. Backend Configuration

Create a `.env` file in the `backend/` directory:

```env
# Server
PORT=5000

# MongoDB Connection
MONGODB_URI=mongodb+srv://your_username:your_password@cluster0.mongodb.net/medconnect

# JWT Secret
JWT_SECRET=your_secure_jwt_secret_key_here

# Razorpay Payment
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_secret_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Google Generative AI (optional)
GOOGLE_API_KEY=your_google_api_key
```

### 2. Frontend Configuration

The frontend API calls are configured in `frontend/src/utils/api.js`. Ensure it points to:
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

---

## ▶️ Running the Application

### Option 1: Run Both Frontend & Backend Concurrently (Recommended)
```bash
npm run dev
```
This runs both services simultaneously.

### Option 2: Run Separately

**Start Backend:**
```bash
cd backend
npm start
```
Server will run on `http://localhost:5000`

**Start Frontend (in another terminal):**
```bash
cd frontend
npm run dev
```
Application will be available at `http://localhost:5173`

---

## API Endpoints

**Authentication**
- POST `/api/auth/register` - User registration
- POST `/api/auth/login` - User login
- POST `/api/auth/logout` - User logout

**Users**
- GET `/api/users/profile` - Get user profile
- PUT `/api/users/profile` - Update profile

**Bookings**
- POST `/api/bookings` - Create booking
- GET `/api/bookings` - Get user's bookings
- PUT `/api/bookings/:id` - Update booking

**Hospitals**
- GET `/api/hospitals` - List hospitals
- POST `/api/hospitals/register` - Hospital registration

**Donations**
- POST `/api/donations` - Create donation
- GET `/api/donations` - Get donations

**Payment**
- POST `/api/payment/create-order` - Create Razorpay order
- POST `/api/payment/verify` - Verify payment

**Medical Camps**
- GET `/api/camps` - List camps
- POST `/api/camps` - Create camp

**Video Consultations**
- POST `/api/video/create-room` - Create video room

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| PORT | Server port (default: 5000) |
| MONGODB_URI | MongoDB connection string |
| JWT_SECRET | JWT authentication secret |
| RAZORPAY_KEY_ID | Razorpay API key ID |
| RAZORPAY_KEY_SECRET | Razorpay API secret |
| CLOUDINARY_CLOUD_NAME | Cloudinary cloud name |
| CLOUDINARY_API_KEY | Cloudinary API key |
| CLOUDINARY_API_SECRET | Cloudinary API secret |

---

## Database Models

- **User** - Patient/User information and authentication
- **Hospital** - Hospital details and services
- **NGO** - NGO information and campaigns
- **Booking** - Consultations and appointments
- **MedicineDonation** - Medicine donation tracking
- **VideoRoom** - Video consultation sessions
- **Camp** - Medical camps organized by NGOs
- **Volunteer** - Volunteer information

---

## 📞 Support

For issues or questions, please create an issue in the repository.

---

**MedConnect - Healthcare Platform**
