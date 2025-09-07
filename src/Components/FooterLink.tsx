interface FooterLinkProps {
  links: { category: string; items: string[] }[];
}

const FooterLink = ({ links }: FooterLinkProps) => {
  return (
    <div className="grid grid-cols-4 gap-6">
      {links.map((section, index) => (
        <div key={index} className="flex flex-col gap-2">
          <h1 className="text-lg font-bold">{section.category}</h1>
          {section.items.map((item, itemIndex) => (
            <p key={itemIndex}>
              <a
                href={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {item}
              </a>
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FooterLink;