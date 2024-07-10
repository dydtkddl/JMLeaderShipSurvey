import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RadarChart from './RadarChart';
import GroupedBarChart from './GroupedBarChart';
import Divider from './Divider';
import Footer from './Footer';
import explanations from '../datas/explanation';
import transformresponseUserAnswer,{transformAverageData, scoreGroup} from '../datas/transformResponseData';
import { Container, Row, Col } from 'react-grid-system';
import './SurveyReport.css';
import resume from '../image/resume.png';
import profileImg from '../image/profile.png';
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
const SurveyReport = () => {
  const [responseUserAnswer, setresponseUserAnswer] = useState(null);
  const [responseUserInfo, setresponseUserInfo] = useState(null);
  const [responseAverageData, setresponseAverageData] = useState(null);
  const [radarAverageData, setradarAverageData] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchUserAnswer = async () => {
      try {
        const url = 'http://127.0.0.1:8000/api/post/get_user_answer';
        const data = {
          surveyname_: 'JMLeadershipEvaluationSurvey'
        };
        const headers =  {
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiMTIzIn0.8dhQA2rZCyVsONbyODobeur8CWkewVzTxo2QnAzzSYo`, 
          "Content-Type": "application/json"
        }
        const response = await axios.post(url, data, {headers});
        setresponseUserAnswer(response.data);
      } catch (err) {
        setError(err);
      }
    };
    fetchUserAnswer();
    const fetchAverage = async () => {
      try {
        const url = 'http://127.0.0.1:8000/api/post/get_average_data';
        const data = {
          surveyname_: 'JMLeadershipEvaluationSurvey',
          questionGroups : scoreGroup
        };
        const headers =  {
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiMTIzIn0.8dhQA2rZCyVsONbyODobeur8CWkewVzTxo2QnAzzSYo`, 
          "Content-Type": "application/json"
        }
        const response = await axios.post(url, data, {headers});
        const data2 =transformAverageData(response.data)
        setradarAverageData(data2);
        setresponseAverageData(response.data);
      } catch (err) {
        setError(err);
      }
    };
    fetchAverage()
    const fetchUserInfo = async () => {
      try {
        const url = 'http://127.0.0.1:8000/api/post/get_user_info';
        const data = {
          surveyname_: 'JMLeadershipEvaluationSurvey'
        };
        const headers =  {
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiMTIzIn0.8dhQA2rZCyVsONbyODobeur8CWkewVzTxo2QnAzzSYo`, 
          "Content-Type": "application/json"
        }
        const response = await axios.post(url, data, {headers});
        setresponseUserInfo(response.data);
      } catch (err) {
        setError(err);
      }
    };
    fetchUserInfo();
  }, []); 

  if (error) {
    return <div>에러 발생: {error.message}</div>;
  }

  if (!(responseUserAnswer && responseAverageData&&responseUserInfo)) {
    return <div>로딩 중...</div>;
  }
  else {
  const { radarChartData, groupedData } = transformresponseUserAnswer(responseUserAnswer);
  
  console.log(radarAverageData)

  return (
    <Container className = "surveyReport" fluid style={{ padding: '20px', fontFamily: 'Arial' }}>
      <Row>
        <Col>
          <div className="report-header">
            
       
            <h1>   <img 
            src={resume}
            alt="Profile"  
            style={{borderRadius:0,  width: '50px', height: '50px', marginBottom: '10px' }} 
          />    Survey Result Report</h1>
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
            <p><strong>{responseUserInfo["username"]}</strong></p>
            <p>Survey Name: {responseUserInfo["survey_name"]}</p>
            <p>Survey Date: {responseUserInfo["survey_date"]}</p>
            <p>Email: {responseUserInfo["useremail"]}</p>
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
}};

export default SurveyReport;