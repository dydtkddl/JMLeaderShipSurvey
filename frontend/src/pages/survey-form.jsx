import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

import { Box } from '@mui/material';

import { SurveyForm } from 'src/sections/surveyForm/view';

// ----------------------------------------------------------------------

export default function SurveyFormPage({ surveyname }) {
  return (
    <>
      <Helmet>
        <title> Take Survey </title>
      </Helmet>

      <Box sx={{  mt:2 }}>  {/* Adjust the padding value as needed */}
        <SurveyForm surveyname={surveyname} />
      </Box>
    </>
  );
}

SurveyFormPage.propTypes = {
  surveyname: PropTypes.string
};
