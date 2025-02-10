import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { leadCategoryAPI } from "../config/apiRoutes/leadRoutes";

interface LeadCategory {
  _id: string;
  name: string;
}

interface AutocompleteLeadCategoryProps {
  onSelect: (category: LeadCategory) => void;
  value: LeadCategory[] | undefined;
  onRemove: (categoryId: string) => void;
}

const AutocompleteLeadCategory: React.FC<AutocompleteLeadCategoryProps> = ({ 
  onSelect, 
  value = [], 
  onRemove 
}) => {
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState<LeadCategory[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<LeadCategory[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await leadCategoryAPI.getAllCategories();
      setCategories(response.data);
      setFilteredCategories(response.data);
    } catch (error) {
      toast.error("Failed to fetch categories.");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setQuery(inputValue);
    setIsOpen(true);
    const filtered = categories.filter((category) =>
      category.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredCategories(filtered);
  };

  const handleSelect = (category: LeadCategory) => {
    onSelect(category); 
    setQuery("");
    setIsOpen(false);
  };

  return (
    <div className="space-y-2">
      <div className="relative" ref={dropdownRef}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          placeholder={categories.length > 0 ? "Search categories" : "No categories found"}
          className="w-full p-2 border rounded"
        />
        {isOpen && filteredCategories.length > 0 && (
          <ul className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg max-h-60 overflow-auto">
            {filteredCategories.map((category) => (
              <li
                key={category._id}
                onClick={() => handleSelect(category)}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                {category.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {/* Selected Categories */}
      <div className="flex flex-wrap gap-2">
        {value?.map((category) => (
          <div 
            key={category._id}
            className="flex items-center gap-2 px-3 py-1 bg-blue-100 rounded-full"
          >
            <span>{category.name}</span>
            <button
              type="button"
              onClick={() => onRemove(category._id)}
              className="text-blue-600 hover:text-blue-800"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutocompleteLeadCategory;