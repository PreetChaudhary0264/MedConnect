// import React, { useState } from 'react';
// import { Heart, Mail, Lock, User, Phone, Eye, EyeOff, ArrowRight, Check } from 'lucide-react';

// export default function LoginSignup() {
//   const [isLogin, setIsLogin] = useState(true);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
//   const [loginData, setLoginData] = useState({
//     email: '',
//     password: ''
//   });

//   const [signupData, setSignupData] = useState({
//     fullName: '',
//     email: '',
//     phone: '',
//     password: '',
//     confirmPassword: ''
//   });

//   const handleLoginChange = (e) => {
//     const { name, value } = e.target;
//     setLoginData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSignupChange = (e) => {
//     const { name, value } = e.target;
//     setSignupData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleLoginSubmit = () => {
//     if (loginData.email && loginData.password) {
//       alert('Login Successful! Welcome back 🎉');
//       // Add your login logic here
//     }
//   };

//   const handleSignupSubmit = () => {
//     if (signupData.fullName && signupData.email && signupData.phone && 
//         signupData.password && signupData.confirmPassword) {
//       if (signupData.password !== signupData.confirmPassword) {
//         alert('Passwords do not match!');
//         return;
//       }
//       alert('Account Created Successfully! Welcome to MediConnect 🎉');
//       // Add your signup logic here
//     }
//   };

//   const isLoginValid = loginData.email && loginData.password;
//   const isSignupValid = signupData.fullName && signupData.email && signupData.phone && 
//                         signupData.password && signupData.confirmPassword;

//   const benefits = [
//     "Access to thousands of donated medicines",
//     "Direct connection with donors",
//     "24/7 healthcare support",
//     "Secure and verified platform",
//     "Free medicine pickup service",
//     "Track your donations and requests"
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      
//       {/* Main Container */}
//       <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
//         <div className="grid lg:grid-cols-2">
          
//           {/* Left Side - Branding & Benefits */}
//           <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-12 text-white hidden lg:flex flex-col justify-between">
//             <div>
//               <div className="flex items-center space-x-3 mb-8">
//                 <div className="w-14 h-14 bg-white/20 backdrop-blur-lg rounded-xl flex items-center justify-center">
//                   <Heart className="w-8 h-8 text-white" fill="white" />
//                 </div>
//                 <span className="text-3xl font-bold">MediConnect</span>
//               </div>

//               <h2 className="text-4xl font-bold leading-tight mb-6">
//                 {isLogin ? 'Welcome Back!' : 'Join Our Community'}
//               </h2>
//               <p className="text-blue-100 text-lg mb-8">
//                 {isLogin 
//                   ? 'Login to access affordable healthcare and connect with medicine donors'
//                   : 'Create an account to start donating or finding medicines you need'
//                 }
//               </p>

//               <div className="space-y-4">
//                 {benefits.map((benefit, idx) => (
//                   <div key={idx} className="flex items-start space-x-3">
//                     <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
//                       <Check className="w-4 h-4" />
//                     </div>
//                     <p className="text-blue-50">{benefit}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="pt-8 border-t border-white/20">
//               <p className="text-blue-100 text-sm">
//                 Trusted by 500+ doctors, 50+ hospitals, and 100+ NGOs
//               </p>
//             </div>
//           </div>

//           {/* Right Side - Forms */}
//           <div className="p-8 lg:p-12">
            
//             {/* Mobile Logo */}
//             <div className="lg:hidden flex items-center justify-center space-x-3 mb-8">
//               <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
//                 <Heart className="w-7 h-7 text-white" fill="white" />
//               </div>
//               <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
//                 MediConnect
//               </span>
//             </div>

//             {/* Toggle Buttons */}
//             <div className="flex bg-slate-100 rounded-xl p-1 mb-8">
//               <button
//                 onClick={() => setIsLogin(true)}
//                 className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-300 ${
//                   isLogin 
//                     ? 'bg-white text-blue-600 shadow-md' 
//                     : 'text-slate-600 hover:text-slate-900'
//                 }`}
//               >
//                 Login
//               </button>
//               <button
//                 onClick={() => setIsLogin(false)}
//                 className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-300 ${
//                   !isLogin 
//                     ? 'bg-white text-blue-600 shadow-md' 
//                     : 'text-slate-600 hover:text-slate-900'
//                 }`}
//               >
//                 Sign Up
//               </button>
//             </div>

//             {/* Login Form */}
//             {isLogin ? (
//               <div className="space-y-6">
//                 <div>
//                   <h3 className="text-2xl font-bold text-slate-900 mb-2">Welcome Back</h3>
//                   <p className="text-slate-600">Enter your credentials to continue</p>
//                 </div>

