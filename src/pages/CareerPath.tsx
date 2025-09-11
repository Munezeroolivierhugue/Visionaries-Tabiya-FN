import { CheckCircle, Circle, ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
export default function CareerPath() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Back Link */}
      <Link to="/career" className="mb-4 flex items-center text-blue-600 hover:underline cursor-pointer">
        <ArrowLeft className="w-4 h-4 mr-1" />
        <span>Back to Career Paths</span>
      </Link>

      {/* Header */}
      <div className="bg-white p-6 rounded-2xl shadow mb-6">
        <h1 className="text-2xl font-bold">Front-end Developer</h1>
        <p className="text-gray-500">Tech Solutions Inc.</p>

        <div className="mt-4 grid grid-cols-3 gap-4">
          <InfoCard title="Location" value="Remote" />
          <InfoCard title="Salary Range" value="$80,000 - $110,000" />
          <InfoCard title="Time to Achieve" value="6-12 months" />
        </div>
      </div>

      {/* About */}
      <div className="bg-white p-6 rounded-2xl shadow mb-6">
        <h2 className="font-semibold text-lg mb-2">About This Career Path</h2>
        <p className="text-gray-600 text-sm">
          Front-end developers are responsible for implementing visual elements
          that users see and interact with in a web application. They work
          closely with UI/UX designers and back-end developers to create
          seamless user experiences. As a front-end developer, you'll write
          clean, efficient code using HTML, CSS, and JavaScript with a focus on
          performance and accessibility.
        </p>
      </div>

      {/* Progress */}
      <div className="bg-white p-6 rounded-2xl shadow mb-6">
        <h2 className="font-semibold text-lg mb-2">Your Progress</h2>
        <div className="w-full bg-gray-200 h-2 rounded-full mb-2">
          <div className="bg-blue-500 h-2 rounded-full w-[40%]" />
        </div>
        <p className="text-sm text-gray-500 mb-4">40% Complete</p>

        <ul className="space-y-2">
          <Milestone done text="Complete JavaScript Fundamentals" />
          <Milestone done text="Build 3 React Projects" />
          <Milestone text="Learn Testing Frameworks" />
          <Milestone text="Master Advanced React Patterns" />
          <Milestone text="Complete Front-end Performance Optimization" />
        </ul>
      </div>

      {/* Required Skills */}
      <div className="bg-white p-6 rounded-2xl shadow mb-6">
        <h2 className="font-semibold text-lg mb-4">Required Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Skill name="JavaScript" level="Advanced" done />
          <Skill name="React" level="Intermediate" done />
          <Skill name="HTML/CSS" level="Advanced" done />
          <Skill name="UI/UX Design" level="Basic" />
          <Skill name="Git" level="Intermediate" done />
          <Skill name="Testing" level="Basic" />
          <Skill name="Responsive Design" level="Intermediate" />
        </div>
      </div>

      {/* Learning Resources */}
      <div className="bg-white p-6 rounded-2xl shadow mb-6">
        <h2 className="font-semibold text-lg mb-4">Learning Resources</h2>
        <Resource
          title="Advanced React Patterns"
          provider="Frontend Masters"
          duration="8 hours"
          level="Advanced"
        />
        <Resource
          title="Testing React Applications"
          provider="Udemy"
          duration="10 hours"
          level="Intermediate"
        />
        <Resource
          title="Web Performance Fundamentals"
          provider="Coursera"
          duration="6 hours"
          level="Intermediate"
        />
      </div>

      {/* Job Opportunities */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="font-semibold text-lg mb-4">Job Opportunities</h2>
        <Job
          title="Senior Front-end Developer"
          company="Tech Innovations"
          location="Remote"
          salary="$100,000 - $130,000"
        />
        <Job
          title="React Developer"
          company="Digital Solutions"
          location="Cape Town"
          salary="$80,000 - $95,000"
        />
        <Job
          title="UI Engineer"
          company="Creative Tech"
          location="Johannesburg"
          salary="$85,000 - $105,000"
        />
      </div>
    </div>
  );
}

/* ========== COMPONENTS ========== */

function InfoCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="p-3 bg-gray-100 rounded-lg text-sm">
      <p className="text-gray-500">{title}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}

function Milestone({ done, text }: { done?: boolean; text: string }) {
  return (
    <li className="flex items-center gap-2 text-sm">
      {done ? (
        <CheckCircle className="w-4 h-4 text-green-500" />
      ) : (
        <Circle className="w-4 h-4 text-gray-400" />
      )}
      <span className={done ? "line-through text-gray-400" : ""}>{text}</span>
    </li>
  );
}

function Skill({
  name,
  level,
  done,
}: {
  name: string;
  level: string;
  done?: boolean;
}) {
  return (
    <div className="border p-3 rounded-lg flex justify-between items-center text-sm">
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-gray-500">Level: {level}</p>
      </div>
      {done && <CheckCircle className="w-4 h-4 text-green-500" />}
    </div>
  );
}

function Resource({
  title,
  provider,
  duration,
  level,
}: {
  title: string;
  provider: string;
  duration: string;
  level: string;
}) {
  return (
    <div className="flex justify-between items-center border-b py-3 text-sm">
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-gray-500">
          {provider} • {duration} • {level}
        </p>
      </div>
      <div className="flex gap-2">
        <button className="text-xs px-3 py-1 border rounded-lg hover:bg-gray-100">
          Mark as Complete
        </button>
        <button className="text-xs px-3 py-1 border rounded-lg hover:bg-gray-100 flex items-center gap-1">
          <ExternalLink className="w-3 h-3" /> Access
        </button>
      </div>
    </div>
  );
}

function Job({
  title,
  company,
  location,
  salary,
}: {
  title: string;
  company: string;
  location: string;
  salary: string;
}) {
  return (
    <div className="flex justify-between items-center border-b py-3 text-sm">
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-gray-500">
          {company} • {location} • {salary}
        </p>
      </div>
      <button className="text-xs px-3 py-1 border rounded-lg hover:bg-gray-100 flex items-center gap-1">
        <ExternalLink className="w-3 h-3" /> View Job
      </button>
    </div>
  );
}
