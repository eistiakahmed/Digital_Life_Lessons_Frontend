import React from 'react';
import { motion } from 'framer-motion';
import AuthImage from '../../assets/AuthPage.png';
import { Link } from 'react-router';
import useAuth from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const Login = () => {
  const { signInUser, signInGoogle } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    console.log(data);
    signInUser(data.email, data.password)
      .then(() => {
        toast.success('Login Successfully');
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  const handleGoogleLogin = () => {
    signInGoogle(() => {
      toast.success('Login Successfully');
    }).catch((error) => {
      console.log(error.message);
      toast.error(error.message);
    });
  };

  return (
    <div className="min-h-[78vh] flex items-center justify-center px-4 transition-all duration-200">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="hero-content flex-col lg:flex-row-reverse gap-12 w-full max-w-5xl 
        bg-base-100 dark:bg-base-200 p-10 shadow-xl rounded-3xl border border-base-300 dark:border-base-100/20"
      >
        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-center lg:text-left space-y-4"
        >
          <h1 className="text-5xl font-bold text-base-content dark:text-secondary">
            Welcome Back
          </h1>

          <p className="text-lg text-base-content/70 dark:text-base-content/60">
            Login to{' '}
            <span className="font-bold text-primary">DigitalLifeLessons</span>
            <br />
            Continue your learning journey!
          </p>

          <img
            src={AuthImage}
            alt="Auth Illustration"
            className="w-80 opacity-90 dark:opacity-95"
          />
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="card bg-base-100 dark:bg-base-200 w-full max-w-sm rounded-2xl shadow-lg border border-base-300 dark:border-base-100/20"
        >
          <form onSubmit={handleSubmit(handleLogin)} className="card-body">
            <fieldset className="space-y-4">
              <div>
                <label className="label font-semibold text-base-content dark:text-white-900">
                  Email
                </label>
                <input
                  type="email"
                  {...register('email', { require: true })}
                  className="input input-bordered w-full bg-base-100 dark:bg-base-300 dark:border-base-100/30"
                  placeholder="Your Email"
                />
              </div>
              {errors.email?.type === 'required' && (
                <p className="text-red-500">Email is required</p>
              )}

              <div>
                <label className="label font-semibold text-base-content dark:text-white-900">
                  Password
                </label>
                <input
                  type="password"
                  {...register('password', {
                    required: true,
                    minLength: 6,
                    pattern:
                      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}[\]|:;"'<>,.?/~`]).+$/,
                  })}
                  className="input input-bordered w-full bg-base-100 dark:bg-base-300 dark:border-base-100/30"
                  placeholder="Password"
                />
              </div>
              {errors.password?.type === 'required' && (
                <p className="text-red-500">Password is required</p>
              )}
              {errors.password?.type === 'minLength' && (
                <p className="text-red-500">
                  {' '}
                  Password must be 6 characters or longer
                </p>
              )}
              {errors.password?.type === 'pattern' && (
                <p className="text-red-500">
                  password must be at least one uppercase, at least one
                  lowercase, at least one number, and at least one special
                  characters
                </p>
              )}

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="btn btn-primary w-full mt-2"
              >
                Login
              </motion.button>
              <motion.button
                type="button"
                onClick={handleGoogleLogin}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="btn bg-white text-black border-[#e5e5e5] w-full"
              >
                <svg
                  aria-label="Google logo"
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <g>
                    <path d="m0 0H512V512H0" fill="#fff"></path>
                    <path
                      fill="#34a853"
                      d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                    ></path>
                    <path
                      fill="#4285f4"
                      d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                    ></path>
                    <path
                      fill="#fbbc02"
                      d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                    ></path>
                    <path
                      fill="#ea4335"
                      d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                    ></path>
                  </g>
                </svg>
                Login with Google
              </motion.button>
            </fieldset>

            <p className="text-center text-sm text-base-content/60 dark:text-base-content/70 mt-4">
              Don’t have an account?{' '}
              <Link
                to="/register"
                className="text-primary cursor-pointer hover:underline"
              >
                Register
              </Link>
            </p>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
