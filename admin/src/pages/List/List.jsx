import React, { useEffect, useState } from "react";
import axios from "axios";
import "./List.css";
import { toast } from "react-toastify";

function List({url}) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null);
  // const url = "http://localhost:4000";





  const fetchList = async () => {
    try {
      console.log("Fetching food list...");
      const response = await axios.get(`${url}/api/food/list`);
      console.log("Response:", response.data);

      if (response.data.success) {
        setList(response.data.data);
      } else {
        throw new Error("Failed to fetch the list");
      }
    } catch (error) {
      setError("Error fetching food list");
      toast.error("Error fetching food list");
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false); // Stop loading after fetch
    }
  };

  const removeFood = async (foodId) => {
    try {
      setLoading(true); // Show loading state during deletion
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
  
      if (response.data.success) {
        toast.success("Food item removed successfully!");
        await fetchList(); // Refresh list after removal
      } else {
        throw new Error("Failed to remove food item");
      }
    } catch (error) {
      toast.error("Error removing food item");
      console.error("Remove Error:", error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };
  


  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {
          list.map((item,index)=>{
            return (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/${item.image}`} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <p onClick={()=>{removeFood(item._id)}} className="list-table-format-remove">X</p>
            </div>

            )
          })
        }
      </div>
    </div>
  );
}

export default List;
