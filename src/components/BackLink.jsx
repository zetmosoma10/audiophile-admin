import { useNavigate } from "react-router-dom";

const BackLink = ({ className }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className={`text-base font-medium text-gray-900 opacity-50 hover:font-bold focus:text-ORANGE focus:outline-none ${className} `}
    >
      Go Back
    </button>
  );
};

export default BackLink;
