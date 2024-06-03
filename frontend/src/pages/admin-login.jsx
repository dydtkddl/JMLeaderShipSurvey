import { Helmet } from 'react-helmet-async';

import { AdminLoginView } from 'src/sections/adminlogin';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Login </title>
      </Helmet>

      <AdminLoginView />
    </>
  );
}
