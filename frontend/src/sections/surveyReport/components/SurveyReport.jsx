import axios from 'axios';
import { useLocation } from 'react-router-dom';
import React, { useState,useEffect } from 'react';
import {  Row, Col,Container, } from 'react-grid-system';

import { Button } from '@mui/material'; // import Button if not already imported

import './SurveyReport.css';
import Footer from './Footer';
import Divider from './Divider';
import RadarChart from './RadarChart';
import resume from '../image/resume.png';
import profileImg from '../image/profile.png';
import GroupedBarChart from './GroupedBarChart';
import explanations from '../datas/explanation';
import transformresponseUserAnswer,{ scoreGroup,transformAverageData} from '../datas/transformResponseData';
// const PROFILEIMG = "../image/user.png"

// const responseAverageData = {
//   growthMindset: new Array(8).fill(4),
//   communicationAbility: new Array(4).fill(4),
//   humanResourcesManagement: new Array(2).fill(4),
//   decisionMaking: new Array(3).fill(4),
//   problemSolvingAbility: new Array(1).fill(4),
//   leadershipHumanistic: new Array(4).fill(4),
//   leadershipOrganizational: new Array(5).fill(4),
// };

const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.href = "/signin";
};

const goToHome = () => {
  window.location.href = "/home";
};
const SurveyReport = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const temporalToken = query.get('token');
  const [responseUserAnswer, setresponseUserAnswer] = useState(null);
  const [responseUserInfo, setresponseUserInfo] = useState(null);
  const [responseAverageData, setresponseAverageData] = useState(null);
  const [radarAverageData, setradarAverageData] = useState(null);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  
  useEffect(() => {
    const fetchUserAnswer = async () => {
      let response = {}
      try {
        if (temporalToken == null){
          const url = 'https://jmleadership.pythonanywhere.com/api/post/get_user_answer';
          const data = {
            surveyname_: 'JMLeadershipEvaluationSurvey',
          };
          const headers =  {
            'Authorization': `Bearer ${token}`, 
            "Content-Type": "application/json"
          }
          response = await axios.post(url, data, {headers});
        }
        else {
          const url = 'https://jmleadership.pythonanywhere.com/api/post/get_user_answer_temp';
          const data = {
            surveyname_: 'JMLeadershipEvaluationSurvey',
             temporalToken
          };
          const headers =  {
            // 'Authorization': `Bearer ${token}`, 
            "Content-Type": "application/json"
          }
          response = await axios.post(url, data,{headers});

        }
        setresponseUserAnswer(response.data);
      } 
      catch (err) {
        setError(err);
      }
    };
    fetchUserAnswer();
    const fetchAverage = async () => {
      let response = {}
      try {
        if (temporalToken == null){
          const url = 'https://jmleadership.pythonanywhere.com/api/post/get_average_data';
          const data = {
            surveyname_: 'JMLeadershipEvaluationSurvey',
            questionGroups : scoreGroup,
          };
          const headers =  {
            'Authorization': `Bearer ${token}`, 
            "Content-Type": "application/json"
          }
          response = await axios.post(url, data, {headers});
        }else {
          const url = 'https://jmleadership.pythonanywhere.com/api/post/get_average_data_temp';
          const data = {
            surveyname_: 'JMLeadershipEvaluationSurvey',
            questionGroups : scoreGroup,
            temporalToken

          };
          const headers =  {
            // 'Authorization': `Bearer ${token}`, 
            "Content-Type": "application/json"
          }
          response = await axios.post(url, data,{headers});
        }
        const data2 =transformAverageData(response.data)
        setradarAverageData(data2);
        setresponseAverageData(response.data);

      } catch (err) {
        setError(err);
      }
    };
    fetchAverage()
    const fetchUserInfo = async () => {
      let response = {}
      try {
        if (temporalToken == null){
          const url = 'https://jmleadership.pythonanywhere.com/api/post/get_user_info';
          const data = {
            surveyname_: 'JMLeadershipEvaluationSurvey',
          };
          const headers =  {
            'Authorization': `Bearer ${token}`, 
            "Content-Type": "application/json"
          }
          response = await axios.post(url, data, {headers});
        }else {
          const url = 'https://jmleadership.pythonanywhere.com/api/post/get_user_info_temp';
          const data = {
            surveyname_: 'JMLeadershipEvaluationSurvey',
             temporalToken
          };
          const headers =  {
            // 'Authorization': `Bearer ${token}`, 
            "Content-Type": "application/json"
          }
          response = await axios.post(url, data,{headers});
        }

        setresponseUserInfo(response.data);
      } catch (err) {
        setError(err);
      }
    };
    fetchUserInfo();
  }, [token,temporalToken]); 
  console.log(temporalToken)
  if (error && temporalToken == null) {
    return <div>에러 발생: {error.message}</div>;
  }
   if(error && temporalToken === "Not Yet"){
    
    return <div>Not yet participated in the survey.</div>;
  }
   if(error && temporalToken != null ){
    
    return <div>에러 발생: invalid link</div>;
  }

  if (!(responseUserAnswer && responseAverageData&&responseUserInfo)) {
    // setTimeout(1000)
    return <div>로딩 중...</div>;
  }
  const { radarChartData, groupedData } = transformresponseUserAnswer(responseUserAnswer);
  
  console.log(radarAverageData)

  return (
    // Inside the return statement, at the top
<Container className="surveyReport" fluid style={{ padding: '20px', fontFamily: 'Arial' }}>
  <Row>
    <Col>
      <div className="report-header">
      <div className="header-buttons" style={{ textAlign: 'right', marginBottom: '20px' }}>
      {temporalToken == null ? (
          <>
            <Button variant="contained" onClick={goToHome} style={{ marginRight: '10px' }}>Go to Home</Button>
            <Button variant="contained" onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <> </>
        )}
      </div>
        <h1>
          <img 
            src={resume}
            alt="Profile"  
            style={{borderRadius:0,  width: '50px', height: '50px', marginBottom: '10px' }} 
          />    
          Survey Result Report
        </h1>
      </div>
    </Col>
  </Row>
      <Row >
        <Col md={6} style={{ textAlign: 'center', marginTop: 100}}>
          <img 
            src={profileImg}
            alt="Profile"  
            style={{borderRadius:0,  width: '220px', height: '220px', marginBottom: '10px' }} 
          />
          <div>
            <p><strong>{responseUserInfo.username}</strong></p>
            <p>Survey Name: {responseUserInfo.survey_name}</p>
            <p>Survey Date: {responseUserInfo.survey_date}</p>
            <p>Email: {responseUserInfo.useremail}</p>
          </div>
        </Col>
        <Col md={6}>
          <RadarChart data={radarChartData} averageData = {radarAverageData} />
        </Col>
      </Row>
      <Divider width = "100%" />
      <Row>
        <Col>
          <GroupedBarChart 
            data={groupedData.growthMindset} 
            title="Growth Mindset" 
            explanation={explanations.growthMindset}
            averageData={responseAverageData.growthMindset}
          />
        </Col>
      </Row>
      <Divider width="70%" />
      <Row>
        <Col>
          <GroupedBarChart 
            data={groupedData.communicationAbility} 
            title="Communication Ability" 
            explanation={explanations.communicationAbility}
            averageData={responseAverageData.communicationAbility}
          />
        </Col>
      </Row>
      <Divider width="70%" />
      <Row>
        <Col>
          <GroupedBarChart 
            data={groupedData.humanResourcesManagement} 
            title="Human Resources Management" 
            explanation={explanations.humanResourcesManagement}
            averageData={responseAverageData.humanResourcesManagement}
          />
        </Col>
      </Row>
      <Divider width="70%" />
      <Row>
        <Col>
          <GroupedBarChart 
            data={groupedData.decisionMaking} 
            title="Decision-making" 
            explanation={explanations.decisionMaking}
            averageData={responseAverageData.decisionMaking}
          />
        </Col>
      </Row>
      <Divider width="70%" />
      <Row>
        <Col>
          <GroupedBarChart 
            data={groupedData.problemSolvingAbility} 
            title="Problem-solving Ability" 
            explanation={explanations.problemSolvingAbility}
            averageData={responseAverageData.problemSolvingAbility}
          />
        </Col>
      </Row>
      <Divider width="70%" />
      <Row>
        <Col>
          <GroupedBarChart 
            data={groupedData.leadershipHumanistic} 
            title="Leadership - Humanistic (Respect)" 
            explanation={explanations.leadershipHumanistic}
            averageData={responseAverageData.leadershipHumanistic}
          />
        </Col>
      </Row>
      <Divider width="70%" />
      <Row>
        <Col>
          <GroupedBarChart 
            data={groupedData.leadershipOrganizational} 
            title="Leadership - Organizational (Systematic)" 
            explanation={explanations.leadershipOrganizational}
            averageData={responseAverageData.leadershipOrganizational}
          />
        </Col>
      </Row>
      <Footer />
    </Container>
  );
};

export default SurveyReport;