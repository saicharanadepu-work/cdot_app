import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminConsole = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch pending users from backend
  const fetchPendingUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("/api/users/pending", {
        auth: {
          username: "admin@example.com", // change to admin login
          password: "adminpassword",
        },
      });
      setPendingUsers(response.data);
    } catch (err) {
      setError("Error fetching pending users");
    } finally {
      setLoading(false);
    }
  };

  // Approve user with selected role
  const approveUser = async (userId, role) => {
    try {
      await axios.post(
        `/api/users/approve/${userId}?role=${role}`,
        {},
        {
          auth: {
            username: "admin@example.com",
            password: "adminpassword",
          },
        }
      );
      // Refresh list after approval
      fetchPendingUsers();
    } catch (err) {
      setError("Error approving user");
    }
  };

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Admin Console - User Approvals</h1>
      {loading && <p>Loading users...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && pendingUsers.length === 0 && <p>No pending users found.</p>}
      {!loading && pendingUsers.length > 0 && (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr style={{ borderBottom: "1px solid #ccc" }}>
              <th style={{ padding: "8px", textAlign: "left" }}>Email</th>
              <th style={{ padding: "8px", textAlign: "left" }}>Company</th>
              <th style={{ padding: "8px", textAlign: "left" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingUsers.map((user) => (
              <tr
                key={user.id}
                style={{ borderBottom: "1px solid #eee", cursor: "default" }}
              >
                <td style={{ padding: "8px" }}>{user.email}</td>
                <td style={{ padding: "8px" }}>{user.companyName}</td>
                <td style={{ padding: "8px" }}>
                  <button
                    style={{
                      marginRight: "8px",
                      padding: "6px 12px",
                      backgroundColor: "#28a745",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                    onClick={() => approveUser(user.id, "PRIME")}
                  >
                    Approve as Prime
                  </button>
                  <button
                    style={{
                      padding: "6px 12px",
                      backgroundColor: "#007bff",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                    onClick={() => approveUser(user.id, "SUB")}
                  >
                    Approve as Sub
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminConsole;
