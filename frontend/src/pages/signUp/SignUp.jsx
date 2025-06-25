import { FaArrowLeftLong } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router";
<<<<<<< HEAD
=======
import { saveUser } from "../../api/utils";
>>>>>>> 25cd817d1ce1cd11a1d1010d151a2b85c59c24f6

const SignUp = () => {
  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  const handleSignUpFormSubmit = async (data) => {
    const { name, email, password } = data;

    try {
      await createUser(email, password);
      await updateUserProfile(name);
<<<<<<< HEAD
=======

      // Prepare user object for saving
      await saveUser(data);
>>>>>>> 25cd817d1ce1cd11a1d1010d151a2b85c59c24f6
      reset();
      alert("sign up successfull");
      // redirect to home page
      navigate("/");
    } catch (error) {
      console.error("Error during Sign Up:", error);
      alert("Sign up failed. please try again later.");
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
          Create Account
        </h1>

        <form
          onSubmit={handleSubmit(handleSignUpFormSubmit)}
          className="flex flex-col space-y-4 z-20"
        >
          {/* Name Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="label-text">
              Name
            </label>
            <input
              type="text"
              name="name"
              {...register("name", { required: true })}
              placeholder="Enter your name"
              className="input-fild"
              required
            />
          </div>
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
            <a
              href="#"
              className="text-sm text-[var(--primary)] hover:underline"
            >
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button type="submit" className="signup-btn">
            Sign Up
          </button>

          {/* Sign Up Link */}
          <p className="text-sm text-[var(--background)] text-center mt-2">
            Already have an account?
            <a
              href="/login"
              className="text-[var(--primary)] font-medium hover:underline"
            >
              Sign in
            </a>
          </p>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
