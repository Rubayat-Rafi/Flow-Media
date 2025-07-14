import { FaArrowLeftLong } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router";
import { saveUser } from "../../api/utils";
import { toast } from "react-hot-toast";

const SignUp = () => {
  const { createUser, updateUserProfile, setLoading } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

const handleSignUpFormSubmit = async (data) => {
  const { firstName, lastName, email, password } = data;
  const name = `${firstName} ${lastName}`; 
  setLoading(true);

  try {
    // 1. Create Firebase auth user
    const userCredential = await createUser(email, password);
    const uid = userCredential?.user?.uid;
    
    if (!uid) {
      throw new Error("User creation failed - no UID returned");
    }

    // 2. Update user profile with display name
    await updateUserProfile(name);

    // 3. Prepare user data for backend
    const userData = {
      name,
      email,
      uid,
    };

    // 4. Save to your database
    await saveUser(userData);

    // 5. Reset form and handle UI
    reset();
    toast.success("Sign up successful!");
    navigate("/");
  } catch (error) {
    toast.error(error.message || "Sign up failed. Please try again later.");
  } finally {
    setLoading(false);
  }
};

  return (
    <section
      className="flex flex-col items-center justify-center min-h-screen p-4"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/dzdfnuno8/image/upload/v1752337116/sports-bg_irqw9u.jpg')",
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
          <div className=" flex flex-col md:flex-row items-center justify-center gap-2">
            {/*First Name Field */}
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="name" className="label-text">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                {...register("firstName", { required: true })}
                placeholder="Enter first name"
                className="input-fild"
                required
              />
            </div>

            {/* Last Name Field */}
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="name" className="label-text">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                {...register("lastName", { required: false })}
                placeholder="Enter last name"
                className="input-fild"
                required
              />
            </div>
          </div>
          {/* Email Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="label-text">
              Email
            </label>
            <input
              type="email"
              name="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              placeholder="Enter your email"
              className="input-fild"
              required
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="label-text">
              Password
            </label>
            <input
              type="password"
              name="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                  message:
                    "Password must contain uppercase, lowercase, and number",
                },
                validate: (value) => {
                  if (value === "password123") {
                    return "Don't use common passwords";
                  }
                  return true;
                },
              })}
              placeholder="Enter your password"
              className="input-fild"
              required
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
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
