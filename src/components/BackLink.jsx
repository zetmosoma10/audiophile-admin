import { useNavigate } from "react-router-dom";

const BackLink = ({ className }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className={`text-base font-medium opacity-50 hover:text-ORANGE focus:text-ORANGE focus:outline-none ${className}`}
    >
      Go Back
    </button>
  );
};

export default BackLink;
