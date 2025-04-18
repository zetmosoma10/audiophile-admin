import { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

const Input = ({
  id,
  label,
  type = "text",
  placeholder = "",
  register,
  errors,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label
          className="font-bold text-[12px] tracking-[0.21px] "
          htmlFor={id}
        >
          {label}
        </label>
        {errors?.message && (
          <span className="text-[12px] text-red-500 font-medium tracking-[-0.21px]">
            {errors?.message}
          </span>
        )}
      </div>
      <div className="relative">
        <input
          className={`w-full border rounded-lg pb-[19px] pt-[18px] pr-10 font-semibold text-sm tracking-[-0.25px] indent-6 caret-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:outline-none placeholder:font-semibold ${
            errors?.message
              ? "border-red-500 focus:border-none focus:ring-2 focus:ring-red-500 focus:outline-none"
              : "border-gray-300"
          }`}
          type={inputType}
          id={id}
          name={id}
          placeholder={placeholder}
          {...register(id, { valueAsNumber: type === "number" })}
        />
        {type === "password" && (
          <div
            onClick={togglePasswordVisibility}
            className="absolute cursor-pointer right-3 top-5 "
          >
            {showPassword ? (
              <MdVisibilityOff size={24} />
            ) : (
              <MdVisibility size={24} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
