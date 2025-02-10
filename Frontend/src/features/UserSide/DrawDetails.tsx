import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { drawrAPi } from "../../config/apiRoutes/drawroutes";
import { Draw } from "../../config/models/draw";
import { Select,Table,Spinner,Alert } from "flowbite-react";
export default function DrawDetailsPage() {
  const { linkEdit } = useParams();
  const [DrawDetails, setDrawDetails] = useState<Draw | null>(null);
  const [relatedDraws, setRelatedDraws] = useState<Draw[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("all");

  useEffect(() => {
    const fetchDrawData = async () => {
      try {
        const response = await drawrAPi.GetDrawByEdit(linkEdit);
        setDrawDetails(response.data.draw);
        setRelatedDraws(response.data.relatedDraws || []);
      } catch (err) {
        setError("Failed to fetch draw details.");
      } finally {
        setLoading(false);
      }
    };
    fetchDrawData();

  }, [linkEdit])
  const filteredDraws = selectedSubCategory === "all"
  ? relatedDraws
  : relatedDraws.filter(draw =>
      draw.subCategories.some(sub => typeof sub === "string" ? sub === selectedSubCategory : sub.name === selectedSubCategory)
    );
  return (
    <section className="py-10 font-['Lexend',sans-serif] max-w-[1200px] mx-auto">
    <div className="container mx-auto px-4 lg:w-3/4 lg:mr-[300px] lg:pr-0">
    {loading ? (
       <div className="flex justify-center items-center min-h-[300px]">
       <Spinner size="xl" />
     </div>
    ): error ? (
      <div className="flex justify-center">
            <Alert color="failure">{error}</Alert>
          </div>
    ) : DrawDetails ? (
      <div>
        {DrawDetails?.title && (
          <h1 className="text-2xl md:text-[2.1em] font-bold text-gray-900 mt-5 lg:mr-[85px] text-left w-full">
            {DrawDetails.title}
          </h1>
        )}
  
        <div className="flex flex-row items-center justify-start border-b border-[#00000045] my-2.5 py-2.5">
          <div className="flex items-center">
            <span>Published By -</span>
            <span className="font-medium">VastWay Immigration</span>
            <span className="mx-2">|</span>
            <div className="flex gap-2">
              <button className="h-8 w-8 flex items-center justify-center text-green-600 hover:opacity-80 transition-opacity">
                <FaWhatsapp className="h-5 w-5" />
              </button>
              <button className="h-8 w-8 flex items-center justify-center text-blue-600 hover:opacity-80 transition-opacity">
                <FaFacebook className="h-5 w-5" />
              </button>
              <button className="h-8 w-8 flex items-center justify-center text-blue-400 hover:opacity-80 transition-opacity">
                <FaTwitter className="h-5 w-5" />
              </button>
              <button className="h-8 w-8 flex items-center justify-center text-blue-700 hover:opacity-80 transition-opacity">
                <FaLinkedin className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
  
        <div className="w-full text-base">
        {DrawDetails?.image || DrawDetails?.imageUrl ? (
    <img
      src={
        DrawDetails?.image instanceof File
          ? URL.createObjectURL(DrawDetails.image) 
          : DrawDetails?.imageUrl instanceof File
          ? URL.createObjectURL(DrawDetails.imageUrl) 
          : DrawDetails?.image && DrawDetails.image !== ""
          ? DrawDetails.image
          : DrawDetails?.imageUrl && DrawDetails.imageUrl !== ""
          ? DrawDetails.imageUrl
          : "https://via.placeholder.com/600x400?text=No+Image+Available"
      }
      alt="Express Entry Draw"
      className="w-full rounded-[20px] my-5 object-cover"
    />
  ) : null}


  
          {DrawDetails?.imageCaption && (
            <div className="mb-5">
              <p className="text-sm text-gray-600">{DrawDetails.imageCaption}</p>
            </div>
          )}
  
          <div className="flex flex-col items-center justify-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full lg:w-[75%]">
              {DrawDetails?.invitationsIssued && (
                <div className="flex flex-col items-center justify-center border border-black shadow-md p-4">
                  <div className="text-[1.1em] font-normal mb-1">Invitation Issued</div>
                  <div className="text-[1.2em] font-medium">{DrawDetails.invitationsIssued}</div>
                </div>
              )}
  
              {DrawDetails?.drawDate && (
                <div className="flex flex-col items-center justify-center border border-black shadow-md p-4">
                  <div className="text-[1.1em] font-normal mb-1">Draw Date</div>
                  <div className="text-[1.2em] font-medium">
                    {new Date(DrawDetails.drawDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>
              )}
  
              {DrawDetails?.crsCutoff && (
                <div className="flex flex-col items-center justify-center border border-black shadow-md p-4">
                  <div className="text-[1.1em] font-normal mb-1">CRS Cutoff</div>
                  <div className="text-[1.2em] font-medium">{DrawDetails.crsCutoff}</div>
                </div>
              )}
            </div>
  
            {/* Category and Subcategories */}
            <div className="flex flex-col md:flex-row items-center justify-center border border-black shadow-[4px_4px_20px_rgba(0,0,0,0.2)] p-4 w-full lg:w-[59%] mt-5">
                <div className="text-[1.1em] font-normal md:mr-2">
                  {typeof DrawDetails?.category === "object" && "name" in DrawDetails.category
                    ? DrawDetails.category.name
                    : typeof DrawDetails?.category === "string"
                      ? DrawDetails.category
                      : "Category Not Available"} -
                </div>
                <div className="text-[1.2em] font-medium">
                  {Array.isArray(DrawDetails?.subCategories) && DrawDetails.subCategories.length > 0
                    ? DrawDetails.subCategories.map((sub) => (typeof sub === "string" ? sub : sub.name)).join(", ")
                    : "No Subcategory"}
                </div>
                </div>
  
            {/* Rank Required */}
            {DrawDetails?.rankRequired && (
              <div className="flex flex-col md:flex-row items-center justify-center border border-black shadow-md p-4 w-full lg:w-[59%] mt-5">
                <div className="text-[1.1em] font-normal md:mr-2">Rank Required to be invited to apply -</div>
                <div className="text-[1.2em] font-medium">{DrawDetails.rankRequired}</div>
              </div>
            )}
  
            {/* Tie Breaking Rule */}
            {DrawDetails?.tieBreakingRule && (
              <div className="flex flex-row items-center justify-center border border-black shadow-md p-4 w-full lg:w-[59%] mt-5 whitespace-nowrap overflow-hidden text-ellipsis">
                <div className="text-[1.1em] font-normal md:mr-2">Tie Breaking Rule -</div>
                <div className="text-[1.1em] font-medium overflow-hidden text-ellipsis">
                  {DrawDetails.tieBreakingRule}
                </div>
              </div>
            )}
          </div>
  
          <div className="mt-5 text-[17px]">
            <p>
              If you receive an invitation to apply, you'll be given a <strong>60 days</strong> window to submit your
              application.
            </p>
          </div>

          <section className="mt-16">
              <h2 className="mb-6 text-2xl font-bold">Previous Draws</h2>
              <div className="mb-4">
                <Select value={selectedSubCategory} onChange={(e) => setSelectedSubCategory(e.target.value)}>
                  <option value="all">All SubCategories</option>
                  {Array.from(new Set(relatedDraws.flatMap(draw => draw.subCategories.map(sub => (typeof sub === "string" ? sub : sub.name)))))
                    .map((subName, index) => (
                      <option key={index} value={subName}>{subName}</option>
                    ))}
                </Select>
              </div>
              <div className="rounded-lg border">
                <Table striped>
                  <Table.Head>
                    <Table.HeadCell>Category</Table.HeadCell>
                    <Table.HeadCell>Draw Date</Table.HeadCell>
                    <Table.HeadCell>Invitations (LOA)</Table.HeadCell>
                    <Table.HeadCell>Score</Table.HeadCell>
                    <Table.HeadCell>Notes</Table.HeadCell>
                  </Table.Head>
                  <Table.Body>
                    {filteredDraws.map((draw, index) => (
                      <Table.Row key={index}>
                        <Table.Cell className="font-medium">
                          {draw.subCategories.map(sub => (typeof sub === "string" ? sub : sub.name)).join(", ")}
                        </Table.Cell>
                        <Table.Cell>
                          {new Date(draw.drawDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </Table.Cell>
                        <Table.Cell>{draw.invitationsIssued}</Table.Cell>
                        <Table.Cell>{draw.crsCutoff || "N/A"}</Table.Cell>
                        <Table.Cell>{draw.additionalInfo || "No Notes"}</Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </div>
            </section>
        </div>
      </div>
  ) : (
    <div className="text-center text-gray-600 text-lg">No draw details available.</div>
  )}
    </div>
  </section>
  
  );
}