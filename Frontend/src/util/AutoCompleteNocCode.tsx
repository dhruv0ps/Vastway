import { useEffect, useState } from "react";
import { TextInput,  Button } from "flowbite-react";
import { nocCodeAPI } from "../config/apiRoutes/nocCodeRoutes";

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
  const [nocCodes, setNocCodes] = useState<NocCode[]>([]);
  const [filteredNocCodes, setFilteredNocCodes] = useState<NocCode[]>([]);

  useEffect(() => {
    fetchNocCodes();
  }, []);

  useEffect(() => {
    setFilteredNocCodes(
      nocCodes.filter(
        (noc) =>
          noc.nocCode.includes(searchQuery) || noc.classTitle.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, nocCodes]);

  const fetchNocCodes = async () => {
    try {
      const response = await nocCodeAPI.GetAllNocCodes();
      setNocCodes(response.data);
    } catch (error) {
      console.error("Error fetching NOC Codes:", error);
    }
  };

  return (
    <div className="relative">
      <TextInput
        placeholder="Search NOC Code..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full"
      />

      {filteredNocCodes.length > 0 && searchQuery && (
       <div className="absolute bg-white border border-gray-300 shadow-lg rounded-md w-full mt-1 z-10 
       max-h-56 overflow-y-auto custom-scroll">
          {filteredNocCodes.map((noc) => (
            <div
              key={noc._id}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onSelect(noc);
                setSearchQuery("");
              }}
            >
              {noc.nocCode} - {noc.classTitle}
            </div>
          ))}
        </div>
      )}

      {/* Selected NOC Codes */}
      {selectedNocCodes.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {selectedNocCodes.map((noc) => (
            <p key={noc._id} color="info" className="flex items-center">
              {noc.nocCode} - {noc.classTitle}
              <Button
                size="xs"
                className="ml-2"
                color="red"
                onClick={() => onRemove(noc._id)}
              >
                ✕
              </Button>
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default AutoCompleteNocCode;
