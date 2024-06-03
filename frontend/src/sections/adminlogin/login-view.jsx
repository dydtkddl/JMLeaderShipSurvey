import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
// import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';




// ----------------------------------------------------------------------

export default function AdminLoginView() {
  const theme = useTheme();


  const [showPassword, setShowPassword] = useState(false);

// My Code
  const [signInData, setSignInData] = useState({
    userid: "",
    password:""
  })
  function changeValue(e){
    const copy = {...signInData }
    copy[e.target.name]  = e.target.value
    setSignInData(copy)
  }

  const onsubmit= async(e)=>{
    e.preventDefault();
    console.log(signInData)
    try{
      // const response = await fetch("https://leadershipsurvey.pythonanywhere.com/adminlogin/", {
      const response = await fetch("http://127.0.0.1:8000/adminlogin/", {
        method : "POST",
        headers :{
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(signInData)
      })

    const data = await response.json();
    console.log(data)
    if (data.message === "success") {
      console.log("로그인성공");
      const { token ,name} = data; // Object destructuring
      localStorage.setItem('token', token);
      localStorage.setItem('name', name);
      localStorage.setItem('admin', token);
      window.location.href = "/adminpage"
    } else{
      window.alert("ID or password is incorrect");
      setSignInData({
        userid: "",
        password:""
      })
    }} catch (error) {
      window.alert("not match")
      console.error('오류:', error);
    }
  }
// END



  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField name="userid" label="admin ID" value = {signInData.userid} onChange = {(e) =>(changeValue(e))}
          required />

        <TextField
          value = {signInData.password}
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          onChange = {(e)=>(changeValue(e))}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={onsubmit}
      >
        Login
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
          <Typography variant="h4">ADMIN Sign in</Typography>

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
          </Stack> */}

          {/* <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              OR
            </Typography>
          </Divider> */}

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
