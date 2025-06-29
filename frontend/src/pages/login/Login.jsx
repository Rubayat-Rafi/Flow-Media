import { FaArrowLeftLong } from "react-icons/fa6";
import { useAuth } from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import axios from "axios";
import { saveUser } from "../../api/utils";

const Login = () => {
  const navigate = useNavigate();
  const { signInUser } = useAuth();
  const { register, handleSubmit, reset } = useForm();

  // Handle form submission
  const handleSignInFormSubmit = async (data) => {
    const { email, password } = data;
    try {
      await signInUser(email, password);
      const response = await axios.get(
        `${import.meta.env.VITE_FLOW_MRDIA_API}/api/user/role/${email}`
      );
      const reqBody = response?.data?.user;
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: reqBody?.email,
          role: reqBody?.role,
          subscribe: reqBody?.subscribe,
        })
      );
      reset();
      alert("sign In successfull");
      // redirect to home page
      navigate("/");
    } catch (error) {
      console.error("Error during Sign Up:", error);
      alert("Login faild. Please try again Later.");
    }
  };

  return (
    <section
      className="flex flex-col items-center justify-center min-h-screen p-4"
      style={{
        backgroundImage: "url('/sports-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-[var(--background)]/80 pointer-events-none z-10"></div>
      <div className="absolute top-[10%] left-[5%] z-20">
        <a
          className=" text-[var(--primary)]  font-semibold  flex items-center gap-2 hover:underline"
          href="/"
        >
          <FaArrowLeftLong />
          Back to Home
        </a>
      </div>

      {/* Logo */}
      <div className="z-20 mb-8">
        <img src="/logo.png" className="max-h-[80px]" alt="logo" />
      </div>

      {/* Login Card */}
      <div className="bg-[var(--text)] w-full max-w-md p-8 rounded-lg shadow-xl z-20">
        <h1 className="text-2xl font-bold text-[var(--background)] text-center mb-6">
          Login to your Account
        </h1>

        <form
          onSubmit={handleSubmit(handleSignInFormSubmit)}
          className="flex flex-col z-20 space-y-4"
        >
          {/* Email Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="label-text">
              Email
            </label>
            <input
              type="email"
              name="email"
              {...register("email", { required: true })}
              placeholder="Enter your email"
              className="input-fild"
              required
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="label-text">
              Password
            </label>
            <input
              type="password"
              name="password"
              {...register("password", { required: true })}
              placeholder="Enter your password"
              className="input-fild"
              required
            />
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-end">
            {/* <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 text-[var(--primary)] focus:ring-[var(--primary)] border-gray-300 rounded"
              />
              <label
                htmlFor="remember"
                className="ml-2 text-sm text-[var(--background)]"
              >
                Remember me
              </label>
            </div> */}
            <a
              href="#"
              className="text-sm text-[var(--primary)] hover:underline"
            >
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button type="submit" className="signup-btn">
            Sign In
          </button>

          {/* Sign Up Link */}
          <p className="text-sm text-[var(--background)] text-center mt-2">
            Don't have an account?
            <a
              href="/signup"
              className="text-[var(--primary)] font-medium hover:underline"
            >
              Sign up
            </a>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
