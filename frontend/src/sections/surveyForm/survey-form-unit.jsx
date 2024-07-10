import React, { useState } from 'react'; // Import React
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import LinearProgress from '@mui/material/LinearProgress';
import FormControlLabel from '@mui/material/FormControlLabel';

import Iconify from 'src/components/iconify';

import { labeldata } from "../../components/form-labels";

const questionBoxColor = "#ffffff";

export default function AppTrafficBySite({
  currentQuestion,
  setCurrentQuestion,
  setUserAnswer,
  userAnswer,
  questionobjects,
  title,
  requestLanguage,
  subtitle,
  surveyname,
  useremail, 
  ...other
}) {
  const [error, setError] = useState(null);
  const totalQuestions = Object.keys(questionobjects).length;
  const totalPages = Math.ceil(totalQuestions / 10);
  const currentPage = Math.floor(currentQuestion / 10) + 1;
  const progress = (currentPage / totalPages) * 100;

  const saveAnswer = (questionKey, value) => {
    const newDic = { ...userAnswer };
    newDic[questionKey] = value;
    setUserAnswer(newDic);
  };

  const submitAnswers = () => {
    const unansweredQuestions = [];
    const questionKeys = Object.keys(questionobjects);
    for (let i = currentQuestion; i < currentQuestion + 10 && i < questionKeys.length; i+=1) {
      const questionKey = questionKeys[i];
      if (!userAnswer[questionKey]) {
        unansweredQuestions.push(questionKey);
      }
    }

    if (unansweredQuestions.length > 0) {
      setError("Please answer all questions before proceeding.");
      const firstUnansweredQuestionKey = unansweredQuestions[0];
      const firstUnansweredQuestionIndex = questionKeys.indexOf(firstUnansweredQuestionKey);
      const scrollToElement = document.getElementById(`question-${firstUnansweredQuestionIndex}`);
      if (scrollToElement) {
        scrollToElement.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    setError(null);
    // if (currentQuestion>= totalQuestions) {
    //  console.log(1)
    // } else {
      setCurrentQuestion(currentQuestion + 10);
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    // }
  };

  const renderQuestions = () => {
    const questionKeys = Object.keys(questionobjects);
    const questions = [];
    const startNumber = currentQuestion + 1;

    // Render the header row with day labels only once
    const headerRow = (
      <Grid container spacing={2} key="headerRow">
        <Grid item xs={5}> </Grid>
        {labeldata[questionobjects[questionKeys[0]].question_label].map((day) => (
          <Grid item xs = {7/5} key={day.name} style={{ textAlign: 'center' }}>
            <Typography variant="subtitle1">
              {day.name}
            </Typography>
          </Grid>
        ))}
      </Grid>
    );
    questions.push(headerRow);

    // Render each question with radio buttons
    for (let i = currentQuestion; i < currentQuestion + 10 && i < questionKeys.length; i+= 1) {
      const questionKey = questionKeys[i];
      const currentQ = questionobjects[questionKey];
      const current_value_type = currentQ.question_label;
      const questionNumber = startNumber + i - currentQuestion; // Calculate the question number

      questions.push(
        <Box key={questionKey} id={`question-${i}`} sx={{ mb: 4 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={2}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                {questionNumber}
              </Typography>
            </Grid>
          </Grid>
          {currentQ.question_details[requestLanguage].map((time, index) => (
            <Grid container spacing={2} key={index} alignItems="center">
              <Grid item xs={5}>
                <Typography variant="subtitle1">{time}</Typography>
              </Grid>
              <Grid item xs={7}>
                <RadioGroup
                  row
                  value={userAnswer[questionKey] || ''}
                  onChange={(event) => saveAnswer(questionKey, event.target.value)}
                  style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}
                >
                  {labeldata[current_value_type].map((day) => (
                    <Grid item xs={2} key={day.name} style={{ display: 'flex', justifyContent: 'center' }}>
                      <FormControlLabel
                        control={
                          <Radio
                            value={day.name}
                            sx={{ 
                              transform: 'scale(1.5)', // Increase the size of radio buttons
                              '& .MuiSvgIcon-root': {
                                fontSize: 32, // Make the radio button icon larger
                              },
                            }}
                          />
                        }
                        label=""
                        sx={{ margin: 0 }} // Remove default margin for better alignment
                      />
                    </Grid>
                  ))}
                </RadioGroup>
              </Grid>
            </Grid>
          ))}
        </Box>
      );
    }
    return questions;
  };

  return (
    <Card {...other} sx={{ marginTop: 2, paddingTop: 5 }} >
      <CardHeader
        title={
          <Stack direction="row" spacing={1} alignItems="center">
            <Iconify
              icon="ic:twotone-arrow-back-ios"
              onClick={() => { window.location.reload(); }}
              width={45}
            />
            <Box>
              <Typography variant="h2">{title}</Typography>
            </Box>
          </Stack>
        }
        subheader={subtitle}
        sx={{ px: "10%" }}
      />
      <LinearProgress variant="determinate" value={progress} sx={{ mx: "10%", my: 2 }} />
      <Divider sx={{ borderStyle: 'dashed', my: 1 }} />
      <Box sx={{
        backgroundColor: questionBoxColor, pt: 2, mt: 7, mx: "5%", px: 4, mb: 10, pb: 2,
        border: "3px solid #e9ecec",
        borderRadius: 2,
        display: "flex",
        minHeight: "600px",
        flexDirection: "column",
        alignItems: "space-around",
        justifyContent: "space-between"
      }} position="relative">
        {renderQuestions()}
      </Box>
      {error && (
        <Typography color="error" sx={{ textAlign: 'center', mb: 2 }}>
          {error}
        </Typography>
      )}
      <Stack direction='column' width="100%">
        <Button 
          onClick={submitAnswers} 
          variant="contained" 
          color="primary" 
          sx={{ 
            mx: "auto", 
            mb: 3, 
            width: '200px', 
            height: '60px', 
            fontSize: '20px' 
          }}
        >
          Next
        </Button>
      </Stack>
    </Card>
  );
}

AppTrafficBySite.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  currentQuestion: PropTypes.number.isRequired,
  userAnswer: PropTypes.object.isRequired,
  questionobjects: PropTypes.object.isRequired,
  setCurrentQuestion: PropTypes.func.isRequired,
  setUserAnswer: PropTypes.func.isRequired,
  requestLanguage: PropTypes.string,
  surveyname: PropTypes.string,
  useremail: PropTypes.string,
};
