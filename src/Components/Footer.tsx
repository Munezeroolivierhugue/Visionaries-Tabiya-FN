import FooterLink from "./FooterLink";

const Footer = () => {
  const links = ['Platform','Skills Assessment', 'Career Explorer', 'Learning Paths', 'Progress Tracking', 'Resources', 'Help Center', 'Community', 'Blog', 'Success', 'Stories', 'Company', 'About Us', 'Careers', 'Contact', 'Press', 'Legal', 'Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Accessibility']
  return (
    <>
    <div className="bg-[#111827] text-white flex flex-row gap-3">
      <div className="logo-desc w-56">
        <h1>SkillsBridge</h1>
        <p>
          Empowering job seekers worldwide to map their skills to career
          opportunities and bridge skill gaps through personalized learning
          pathways.
        </p>
      </div>
      <div className="links">
        <FooterLink links={links}/>
      </div>
      </div>
    </>
  );
};

export default Footer;
