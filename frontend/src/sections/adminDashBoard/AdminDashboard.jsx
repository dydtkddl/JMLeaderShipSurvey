import axios from 'axios';
import React, { useState, useEffect } from 'react';

import './AdminDashboard.css'; // 스타일을 위한 CSS 파일
import {Button,  Typography } from '@mui/material';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  const [selectedToken, setSelectedToken] = useState(null);
  const token = localStorage.getItem("admin")
  console.log(token)
  useEffect(() => {
      
    const fetchUsers = async () => {
        try {
          const data = {"surveyname" : "JMLeadershipEvaluationSurvey"}; // 필요한 데이터를 여기에 추가
          const headers = {
            // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          };
          const response = await axios.post('http://127.0.0.1:8000/api/AdminUserList/', data, { headers });
          setUsers(response.data);
          console.log(response.data)
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

    fetchUsers(); }, [token]);
    const handleDownload = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/export_survey_responses/", {
        // const response = await fetch("https://jmleadership.pythonanywhere.com/export_survey_responses/", {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
        if (response.ok) {
          console.log("success")
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `survey_results.xlsx`;
          document.body.appendChild(a);
          a.click();
          a.remove();
        } else {
          console.error("Failed to download results");
        }
      } catch (error) {
        console.error("Error downloading results:", error);
      }
    };
  
    const handleLogout = () => {
      localStorage.removeItem("admin");
      window.location.href = "/signin";
    };

  const handleUserClick = (token_) => {
    setSelectedToken(token_);
  };
  return (
    <div className="admin-dashboard">
      {users.length> 0
      // && username !== ""
        ? (
        <>
          <div className="sidebar">
          <Button variant='contained' onClick={handleLogout} sx = {{marginRight : 1}}>Logout</Button>
          <Button
          variant="contained"
          color="primary"
          onClick={handleDownload}
        >
          Download Results
        </Button>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Hi Admin!
          </Typography>
            {users.map((user) => (
              <div key={user.id} className="user-item">
                <h3>{user.name}</h3>
                <p>{user.email}</p>
                  <Button  onClick={() => handleUserClick(user.access_token)}>
                    View Survey 
                  </Button>
              </div>
            ))}
          </div>
          <div className="content">
            {selectedToken ? (
              <iframe
                src={`http://127.0.0.1:8000/view_report/?token=${selectedToken}`}
                title="Survey Result"
                width="100%"
                height="100%"
              />
            ) : (
              <p>Select a user to view their survey results</p>
            )}
          </div>
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default AdminDashboard;