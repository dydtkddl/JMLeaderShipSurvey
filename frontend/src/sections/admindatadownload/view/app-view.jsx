import { useState, useEffect } from 'react';

import {Grid, AppBar, Button,Toolbar,   Typography } from '@mui/material';
// import DownloadIcon from '@mui/icons-material/Download';

// const requestLanguage = "en";

export default function AdminPage() {
  const [username, setUsername] = useState('');
  const token = localStorage.getItem("admin");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await fetch("http://127.0.0.1:8000/get_user_info/", {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
        if (userResponse.ok) {
          const userData = await userResponse.json();
          setUsername(userData.username);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [token]);

  const handleDownload = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/export_survey_responses/", {
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
    window.location.href = "/login";
  };

  return (
    <Grid container spacing={2} style={{ padding: 20 }}>
      <AppBar position="static" sx = {{backgroundColor :"#ffffff00"}}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            {username}
          </Typography>
          <Button variant='contained' onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Grid item xs={12}>
        <Typography variant="h4">Admin Panel</Typography>
        <Typography variant="body1" style={{ margin: '20px 0' }}>
          This section is for admins only. Here, you can manage survey results and download participant data.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          // startIcon={<DownloadIcon />}
          onClick={handleDownload}
        >
          Download Results
        </Button>
      </Grid>
      <Grid item xs={12}>
        {/*  */}
      </Grid>
    </Grid>
  );
}
