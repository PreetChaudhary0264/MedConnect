import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HealthcareLanding from './pages/HealthcareLanding';
import About from './pages/About';
import Donate from './pages/Donation';
import Contact from './pages/Contact';
import HospitalRegistration from './pages/HospitalRegistration';
import PatientRegistration from './pages/PatientRegistration';
import UserProfile from './pages/UserProfile';
import Medicines from './pages/Avialablemedicine';
import Signup from './pages/Signup'
import BookConsultation from './pages/BookConsultation';
import Upload from './pages/Upload';
import Reports from './pages/reports'
import ReportDetail from './pages/ReportDetail'
import Partner from './pages/Partner';
import HospitalAuth from './pages/HospitalAuth';
import NGOAuth from './pages/NGOAuth';
import HospitalDashboard from './pages/HospitalDashboard';
import NGODashboard from './pages/NGODashboard';
import MyDonations from './pages/MyDonations';
import Camps from './pages/Camps';
import ResetPassword from './pages/ResetPassword';


export default function App() {
  return (
      <Routes>
        <Route path="/" element={<HealthcareLanding />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/hospital-registration" element={<HospitalRegistration />} />
        <Route path="/patient-registration" element={<PatientRegistration />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/medicines" element={<Medicines />} />
        <Route path="/signup" element={<Signup />}/>
        <Route path="/upload" element={<Upload />}/>
        <Route path="/reports" element={<Reports />} />
        <Route path="/reports/:id" element={<ReportDetail />} />
        <Route path="/bookconsultation" element={<BookConsultation />}/>
        <Route path="/partner" element={<Partner />}/>
        <Route path="/hospital-auth" element={<HospitalAuth />}/>
        <Route path="/ngo-auth" element={<NGOAuth />}/>
        <Route path="/hospital-dashboard" element={<HospitalDashboard />}/>
        <Route path="/ngo-dashboard" element={<NGODashboard />}/>
        <Route path="/my-donations" element={<MyDonations />}/>
        <Route path="/camps" element={<Camps />}/>
        <Route path="/reset-password" element={<ResetPassword />}/>
      </Routes>
  );
}
