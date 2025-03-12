import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import Input from "../components/Input";
import { useForgotPassword } from "../hooks/useForgotPassword";
import { toast } from "react-toastify";
import Button from "../components/Button";

const schema = z.object({
  email: z.string().min(1, "Required").email("Invalid email"),
});

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const { mutate, isPending, isError, error } = useForgotPassword();

  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: (data) => {
        reset();
        toast.success(data?.message);
      },
      onError: (error) => {
        if (error?.response && error?.response?.status === 500) {
          toast.error(error.response?.data?.message);
        }
      },
    });
  };

  return (
    <div className="flex items-center justify-center bg-slate-50 min-h-screen">
      <div className="w-11/12 mx-auto sm:w-3/4 md:w-1/2 ">
        <div className="w-full px-5 py-6 bg-white shadow-md sm:p-7 rounded-xl border">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-BLACK ">
              Forgot password?
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Remember your password?
              <Link
                to="/login"
                className="font-medium text-indigo-600 decoration-2 hover:underline focus:outline-none focus:underline "
              >
                {" "}
                Sign in here
              </Link>
            </p>
          </div>

          {isError &&
            error?.response &&
            error.response?.status >= 400 &&
            error.response?.status < 500 && (
              <p className="mt-4 text-base font-semibold text-center text-red-600">
                {error.response.data?.message}
              </p>
            )}

          <div className="mt-10">
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="grid gap-y-4">
                <Input
                  label="Email Address"
                  type="email"
                  id="email"
                  register={register}
                  errors={errors?.email}
                />
                <Button disabled={isPending} className="btn-primary btn-large">
                  {isPending ? (
                    <div
                      className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-gray-50 rounded-full "
                      role="status"
                      aria-label="loading"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    "Reset password"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
