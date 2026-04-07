import { useState, useEffect } from "react";
import visitorService from "../services/visitorService";
export const useVisitorHistory = () => {
  const [filterDate, setFilterDate] = useState("");
  const [filterName, setFilterName] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const data = await visitorService.getVisitHistory({
          name: filterName,
          date: filterDate,
        });
        setData(data);
      } catch (error) {
        console.error("Failed to fetch visit history", error);
      }
    };

    fetchVisitors();
  }, [filterDate, filterName]);

  const tableHeaders = [
    "S.No",
    "Name",
    "Date",
    "Reason",
    "Doctor",
    "Age",
    "Gender",
    "Mobile No",
    "prescription"
  ];

  return {
    filterDate,
    setFilterDate,
    filterName,
    setFilterName,
    data,
    tableHeaders
  };
};