import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css'; // 스타일을 위한 CSS 파일

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedToken, setSelectedToken] = useState(null);

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

    fetchUsers();
  }, []);

  const handleUserClick = (token) => {
    setSelectedToken(token);
  };
  return (
    <div className="admin-dashboard">
      {users.length > 0 ? (
        <>
          <div className="sidebar">
            {users.map((user) => (
              <div key={user.id} className="user-item">
                <h3>{user.name}</h3>
                <p>{user.email}</p>
                  <button  onClick={() => handleUserClick(user.access_token)}>
                    View Survey 
                  </button>
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