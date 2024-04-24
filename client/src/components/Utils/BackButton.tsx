import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

type BackButtonProps = {
  vendor: string;
}

export default function BackButton({vendor}: BackButtonProps) {
  return (
    <div className="flex">
      <Link
        to={`/dashboard/${vendor}`}
        className="bg-sky-800 text-white px-4 py-1 rounded-lg flex justify-center  w-1/6 lg:w-52"
      >
        <BsArrowLeft className="text-22x1" />
      </Link>
    </div>
  );
}
