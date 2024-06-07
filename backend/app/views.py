from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views import View
from rest_framework import generics
from rest_framework.response import Response
from django.forms.models import model_to_dict
from rest_framework.permissions import IsAdminUser
from rest_framework.views import APIView
from django.db.models import F, ExpressionWrapper, DurationField
from rest_framework import status
from .models import Question, Response  as res,User,Survey, CompletedSurvey,FeedBack,Admin
from datetime import datetime as date
from django.core.serializers import serialize
from django.db.models import Q
import re
from .survey_info import SURVAY_BASIS_INFO
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework.views import APIView
from datetime import datetime, timedelta
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
import json
import bcrypt
import jwt
from config.settings import SECRET_KEY
from django.db.models import Count
import pytz
import pandas as pd
## 1. 회원가입
## 2. 로그인
## 3. 로그아웃
## 4. 설문조사 데이터 수신
## 5. 결과 폼 계산 후 전달

## 1. 회원가입
class SignUp(APIView):
    def post(self, request):
        data = json.loads(request.body)
        try:
            if User.objects.filter(userid = data['userid']).exists():
                return JsonResponse({"message" : "EXISTS_ID"}, status=201)
            User.objects.create(
            userid 	 = data['userid'],
            password = bcrypt.hashpw(data["password"].encode("UTF-8"), bcrypt.gensalt()).decode("UTF-8"),
            name=data["name"],
                birthdate=data["birthdate"],
                gender = data["gender"],
                email = data["email"]
            ).save()
            return JsonResponse({"message" : "success"}, status=200)
        except KeyError:
            return JsonResponse({"message" : "INVALID_KEYS"}, status=400)
class AdminSignUp(APIView):
    print(1)
    def post(self, request):
        data = json.loads(request.body)
        print(data)
        try:
            if Admin.objects.filter(adminid = data['userid']).exists():
                return JsonResponse({"message" : "EXISTS_ID"}, status=201)
            Admin.objects.create(
                adminid = data['userid'],
                password = bcrypt.hashpw(data["password"].encode("UTF-8"), bcrypt.gensalt()).decode("UTF-8"),
            ).save()
            return JsonResponse({"message" : "success"}, status=200)
        except KeyError:
            return JsonResponse({"message" : "INVALID_KEYS"}, status=400)

## 2. 로그인
class SignIn(APIView):
    def post(self, request):
        data = json.loads(request.body)
        try:
            if User.objects.filter(userid=data["userid"]).exists():
                user = User.objects.get(userid=data["userid"])
                if bcrypt.checkpw(data['password'].encode('UTF-8'), user.password.encode('UTF-8')):
                    token = jwt.encode({'user' : user.userid}, SECRET_KEY, algorithm='HS256')
                    ## 로그인 성공시
                    return JsonResponse({"message" : "success" , "token" : token, "name" : user.name}, status=200)
                                                                                                                                    ## 이제 토큰을 프론트에서 local storage에 저장하는 코드 작성하면됌
                ## 아이디는 맞는데 비밀번호가 틀린경우
                print(1)
                return JsonResponse({"message" : "ID or password is incorrect"})
            ## 아이디도 틀린경우
            return JsonResponse({"message" : "ID or password is incorrect"})
        ## 뭔가 잘못된경우
        except KeyError:
            return JsonResponse({'message' : "INVALID_KEYS"}, status=400)
class AdminSignIn(APIView):
    def post(self, request):
        data = json.loads(request.body)
        adminid = data['userid']
        password = data['password']
        try:
            adminob = Admin.objects.get(adminid = adminid)
            print(bcrypt.checkpw(password.encode('UTF-8'), adminob.password.encode('UTF-8')))
            print(password.encode('UTF-8'),adminob.password,adminob.password.encode('UTF-8') )
            # user = User.objects.get(userid=data["userid"])
            if bcrypt.checkpw(password.encode('UTF-8'), adminob.password.encode('UTF-8')):
                token = jwt.encode({'admin' : adminob.adminid}, SECRET_KEY, algorithm='HS256')
                        ## 로그인 성공시
                return JsonResponse({"message" : "success" , "token" : token, "name" : adminob.adminid}, status=200)
            else: 
                return JsonResponse({"message" : "fail"}, status=400)
        except:
                return JsonResponse({"message" : "fail"}, status=400)

                

