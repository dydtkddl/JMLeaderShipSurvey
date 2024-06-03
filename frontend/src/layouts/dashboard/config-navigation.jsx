import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics.svg'),
  },
  // {
  //   title: 'Surveys',
  //   path: '/Surveys',
  //   icon: icon('ic_user'),
  // },
  {
    title: 'Results',
    path: '/Results',
    icon: icon('ic_result.png'),
  },
  
 
  
];

export default navConfig;
