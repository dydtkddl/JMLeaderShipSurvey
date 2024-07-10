import { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { alpha, useTheme } from '@mui/material/styles';
// import Button from '@mui/material/Button';
// import Divider from '@mui/material/Divider';
import Radio from '@mui/material/Radio';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import RadioGroup from '@mui/material/RadioGroup';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControlLabel from '@mui/material/FormControlLabel';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

const yyReg = /^(19[0-9][0-9]|20\d{2})$/;
// const dReg = /^([1-9]|0[1-9]|1[0-9]|2[0-9]|3[0-1])$/;
// const mReg = /^(1[0-2]|[1-9]|0[1-9])$/; // 월 검사용 정규식
const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 이메일 검사용 정규식

// ----------------------------------------------------------------------

export default function SignupView() {
  const theme = useTheme();

  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    birthdate_YY: '',
    // birthdate_MM: '',
    // birthdate_DD: '',
    userid: '',
    password: '',
    passwordConfirm: '',
    gender: '',
    ispasswordMatch: true,
    isyearOk: true,
    ismonthOk: true,
    isdayOk: true,
    isEmailOk: true,
    submitokay: false,
    passwordMatchError: '',
    birYearError: '',
    birMonthError: '',
    birDayError: '',
    emailError: ''
  });

  const changeValue = (e) => {
    const { name, value } = e.target;
    const updatedSignupData = { ...signupData, [name]: value };

    if (name === 'email' && !emailReg.test(value)) {
      updatedSignupData.isEmailOk = false;
      updatedSignupData.emailError = "Please enter a valid email address. ex) xxx@google.com";
    } else if (name === 'email') {
      updatedSignupData.isEmailOk = true;
      updatedSignupData.emailError = "";
      updatedSignupData.submitokay = true;
    }

    if (name === 'passwordConfirm') {
      updatedSignupData.submitokay = true;
      updatedSignupData.ispasswordMatch = value === signupData.password;
    }

    if (name.slice(0, -3) === "birthdate") {
      if (name === 'birthdate_YY' && !yyReg.test(value)) {
        updatedSignupData.isyearOk = false;
        updatedSignupData.birYearError = "Please enter the 4-digit year of birth correctly. ex) 2000";
      } else {
        updatedSignupData.isyearOk = true;
        updatedSignupData.birYearError = "";
        updatedSignupData.submitokay = true;
      }

      // if (name === 'birthdate_MM' && !mReg.test(value)) {
      //   updatedSignupData.ismonthOk = false;
      //   updatedSignupData.birMonthError = "태어난 월을 정확하게 입력해주세요";
      // } else {
      //   updatedSignupData.ismonthOk = true;
      //   updatedSignupData.birMonthError = "";
      //   updatedSignupData.submitokay = true;
      // }

      // if (name === 'birthdate_DD' && !dReg.test(value)) {
      //   updatedSignupData.isdayOk = false;
      //   updatedSignupData.birDayError = "태어난 일을 정확하게 입력해주세요";
      // } else {
      //   updatedSignupData.birDayError = "";
      //   updatedSignupData.isdayOk = true;
      //   updatedSignupData.submitokay = true;
      // }
    }
    setSignupData(updatedSignupData);
  };

  const onGenderChange = (e) => {
    const { value } = e.target;
    setSignupData((prevData) => ({ ...prevData, gender: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Check if any required field is empty
    // const requiredFields = ['name', 'email', 'birthdate_YY', 'birthdate_MM', 'birthdate_DD', 'userid', 'password', 'passwordConfirm', 'gender'];
    const requiredFields = ['name', 'email', 'birthdate_YY','userid', 'password', 'passwordConfirm', 'gender'];
    const isAnyFieldEmpty = requiredFields.some(field => !signupData[field]);

    if (isAnyFieldEmpty) {
      window.alert("Please fill in all required fields.");
      return;
    }

    // Form data is complete, proceed with submission
    // const { birthdate_YY, birthdate_MM, birthdate_DD, ...rest } = signupData;
    const { birthdate_YY, ...rest } = signupData;
    // const birthdate = `${birthdate_YY}/${birthdate_MM}/${birthdate_DD}`;
    const birthdate = `${birthdate_YY}`;
    const updatedUserData = { ...rest, birthdate };

    try {
      console.log(updatedUserData)
      // const response = await fetch("https://jmleadership.pythonanywhere.com/signup_backend/", {
      const response = await fetch("http://127.0.0.1:8000/signup_backend/", {
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
        window.location.href = "/signin";
      } else {
        console.log("서버오류 : ", response.status);
      }
    } catch (error) {
      console.error('오류:', error);
    }
  };

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField
          label="Name"
          name="name"
          margin="dense"
          required
          fullWidth
          autoFocus
          onChange={changeValue}
        />
        <TextField
          label="Email"
          name="email"
          margin="dense"
          required
          fullWidth
          onChange={changeValue}
          error={signupData.isEmailOk === false}
          helperText={signupData.emailError}
        />
        <TextField label="ID" name="userid" margin="dense" required fullWidth onChange={changeValue} />
        <TextField
          label="Password"
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
          error={signupData.ispasswordMatch === false}
          helperText={signupData.errormessage}
        />
        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup
          row
          aria-label="gender"
          name="gender"
          value={signupData.gender}
          onChange={onGenderChange}
        >
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
        </RadioGroup>
        <TextField
          label="Birth Year"
          name="birthdate_YY"
          margin="dense"
          required
          fullWidth
          value={signupData.birthdate_YY}
          onChange={changeValue}
          error={signupData.isyearOk === false}
          helperText={signupData.birYearError}
        />
      </Stack>
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={onSubmit}
        sx={{ mt: 3 }}
      >
        Sign Up
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
          <Stack direction="row" spacing={2} alignItems="center" position="relative">
            <Link href="/signin">
              <Iconify
                position="absolute"
                sx={{ top: 9 }}
                icon="ic:twotone-arrow-back-ios"
              />
            </Link>
            <Typography variant="h4" sx={{ pl: 2, pb: 5 }}>Sign Up</Typography>
          </Stack>
          <form>
            {renderForm}
          </form>
        </Card>
      </Stack>
    </Box>
  );
}
