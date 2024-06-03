import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { fShortenNumber } from 'src/utils/format-number';

import Iconify from 'src/components/iconify';

const backgroundOpacity = "23";
const colors = [
  "#ccd1d3",
  "#ff7f50",
  "#ffd700",
  "#00ff7f",
  "#1e90ff",
];

const cardInnerSpace = 5;
const IconList = ["mdi:idea", "carbon:time-filled", "pepicons-print:people"];

// ----------------------------------------------------------------------
export default function SurveyIndex({
  title,
  subtitle,
  surveyMainImg,
  surveyExplain,
  surveyETA,
  surveyQuestions,
  surveyParticipatedCount,
  currentQuestion,
  setCurrentQuestion,
  ...other
}) {
  return (
    <Card {...other} sx={{ paddingTop: 5 }}>
     

      <Grid container px="7%">
        <Grid item xs={12}>
          <Typography variant="h2" sx={{ px: 5, pt: 3, pb: 1 }}>{title}</Typography>
        </Grid>
        <Grid item xs={12} sx={{ mb: 1 }}>
          <Typography variant="h5" sx={{ px: 5, pb: 1 }}>{subtitle}</Typography>
        </Grid>
        <Grid item xs={12} sx={{ px: 5, pb: 3 }}>
          <Stack direction="row" spacing={3} display="flex" justifyContent="left">
            <Paper
              key="aa"
              variant="outlined"
              value="123"
              sx={{  flexGrow: 1, py: 2.5, mb: 5, mt: 3, textAlign: 'center', borderStyle: 'dashed', backgroundColor: colors[0] + backgroundOpacity }}
            >
              <Stack direction="row" justifyContent="center" display="flex" spacing={cardInnerSpace}>
                <Stack direction="column" justifyContent="center" display="flex">
                  <Typography sx={{ fontSize: 34 }}>{surveyQuestions}</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Questions
                  </Typography>
                </Stack>
                <Stack direction="column" justifyContent="center" display="flex">
                  <Box sx={{ mb: 1 }}>
                    <Iconify icon={IconList[0]} color="black" width={40} />
                  </Box>
                </Stack>
              </Stack>
            </Paper>
            <Paper
              key="aa"
              variant="outlined"
              value="123"
              sx={{ maxWidth: '250px', flexGrow: 1, py: 2.5, mb: 5, mt: 3, textAlign: 'center', borderStyle: 'dashed', backgroundColor: colors[0] + backgroundOpacity }}
            >
              <Stack direction="row" justifyContent="center" display="flex" spacing={cardInnerSpace}>
                <Stack direction="column" justifyContent="center" display="flex">
                  <Typography sx={{ fontSize: 30 }}>{surveyETA} min</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Estimated Time
                  </Typography>
                </Stack>
                <Stack direction="column" justifyContent="center" display="flex">
                  <Box sx={{ mb: 1 }}>
                    <Iconify icon={IconList[1]} color="black" width={40} />
                  </Box>
                </Stack>
              </Stack>
            </Paper>
            <Paper
              key="aa"
              variant="outlined"
              value="123"
              sx={{ maxWidth: '250px', flexGrow: 1, py: 2.5, mb: 5, mt: 3, textAlign: 'center', borderStyle: 'dashed', backgroundColor: colors[0] + backgroundOpacity }}
            >
              <Stack direction="row" justifyContent="center" display="flex" spacing={cardInnerSpace}>
                <Stack direction="column" justifyContent="center" display="flex">
                  <Typography sx={{ fontSize: 34 }}>{fShortenNumber(surveyParticipatedCount)}</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Participated
                  </Typography>
                </Stack>
                <Stack direction="column" justifyContent="center" display="flex">
                  <Box sx={{ mb: 1 }}>
                    <Iconify icon={IconList[2]} color="black" width={40} />
                  </Box>
                </Stack>
              </Stack>
            </Paper>
          </Stack>
        </Grid>
        <Grid item xs={12} sx={{ mb: 6, px: 5 }}>
  <Box
    component="img"
    alt={title}
    src={surveyMainImg}
    sx={{
      objectFit: 'cover',
      width: '30%',
      height: 'auto',
      borderRadius: 2,
      boxShadow: 3,
      float: 'left',
      marginRight: 3,
      marginBottom: 3,
    }}
  />
  <Typography variant="body2" sx={{ fontSize: "20px", color: 'text.secondary', lineHeight: 1.6 }}>
    {surveyExplain}
  </Typography>
</Grid>
        <Grid item xs={12} sx={{ mb: 10 }}>
          <Stack direction="row" justifyContent="center">
            <Button onClick={() => setCurrentQuestion(currentQuestion + 1)} variant="contained" sx={{ width: '80%', height: 40, fontSize: 20, backgroundColor: "black" }}>
              Go To Survey!
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Card>
  );
}

SurveyIndex.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  surveyMainImg: PropTypes.string,
  surveyExplain: PropTypes.string,
  surveyQuestions: PropTypes.number,
  surveyETA: PropTypes.number,
  surveyParticipatedCount: PropTypes.number,
  currentQuestion: PropTypes.number,
  setCurrentQuestion: PropTypes.any.isRequired,
};
