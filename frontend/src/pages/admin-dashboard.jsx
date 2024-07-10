import { Helmet } from 'react-helmet-async';

import AdminDashboard  from 'src/sections/adminDashBoard/AdminDashboard';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> admin dashboard</title>
      </Helmet>

      <AdminDashboard />
    </>
  );
}