## 3. 설문조사 데이터 수신
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed

class TokenAuthentication(BaseAuthentication):
    def authenticate(self, request):
        token = request.headers.get('Authorization')
        print(1)
        if not token:
            return None
        try:
            # 토큰에서 사용자 정보 추출
            payload = jwt.decode(token.split()[1], SECRET_KEY, algorithms=['HS256'])
            print(payload)
            if ("admin" in payload.keys()):
                user_id = payload["admin"]
            else:
                user_id = payload['user']
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Token expired')
        except jwt.InvalidTokenError:
            raise AuthenticationFailed('Invalid token')
        # 사용자 확인
        try:
            if ("admin" in payload.keys()):
                admin = Admin.objects.get(adminid = user_id)
            else:
                user = User.objects.get(userid=user_id)
        except User.DoesNotExist:
            raise AuthenticationFailed('No such user')
        if ("admin" in payload.keys()):
            return (admin, None)
        return (user, None)
class RecieveData(APIView):
    authentication_classes = [TokenAuthentication]
    def post(self, request):
        data = json.loads(request.body)
        # 1. 유효한 유저가 요청을 보냈는지 확인
        try:
            user = request.user
            userob = User.objects.get(userid = user.userid)
        except:
            return JsonResponse({"error": "User not Founded"}, status=400)
        
        # 2. 해당 서베이가 데이터베이스에 존재하는지부터 확인 (POST 요청을 막보내는 경우 차단)
        survey_name = data.get("survey_name")
        if Survey.objects.filter(survey_name = survey_name).exists():
            if (len(Survey.objects.filter(survey_name = survey_name) )== 1):
                survey = Survey.objects.get(survey_name = survey_name)
                questions = survey.question_set.all()
                responses_to_save = []
                flag = 0
                for key, value in data["data"].items():

                    q = questions.filter(question_code=key)
                    # question이 있는지 확인
                    if len(q) == 1:

                        q= q.first()
                        # 해당 사용자가 해당 질문에 대해서 답한 이력이 있는지 확인 
                        ## 이력이 있으면, flag를 1로 바꾸가
                        if (not res.objects.filter(question = q, user = userob).exists()):
                            responses_to_save.append(res( question=q, value=value,user=userob))
                        else:
                            responses_to_save.append(res( question=q, value=value,user=userob))
                            flag = 1
                    else:
                        # 동일 question이 데이터베이스상에 2개 있으면 에러
                        return JsonResponse({"error": "DataBase Error / Same Question name duplicated. (to backend team : plz modify question name which duplicate one onother)"}, status=400)

                # 모든 데이터가 성공적으로 저장될 수 있는지 확인
                if len(responses_to_save) == len(data["data"]):
                    # 플래그가 1이면, 기존의 설문이력 삭제
                    if (flag == 1 ):
                        for q in questions:
                            try:
                                res.objects.get(user = userob, question = q).delete()
                            except:
                                print("존재 x : 따라서 지울수 없음")
                    # 모든 저장리스트 데이터, 데이터베이스 상에 실제 반영
                    for response in responses_to_save:
                        response.save()
                    return JsonResponse({"success": survey_name}, status=200)
                # request로 넘겨받은 답변 데이터 개수와, 저장할 수 있는 데이터개수가 다르면 취소 (atomic process)
                else:
                    print("일부 데이터가 저장되지 않았습니다.")
            return JsonResponse({"error":"error"}, status=400)
        else:
            return JsonResponse({"error": "Survey name x"}, status=400)