//                 <div>
//                   <label className="flex items-center text-sm font-semibold text-slate-700 mb-2">
//                     <Mail className="w-4 h-4 mr-2 text-blue-600" />
//                     Email Address
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={loginData.email}
//                     onChange={handleLoginChange}
//                     placeholder="Enter your email"
//                     className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition text-slate-900"
//                   />
//                 </div>

//                 <div>
//                   <label className="flex items-center text-sm font-semibold text-slate-700 mb-2">
//                     <Lock className="w-4 h-4 mr-2 text-blue-600" />
//                     Password
//                   </label>
//                   <div className="relative">
//                     <input
//                       type={showPassword ? "text" : "password"}
//                       name="password"
//                       value={loginData.password}
//                       onChange={handleLoginChange}
//                       placeholder="Enter your password"
//                       className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition text-slate-900"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
//                     >
//                       {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                     </button>
//                   </div>
//                 </div>

//                 <div className="flex items-center justify-between">
//                   <label className="flex items-center space-x-2 cursor-pointer">
//                     <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-slate-300" />
//                     <span className="text-sm text-slate-600">Remember me</span>
//                   </label>
//                   <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
//                     Forgot Password?
//                   </a>
//                 </div>

//                 <button
//                   onClick={handleLoginSubmit}
//                   disabled={!isLoginValid}
//                   className={`group w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center transition-all duration-300 ${
//                     isLoginValid
//                       ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-xl'
//                       : 'bg-slate-200 text-slate-400 cursor-not-allowed'
//                   }`}
//                 >
//                   Login to Account
//                   <ArrowRight className={`ml-2 w-5 h-5 ${isLoginValid ? 'group-hover:translate-x-1' : ''} transition-transform`} />
//                 </button>

//                 <div className="text-center">
//                   <p className="text-slate-600">
//                     Don't have an account?{' '}
//                     <button onClick={() => setIsLogin(false)} className="text-blue-600 font-semibold hover:text-blue-700">
//                       Sign Up
//                     </button>
//                   </p>
//                 </div>
//               </div>
//             ) : (
//               // Signup Form
//               <div className="space-y-6">
//                 <div>
//                   <h3 className="text-2xl font-bold text-slate-900 mb-2">Create Account</h3>
//                   <p className="text-slate-600">Join MediConnect today</p>
//                 </div>

//                 <div>
//                   <label className="flex items-center text-sm font-semibold text-slate-700 mb-2">
//                     <User className="w-4 h-4 mr-2 text-blue-600" />
//                     Full Name
//                   </label>
//                   <input
//                     type="text"
//                     name="fullName"
//                     value={signupData.fullName}
//                     onChange={handleSignupChange}
//                     placeholder="Enter your full name"
//                     className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition text-slate-900"
//                   />
//                 </div>

//                 <div className="grid md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="flex items-center text-sm font-semibold text-slate-700 mb-2">
//                       <Mail className="w-4 h-4 mr-2 text-blue-600" />
//                       Email
//                     </label>
//                     <input
//                       type="email"
//                       name="email"
//                       value={signupData.email}
//                       onChange={handleSignupChange}
//                       placeholder="your@email.com"
//                       className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition text-slate-900"
//                     />
//                   </div>

//                   <div>
//                     <label className="flex items-center text-sm font-semibold text-slate-700 mb-2">
//                       <Phone className="w-4 h-4 mr-2 text-blue-600" />
//                       Phone
//                     </label>
//                     <input
//                       type="tel"
//                       name="phone"
//                       value={signupData.phone}
//                       onChange={handleSignupChange}
//                       placeholder="+91 98765 43210"
//                       className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition text-slate-900"
//                     />
//                   </div>
//                 </div>

//                 <div className="grid md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="flex items-center text-sm font-semibold text-slate-700 mb-2">
//                       <Lock className="w-4 h-4 mr-2 text-blue-600" />
//                       Password
//                     </label>
//                     <div className="relative">
//                       <input
//                         type={showPassword ? "text" : "password"}
//                         name="password"
//                         value={signupData.password}
//                         onChange={handleSignupChange}
//                         placeholder="Create password"
//                         className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition text-slate-900"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => setShowPassword(!showPassword)}
//                         className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
//                       >
//                         {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                       </button>
//                     </div>
//                   </div>

//                   <div>
//                     <label className="flex items-center text-sm font-semibold text-slate-700 mb-2">
//                       <Lock className="w-4 h-4 mr-2 text-blue-600" />
//                       Confirm Password
//                     </label>
//                     <div className="relative">
//                       <input
//                         type={showConfirmPassword ? "text" : "password"}
//                         name="confirmPassword"
//                         value={signupData.confirmPassword}
//                         onChange={handleSignupChange}
//                         placeholder="Confirm password"
//                         className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition text-slate-900"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                         className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
//                       >
//                         {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                       </button>
//                     </div>
//                   </div>
//                 </div>

