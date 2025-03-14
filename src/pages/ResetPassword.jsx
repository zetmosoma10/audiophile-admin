import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "../schemas/resetPasswordSchema";
import Input from "../components/Input";
import useResetPassword from "../hooks/useResetPassword";
import Button from "../components/Button";

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(resetPasswordSchema) });

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { mutate, isPending, isError, error } = useResetPassword();

  const token = searchParams.get("token");
  const id = searchParams.get("id");

  const onSubmit = (data) => {
    delete data.confirmPassword;
    const payload = { token, id, ...data };

    mutate(payload, {
      onSuccess: (data) => {
        reset();
        navigate("/", { replace: true });
      },
    });
  };

  return (
    <div className="flex items-center justify-center bg-slate-50 min-h-screen">
      <div className="w-11/12 mx-auto sm:w-3/4 md:w-1/2 lg:w-1/3">
        <div className="w-full px-5 py-6 bg-white shadow-md sm:p-7 rounded-xl border">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-BLACK ">
              Reset Password
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Please enter your new Password
            </p>
          </div>

          {isError &&
            error?.response &&
            (error.response?.status === 400 ||
              error.response?.status === 404) && (
              <p className="mt-4 text-base font-semibold text-center text-red-600 ">
                {error?.response?.data?.message}
              </p>
            )}

          <form onSubmit={handleSubmit(onSubmit)} className="mt-7" noValidate>
            <div className="grid gap-y-4">
              <Input
                type="password"
                label="Password"
                id="password"
                errors={errors?.password}
                register={register}
              />
              <Input
                type="password"
                label="Conform Password"
                id="confirmPassword"
                errors={errors?.confirmPassword}
                register={register}
              />
              <Button className="btn-primary btn-large" disabled={isPending}>
                {isPending ? (
                  <div
                    className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-gray-50 rounded-full"
                    role="status"
                    aria-label="loading"
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