## 5. 결과 폼 계산 후 전달
from django.db.models import Avg
class send_result(APIView):
    authentication_classes = [TokenAuthentication]
    def post(self, request):
        data = json.loads(request.body)
        survey_name = data["survey_name"]
        survey = Survey.objects.get(survey_name = survey_name)
        user = request.user
        userob = User.objects.get(userid = user.userid)
        questions = Question.objects.filter(survey = survey)
        resdic = {}
        resalldic = {}
        if (survey_name == "LeadershipSurvey"):
            if (len(questions)!= 0 ):
                for question in questions:
                    resval = res.objects.filter(question = question, user = userob).first()
                    resall = res.objects.filter(question=question).aggregate(Avg('value'))["value__avg"]
                    resdic[question.question_code] = resval.value
                    resalldic[question.question_code] = resall
                data = result_process_LeadershipSurvey(resdic)
                other= result_process_LeadershipSurvey(resalldic)
                data["username"] = userob.name
                data["other"] = other
            return JsonResponse(data, status = 200)
        elif (survey_name == "UN17Goal"):
            questiondetaillist = []
            if (len(questions)!= 0):
                for question in questions:
                    questiondetail = question.question_details
                    questiondetaillist.append(questiondetail)
                    usersval = res.objects.filter(question = question, user = userob)
                    if (len(usersval) == 0):
                        return JsonResponse({"error" : "일부 데이터 손실"}, status  = 400)
                    resval = usersval.first()
                    resall = res.objects.filter(question=question).aggregate(Avg('value'))["value__avg"]
                    resdic[question.question_code] = resval.value
                    resalldic[question.question_code] = resall
                    
                data["username"] = userob.name
                data["userdata"] = resdic 
                data["otherdata"] = resalldic
                data["questiondetail"] = questiondetaillist

            return JsonResponse(data,status = 200)
        elif (survey_name == "InclusiveLeadershipSurvey"):
            questiondetaillist = []
            if (len(questions)!= 0):
                for question in questions:
                    questiondetail = question.question_details
                    questiondetaillist.append(questiondetail)
                    usersval = res.objects.filter(question = question, user = userob)
                    if (len(usersval) == 0):
                        return JsonResponse({"error" : "일부 데이터 손실"}, status  = 400)
                    resval = usersval.first()
                    resall = res.objects.filter(question=question).aggregate(Avg('value'))["value__avg"]
                    resdic[question.question_code] = resval.value
                    resalldic[question.question_code] = resall
                data = result_process_InclusiveLeadershipSurvey(resdic)
                other= result_process_InclusiveLeadershipSurvey(resalldic)
                data["username"] = userob.name
                data["other"] = other
                data["username"] = userob.name
                data["questiondetail"] = questiondetaillist

            return JsonResponse(data,status = 200)
        elif (survey_name == "JMLeadershipEvaluationSurvey"):
            if (len(questions)!= 0):
                for question in questions:
                    usersval = res.objects.filter(question = question, user = userob)
                    if (len(usersval) == 0):
                        return JsonResponse({"error" : "일부 데이터 손실"}, status  = 400)
                    resval = usersval.first()
                    resall = res.objects.filter(question=question).aggregate(Avg('value'))["value__avg"]
                    resdic[question.question_code] = resval.value
                    resalldic[question.question_code] = resall
                data = result_process_JMLeadershipEvaluationSurvey(resdic)
                other= result_process_JMLeadershipEvaluationSurvey(resalldic)
                keys = data.keys()
                ddddd = {}
                for key in keys:
                    ddddd[key] = {"user" : data[key], "other" : other[key]}
                ddddd["username"] = userob.name
            return JsonResponse(ddddd,status = 200)
        else:
            return JsonResponse({"error":"error"}, status =400)
