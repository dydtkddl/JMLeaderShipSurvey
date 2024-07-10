import { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
// import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';


// ----------------------------------------------------------------------

export default function AdminSignupView() {
  const theme = useTheme();



// My Code
const [signupData, setSignupData] = useState({
  userid: '',
  password: '',
});

const changeValue = (e) => {
  const { name, value } = e.target;
  const updatedSignupData = { ...signupData, [name]: value };

  setSignupData(updatedSignupData);
  }

const onSubmit = async (e) => {
  e.preventDefault();

  // Check if any required field is empty
  const requiredFields = ['userid', 'password'];
  const isAnyFieldEmpty = requiredFields.some(field => !signupData[field]);

  if (isAnyFieldEmpty) {
    window.alert("Please fill in all required fields.");
    return;
  }

  // Form data is complete, proceed with submission
  const updatedUserData = { ...signupData };

  try {
    console.log(updatedUserData)
    // const response = await fetch("https://jmleadership.pythonanywhere.com/adminsignup_backend/", {
    const response = await fetch("https://jmleadership.pythonanywhere.com/adminsignup_backend/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedUserData)
    });

    const data = await response.json();
    if (data.message === "EXISTS_ID") {
      console.log(data)
      window.alert("The same ID exists");
    } else if (data.message === "success") {
      window.alert("success");
      window.location.href = "/adminsignin";
    } else {
      console.log("서버오류 : ", response.status);
    }
  } catch (error) {
    console.error('오류:', error);
  }
}
// END



  const renderForm = (
    <>
      <Stack spacing={3}>
     
          <TextField label="ID" name="userid" margin="dense" required fullWidth onChange={changeValue} />
          <TextField
            label="PassWord"
            type="password"
            name="password"
            required
            fullWidth
            onChange={changeValue}
            margin="dense"
          />
          <TextField
            label="Password Confirm"
            type="password"
            name="passwordConfirm"
            required
            fullWidth
            margin="dense"
            onChange={changeValue}
            error={signupData.ispasswordMatch===false}
            helperText={
              signupData.errormessage
            }
          />
      </Stack>

      

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={onSubmit} sx  = {{mt : 3}}
      >
        SignIn
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />


          
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        > 
          <Stack direction="row" spacing={2} alignItems="center" position = "relative">
            <Link href = "signin">
            <Iconify  position = "absolute" sx = {{top : 9}}
              icon="ic:twotone-arrow-back-ios"
            /></Link>
            <Typography variant="h4" sx = {{pl : 2, pb : 5}}>Sign Up</Typography>
          </Stack>
         

          

          {/* <Stack direction="row" spacing={2}>
            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:google-fill" color="#DF3E30" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:facebook-fill" color="#1877F2" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:twitter-fill" color="#1C9CEA" />
            </Button>
          </Stack>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              OR
            </Typography>
          </Divider> */}
          <form>
          {renderForm}
          </form>
        </Card>
      </Stack>
    </Box>
  );
}
