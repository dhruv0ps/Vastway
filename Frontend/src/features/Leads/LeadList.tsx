import { useState, useEffect } from "react";
import { Table, Button, TextInput } from "flowbite-react";
import { leadCategoryAPI } from "../../config/apiRoutes/leadRoutes";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaSort } from "react-icons/fa";

interface Lead {
  _id: string;
  name: string;
  phoneNumber: string;
  emailId: string;
  address: string;
  categories: string[];
}

const LeadList: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<keyof Lead | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [leadsPerPage] = useState(5); 

  const navigate = useNavigate();

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await leadCategoryAPI.getAllLeads();
      setLeads(response.data);
    } catch (error) {
      console.error("Failed to fetch leads.");
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (field: keyof Lead) => {
    const newSortOrder = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(newSortOrder);
  };

  const filteredLeads = leads
    .filter((lead) =>
      [lead.name, lead.emailId, lead.phoneNumber]
        .some((field) => field.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      if (!sortField) return 0;
      const aValue = a[sortField].toString().toLowerCase();
      const bValue = b[sortField].toString().toLowerCase();
      return sortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    });

  const totalPages = Math.ceil(filteredLeads.length / leadsPerPage);
  const currentLeads = filteredLeads.slice((currentPage - 1) * leadsPerPage, currentPage * leadsPerPage);

  return (
    <div className="max-w-5xl mx-auto p-6 ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Leads List</h2>
        <Button onClick={() => navigate("/lead-form")} className="bg-primary text-white">+ Add Lead</Button>
      </div>
      <div className="relative mb-4">
        <TextInput
          placeholder="Search by Name, Email, Phone..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full pl-10"
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

   
      <Table striped className="bg-white shadow-md rounded-lg">
        <Table.Head className="bg-primary text-white">
          <Table.HeadCell className="cursor-pointer bg-primary text-white" onClick={() => handleSort("name")}>
            Name <FaSort className="inline ml-1" />
          </Table.HeadCell>
          <Table.HeadCell className="cursor-pointer bg-primary text-white" onClick={() => handleSort("phoneNumber")}>
            Phone <FaSort className="inline ml-1" />
          </Table.HeadCell>
          <Table.HeadCell className="cursor-pointer bg-primary text-white" onClick={() => handleSort("emailId")}>
            Email <FaSort className="inline ml-1" />
          </Table.HeadCell>
          <Table.HeadCell className="bg-primary text-white">Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {currentLeads.map((lead) => (
            <Table.Row key={lead._id} className="hover:bg-gray-100">
              <Table.Cell>{lead.name}</Table.Cell>
              <Table.Cell>{lead.phoneNumber}</Table.Cell>
              <Table.Cell>{lead.emailId}</Table.Cell>
              <Table.Cell>
                <Button size="xs" onClick={() => navigate(`/lead-form/${lead._id}`)} className="bg-primary text-white">Edit</Button>
              </Table.Cell>
            </Table.Row>
          ))}
          {currentLeads.length === 0 && (
            <Table.Row>
              <Table.Cell colSpan={4} className="text-center py-4 text-gray-500">No leads found</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>

      {/* Pagination */}
     <div className="flex justify-between items-center p-4">
                <Button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} className="bg-primary text-white">
                  Previous
                </Button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <Button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)} className="bg-primary text-white">
                  Next
                </Button>
              </div>
    </div>
  );
};

export default LeadList;