import random
class send_to_survey_form(APIView):
    authentication_classes = [TokenAuthentication]
    
    def post(self, request):
        user = request.user
        userob = User.objects.get(userid=user.userid)
        data = json.loads(request.body)
        request_surveyname = data["surveyname_"]
        request_language = data["language"]
        survey = Survey.objects.filter(survey_name=request_surveyname)        
        data = {"meta": {}, "data": {}}
        question_fields = Question._meta.fields
        
        if len(survey) == 1:
            survey = survey.first()
            questions = list(Question.objects.filter(survey=survey))
            
            # Shuffle the questions
            random.shuffle(questions)
            
            survey_title = json.loads(survey.survey_title.replace('\r', '').replace('\n', '').strip())
            survey_subtitle = json.loads(survey.survey_subtitle.replace('\r', '').replace('\n', '').strip())
            survey_index_description = json.loads(survey.survey_index_description.replace('\r', '').replace('\n', '').strip())
            survey_ETAmin = survey.survey_ETAmin
            survey_img = survey.survey_img
            data["meta"] = {
                "survey_title": survey_title,
                "survey_subtitle": survey_subtitle,
                "survey_index_description": survey_index_description,
                "survey_ETAmin": survey_ETAmin,
                "survey_img": survey_img,
                "participated_count": CompletedSurvey.objects.filter(survey=survey).count(),
                "question_counts": Question.objects.filter(survey=survey).count()
            }

            for question in questions:
                questiondict = model_to_dict(question)
                sd = {}
                try:
                    question_notice = json.loads(questiondict['question_notice'].replace('\r', '').replace('\n', '').strip())
                except:
                    question_notice = {}
                for field in question_fields:
                    field_name = field.name
                    field_value = questiondict.get(field_name)
                    try:
                        field_value = json.loads(field_value.replace('\r', '').replace('\n', '').strip())
                    except:
                        field_value = field_value
                    sd[field_name] = field_value
                data["data"][question.question_code] = sd

            return JsonResponse(data=data, safe=False, status=200)
        else:
            return JsonResponse({"error": "에러"}, status=404)
class save_user_answer(APIView):
    authentication_classes = [TokenAuthentication]
    def post(self, request):
        # try:
        # 서버 기준시 UTC
        user = request.user
        userob = User.objects.get(userid = user.userid)
        data = json.loads(request.body)
        request_surveyname = data["surveyname_"]
        userAnswer = data["data"]
        survey = Survey.objects.get(survey_name = request_surveyname )
        questions = Question.objects.filter(survey = survey)
        responses = []
        if (CompletedSurvey.objects.filter(user= userob, survey = survey).exists()):
            for question in questions:
                qcode = question.question_code
                CompletedSurvey.objects.filter(user = userob, survey = survey).delete()
                res.objects.get(user = userob, question = question).delete()
        for question in questions:
            qcode = question.question_code
            responses.append(res(user = userob, question = question , value = userAnswer[qcode] ))
        res.objects.bulk_create(responses)
        CompletedSurvey(user = userob, survey = survey).save()
        
        return JsonResponse({"success" : "save success!" }, status = 200)
        # except:
        #     return JsonResponse({"error" : "에러"}, status =404)

class result_data_render(APIView):
    authentication_classes = [TokenAuthentication]
    def post(self, request):
        data = json.loads(request.body)
        user = request.user
        userob = User.objects.get(userid = user.userid)
        request_group_info = data["group_info_"]
        senddata = {"user" : {}, "other" : {}, "total" : 0 }
        survey_name = data["surveyname_"]
        # try:
        if survey_name == "PersonalInformationSurvey":
            senddata["user"] = group_calc(request_group_info, userob, survey_name)
        else:
            senddata["user"] = group_calc(request_group_info, userob, survey_name)
            senddata["other"] = group_calc(request_group_info, userob, survey_name, target = "other")
            senddata["total"] = sum([ v for v in senddata["user"].values()])/len(senddata["user"].values())
        return JsonResponse({"senddata" : senddata}, status = 200)
class result_data_render_admin(APIView):
    authentication_classes = [TokenAuthentication]
    def post(self, request):
        data = json.loads(request.body)
        print(data)
        request_group_info = data["group_info_"]
        senddata = {"data" : {} }
        survey_name = data["surveyname_"]
        if (survey_name == "UN17Goal"):
            dic , dd = group_calc_admin(request_group_info, survey_name)
            senddata["data"] = dic 
            senddata["subtitles"] = dd
        else:
            senddata["data"] = group_calc_admin(request_group_info, survey_name)
        print(senddata)
        return JsonResponse({"senddata" : senddata}, status = 200)
class result_data_render2(APIView):
    authentication_classes = [TokenAuthentication]
    def post(self, request):
        data = json.loads(request.body)
        request_group_info = data["group_info_"]
        senddata = {"data" : {} }
        survey_name = data["surveyname_"]
        senddata["user"] = group_calc_admin(request_group_info, survey_name)
        print(senddata)
        return JsonResponse({"senddata" : senddata}, status = 200)
