import { Helmet } from 'react-helmet-async';

import { AdminSignupView } from 'src/sections/adminsignup';

// ----------------------------------------------------------------------

export default function SignupPage() {
  return (
    <>
      <Helmet>
        <title> SignUp </title>
      </Helmet>

      <AdminSignupView />
    </>
  );
}
