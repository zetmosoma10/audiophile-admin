import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schemas/loginSchema";
import useLogin from "../hooks/useLogin";
import Input from "../components/Input";
import Button from "../components/Button";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const navigate = useNavigate();
  const location = useLocation();
  const { mutate, isPending, isError, error } = useLogin();

  const onSubmit = (data) => {
    if (location.state) {
      location.state.message = null;
    }

    mutate(data, {
      onSuccess: () => {
        reset();
        navigate("/", { replace: true });
      },
    });
  };

  return (
    <div className="flex items-center justify-center bg-slate-50 min-h-screen">
      <div className="w-11/12 mx-auto sm:w-3/4 md:w-1/2 ">
        <div className="w-full px-5 py-6 bg-white shadow-md sm:p-7 rounded-xl border">
          <div className="text-center">
            <h1 className="block text-2xl font-bold">Sign in</h1>
            <p className="mt-2 text-sm text-gray-600 ">
              Don't have an account yet?
              <Link
                to="/register"
                className="font-medium text-indigo-600 decoration-2 hover:underline focus:outline-none focus:underline "
              >
                {" "}
                Sign up here
              </Link>
            </p>
          </div>

          {isError && error.status >= 400 && error.status < 500 && (
            <p className="mt-4 text-lg font-semibold text-center text-red-500 ">
              {error?.response.data.message}
            </p>
          )}

          {location?.state?.message ? (
            <p className="mt-4 text-lg font-semibold text-center text-red-500 ">
              {location.state.message}
            </p>
          ) : null}

          <form onSubmit={handleSubmit(onSubmit)} className="mt-7" noValidate>
            <div className="grid gap-y-4">
              <Input
                type="email"
                label="Email address"
                id="email"
                errors={errors?.email}
                register={register}
              />
              <Input
                type="password"
                label="Password"
                id="password"
                errors={errors?.password}
                register={register}
              />
              <div className="text-end">
                <Link
                  to="/forgotPassword"
                  className="text-sm font-medium text-indigo-600 gap-x-1 decoration-2 hover:underline focus:outline-none focus:underline "
                >
                  Forgot password?
                </Link>
              </div>

              <Button className="btn-primary btn-large" disabled={isPending}>
                {isPending ? (
                  <div
                    className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-gray-50 rounded-full "
                    role="status"
                    aria-label="loading"
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  "Sign in"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
