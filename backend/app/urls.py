from django.urls import path
from app.views import *
from django.views.generic import TemplateView

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
urlpatterns = [
    path('signup_backend/', SignUp.as_view()),
    path('login/', SignIn.as_view()),
    path('adminlogin/', AdminSignIn.as_view()),
    path('adminsignup_backend/', AdminSignUp.as_view()),
    path("send_to_survey_form/", send_to_survey_form.as_view()),
    path("save_user_answer/", save_user_answer.as_view()),
    path("result_data_render/", result_data_render.as_view()),
    path("result_data_render_admin/", result_data_render_admin.as_view()),
    path("result_data_render2/", result_data_render.as_view()),
    path("send_feedback/", send_feedback.as_view()),
    path('', TemplateView.as_view(template_name = 'index.html')) ,
    path('404/', TemplateView.as_view(template_name = 'index.html')) ,
    path('signin/', TemplateView.as_view(template_name = 'index.html')) ,
    path('adminsignin/', TemplateView.as_view(template_name = 'index.html')) ,
    path('adminpage/', TemplateView.as_view(template_name = 'index.html')) ,
    path('signup/', TemplateView.as_view(template_name = 'index.html')) ,
    path("adminpage/JMLeadershipEvaluationSurveyResult/" , TemplateView.as_view(template_name = "index.html") ),

    path('Results/JMLeadershipEvaluationSurveyResult/', TemplateView.as_view(template_name = 'index.html')) ,

    path('JMLeadershipEvaluationSurvey/', TemplateView.as_view(template_name = 'index.html')) ,
 path('export_survey_responses/', export_survey_responses, name='export_survey_responses'),
  # path('api/transmit-survey-data/', TransmitSurveyDataApi.as_view(), name='transmit_survey_data'),

]