//                 <button
//                   onClick={handleSignupSubmit}
//                   disabled={!isSignupValid}
//                   className={`group w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center transition-all duration-300 ${
//                     isSignupValid
//                       ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-xl'
//                       : 'bg-slate-200 text-slate-400 cursor-not-allowed'
//                   }`}
//                 >
//                   Create Account
//                   <ArrowRight className={`ml-2 w-5 h-5 ${isSignupValid ? 'group-hover:translate-x-1' : ''} transition-transform`} />
//                 </button>

//                 <div className="text-center">
//                   <p className="text-slate-600">
//                     Already have an account?{' '}
//                     <button onClick={() => setIsLogin(true)} className="text-blue-600 font-semibold hover:text-blue-700">
//                       Login
//                     </button>
//                   </p>
//                 </div>
//               </div>
//             )}

//             {/* Social Login */}
//             <div className="mt-8">
//               <div className="relative">
//                 <div className="absolute inset-0 flex items-center">
//                   <div className="w-full border-t border-slate-200"></div>
//                 </div>
//                 <div className="relative flex justify-center text-sm">
//                   <span className="px-4 bg-white text-slate-500">Or continue with</span>
//                 </div>
//               </div>

//               <div className="mt-6 grid grid-cols-2 gap-4">
//                 <button className="flex items-center justify-center px-4 py-3 border-2 border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 font-medium text-slate-700">
//                   <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
//                     <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
//                     <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
//                     <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
//                     <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
//                   </svg>
//                   Google
//                 </button>
//                 <button className="flex items-center justify-center px-4 py-3 border-2 border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 font-medium text-slate-700">
//                   <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
//                     <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
//                   </svg>
//                   Facebook
//                 </button>
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>

//     </div>
//   );
// }





















































// Updated LoginSignup.jsx - Added API integration, token storage, error handling, and redirect to homepage
import React, { useState } from 'react';
import { Heart, Mail, Lock, User, Phone, Eye, EyeOff, ArrowRight, Check, AlertCircle } from 'lucide-react';

const API_BASE_URL = 'http://localhost:5000/api'; // Adjust if backend URL is different

