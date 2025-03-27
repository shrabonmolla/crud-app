import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function User() {
  const [users, setUsers] = useState([]);

  // Fetch users from the database
  useEffect(() => {
    axios
      .get("http://localhost:5000/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  // Handle delete action
  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:5000/users/${id}`);
        setUsers(users.filter(user => user._id !== id)); // Remove user from state
        alert("User deleted successfully!");
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete user.");
      }
    }
  };

  return (
    <div>
      <Link className="font-medium text-green-600 dark:text-green-500 hover:underline bg-black px-4 py-8 rounded-2xl m-4" to="/create">
        Add item
      </Link>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Color</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Update</th>
              <th className="px-6 py-3">Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b dark:border-gray-700">
                <td className="px-6 py-4">{user.color}</td>
                <td className="px-6 py-4">{user.category}</td>
                <td className="px-6 py-4">{user.price}</td>
                <td className="px-6 py-4">
                  <Link to={`/update/${user._id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    Update
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <button onClick={() => deleteUser(user._id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default User;
