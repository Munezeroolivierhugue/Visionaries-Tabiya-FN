interface FooterLinkProps {
  links: string[];
}
const FooterLink = (links: FooterLinkProps) => {
  return (
    <div className="flex flex-col">
      {Object.values(links).map((word:string,index:number)=>{
        return(<div className="flex flex-row" key={index}>
          <h1>{index%5===0 && word}</h1>
          <p>{!(index%5 === 0) && word}</p>
          </div>
        )
      })}
    </div>
  )
}

export default FooterLink