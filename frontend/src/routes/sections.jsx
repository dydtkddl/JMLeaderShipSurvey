import { lazy, Suspense, useEffect } from 'react';
import { Outlet, Navigate, useRoutes, useLocation   } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

// lazy suspense 사용
export const LoginPage = lazy(() => import('src/pages/login'));
export const AdminLoginPage = lazy(() => import('src/pages/admin-login'));
export const SignupPage = lazy(() => import('src/pages/signup'));
export const AdminSignupPage = lazy(() => import('src/pages/admin-signup'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const SurveyPage = lazy(() => import('src/pages/survey-form'));
export const AdminDataDownload = lazy(() => import('src/pages/admin-data-download'));
export const SurveyReport = lazy(() => import('src/pages/survey_report'));
export const AdminDashboard = lazy(() => import('src/pages/admin-dashboard'));

export default function Router() {
  const location = useLocation();

  useEffect(() => {
    // const query = new URLSearchParams(location.search);
    // const temporalToken = query.get('token');
    
    const isLoggedIn = localStorage.getItem("token") || false;
    const isLoggedInadmin = localStorage.getItem("admin") || false;
    console.log(isLoggedIn);
    console.log(isLoggedInadmin);
    console.log(window.location.pathname);
    let allowPath = [];
    let FLAG = 0;
    if (isLoggedInadmin) {
      allowPath += ["/adminpage", "/adminpage/","/view_report/"];
      FLAG = "admin";
    }
    else if (isLoggedIn) {
      allowPath += ["/", "", "/report","/view_report/"];
      FLAG = "user";
    }
    else {
      allowPath += [
        '/signin', '/signup', '/adminsignin', '/adminsignup',
        '/signin/', '/signup/', '/adminsignin/', '/adminsignup/', "/view_report/"
      ];
      FLAG = "unknown";
    }

    if (FLAG === "admin") {
      console.log(1);
      console.log(window.location.pathname === "/");

      if (!allowPath.includes(window.location.pathname) || window.location.pathname === "/") {
        console.log(1);
        window.location.href = '/adminpage';
      }
    } else if (FLAG === "user") {
      console.log(2);
      if (!allowPath.includes(window.location.pathname)) {
        window.location.href = '/';
      }
    } else if (FLAG === "unknown") {
      console.log(3);
      if (!allowPath.includes(window.location.pathname) || window.location.pathname === "/") {
        console.log(window.location.pathname)
        window.location.href = '/signin';
      }
    }
  }, [location]);

  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { path: "/", element: <SurveyPage surveyname="JMLeadershipEvaluationSurvey" /> },
      ],
    },
    {
      path: 'signin',
      element: <LoginPage />,
    },
    {
      path: 'report',
      element: <SurveyReport />,
    },
    {
      path: 'adminsignin',
      element: <AdminLoginPage />,
    },
    {
      path: 'adminpage2',
      element: <AdminDataDownload />,
    },
    {
      path: 'adminpage',
      element: <AdminDashboard />,
    },
    {
      path: 'signup',
      element: <SignupPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
    {
      path: 'view_report',
      element: <SurveyReport to="/404" replace />,
    },

  ]);

  return routes;
}