class send_feedback(APIView):
    authentication_classes = [TokenAuthentication]
    def post(self, request):
        data = json.loads(request.body)
        user = request.user
        userob = User.objects.get(userid = user.userid)
        feedback = data["feedback"]
        FeedBack(feedback = feedback , user = userob).save()
        return JsonResponse({"message" : "success"}, status = 200)
def group_calc(request_group_info, userob,survey_name,target = "user"):
    dic = {}
    for group_name, q_codes in request_group_info.items():
        sum_ = 0
        if (survey_name == "PersonalInformationSurvey"):
            question = Question.objects.get(question_code = q_codes[0])
            dic[group_name] = res.objects.get(question = question , user = userob).value
        else:
            for q_code in q_codes :
                question = Question.objects.get(question_code = q_code)
                if (target == "user"):
                    response_value = int(res.objects.get(question = question , user = userob).value)
                elif(target == "other"):
                    response_value = res.objects.filter(question = question ).aggregate(Avg('value'))['value__avg']
                sum_+=response_value
            mean_ = sum_/len(q_codes)
            dic[group_name] = mean_ 
    return dic
def group_calc_admin(request_group_info,survey_name):
    dd= {}
    survey = Survey.objects.get(survey_name = survey_name)
    completes = CompletedSurvey.objects.filter(survey = survey)
    user_list = []
    for complete in completes:
        userob = complete.user 
        user_list.append(userob)
    dic = {}
    print(user_list)
    for group_name, q_codes in request_group_info.items():
        user_mean_list = []
        for user in user_list:
            sum_ = 0
            for q_code in q_codes :
                question = Question.objects.get(question_code = q_code)
                resval = res.objects.get(question =question, user = user)
                sum_+=int(resval.value)
            mean_ = sum_/len(q_codes)
            user_mean_list.append(mean_)
        dic[group_name] = user_mean_list
        print(dic[group_name])
        if(survey_name == "UN17Goal"):
            
            dd[group_name]= {"subtitle" : json.loads(question.question_basic.replace('\r', '').replace('\n', '').strip())}
    if(survey_name == "UN17Goal"):
        return dic ,dd
    else:
        return dic
    

def result_process_JMLeadershipEvaluationSurvey(resdic):
    personal_list = ["experiences", 
                     "attribute_of_learning" , 
                     "accessibility",
                     "resiliency",
                     "belief_in_telent",
                     "appearance",
                     "resp_behaviors",
                     "self_evaluation",
                     "habit_of_writting"]
    cummunication_list = ["listening",
                    "communication_envir",
                    "operating_through_communication",
                    "lead_under_policy",]
    decision_list = ["human_resources_management",
                    "conflicts_management",
                    "data_collection",
                    "resonalble_decision_making",
                    "decision_ability",
                    "problem_sol_ability",]
    leadership_list = ["vision",
                    "guiding_skills",
                    "rolemodel",
                    "mannerism",
                    "human_dev",
                    "compassion_for_others",
                    "organizational_management",
                    "project_management",
                    "administration",]
    Ldic = {}
    for key , value in resdic.items():
        q_type = re.sub(r'\d+$', '', key)
        section_key = ""
        if (q_type in personal_list):
            section_key = "Personal attributes and growth mindset"
        elif (q_type in cummunication_list):
            section_key = "Ability of Communication"
        elif (q_type in decision_list):
            section_key = "Ability to grasp, judge, and solve problems "
        elif (q_type in leadership_list):
            section_key = "Leadership Abilities"
        
        if section_key not in Ldic:
            Ldic[section_key] = {}

        if (q_type not in Ldic[section_key]):
            Ldic[section_key][q_type] = {"sum" : float(value), "count" : 1}
        else:
            Ldic[section_key][q_type]["sum"]+=float(value)
            Ldic[section_key][q_type]["count"]+=1
    leadership_mean = {}
    for key, value in Ldic.items():
        if key not in leadership_mean:
            leadership_mean[key] = {}
        for k, v in Ldic[key].items():
            leadership_mean[key][k]= v["sum"]/v["count"]
    return  leadership_mean
    
