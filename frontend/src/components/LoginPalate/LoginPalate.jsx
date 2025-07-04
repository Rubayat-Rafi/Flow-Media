import { Link } from "react-router";
const LoginPalate = () => {
  return (
    <div className="flex h-full items-center justify-center w-full">
      <div
        className="bg-[var(--background)] px-6 py-10 rounded-xl lg:px-10 lg:py-20"
        style={{ boxShadow: "0 2px 6px 0 var(--primary)" }}
      >
        <p className="text-sm text-gray-400 mb-6 text-center">Your free trial has ended</p>
        <Link
          to="/signup"
          className=" lg:text-xl max-md:text-base bg-[var(--primary)] py-2 px-4 md:py-3 md:px-6 rounded-md cursor-pointer uppercase"
        >
          Signup to keep watching
        </Link>
        <p className="text-base max-md:text-xs text-center mt-4 lg:mt-6">
          Already have an account?
          <Link to="/login" className="text-[var(--primary)] font-medium ml-2">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPalate;
