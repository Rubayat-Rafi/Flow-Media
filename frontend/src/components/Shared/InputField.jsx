const InputField = ({ label, name, register, type = "text" }) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type={type}
        {...register(name)}
        className="w-full py-3 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-[var(--background)]"
        placeholder={`Enter ${label.toLowerCase()}`}
      />
    </div>
  );
};

export default InputField;
