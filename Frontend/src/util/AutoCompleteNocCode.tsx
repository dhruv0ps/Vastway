import { useEffect, useState } from "react";
import { TextInput, Button, Modal } from "flowbite-react";
import { nocCodeAPI } from "../config/apiRoutes/nocCodeRoutes";
import { Search } from "lucide-react";

interface NocCode {
  _id: string;
  nocCode: string;
  classTitle: string;
}

interface Props {
  selectedNocCodes: NocCode[];
  onSelect: (noc: NocCode) => void;
  onRemove: (nocId: string) => void;
}

const AutoCompleteNocCode: React.FC<Props> = ({ selectedNocCodes, onSelect, onRemove }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSearchQuery, setSelectedSearchQuery] = useState("");
  const [nocCodes, setNocCodes] = useState<NocCode[]>([]);
  const [filteredNocCodes, setFilteredNocCodes] = useState<NocCode[]>([]);
  const [filteredSelectedCodes, setFilteredSelectedCodes] = useState<NocCode[]>([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetchNocCodes();
  }, []);

  useEffect(() => {
    setFilteredNocCodes(
      nocCodes.filter(
        (noc) =>
          !selectedNocCodes.some(selected => selected._id === noc._id) &&
          (noc.nocCode.toLowerCase().includes(searchQuery.toLowerCase()) || 
           noc.classTitle.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    );
  }, [searchQuery, nocCodes, selectedNocCodes]);

  useEffect(() => {
    setFilteredSelectedCodes(
      selectedNocCodes.filter(
        (noc) =>
          noc.nocCode.toLowerCase().includes(selectedSearchQuery.toLowerCase()) ||
          noc.classTitle.toLowerCase().includes(selectedSearchQuery.toLowerCase())
      )
    );
  }, [selectedSearchQuery, selectedNocCodes]);

  const fetchNocCodes = async () => {
    try {
      const response = await nocCodeAPI.GetAllNocCodes();
      setNocCodes(response.data);
    } catch (error) {
      console.error("Error fetching NOC Codes:", error);
    }
  };

  return (
    <div>
      {/* Button to open Modal */}
      <Button onClick={() => setOpenModal(true)} className="text-white bg-primary mt-2">
        Select NOC Codes
      </Button>

      {/* Modal */}
      <Modal show={openModal} className="w-400"  onClose={() => setOpenModal(false)}>
        <Modal.Header>Select NOC Codes</Modal.Header>
        <Modal.Body>
          <div className="grid grid-cols-2 gap-6">
            {/* Available NOC Codes (Left Side) */}
            <div className="bg-white rounded-lg shadow-lg p-4  overflow-y-auto custom-scroll">
              <h2 className="text-lg font-semibold mb-4">Available NOC Codes</h2>
              <TextInput
                placeholder="Search available codes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={Search}
                className="mb-4"
              />
              <div className="h-64 overflow-y-auto custom-scroll">
                {filteredNocCodes.map((noc) => (
                  <div
                    key={noc._id}
                    className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 transition-colors"
                    onClick={() => {
                      onSelect(noc);
                      setSearchQuery("");
                    }}
                  >
                    <div className="font-medium text-black-900">{noc.nocCode}</div>
                    <div className="text-sm text-black-500">{noc.classTitle}</div>
                  </div>
                ))}
                {filteredNocCodes.length === 0 && (
                  <div className="text-center text-gray-500 py-4">No matching results</div>
                )}
              </div>
            </div>

            {/* Selected NOC Codes (Right Side) */}
            <div className="bg-white rounded-lg shadow-lg p-4">
              <h2 className="text-lg font-semibold mb-4">Selected NOC Codes</h2>
              <TextInput
                placeholder="Search selected codes..."
                value={selectedSearchQuery}
                onChange={(e) => setSelectedSearchQuery(e.target.value)}
                icon={Search}
                className="mb-4"
              />
              <div className="h-64 overflow-y-auto custom-scroll">
                {filteredSelectedCodes.map((noc) => (
                  <div
                    key={noc._id}
                    className="p-3 bg-gray-50 rounded-lg mb-2 group"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                      <div className="font-medium text-black-900">{noc.nocCode}</div>
                      <div className="text-sm text-black-500">{noc.classTitle}</div>
                      </div>
                      <Button
                        size="xs"
                        color="failure"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => onRemove(noc._id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
                {filteredSelectedCodes.length === 0 && (
                  <div className="text-center text-gray-500 py-4">No codes selected</div>
                )}
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setOpenModal(false)} className="text-white bg-primary">
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AutoCompleteNocCode;
