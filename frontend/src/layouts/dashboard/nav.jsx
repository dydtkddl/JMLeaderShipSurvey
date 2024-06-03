import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
// import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { alpha } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';

import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useResponsive } from 'src/hooks/use-responsive';

import { account } from 'src/_mock/account';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import { NAV } from './config-layout';

// ----------------------------------------------------------------------
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
export default function Nav({ openNav, onCloseNav }) {
  const pathname = usePathname();
  const [feedbacktext , setFeedbacktext] = useState("")
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const upLg = useResponsive('up', 'lg');
  const signOut =()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    window.location.href = "/signin"
  }
  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
  const sendFeedback = async (e) => {
    e.preventDefault();
  const token = localStorage.getItem("token")

    try {
      const response = await fetch("https://leadershipsurvey.pythonanywhere.com/send_feedback/", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({"feedback":feedbacktext})
      });
  
      const data = await response.json();
     if (data.message === "success") {
        window.alert("success");
        setOpen(false)
      } else {
        console.log("서버오류 : ", response.status);
      }
    } catch (error) {
      console.error('오류:', error);
    }
  }
  const renderAccount = (
    <Box
      sx={{
        my: 3,
        mx: 2.5,
        py: 2,
        px: 2.5,
        display: 'flex',
        borderRadius: 1.5,
        alignItems: 'center',
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
      }}position = "relative"
    >
      <Avatar src={account.photoURL} alt="photoURL" />

      <Box sx={{ ml: 2 }} >
        <Typography variant="subtitle2">{localStorage.getItem("name")}</Typography>
        
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {account.role}
        </Typography>
      </Box>
      <Iconify  onClick = {signOut} position = "absolute" icon ="uis:signout" right = "10px" top = "20px" width = {30}/>
    </Box>
  );

  // const renderMenu = (
  //   <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
  //     {navConfig.map((item) => (
  //       <NavItem key={item.title} item={item} />
  //     ))}
  //   </Stack>
  // );

  const renderUpgrade = (
    <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
      <Stack alignItems="center" spacing={3} sx={{ pt: 5, borderRadius: 2, position: 'relative' }}>
        <Box
          component="img"
          src="/assets/images/feedback1.png"
          sx={{ width: 100, position: 'absolute', top: -50 }}
        />

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6">Got feedback? Let us know!</Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
          Have a suggestion to improve our website? Share it with us!
          </Typography>
        </Box>

        <Button
          onClick={handleOpen}
          variant="contained"
          color="inherit"
        >
          Send Feedback
        </Button>
      </Stack>
    </Box>
  );

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Logo sx={{ mt: 3, ml: 4 }} />

      {renderAccount}

      {/* {renderMenu} */}

      <Box sx={{ flexGrow: 1 }} />

      {renderUpgrade}
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.WIDTH,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            FeedBack Form
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} gutterBottom>  
          We would appreciate it if you could leave your comments about our site
          </Typography>
      <TextField rows     = {14} multiline placeholder="Comments" fullWidth value = {feedbacktext} onChange = {(e) =>(setFeedbacktext(e.target.value))}/>
          <Button variant = "contained" onClick = {sendFeedback}> Submit Feedback</Button>
        </Box>
      </Modal>
    </Box>
    
  );
}

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

// ----------------------------------------------------------------------

function NavItem({ item }) {
  const pathname = usePathname();

  const active = item.path === pathname;

  return (
    <ListItemButton
      component={RouterLink}
      href={item.path}
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: 'body2',
        color: 'text.secondary',
        textTransform: 'capitalize',
        fontWeight: 'fontWeightMedium',
        ...(active && {
          color: 'primary.main',
          fontWeight: 'fontWeightSemiBold',
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          '&:hover': {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
          },
        }),
      }}
    >
      <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
        {item.icon}
      </Box>

      <Box component="span">{item.title} </Box>
    </ListItemButton>

  );
}

NavItem.propTypes = {
  item: PropTypes.object,
};
