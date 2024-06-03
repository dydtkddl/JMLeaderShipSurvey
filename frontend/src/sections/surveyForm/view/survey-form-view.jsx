import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import {Box, Grid,Button, Typography,   CircularProgress } from '@mui/material';

import SurveyIndex from "../survey-index";
import SurveySendData from '../survey-send-data';
import AppTrafficBySite from '../survey-form-unit';

// ----------------------------------------------------------------------
const personal_structure = {
  "personal_information1": "",
  "personal_information2": "",
  "personal_information3": "",
  "personal_information4": "",
  "personal_information5": "",
  "personal_information6": "",
  "personal_information7": ""
};
const requestLanguage = "en";
export default function SurveyForm({ surveyname }) {
  let initialUserAnswer = {}
  if (surveyname === "PersonalInformationSurvey") {
    initialUserAnswer = personal_structure
  }

  const [currentQuestion, setCurrentQuestion] = useState(-1);
  const [userAnswer, setUserAnswer] = useState(initialUserAnswer);
  const [responde, setResponse] = useState({});
  const [isloading, setIsloading] = useState(true);
  const [username, setUsername] = useState('');
  const token = localStorage.getItem("token");

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

    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/send_to_survey_form/", {
          method: "POST",
          headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ surveyname_: surveyname, language: requestLanguage })
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setResponse(data);
          setIsloading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchUserData();
    fetchData();
  }, [token, surveyname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/signin";
  };

  if (isloading) {
    return (
      <Grid xs={12} md={6} lg={4}>
        <CircularProgress />
      </Grid>
    );
  }

  if (currentQuestion < 0) {
    return (
      <Grid  xs={12} s = {11} md = {10} lg = {8}container direction="column"sx = {{margin :"auto"}}>
          <Grid  >
            <Box sx ={{position :"relative"}}>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              {username}
            </Typography>
            <Button variant = "contained" onClick={handleLogout}>Logout</Button>
            </Box>
            <SurveyIndex
              title={responde.meta.survey_title[requestLanguage]}
              subtitle={responde.meta.survey_subtitle[requestLanguage]}
              surveyExplain={responde.meta.survey_index_description[requestLanguage]}
              surveyQuestions={responde.meta.question_counts}
              surveyETA={responde.meta.survey_ETAmin}
              surveyMainImg={responde.meta.survey_img}
              surveyParticipatedCount={responde.meta.participated_count}
              setCurrentQuestion={setCurrentQuestion}
              currentQuestion={currentQuestion}
            />
          </Grid>
      </Grid>
    );
  }
  if (currentQuestion >= Object.keys(responde.data).length) {
    return (

      <Grid container direction="column">
        <Grid xs={12} lg = {8} sx = {{margin :"auto"}}>
          <Box sx ={{position :"relative"}}>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                  {username}
                </Typography>
          <Button variant = "contained" onClick={handleLogout}>Logout</Button>
          </Box>
          <SurveySendData
            questionobjects={responde.data}
            requestLanguage={requestLanguage}
            title={responde.meta.survey_title[requestLanguage]}
            subtitle={responde.meta.survey_subtitle[requestLanguage]}
            currentQuestion={currentQuestion}
            userAnswer={userAnswer}
            surveyname={surveyname}
          />
        </Grid>
      </Grid>
    );
  }

  return (

    <Grid container direction="column">
      <Grid   sx ={{margin : "auto"}}>
        <Box sx ={{position :"relative"}}>
                  <Typography variant="h6" style={{ flexGrow: 1 }}>
                    {username}
                  </Typography>
            <Button variant = "contained" onClick={handleLogout}>Logout</Button>
        </Box>
        <AppTrafficBySite
          questionobjects={responde.data}
          requestLanguage={requestLanguage}
          title={responde.meta.survey_title[requestLanguage]}
          subtitle={responde.meta.survey_subtitle[requestLanguage]}
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
          setUserAnswer={setUserAnswer}
          userAnswer={userAnswer}
          surveyname={surveyname}
        />
      </Grid>
    </Grid>
  );
}

SurveyForm.propTypes = {
  surveyname: PropTypes.string
};