def result_process_InclusiveLeadershipSurvey(resdic):
    lis = ["openness", "availability" , "accessibility"]
    Ldic = {}
    for key , value in resdic.items():
        q_type = re.sub(r'\d+$', '', key)
        if (q_type in lis):
            if (q_type not in Ldic):
                Ldic[q_type] = {"sum" : float(value), "count" : 1}
            else:
                Ldic[q_type]["sum"]+=float(value)
                Ldic[q_type]["count"]+=1
    leadership_mean = {}
    for key, value in Ldic.items():
        leadership_mean[key] = value["sum"]/value["count"]
    return {"mean_by_sector" :  leadership_mean}
    


def result_process_LeadershipSurvey(resdic):
    leadership_score_self = ""
    lis = ["L_ST"
    ,"L_A"
    ,"L_N"
    ,"L_S"
    ,"L_C"
    ,"L_CT"
    ,"L_SA"
    ,"L_PS"]
    Ldic = {}
    for key,value in resdic.items():
        q_type = re.sub(r'\d+$', '', key)
        if (q_type in lis):
            if (q_type not in Ldic):
                Ldic[q_type] = {"sum" : float(value), "count" : 1}
            else:
                Ldic[q_type]["sum"]+=float(value)
                Ldic[q_type]["count"]+=1
        elif (q_type =="H5" ):
            leadership_score_self = value
    leadership_mean = {}
    for key, value in Ldic.items():
        leadership_mean[key] = value["sum"]/value["count"]
    return { "leadership_score_self" :leadership_score_self, "leadership_mean_by_sector" :  leadership_mean}

## 6. 아이디 유효성
## 7. xxx 님의 result
## 8. 폰으로볼때 result 라이다차트
## 9. 로그인 한사람만 들어갈수 있게 구현 끝까지
## 10. 회원가입 승인되면 로그인페이지로, 승인 오류(중복 등)나면 다이알로그 뜨게

# views.py
import openpyxl
from openpyxl.utils import  get_column_letter
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from io import BytesIO
import pandas as pd
def export_survey_responses(request):
    survey_name = "JMLeadershipEvaluationSurvey"  # Name of the survey
    survey = get_object_or_404(Survey, survey_name=survey_name)

    # Get all questions for the survey
    questions = Question.objects.filter(survey=survey).order_by('id')
    question_codes = [question.question_code for question in questions]

    # Get all users who completed the survey
    completed_surveys = CompletedSurvey.objects.filter(survey=survey)
    users = [completed_survey.user for completed_survey in completed_surveys]

    # Prepare the data for the DataFrame
    data = []

    # Define the mapping dictionary
    response_mapping = {
        "Strongly Disagree": 1,
        "Disagree": 2,
        "Neutral": 3,
        "Agree": 4,
        "Strongly Agree": 5
    }

    for index, user in enumerate(users, start=1):
        user_data = [
            index,               # Index
            user.name,           # Username
            user.userid,         # User ID
            user.gender,         # User Gender
            user.birthdate       # User Birthdate
        ]
        for question_code in question_codes:
            question = Question.objects.get(survey=survey, question_code=question_code)
            response = res.objects.filter(user=user, question=question).first()
            if response:
                mapped_value = response_mapping.get(response.value, response.value)
                user_data.append(mapped_value)
            else:
                user_data.append("")
        data.append(user_data)

    # Create a DataFrame
    columns = ['Index', 'Username', 'User ID', 'Gender', 'BirthYear'] + question_codes
    df = pd.DataFrame(data, columns=columns)
    # Create a BytesIO object to save the Excel file
    output = BytesIO()
    writer = pd.ExcelWriter(output, engine='openpyxl')
    df.to_excel(writer, index=False, sheet_name="Responses")  # Shortened sheet name
    writer.close()
    output.seek(0)

    # Create a response
    response = HttpResponse(
        output,
        content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    )
    response['Content-Disposition'] = f'attachment; filename={survey_name}_responses.xlsx'

    return response