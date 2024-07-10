import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

import { Box } from '@mui/material';

import SurveyReport from 'src/sections/surveyReport/components/SurveyReport';

// ----------------------------------------------------------------------

export default function SurveyFormPage({ surveyname }) {
  return (
    <>
      <Helmet>
        <title> Survey Report </title>
      </Helmet>

      <Box sx={{  mt:2 }}>  {/* Adjust the padding value as needed */}
        <SurveyReport surveyname={surveyname} />
      </Box>
    </>
  );
}

SurveyFormPage.propTypes = {
  surveyname: PropTypes.string
};
