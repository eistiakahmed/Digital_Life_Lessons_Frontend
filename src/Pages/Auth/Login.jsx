import { motion } from 'framer-motion';
import AuthImage from '../../assets/AuthPage.png';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import {
  FaEnvelope,
  FaLock,
  FaGoogle,
  FaArrowRight,
  FaCheckCircle,
} from 'react-icons/fa';
import useAxios from '../../hooks/useAxios';

const Login = () => {
  const { signInUser, signInGoogle } = useAuth();
  const axios = useAxios()

  const navigate = useNavigate();
  const location = useLocation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    signInUser(data.email, data.password)
      .then(() => {
        toast.success('Login Successfully');
         navigate(location?.state || '/');
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  const handleGoogleLogin = () => {
   signInGoogle()
     .then(async (result) => {
       const user = result.user;

       const userInfo = {
         name: user.displayName,
         email: user.email,
         image: user.photoURL,
         isPremium: false,
         role: 'user',
       };

       await axios.post('/user', userInfo);

       toast.success('Logged in with Google');
       navigate(location?.state || '/');
     })
     .catch((err) => toast.error(err.message));
  };

  return (
    <div className="dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 flex items-center justify-center px-4 transition-all duration-500">
      
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-purple-400/30 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], x: [0, -50, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 bg-base-100/80 dark:bg-base-200/80 backdrop-blur-xl p-8 sm:p-12 lg:p-16 shadow-2xl rounded-3xl border border-purple-200/50 dark:border-purple-500/20"
      >
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col justify-center space-y-6 text-center lg:text-left"
        >
          <div className="space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.3 }}
              className="inline-block"
            >
              <span className="inline-flex items-center gap-2 bg-linear-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                <FaCheckCircle className="w-4 h-4" />
                SECURE LOGIN
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold bg-linear-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent leading-tight">
              Welcome Back!
            </h1>

            <p className="text-lg sm:text-xl text-base-content/70 dark:text-base-content/80 leading-relaxed">
              Login to{' '}
              <span className="font-bold text-transparent bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text">
                DigitalLifeLessons
              </span>
              <br />
              Continue your learning journey and unlock your potential.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex justify-center lg:justify-start"
          >
            <img
              src={AuthImage}
              alt="Auth Illustration"
              className="w-64 sm:w-80 lg:w-96 drop-shadow-2xl"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="hidden lg:grid grid-cols-2 gap-4"
          >
            {[
              'Track Progress',
              'Expert Lessons',
              'Community Support',
              'Lifetime Access',
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-sm font-medium text-base-content/70"
              >
                <FaCheckCircle className="w-4 h-4 text-success" />
                {feature}
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col justify-center"
        >
          <div className="bg-base-100/90 dark:bg-base-300/50 backdrop-blur-lg p-8 sm:p-10 rounded-2xl shadow-xl border border-purple-200/50 dark:border-purple-500/30">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-base-content mb-2">
                Sign In
              </h2>
              <p className="text-base-content/60">
                Enter your credentials to access your account
              </p>
            </div>

            <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
              <div>
                <label className="label font-semibold text-base-content mb-2">
                  <span className="flex items-center gap-2">
                    <FaEnvelope className="w-4 h-4 text-purple-500" />
                    Email Address
                  </span>
                </label>
                <input
                  type="email"
                  {...register('email', { required: true })}
                  className="input input-bordered w-full bg-base-100 dark:bg-base-200 border-2 border-base-300 dark:border-base-content/20 focus:border-purple-500 focus:outline-none transition-all"
                  placeholder="your.email@example.com"
                />
                {errors.email?.type === 'required' && (
                  <p className="text-error text-sm mt-1 flex items-center gap-1">
                    <span>Email is required</span>
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="label font-semibold text-base-content mb-2">
                  <span className="flex items-center gap-2">
                    <FaLock className="w-4 h-4 text-purple-500" />
                    Password
                  </span>
                </label>
                <input
                  type="password"
                  {...register('password', {
                    required: true,
                    minLength: 6,
                    pattern:
                      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}[\]|:;"'<>,.?/~`]).+$/,
                  })}
                  className="input input-bordered w-full bg-base-100 dark:bg-base-200 border-2 border-base-300 dark:border-base-content/20 focus:border-purple-500 focus:outline-none transition-all"
                  placeholder="••••••••"
                />
                {errors.password?.type === 'required' && (
                  <p className="text-error text-sm mt-1">
                    Password is required
                  </p>
                )}
                {errors.password?.type === 'minLength' && (
                  <p className="text-error text-sm mt-1">
                    Password must be 6+ characters
                  </p>
                )}
                {errors.password?.type === 'pattern' && (
                  <p className="text-error text-sm mt-1">
                    Must include uppercase, lowercase, number & special
                    character
                  </p>
                )}
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn w-full bg-linear-to-r from-purple-500 via-blue-500 to-pink-500 text-white border-none hover:shadow-2xl transition-all duration-300 text-lg font-bold"
              >
                Sign In
                <FaArrowRight className="w-4 h-4" />
              </motion.button>

              <div className="divider text-base-content/50">OR</div>

              <motion.button
                type="button"
                onClick={handleGoogleLogin}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn w-full bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 gap-3 font-semibold"
              >
                <FaGoogle className="w-5 h-5 text-red-500" />
                Continue with Google
              </motion.button>

              <p className="text-center text-sm text-base-content/70 mt-6">
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="text-transparent bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text font-bold hover:underline"
                >
                  Create Account
                </Link>
              </p>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
