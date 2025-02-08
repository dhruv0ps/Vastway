


import { FaFacebook, FaTwitter, FaLinkedin,FaWhatsapp } from "react-icons/fa"

// const drawDetails = {
//   title: "Latest Express Entry Draw #333 Invites 4,000 Candidates",
//   publishedBy: "The Canindian",
//   socialLinks: [
//     { icon: <FaFacebook />, link: "#" },
//     { icon: <FaTwitter />, link: "#" },
//     { icon: <FaLinkedin />, link: "#" },
//     { icon: <FaShareAlt />, link: "#" },
//   ],
//   image:
//     "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-05%20173023-ZBgJYu1gg5uRfPSxXHh2x5DTE9FZ4I.p",
//   description:
//     "Immigration, Refugees and Citizenship Canada (IRCC) has completed a new round of the Express Entry draw for Canadian Experience Class.",
//   category: "Express Entry - Canadian Experience Class",
//   invitationIssued: 4000,
//   drawDate: "January 23, 2025",
//   crsCutoff: 527,
//   rankRequired: "4,000 or above",
//   tieBreakingRule: "July 23, 2024 at 07:06:43 UTC",
// }

// const previousDraws = [
//   { category: "Canadian Experience Class", date: "2025-02-06", ITAs: 4000, CRS: 521 },
//   { category: "Province Nominee Program", date: "2025-02-03", ITAs: 455, CRS: 487 },
//   { category: "Canadian Experience Class", date: "2025-01-26", ITAs: 3800, CRS: 515 },
//   { category: "Province Nominee Program", date: "2025-01-18", ITAs: 471, CRS: 503 },
//   { category: "French language proficiency", date: "2025-01-06", ITAs: 1100, CRS: 460 },
//   { category: "Healthcare occupations", date: "2025-01-04", ITAs: 1125, CRS: 473 },
// ]

