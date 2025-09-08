import FooterLink from "./FooterLink";
import Logo from "../assets/images/logo.png";
import { FaTwitter, FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const links = [
    {
      category: "Platform",
      items: [
        "Skills Assessment",
        "Career Explorer",
        "Learning Paths",
        "Progress Tracking",
        "Resources",
      ],
    },
    {
      category: "Resources",
      items: ["Help Center", "Community", "Blog", "Success Stories", "Press"],
    },
    {
      category: "Company",
      items: ["About Us", "Careers", "Contact", "Press", "Stories"],
    },
    {
      category: "Legal",
      items: [
        "Privacy Policy",
        "Terms of Service",
        "Cookie Policy",
        "Accessibility",
        "Legal",
      ],
    },
  ];

  return (
    <div className="bg-[#1A202C] text-white flex flex-col p-10 absolute bottom-0 left-0 w-screen">
      <div className="flex flex-row gap-6 mb-6">
        <div className="logo-desc w-[30%] flex items-center">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <img src={Logo} alt="Logo" className="w-12 h-12 rounded-lg" />
              <span className="text-3xl">SkillPath</span>
            </h1>
            <p className="mt-2 text-sm text-gray-400">
              Empowering job seekers worldwide to map their skills to career
              opportunities and bridge skill gaps through personalized learning
              pathways.
            </p>
            <div className="flex gap-2 mt-4">
              <span className="text-gray-500 text-xl">
                <FaTwitter />
              </span>
              <span className="text-gray-500 text-xl">
                <FaLinkedin />
              </span>
              <span className="text-gray-500 text-xl">
                <FaFacebook />
              </span>
              <span className="text-gray-500 text-xl">
                <FaInstagram />
              </span>
            </div>
          </div>
        </div>
        <div className="links w-[70%]">
          <FooterLink links={links} />
        </div>
      </div>
      <div className="border-t border-gray-700 pt-4 text-sm text-gray-500 flex justify-between">
        <span>© 2025 SkillPath. All rights reserved.</span>
        <span>Available in: English | French | Español</span>
      </div>
    </div>
  );
};

export default Footer;
