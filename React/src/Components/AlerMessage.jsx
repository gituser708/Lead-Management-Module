import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineLoading3Quarters } from 'react-icons/ai';

export default function AlerMessage({ type, message }) {
    let icon;
  let colorClass;

  switch (type) {
    case "error":
      icon = <AiOutlineCloseCircle className="text-red-500 text-3xl" />;
      colorClass = "bg-red-100 text-red-700";
      break;
    case "success":
      icon = <AiOutlineCheckCircle className="text-green-500 text-3xl" />;
      colorClass = "bg-green-100 text-green-700";
      break;
    case "loading":
      icon = (
        <AiOutlineLoading3Quarters className="animate-spin text-blue-500 text-3xl" />
      );
      colorClass = "bg-blue-100 text-blue-700";
      break;
    default:
      icon = null;
  }

  return (
    <div className='fixed top-4 left-1/2 transform -translate-x-1/2 z-40 px-4'>
    <div className={`flex items-center p-4 rounded-lg ${colorClass} space-x-3 max-w-xl`}>
      {icon}
      <span className="text-sm font-medium">{message}</span>
      </div>
      </div>
  );
};

