import { useEffect, useState } from "react";
import { Table, Button, TextInput, Pagination, Spinner } from "flowbite-react";
import {  FaUpload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { nocCodeAPI } from "../../config/apiRoutes/nocCodeRoutes";
import BulkUploadModal from "../../util/BulkUpload";

interface NocCode {
  _id: string;
  tier: string;
  nocCode: string;
  classTitle: string;
}

const NocCodeList: React.FC = () => {
  const navigate = useNavigate();
  const [nocCodes, setNocCodes] = useState<NocCode[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchNocCodes();
  }, []);

  const fetchNocCodes = async () => {
    try {
      const response = await nocCodeAPI.GetAllNocCodes();
      setNocCodes(response.data);
    } catch (error) {
      console.error("Error fetching NOC Codes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredNocCodes = nocCodes.filter((noc) =>
    noc.nocCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedNocCodes = filteredNocCodes.slice((currentPage - 1) * 10, currentPage * 10);

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">NOC Codes</h2>
        <Button className="bg-primary" onClick={() => navigate("/noccode")}>
          Add NOC Code
        </Button>
      </div>

      {/* Search and Bulk Upload */}
      <div className="flex justify-between mb-4">
        <TextInput placeholder="Search NOC Code..." value={searchQuery} onChange={handleSearch} />
        <Button color="green" className="" onClick={() => setIsModalOpen(true)}>
          <FaUpload className="mr-2" />
          Bulk Upload
        </Button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex justify-center py-10">
          <Spinner size="xl" />
        </div>
      ) : (
        <>
          <Table hoverable striped className="bg-shadow shadow-lg">
          <Table.Head className="bg-primary text-white">
  <Table.HeadCell className="text-white bg-primary">NOC Code</Table.HeadCell>
  <Table.HeadCell className="text-white bg-primary">Tier</Table.HeadCell>
  <Table.HeadCell className="text-white bg-primary">Class Title</Table.HeadCell>
  <Table.HeadCell className="text-white bg-primary">Actions</Table.HeadCell>
</Table.Head>

            <Table.Body>
              {paginatedNocCodes.map((noc) => (
                <Table.Row key={noc._id}>
                  <Table.Cell>{noc?.nocCode}</Table.Cell>
                  <Table.Cell>{noc?.tier}</Table.Cell>
                  <Table.Cell>{noc?.classTitle}</Table.Cell>
                  <Table.Cell>
                    <Button  size="sm" onClick={() => navigate(`/noc-codes/edit/${noc._id}`)} className="bg-primary">
                    
                      Edit
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>

          {/* Pagination */}
          <div className="flex justify-center mt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredNocCodes.length / 10)}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </>
      )}

      {/* Bulk Upload Modal */}
      <BulkUploadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} refreshList={fetchNocCodes} />
    </div>
  );
};

export default NocCodeList;
