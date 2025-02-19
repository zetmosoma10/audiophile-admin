import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import _ from "lodash";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../schemas/registerSchema";
import { useRegister } from "../hooks/useRegister";
import Input from "../components/Input";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) });

  const navigate = useNavigate();
  const { mutate, isPending, isError, error } = useRegister();

  const onSubmit = (data) => {
    const credentials = _.omit(data, ["confirmPassword"]);

    mutate(credentials, {
      onSuccess: () => {
        reset();
        navigate("/", { replace: true });
      },
    });
  };

  return (
    <div className="py-10 md:py-16 large_tablet:py-20 bg-slate-50">
      <div className="w-11/12 mx-auto sm:w-3/4 md:w-1/2">
        <div className="w-full px-6 py-6 bg-white shadow-md sm:p-7 rounded-xl">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-BLACK">Sign up</h1>
            <p className="mt-2 text-sm text-gray-600 ">
              Already have an account?
              <Link
                to="/login"
                className="font-medium text-ORANGE decoration-2 hover:underline focus:outline-none focus:underline "
              >
                {" "}
                Sign in here
              </Link>
            </p>
          </div>

          {isError && error?.status === 400 && (
            <p className="mt-4 text-lg font-semibold text-center text-red-600 ">
              {error?.response.data.message}
            </p>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="mt-10" noValidate>
            <div className="grid gap-y-4">
              <div className="space-y-4 sm:grid sm:grid-cols-2 sm:space-y-0 sm:gap-x-4 ">
                <Input
                  label="First Name"
                  id="firstName"
                  //   autoFocus={true}
                  register={register}
                  errors={errors?.firstName}
                />
                <Input
                  label="Last Name"
                  id="lastName"
                  register={register}
                  errors={errors?.lastName}
                />
              </div>
              <Input
                label="Email Address"
                type="email"
                id="email"
                register={register}
                errors={errors?.email}
              />
              <Input
                label="Password"
                type="password"
                id="password"
                register={register}
                errors={errors?.password}
              />
              <Input
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                register={register}
                errors={errors?.confirmPassword}
              />
              <button
                className="inline-flex items-center justify-center w-full px-4 py-3 mt-3 text-sm font-medium text-white border border-transparent rounded-lg bg-ORANGE gap-x-2 hover:bg-LIGHT_ORANGE focus:outline-none focus:bg-LIGHT_ORANGE disabled:opacity-50 disabled:pointer-events-none"
                disabled={isPending}
              >
                {isPending ? (
                  <div
                    className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-gray-50 rounded-full "
                    role="status"
                    aria-label="loading"
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  "Sign up"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
