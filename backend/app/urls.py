from django.urls import path, re_path
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
    path('view_report/', TemplateView.as_view(template_name='index.html')),
    path('api/post/get_user_info', get_user_info.as_view(), name='get_user_info'),
    path("api/post/get_average_data", get_average_data.as_view()),
    path("api/post/get_user_answer", get_user_answer.as_view()),
    path('api/post/get_user_info_temp', get_user_info_temp.as_view(), name='get_user_info_temp'),
    path("api/post/get_average_data_temp", get_average_data_temp.as_view()),
    path("api/post/get_user_answer_temp", get_user_answer_temp.as_view()),
    path("api/post/check_survey_completion", check_survey_completion.as_view()),
    path('api/AdminUserList/', AdminUserListView.as_view(), name='user_list'),
    # path("result_data_render/", result_data_render.as_view()),
    # path("result_data_render_admin/", result_data_render_admin.as_view()),
    # path("result_data_render2/", result_data_render.as_view()),
    # path("send_feedback/", send_feedback.as_view()),
    path('', TemplateView.as_view(template_name='index.html')),
    path('404/', TemplateView.as_view(template_name='index.html')),
    path('signin/', TemplateView.as_view(template_name='index.html')),
    path('adminsignin/', TemplateView.as_view(template_name='index.html')),
    path('adminsignup/', TemplateView.as_view(template_name='index.html')),
    path('adminpage/', TemplateView.as_view(template_name='index.html')),
    path('signup/', TemplateView.as_view(template_name='index.html')),
    # path("adminpage/JMLeadershipEvaluationSurveyResult/", TemplateView.as_view(template_name="index.html")),
    path('export_survey_responses/', export_survey_responses, name='export_survey_responses'),
    # path('send_email/', send_email, name='send_email'),
    path('ex/', ex, name='ex'),
    # path('Results/JMLeadershipEvaluationSurveyResult/', TemplateView.as_view(template_name='index.html')),
    # path('JMLeadershipEvaluationSurvey/', TemplateView.as_view(template_name='index.html')),
    # path('api/transmit-survey-data/', TransmitSurveyDataApi.as_view(), name='transmit_survey_data'),
    
    # Catch-all pattern to handle all other paths
    re_path(r'^(?:.*)/?$', TemplateView.as_view(template_name='index.html')),
]