import { CheckCircle, Circle, ArrowLeft, ExternalLink } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function CareerPath() {
  const { state } = useLocation();
  const [skillData, setSkillData] = useState<{
    technicalSkills: string[];
    softSkills: string[];
    informalSkills: string[];
    certifications: string[];
    languages: { language: string; fluencyLevel: string }[];
    educationLevel: string;
    industryExperience: string;
  } | null>(null);
  const career = state?.career as {
    id: string;
    title: string;
    company: string;
    location: string;
    salaryRange: string;
    durationToAchieve: string;
    summary: string;
    requiredSkills: string[];
    matchPercent: number;
    category: string;
    remote?: boolean;
  } | null;

  // Load skill data from localStorage
  useEffect(() => {
    const storedData = localStorage.getItem("skillAssessmentData");
    if (storedData) {
      setSkillData(JSON.parse(storedData));
    }
  }, []);

  if (!career) {
    return <div>Career not found. Go back and select a career.</div>;
  }

  // Determine progress and skill completion
  const calculateProgress = () => {
    if (!skillData) return 0;
    const allUserSkills = [
      ...skillData.technicalSkills,
      ...skillData.softSkills,
      ...skillData.informalSkills,
      ...skillData.certifications,
    ].map((s) => s.toLowerCase());
    const completedSkills = career.requiredSkills.filter((skill) =>
      allUserSkills.includes(skill.toLowerCase())
    ).length;
    return Math.round((completedSkills / career.requiredSkills.length) * 100) || 0;
  };

  const progress = calculateProgress();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Back Link */}
      <Link
        to="/career"
        className="mb-4 flex items-center text-blue-600 hover:underline cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        <span>Back to Career Paths</span>
      </Link>

      {/* Header */}
      <div className="bg-white p-6 rounded-2xl shadow mb-6">
        <h1 className="text-2xl font-bold">{career.title}</h1>
        <p className="text-gray-500">{career.company}</p>
        <div className="mt-4 grid grid-cols-3 gap-4">
          <InfoCard title="Location" value={career.location || "N/A"} />
          <InfoCard title="Salary Range" value={career.salaryRange || "N/A"} />
          <InfoCard
            title="Time to Achieve"
            value={career.durationToAchieve || "N/A"}
          />
        </div>
      </div>

      {/* About */}
      <div className="bg-white p-6 rounded-2xl shadow mb-6">
        <h2 className="font-semibold text-lg mb-2">About This Career Path</h2>
        <p className="text-gray-600 text-sm">{career.summary}</p>
      </div>

      {/* Progress */}
      <div className="bg-white p-6 rounded-2xl shadow mb-6">
        <h2 className="font-semibold text-lg mb-2">Your Progress</h2>
        <div className="w-full bg-gray-200 h-2 rounded-full mb-2">
          <div
            className="bg-blue-500 h-2 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-gray-500 mb-4">{progress}% Complete</p>
        <ul className="space-y-2">
          {career.requiredSkills.map((skill) => (
            <Milestone
              key={skill}
              done={skillData?.technicalSkills
                .concat(skillData?.softSkills || [])
                .concat(skillData?.informalSkills || [])
                .concat(skillData?.certifications || [])
                .some((s) => s.toLowerCase() === skill.toLowerCase())}
              text={skill}
            />
          ))}
        </ul>
      </div>

      {/* Required Skills */}
      <div className="bg-white p-6 rounded-2xl shadow mb-6">
        <h2 className="font-semibold text-lg mb-4">Required Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {career.requiredSkills.map((skill) => (
            <Skill
              key={skill}
              name={skill}
              level="Intermediate" // Placeholder; could be dynamic based on skillData
              done={skillData?.technicalSkills
                .concat(skillData?.softSkills || [])
                .concat(skillData?.informalSkills || [])
                .concat(skillData?.certifications || [])
                .some((s) => s.toLowerCase() === skill.toLowerCase())}
            />
          ))}
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