export default function DrawDetailsPage() {
  return (
    <section className="py-10 " style={{maxWidth:"1200px",margin:"0 auto",display:"block",boxSizing:"border-box",fontFamily: "Lexend, sans-serif"}}>
    <div className="container mx-auto px-4" style={{width:"75%",marginRight:"300px",paddingRight:"0",display:"block",boxSizing:"border-box"}}>
      <div className="">
        <h1 className="text-2xl font-bold text-gray-900" style={{fontSize:"2.1 em",textAlign:"left",width:"100%",marginTop:"20px",marginRight:"85px"}}>Latest Express Entry Draw #335 Invites 4,000 Candidates</h1>
        <div style={{ borderBottom: '1px solid #00000045', display: 'flex', flexFlow: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: '0', marginBottom: '10px', paddingTop: '10px', paddingBottom: '10px', textDecoration: 'none' }}>
         
        <div style={{ justifyContent: 'flex-start', alignItems: 'center', width: 'auto', display: 'flex' }}>
           <span>Published By -</span>
          <span className="font-medium">The CanIndian</span>
          <span>|</span>
          <div className="flex gap-2">
            <button className="h-8 w-8 flex items-center justify-center text-green-600">
              <FaWhatsapp className="h-5 w-5" />
            </button>
            <button className="h-8 w-8 flex items-center justify-center text-blue-600">
              <FaFacebook className="h-5 w-5" />
            </button>
            <button className="h-8 w-8 flex items-center justify-center text-blue-400">
              <FaTwitter className="h-5 w-5" />
            </button>
            <button className="h-8 w-8 flex items-center justify-center text-blue-700">
              <FaLinkedin className="h-5 w-5" />
            </button>
          </div>
          </div>
        </div>
        <div style={{width:"100%",fontSize:"16px",display:"block"}}>
        <img
          src="https://cdn.prod.website-files.com/662a7deba8e5d744ee11e2b1/665a03fd67aed75a4af7a6fd_8gTkElWm32G5J2HDHDSgkzjTRJktmEEZQMyg3oOr1NI.webp"
          alt="Express Entry Draw"
          className="w-full rounded-lg mt-4 object-cover h-[300px]"
          style={{ objectFit: 'fill', width: '100%', maxWidth: '100%', display: 'block', textAlign: 'left', borderRadius: '20px', justifyContent: 'flex-start', alignItems: 'flex-start', height: 'auto', maxHeight: 'none', margin: '20px auto' }}
        />
         <div className="mt-4" id="subTitle" style={{ marginBottom: '20px' }}>
            <p className="text-sm text-gray-600">Immigration, Refugees and Citizenship Canada (IRCC) has completed a new round of the Express Entry draw for the Canadian Experience Class.</p>
          </div>
        <div>
        </div>
       

          <div className="detailswrapper" style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', boxSizing: 'border-box' }}>
          <div style={{ borderColor: '#7979C7', flexFlow: 'column', marginBottom: '20px', marginLeft: '20px', marginRight: '20px', paddingBottom: '0', paddingRight: '0', outlineOffset: '0px', textAlign: 'left', border: '1px solid #000', borderTopColor: 'rgb(0, 0, 0)', borderRightColor: 'rgb(0, 0, 0)', borderBottomColor: 'rgb(0, 0, 0)', borderLeftColor: 'rgb(0, 0, 0)', borderRadius: '0', outline: '3px #333',  justifyContent: 'center', alignItems: 'center', width: '59%',  display: 'flex', boxShadow: '4px 4px 20px #0003' }} className="drawdetailsdiv seperatediv">
          <div className="drawdetails title" style={{ marginTop: '5px', marginBottom: '5px', fontSize: '1.1em', fontWeight: '400' }}>Invitation Issued</div>
          <div className="drawdetails" style={{ textAlign: 'center',  borderRadius: '0', alignSelf: 'auto', width: 'auto', margin: '5px 4px', marginTop: '5px', marginBottom: '5px', paddingTop: '0', paddingBottom: '0', paddingRight: '0', fontSize: '1.2em', fontWeight: '500', display: 'block' }}>4,000</div>
            </div>
            <div style={{ borderColor: '#7979C7', flexFlow: 'column', marginBottom: '20px', marginLeft: '20px', marginRight: '20px', paddingBottom: '0', paddingRight: '0', outlineOffset: '0px', textAlign: 'left', border: '1px solid #000', borderTopColor: 'rgb(0, 0, 0)', borderRightColor: 'rgb(0, 0, 0)', borderBottomColor: 'rgb(0, 0, 0)', borderLeftColor: 'rgb(0, 0, 0)', borderRadius: '0', outline: '3px #333', justifyContent: 'center', alignItems: 'center', width: '59%',  display: 'flex', boxShadow: '4px 4px 20px #0003' }} className="drawdetailsdiv seperatediv">
            <div className="drawdetails title" style={{ marginTop: '5px', marginBottom: '5px', fontSize: '1.1em', fontWeight: '400' }}>Draw Date </div>
            <div className="drawdetails" style={{ textAlign: 'center',  borderRadius: '0', alignSelf: 'auto', width: 'auto', margin: '5px 4px', marginTop: '5px', marginBottom: '5px', paddingTop: '0', paddingBottom: '0', paddingRight: '0', fontSize: '1.2em', fontWeight: '500', display: 'block' }}>February 5, 2025</div>
            </div>
            <header style={{ borderColor: '#7979C7', flexFlow: 'column', marginBottom: '20px', marginLeft: '20px', marginRight: '20px', paddingBottom: '0', paddingRight: '0', outlineOffset: '0px', textAlign: 'left', border: '1px solid #000', borderTopColor: 'rgb(0, 0, 0)', borderRightColor: 'rgb(0, 0, 0)', borderBottomColor: 'rgb(0, 0, 0)', borderLeftColor: 'rgb(0, 0, 0)', borderRadius: '0', outline: '3px #333', justifyContent: 'center', alignItems: 'center', width: '59%',  display: 'flex', boxShadow: '4px 4px 20px #0003' }} className="drawdetailsdiv seperatediv">
            <div className="drawdetails title" style={{ marginTop: '5px', marginBottom: '5px', fontSize: '1.1em', fontWeight: '400' }}>CRS Cutoff </div>
              {/* <div className="drawdetails title w-condition-invisible">Score</div> */}
              <div className="drawdetails" style={{ textAlign: 'center',  borderRadius: '0', alignSelf: 'auto', width: 'auto', margin: '5px 4px', marginTop: '5px', marginBottom: '5px', paddingTop: '0', paddingBottom: '0', paddingRight: '0', fontSize: '1.2em', fontWeight: '500', display: 'block' }}>521</div>
            </header>

          </div>
          <div style={{ borderColor: '#7979C7', outlineOffset: '0px', textAlign: 'left', border: '1px solid #000', borderTopColor: 'rgb(0, 0, 0)', borderRightColor: 'rgb(0, 0, 0)', borderBottomColor: 'rgb(0, 0, 0)', borderLeftColor: 'rgb(0, 0, 0)', borderRadius: '0', outline: '3px #333', flexFlow: 'row', justifyContent: 'center', alignItems: 'center', width: '59%', marginBottom: '20px', marginLeft: 'auto', marginRight: 'auto', paddingRight: '0', display: 'flex', boxShadow: '4px 4px 20px #0003' }} className="drawdetailsdiv">
          <div className="drawdetails title" style={{ marginTop: '5px', marginBottom: '5px', fontSize: '1.1em', fontWeight: '400' }}>  Express Entry </div>
          <div className="drawdetails" style={{ textAlign: 'center',  borderRadius: '0', alignSelf: 'auto', width: 'auto', margin: '5px 4px', marginTop: '5px', marginBottom: '5px', paddingTop: '0', paddingBottom: '0', paddingRight: '0', fontSize: '1.2em', fontWeight: '500', display: 'block' }}> Canadian Experience Class</div>
            </div>
            <div style={{ borderColor: '#7979C7', outlineOffset: '0px', textAlign: 'left', border: '1px solid #000', borderTopColor: 'rgb(0, 0, 0)', borderRightColor: 'rgb(0, 0, 0)', borderBottomColor: 'rgb(0, 0, 0)', borderLeftColor: 'rgb(0, 0, 0)', borderRadius: '0', outline: '3px #333', flexFlow: 'row', justifyContent: 'center', alignItems: 'center', width: '59%', marginBottom: '20px', marginLeft: 'auto', marginRight: 'auto', paddingRight: '0', display: 'flex', boxShadow: '4px 4px 20px #0003' }} className="drawdetailsdiv">
          <div className="drawdetails title" style={{ marginTop: '5px', marginBottom: '5px', fontSize: '1.1em', fontWeight: '400' }}>Rank Required to be invited to apply - </div>
          <div className="drawdetails" style={{ textAlign: 'center',  borderRadius: '0', alignSelf: 'auto', width: 'auto', margin: '5px 4px', marginTop: '5px', marginBottom: '5px', paddingTop: '0', paddingBottom: '0', paddingRight: '0', fontSize: '1.2em', fontWeight: '500', display: 'block' }}>4,000 or above</div>
            </div>
            <div className="subdescription w-richtext" style={{ borderBottom: '1px none var(--border-color)', marginTop: '0', marginBottom: '20px', paddingTop: '0', paddingBottom: '0', fontSize: '17px', boxSizing: 'border-box' }}>
            <p>If you receive an invitation to apply, you'll be given a <strong>60 days</strong> window to submit your application.</p>
          </div>
      </div>

    </div>
    </div>
  </section>
  )
}
