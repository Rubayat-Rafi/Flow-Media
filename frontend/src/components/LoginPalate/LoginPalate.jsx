import { Link } from "react-router";
const LoginPalate = () => {
  return (
    <div className="  flex h-full items-center justify-center lg:h-[500px] w-full">
      <div
        className="bg-[var(--background)] rounded-xl p-6"
        style={{ boxShadow: "0 2px 6px 0 var(--primary)" }}
      >
        <Link
          to="/signup"
          className="text-xl max-md:text-base bg-[var(--primary)] py-3 px-4 rounded-md cursor-pointer uppercase"
        >
          Signup to keep watching
        </Link>
        <p className="text-base max-md:text-xs text-center mt-4">
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
