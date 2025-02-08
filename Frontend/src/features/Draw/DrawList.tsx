import type React from "react";
import { useEffect, useState } from "react";
import { drawrAPi } from "../../config/apiRoutes/drawroutes";
import { useNavigate } from "react-router-dom";
import { Table, Spinner, Button, TextInput } from "flowbite-react";
import {  FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

interface Draw {
  _id: string;
  title: string;
  category: { name: string };
  drawDate: string;
  location: string;
  candidates: number;
  tieBreakingRule:string;
  rankRequired:string;
}

const DrawList: React.FC = () => {
  const [draws, setDraws] = useState<Draw[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<keyof Draw | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const navigate = useNavigate();
  const pageSize = 5; // Number of rows per page

  useEffect(() => {
    const fetchDraws = async () => {
      try {
        const response = await drawrAPi.GetDraw();
        setDraws(response.data);
      } catch (error) {
        console.error("Error fetching draws:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDraws();
  }, []);

  const handleEdit = (id: string) => {
    navigate(`/draw/add/${id}`);
  };

  // 🔍 Searching
  const filteredDraws = draws.filter((draw) =>
    draw.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 📊 Sorting Function
  const sortedDraws = [...filteredDraws].sort((a, b) => {
    if (!sortColumn) return 0;

    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    } else if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }
    return 0;
  });

  // 📄 Pagination Logic
  const totalPages = Math.ceil(sortedDraws.length / pageSize);
  const displayedDraws = sortedDraws.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // 📊 Handle Sorting
  const handleSort = (column: keyof Draw) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Draws List</h2>

      {/* 🔍 Search Input */}
      <div className="mb-4 flex justify-between">
        <TextInput
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-1/3"
        />
      </div>

      {draws.length === 0 ? (
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <p className="text-gray-600 text-lg">No draws found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-primary shadow-lg border-gray-50">
          <Table striped hoverable>
            <Table.Head>
              <Table.HeadCell onClick={() => handleSort("title")} className="cursor-pointer bg-primary text-white">
                Title {sortColumn === "title" ? (sortDirection === "asc" ? <FaSortUp /> : <FaSortDown />) : <FaSort />}
              </Table.HeadCell>
              <Table.HeadCell className=" bg-primary text-white">Category</Table.HeadCell>
              <Table.HeadCell onClick={() => handleSort("drawDate")} className="cursor-pointer  bg-primary text-white">
                Date {sortColumn === "drawDate" ? (sortDirection === "asc" ? <FaSortUp /> : <FaSortDown />) : <FaSort />}
              </Table.HeadCell>
              <Table.HeadCell onClick={() => handleSort("location")} className="cursor-pointer  bg-primary text-white">
                Tie BrekingRule 
              </Table.HeadCell>
              <Table.HeadCell onClick={() => handleSort("candidates")} className="cursor-pointer  bg-primary text-white">
              rankRequired
              </Table.HeadCell>
              <Table.HeadCell className=" bg-primary text-white">Actions</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {displayedDraws.map((draw) => (
                <Table.Row key={draw._id} className="bg-white">
                  <Table.Cell className="font-medium text-gray-900">{draw.title}</Table.Cell>
                  <Table.Cell>{draw.category.name}</Table.Cell>
                  <Table.Cell>{new Date(draw.drawDate).toLocaleDateString()}</Table.Cell>
                  <Table.Cell>{draw.tieBreakingRule}</Table.Cell>
                  <Table.Cell>{draw.rankRequired}</Table.Cell>
                  <Table.Cell>
                    <Button color="primary" size="sm" onClick={() => handleEdit(draw._id)}className=" bg-primary text-white" >
                     
                      Edit
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
   {/* Pagination Controls */}
         
        </div>
      )}
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

export default DrawList;

