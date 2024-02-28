import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar.jsx";

function App() {
  const [clients, setClients] = useState([]);
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [project, setProject] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get("http://localhost:5000/get");
      setClients(response.data.data.clientdetails);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  const addNewClient = async () => {
    try {
      await axios.post("http://localhost:5000/add", {
        name,
        lastname,
        email,
        mobile,
        project,
      });
      fetchClients();
      clearFields();
      alert("Client added successfully");
    } catch (error) {
      console.error("Error adding client:", error);
      alert("Failed to add client. Please try again.");
    }
  };

  const updateClient = async () => {
    if (selectedClient === null) return;

    try {
      await axios.put(`http://localhost:5000/update/${selectedClient._id}`, {
        name,
        lastname,
        email,
        mobile,
        project,
      });
      fetchClients();
      clearFields();
      setSelectedClient(null);
      alert("Client updated successfully");
    } catch (error) {
      console.error("Error updating client:", error);
      alert("Failed to update client. Please try again.");
    }
  };

  const deleteClient = async (clientId) => {
    try {
      await axios.delete(`http://localhost:5000/delete/${clientId}`);
      fetchClients();
      alert("Client deleted successfully");
    } catch (error) {
      console.error("Error deleting client:", error);
      alert("Failed to delete client. Please try again.");
    }
  };

  const handleUpdate = (client) => {
    setSelectedClient(client);
    setName(client.name);
    setLastname(client.lastname);
    setEmail(client.email);
    setMobile(client.mobile);
    setProject(client.project);
  };

  const clearFields = () => {
    setName("");
    setLastname("");
    setEmail("");
    setMobile("");
    setProject("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedClient !== null) {
      updateClient();
    } else {
      addNewClient();
    }
  };

  return (
    <>
      <Navbar />
      <div className="main grid grid-cols-2 ">
        <table className="p-2 ">
          <thead>
            <tr className="bg-slate-500 h-14 w-[600px]">
              <th>Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Mobile No.</th>
              <th>Project</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {clients.map((client, index) => (
              <tr key={index} className="bg-gray-100">
                <td>{client.name}</td>
                <td>{client.lastname}</td>
                <td>{client.email}</td>
                <td>{client.mobile}</td>
                <td>{client.project}</td>
                <td>
                  <button
                    onClick={() => handleUpdate(client)}
                    className="text-white bg-blue-700 hover:bg-blue-800   focus:ring-blue-300 font-small rounded-sm text-sm px-1 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Update
                  </button>{" "}
                  <button
                    onClick={() => deleteClient(client._id)}
                    className="text-white bg-red-700 hover:bg-red-800  focus:ring-red-300 font-small rounded-sm text-sm px-1 py-1 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <form className="max-w-sm ml-[20.25rem]" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="lastname"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >
              Last Name
            </label>
            <input
              type="text"
              value={lastname}
              onChange={(e) => {
                setLastname(e.target.value);
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="number"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >
              Mobile NO.
            </label>
            <input
              type="number"
              value={mobile}
              onChange={(e) => {
                setMobile(e.target.value);
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="project"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >
              Project
            </label>
            <input
              type="text"
              value={project}
              onChange={(e) => {
                setProject(e.target.value);
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {selectedClient !== null ? "Update" : "Add Client"}
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
