import PropTypes from 'prop-types';
import { useState, useEffect  } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link, CircularProgress } from '@mui/material';

import Iconify from 'src/components/iconify';

const questionBoxColor = "#ffffff"
export default function SurveySendData({ 
  currentQuestion 
  ,userAnswer ,
  requestLanguage,
  subtitle,
  questionobjects,
  surveyname,
  title,
  useremail,
  ...other })
  {
    console.log(useremail)
    // const [isloading , setIsloading] = useState(true) 이부분 풀어줘야함
    const [isloading , setIsloading] = useState(false)

     useEffect(() => {
    const token = localStorage.getItem("token")
    const fetchData = async () => {
      console.log(userAnswer)
      try {
        const response = await fetch("https://jmleadership.pythonanywhere.com/save_user_answer/", {
        // const response = await fetch("https://jmleadership.pythonanywhere.com/save_user_answer/", {
          method: "POST",
          headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ surveyname_: surveyname, data : userAnswer })
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setIsloading(false)
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [userAnswer, surveyname]);

  return (



    <Card {...other} sx = {{marginTop : 2, paddingTop : 5}}>
      <Box sx = {{backgroundColor : questionBoxColor,pt : 2,mt : 2,mx : "10%", px : 10,mb : 10,
        border : "3px solid #e9ecec", 
        borderRadius : 2,
        display: "flex",
        minHeight : "400px",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"}} position = "relative" >
          {isloading ? <CircularProgress/> : <>
          <Typography id="modal-modal-description" textAlign="center"sx={{ mt: 2 }} variant = "h4">
            {surveyname}
      <Iconify icon = "el:check" width = {40} sx = {{ml : 3, color : "#01f400 "}}/>
          </Typography>
          <Typography variant='p' textAlign="center">
                Results have been sent to your email at {useremail}
            Please check!
          Thank you for the survey.
            </Typography>
          </>
          }
      <Stack direction="row" justifyContent="center" spacing = {4} sx ={{mt : 1}}>
    <Button  onClick  = {()=>{window.loacation.href = "/"}}sx = {{width : "100%", mb : 5, px : 10}} variant='outlined'>
      <Link href = "/"  sx = {{color : "primary" , py :1, fontWeight : 800, fontSize : "17px"}}>Go Home</Link></Button>
</Stack>
      </Box>
    </Card>
  );
}

SurveySendData.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  userAnswer : PropTypes.array.isRequired,
  requestLanguage : PropTypes.string,
  surveyname : PropTypes.string,
  questionobjects : PropTypes.any.isRequired,
  currentQuestion : PropTypes.number,
  useremail : PropTypes.string
};
