import Button from "./Button";

const UnExpectedError = ({ error, refetch }) => {
  let message = "Something Went Wrong. Please try again later";

  if (!error.response) {
    //* No response means network issue or server is completely down
    message = "Cannot connect to the server. Please check your internet.";
  } else if (error.response?.status >= 500) {
    //* Server returned a 5xx error
    message = "Server is down. Please try again later.";
  }

  return (
    <section className="flex items-center justify-center h-screen text-center">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">{message}</h1>
        <Button onClick={refetch} className="btn-primary mt-2 mx-auto py-2">
          Reload
        </Button>
      </div>
    </section>
  );
};

export default UnExpectedError;