export default function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [signupData, setSignupData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;
    if (name === 'phone') {
      processedValue = value.replace(/\D/g, '').slice(0, 10); // Only digits, max 10
    }
    setSignupData(prev => ({ ...prev, [name]: processedValue }));
  };

  const clearMessages = () => {
    setError('');
    setSuccess('');
  };

  const handleApiCall = async (endpoint, data) => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const response = await fetch(`${API_BASE_URL}/auth/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong');
      }

      // Store token in localStorage
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(result.user));

      // Set success message
      setSuccess(result.success ? 'Success! Redirecting...' : '');

      // Redirect to homepage after a brief delay
      setTimeout(() => {
        window.location.href = '/'; // Assuming homepage is at root '/', update as needed
      }, 1500);

      return result;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    clearMessages();
    if (loginData.email && loginData.password) {
      await handleApiCall('login', loginData);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    clearMessages();
    if (signupData.fullName && signupData.email && signupData.phone && 
        signupData.password && signupData.confirmPassword) {
      if (signupData.password !== signupData.confirmPassword) {
        setError('Passwords do not match!');
        return;
      }
      if (signupData.phone.length !== 10) {
        setError('Phone number must be exactly 10 digits!');
        return;
      }
      // Remove confirmPassword for API call
      const { confirmPassword, ...signupPayload } = signupData;
      await handleApiCall('register', signupPayload);
    }
  };

  const isLoginValid = loginData.email && loginData.password;
  const isSignupValid = signupData.fullName && signupData.email && signupData.phone && 
                        signupData.password && signupData.confirmPassword && signupData.phone.length === 10;

  const benefits = [
    "Access to thousands of donated medicines",
    "Direct connection with donors",
    "24/7 healthcare support",
    "Secure and verified platform",
    "Free medicine pickup service",
    "Track your donations and requests"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      
      {/* Main Container */}
      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="grid lg:grid-cols-2">
          
          {/* Left Side - Branding & Benefits */}
          <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-12 text-white hidden lg:flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-lg rounded-xl flex items-center justify-center">
                  <Heart className="w-8 h-8 text-white" fill="white" />
                </div>
                <span className="text-3xl font-bold">MediConnect</span>
              </div>

              <h2 className="text-4xl font-bold leading-tight mb-6">
                {isLogin ? 'Welcome Back!' : 'Join Our Community'}
              </h2>
              <p className="text-blue-100 text-lg mb-8">
                {isLogin 
                  ? 'Login to access affordable healthcare and connect with medicine donors'
                  : 'Create an account to start donating or finding medicines you need'
                }
              </p>

              <div className="space-y-4">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4" />
                    </div>
                    <p className="text-blue-50">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-white/20">
              <p className="text-blue-100 text-sm">
                Trusted by 500+ doctors, 50+ hospitals, and 100+ NGOs
              </p>
            </div>
          </div>

          {/* Right Side - Forms */}
          <div className="p-8 lg:p-12">
            
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center justify-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <Heart className="w-7 h-7 text-white" fill="white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                MediConnect
              </span>
            </div>

            {/* Toggle Buttons */}
            <div className="flex bg-slate-100 rounded-xl p-1 mb-8">
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  isLogin 
                    ? 'bg-white text-blue-600 shadow-md' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  !isLogin 
                    ? 'bg-white text-blue-600 shadow-md' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Error/Success Messages */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <span className="text-sm text-red-700">{error}</span>
              </div>
            )}
            {success && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl flex items-center space-x-2">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-sm text-green-700">{success}</span>
              </div>
            )}

            {/* Login Form */}
            {isLogin ? (
              <form onSubmit={handleLoginSubmit} className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Welcome Back</h3>
                  <p className="text-slate-600">Enter your credentials to continue</p>
                </div>

                <div>
                  <label className="flex items-center text-sm font-semibold text-slate-700 mb-2">
                    <Mail className="w-4 h-4 mr-2 text-blue-600" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition text-slate-900"
                    required
                  />
                </div>

                <div>
                  <label className="flex items-center text-sm font-semibold text-slate-700 mb-2">
                    <Lock className="w-4 h-4 mr-2 text-blue-600" />
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={loginData.password}
                      onChange={handleLoginChange}
                      placeholder="Enter your password"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition text-slate-900"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-slate-300" />
                    <span className="text-sm text-slate-600">Remember me</span>
                  </label>
                  <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    Forgot Password?
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={!isLoginValid || loading}
                  className={`group w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center transition-all duration-300 ${
                    isLoginValid && !loading
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-xl'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center">Logging in...</span>
                  ) : (
                    <>
                      Login to Account
                      <ArrowRight className={`ml-2 w-5 h-5 ${isLoginValid ? 'group-hover:translate-x-1' : ''} transition-transform`} />
                    </>
                  )}
                </button>

                <div className="text-center">
                  <p className="text-slate-600">
                    Don't have an account?{' '}
                    <button type="button" onClick={() => setIsLogin(false)} className="text-blue-600 font-semibold hover:text-blue-700">
                      Sign Up
                    </button>
                  </p>
                </div>
              </form>
            ) : (
              // Signup Form
              <form onSubmit={handleSignupSubmit} className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Create Account</h3>
                  <p className="text-slate-600">Join MediConnect today</p>
                </div>

                <div>
                  <label className="flex items-center text-sm font-semibold text-slate-700 mb-2">
                    <User className="w-4 h-4 mr-2 text-blue-600" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={signupData.fullName}
                    onChange={handleSignupChange}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition text-slate-900"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center text-sm font-semibold text-slate-700 mb-2">
                      <Mail className="w-4 h-4 mr-2 text-blue-600" />
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={signupData.email}
                      onChange={handleSignupChange}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition text-slate-900"
                      required
                    />
                  </div>

                  <div>
                    <label className="flex items-center text-sm font-semibold text-slate-700 mb-2">
                      <Phone className="w-4 h-4 mr-2 text-blue-600" />
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={signupData.phone}
                      onChange={handleSignupChange}
                      placeholder="9876543210"
                      maxLength="10"
                      pattern="[0-9]{10}"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition text-slate-900"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center text-sm font-semibold text-slate-700 mb-2">
                      <Lock className="w-4 h-4 mr-2 text-blue-600" />
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={signupData.password}
                        onChange={handleSignupChange}
                        placeholder="Create password"
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition text-slate-900"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center text-sm font-semibold text-slate-700 mb-2">
                      <Lock className="w-4 h-4 mr-2 text-blue-600" />
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={signupData.confirmPassword}
                        onChange={handleSignupChange}
                        placeholder="Confirm password"
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition text-slate-900"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!isSignupValid || loading}
                  className={`group w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center transition-all duration-300 ${
                    isSignupValid && !loading
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-xl'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center">Creating Account...</span>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className={`ml-2 w-5 h-5 ${isSignupValid ? 'group-hover:translate-x-1' : ''} transition-transform`} />
                    </>
                  )}
                </button>

                <div className="text-center">
                  <p className="text-slate-600">
                    Already have an account?{' '}
                    <button type="button" onClick={() => setIsLogin(true)} className="text-blue-600 font-semibold hover:text-blue-700">
                      Login
                    </button>
                  </p>
                </div>
              </form>
            )}

            {/* Social Login */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-slate-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center px-4 py-3 border-2 border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 font-medium text-slate-700">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </button>
                <button className="flex items-center justify-center px-4 py-3 border-2 border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 font-medium text-slate-700">
                  <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}