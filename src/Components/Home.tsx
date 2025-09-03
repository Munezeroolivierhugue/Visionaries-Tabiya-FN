import { Link } from "react-router-dom";
import { Play, Compass } from "lucide-react";
import Employees from "../assets/images/employees.jpg";
const Home = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="py-10 pr-10 flex justify-between">
        <div className="w-[70%] pr-[2.5rem] flex flex-col gap-y-4 text-xl">
          <h1 className="text-[32px] font-bold">
            Map Your Skills to Dream Careers
          </h1>
          <p className="text-gray-600">
            Discover career opportunities aligned with your skills, identify
            gaps, and get personalized learning pathways to bridge them. Support
            for informal skills and multilingual accessibility.
          </p>
          <div className="text-white text-base mt-6 flex gap-x-10">
            <Link
              to="/skills"
              className="bg-blue-500 px-5 py-3.5 flex gap-x-2 rounded-lg hover:bg-blue-600 "
            >
              <Play className="w-6 h-6 fill-white" size={20} />
              <span>Start Skills Assessment</span>
            </Link>
            <Link
              to="/career"
              className="bg-white border-[1px] border-gray-500 text-gray-700 px-6 py-3.5 flex gap-x-2 rounded-lg hover:bg-gray-100 "
            >
              <Compass className="w-6 h-6" />
              <span>Explore careers</span>
            </Link>
          </div>
        </div>
        <div className="">
          <img
            src={Employees}
            alt="Images of employees"
            className="w-[500px] h-80 object-cover rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};
export default Home;
