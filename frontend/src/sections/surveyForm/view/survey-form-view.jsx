import axios from "axios"
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import {Box, Grid,Button, Typography,   CircularProgress } from '@mui/material';

import SurveyIndex from "../survey-index";
import SurveySendData from '../survey-send-data';
import AppTrafficBySite from '../survey-form-unit';

// ----------------------------------------------------------------------
const requestLanguage = "en";
export default function SurveyForm({ surveyname }) {
  const initialUserAnswer = {}
  // const [currentQuestion, setCurrentQuestion] = useState(-1); ## 이부분 풀어줘야함
  const [currentQuestion, setCurrentQuestion] = useState(-1);
  const [userAnswer, setUserAnswer] = useState(initialUserAnswer);
  const [responde, setResponse] = useState({});
  const [isloading, setIsloading] = useState(true);
  const [username, setUsername] = useState('');
  const [useremail, setUseremail] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const token = localStorage.getItem("token");
  console.log(isloading)
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.post("https://jmleadership.pythonanywhere.com/api/post/get_user_info/", {}, {
          headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
        if (userResponse.status === 200) {
          const userData = userResponse.data;
          setUsername(userData.username);
          setUseremail(userData.useremail);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
  
    const fetchData = async () => {
      try {
        const response = await fetch("https://jmleadership.pythonanywhere.com/send_to_survey_form/", {
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
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    const checkSurveyCompletion = async () => {
      try {
        const completionResponse = await axios.post("https://jmleadership.pythonanywhere.com/api/post/check_survey_completion", {
          surveyname_: surveyname,
        }, {
          headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
        console.log(completionResponse)
        if (completionResponse.data.completed) {
          setIsCompleted(true);
        }
      } catch (error) {
        console.error("Error checking survey completion:", error);
      }
    };
  
    const fetchAllData = async () => {
      await fetchUserData();
      await fetchData();
      await checkSurveyCompletion();
      setIsloading(false);  // 모든 fetch 작업이 완료된 후 isloading을 false로 설정
    };
  
    fetchAllData();
  }, [token, surveyname, useremail]);
  console.log(userAnswer)
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
            {isCompleted && (
              <Typography variant="body1" color="error">
                Oh, you have already completed the survey. To view the results, click <a href="/report">here</a>.
              </Typography>
            )}
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

          <Button variant = "contained" onClick={handleLogout}>Logout</Button>
          </Box>
          {/* 이부분 풀어줘야함 */}
          <SurveySendData
            questionobjects={responde.data}
            requestLanguage={requestLanguage}
            title={responde.meta.survey_title[requestLanguage]}
            subtitle={responde.meta.survey_subtitle[requestLanguage]}
            currentQuestion={currentQuestion}
            userAnswer={userAnswer}
            surveyname={surveyname}
          useremail = {useremail}

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
