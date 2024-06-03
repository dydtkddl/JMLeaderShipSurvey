import { Helmet } from 'react-helmet-async';

import { AdminPage } from 'src/sections/admindatadownload/view';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> admin data download </title>
      </Helmet>

      <AdminPage />
    </>
  );
}
