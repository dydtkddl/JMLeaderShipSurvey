import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

// lazy suspense 사용
export const LoginPage = lazy(() => import('src/pages/login'));
export const AdminLoginPage = lazy(() => import('src/pages/admin-login'));
export const SignupPage = lazy(() => import('src/pages/signup'));
export const AdminSignupPage = lazy(() => import('src/pages/admin-signup'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const SurveyPage = lazy(() => import('src/pages/survey-form'));
export const AdminDataDownload = lazy(() => import('src/pages/admin-data-download'));

// export const ResultPage = lazy(() => import('src/pages/survey-result'));
// export const AdminResultPage = lazy(() => import('src/pages/admin-survey-result'));

// ----------------------------------------------------------------------

export default function Router() {
  const isLoggedIn = localStorage.getItem("token") || false
  const isLoggedInadmin = localStorage.getItem("admin") || false
  console.log(isLoggedIn)
  console.log(isLoggedInadmin)
  console.log(window.location.pathname)
  let allowPath = []
  let FLAG = 0
  if (isLoggedInadmin){
    allowPath +=[ "/adminpage","/adminpage/",]
    FLAG ="admin"
  }
  else if (isLoggedIn){
    allowPath +=["/", ""]
    FLAG ="user"
  }
  else {
    allowPath +=[
      '/signin','/signup','/adminsignin','/adminsignup',
      '/signin/','/signup/','/adminsignin/','/adminsignup/',

    ]
    FLAG ="unknown"
  }

  if (FLAG === "admin"){
    if (!allowPath.includes(window.location.pathname) ){
      window.location.href = '/adminpage';
    }
  }else if (FLAG === "user"){
    if (!allowPath.includes(window.location.pathname)){
      window.location.href = '/';
    }
  }else if (FLAG === "unknown"){
    if (!allowPath.includes(window.location.pathname) || window.location.pathname === "/"){
      window.location.href = '/signin';
    }
  }
  const routes = useRoutes([
    {
      element: (
        // 대시보드 레이아웃 여기에 헤더, 네브바 다 있음
        <DashboardLayout>
          <Suspense>
            <Outlet /> 
            {/* 중첩 라우팅해주는 Outlet 함수 */}
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        // 설문조사 라우트
        { path: "/", element: <SurveyPage surveyname = "JMLeadershipEvaluationSurvey" /> },
        // 결과 라우트
        // { path: "Results/JMLeadershipEvaluationSurveyResult", element: <ResultPage surveyname = "JMLeadershipEvaluationSurvey" /> },

      ],
    },
    {
      path: 'signin',
      element: <LoginPage />,
    },
    {
      path: 'adminsignin',
      element: <AdminLoginPage />,
    },
    {
      path: 'adminpage',
      element: <AdminDataDownload />,
    },
    // { path: "adminpage/JMLeadershipEvaluationSurveyResult", element: <AdminResultPage surveyname = "JMLeadershipEvaluationSurvey" /> },
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
  ]);

  return routes;
}
