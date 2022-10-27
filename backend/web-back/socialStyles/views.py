from cmath import nan
from sqlite3 import Date
import django.db.utils
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
import json
import redis
import os
from .models import User, Result, SocialStyle, Profession, Feature, Relational
import random
import secrets
import time
# Create your views here.

"""
        except Exception as e:
            #redisがうまくいかなかった場合
            print("redis")
            return HttpResponse(status=500)"""


@csrf_exempt
def token(request):
   # print(request['Origin'])
    # print(request.META.get('REMOTE_ADDR'))
    # tokenエンドポイントにおける処理。
    # POST以外はBadRequestとして処理し,POSTの場合はsession_ID,tokenに問題がない場合redisにsessionToken,cheer_IDを保管する.
    if request.method != 'POST':
        return HttpResponse(status=400)
    try:
        res = json.loads(request.body)
    except:
        print("Error json")
        return HttpResponse(status=400)
    # jsonの型確認。不正な場合は400を返す。
    if (("Cheer_ID" not in res) or ("session_ID" not in res) or ("token" not in res)):
        return HttpResponse(status=401)
    elif (((type(res["Cheer_ID"]) != int) or (res["Cheer_ID"] < 0)) or (type(res["session_ID"]) != str) or (type(res["token"]) != str)):
        return HttpResponse(status=400)
    else:
        # Cheer_IDを確認したらdbにUser_IDが存在する場合は取得しredisに保管,ない場合は新規作成してからredisにUser_IDと結びつけて保管。
        try:
            sessiontoken = res["session_ID"] + res["token"]
            userid = User.objects.get(Cheer_ID=res["Cheer_ID"])
            tokendb = redis.Redis(
                host=os.environ["redishost"], port=6379, db=0)
            tokendb.set(sessiontoken, userid.User_ID)
            tokendb.expire(sessiontoken, 3600)
            return HttpResponse(status=200)
        except User.DoesNotExist:
            User.objects.create(Cheer_ID=res["Cheer_ID"])
            print("db")
            userid = User.objects.get(Cheer_ID=res["Cheer_ID"])
            tokendb = redis.Redis(
                host=os.environ["redishost"], port=6379, db=0)
            print(userid)
            tokendb.set(sessiontoken, userid.User_ID)
            tokendb.expire(sessiontoken, 3600)
            return HttpResponse(status=200)


@csrf_exempt
def questions(request):
    print(request)
    print(request.META)
    tokendb = redis.Redis(host=os.environ["redishost"], port=6379, db=0)
    print(request.META['HTTP_ORIGIN'])
    print("environ:"+os.environ['OriginHost'])
    if not (os.environ['OriginHost'] in request.META['HTTP_ORIGIN']):
        return HttpResponse(status=403)
    print("OK,method:"+request.method)
    if request.method == 'OPTIONS':
        response = HttpResponse()
        response['Access-Control-Allow-Origin'] = 'http://localhost:63342'
        response['Access-Control-Allow-Credentials'] = 'true'
        response['Access-Control-Allow-Headers'] = "Content-Type, Accept, X-CSRFToken"
        response['Access-Control-Allow-Methods'] = "POST, OPTIONS"
        print("options")
        return response
    elif request.method == 'POST':
        try:
            res = json.loads(request.body)
        except:
            print("Error json")
            return HttpResponse(status=400)
        print(type(res["session_ID"]))
        print(type(res["token"]))
        if (("session_ID" not in res) or ("token" not in res) or (type(res["session_ID"]) != str) or (type(res["token"]) != str)):
            return HttpResponse(status=400)
        sessiontoken = res["session_ID"]+res["token"]
        user_ID = tokendb.get(sessiontoken)
        if user_ID == None:
            print("None")
            # セッションが切れていた場合はエラーを返す
            return 500
        # セッションの確認が取れた場合質問内容と差し替えたtokenを発行し返す。
        questions = [{"questions": "聞くよりも話すほうが好きだ", "select-type": 2, "pos": "X"}, {"questions": "自分はせっかちなほうだ", "select-type": 2, "pos": "X"},
                     {"questions": "人をまとめるのが得意だ", "select-type": 2, "pos": "X"}, {
            "questions": "相手の目を見て話す方だ", "select-type": 2, "pos": "X"},
            {"questions": "人を動かすことができる", "select-type": 2, "pos": "X"}, {
            "questions": "思ったことがすぐ口から出てしまう方だ", "select-type": 2, "pos": "X"},
            {"questions": "組体操より、かけっこが好きだ", "select-type": 2,
             "pos": "X"}, {"questions": "他人と話すのが好きだ", "select-type": 2, "pos": "X"},
            {"questions": "話し合いでは、みんなの意見を尊重するより自分の意見を主張する方だ", "select-type": 2,
             "pos": "X"}, {"questions": "自分は感情豊かだ", "select-type": 2, "pos": "Y"},
            {"questions": "「元気だね」とよく言われる", "select-type": 2, "pos": "Y"}, {
            "questions": "仕事よりプライベートを大事にしたい", "select-type": 2, "pos": "Y"},
            {"questions": "自分はクールだと言われない", "select-type": 2, "pos": "Y"}, {
            "questions": "自分の気持ちを表すのが得意だ", "select-type": 2, "pos": "Y"},
            {"questions": "自分は陽気な方だと思う", "select-type": 2, "pos": "Y"}, {
            "questions": "データより人の意見を信じる方だ", "select-type": 2, "pos": "Y"},
            {"questions": "自分は感情豊かで涙もろいほうと思う", "select-type": 2, "pos": "Y"}, {"questions": "会話では、抑揚つけて話す方だ", "select-type": 2, "pos": "Y"}]
        howMany = len(questions)

        if howMany <= 20:
            return_questions = json.dumps(
                questions, indent=0, ensure_ascii=False)
        else:
            num = set()
            while len(num) < 20:
                num.add(random.randint(0, howMany))
            return_questions = []
            for i in num:
                return_questions.append(questions[i])
            return_questions = json.dumps(return_questions)
        tokendb.expire(sessiontoken, 3600)
        return HttpResponse(return_questions)


@csrf_exempt
def submit_to_history(request):
    if not (os.environ['OriginHost'] in request.META['HTTP_ORIGIN']):
        return HttpResponse(status=403)
    if request.method == 'OPTIONS':
        response = HttpResponse()
        response['Access-Control-Allow-Origin'] = 'http://localhost'
        response['Access-Control-Allow-Credentials'] = 'true'
        response['Access-Control-Allow-Headers'] = "Content-Type, Accept, X-CSRFToken"
        response['Access-Control-Allow-Methods'] = "POST, OPTIONS"
        print("options")
        return response
    elif request.method == 'POST':
        try:
            res = json.loads(request.body)
            res["X"] = float(res["X"])
            res["Y"] = float(res["Y"])
        except:
            return HttpResponse(status=400)
        if (("X" not in res) or ("Y" not in res) or ("session_ID" not in res) or ("token" not in res)):
            return HttpResponse(status=401)
        elif ((not (0 <= res["X"] <= 100)) or (
                not (0 <= res["Y"] <= 100)) or (type(res["session_ID"]) != str) or (type(res["token"]) != str)):
            return HttpResponse(status=400)
        else:
            sessiontoken = res["session_ID"] + res["token"]
            tokendb = redis.Redis(
                host=os.environ["redishost"], port=6379, db=0)
            userid = tokendb.get(sessiontoken)
            user = User.objects.get(User_ID=userid)
            if userid == None:
                return HttpResponse(status=500)
            now = time.time()

            if res["X"] > 50 and res["Y"] > 50:
                socialStyle = SocialStyle.objects.get(SocialStyle_ID=1)
            elif res["X"] > 50 and res["Y"] < 50:
                socialStyle = SocialStyle.objects.get(SocialStyle_ID=2)
            elif res["X"] < 50 and res["Y"] < 50:
                socialStyle = SocialStyle.objects.get(SocialStyle_ID=3)
            else:
                socialStyle = SocialStyle.objects.get(SocialStyle_ID=4)
            try:
                Result.objects.create(
                    User_ID=user, SocialStyle_ID=socialStyle, X=res["X"], Y=res["Y"], Date=now)
                return HttpResponse(status=200)
            except Exception as e:
                print(e)
                return HttpResponse(status=500)
    else:
        return HttpResponse(status=400)


@csrf_exempt
def getresult(request):
    if not (os.environ['OriginHost'] in request.META['HTTP_ORIGIN']):
        return HttpResponse(status=403)
    if request.method == 'OPTIONS':
        response = HttpResponse()
        response['Access-Control-Allow-Origin'] = 'http://localhost:63342'
        response['Access-Control-Allow-Credentials'] = 'true'
        response['Access-Control-Allow-Headers'] = "Content-Type, Accept, X-CSRFToken"
        response['Access-Control-Allow-Methods'] = "POST, OPTIONS"
        return response
    elif request.method == 'POST':
        try:
            res = json.loads(request.body)
        except:
            return HttpResponse(status=400)
        if (("session_ID" not in res) or ("token" not in res)
                or (type(res["session_ID"]) != str) or (type(res["token"]) != str)):
            return HttpResponse(status=400)
        sessiontoken = res["session_ID"]+res["token"]
        tokendb = redis.Redis(host=os.environ["redishost"], port=6379, db=0)
        userid = tokendb.get(sessiontoken)
        if userid == None:
            return HttpResponse(status=500)
        if "time" in res:
            try:
                result = Result.objects.get(User_ID=userid, Date=res["time"])
                feature = Feature.objects.filter(
                    SocialStyle_ID__exact=result.SocialStyle_ID).all()
                profession = Profession.objects.filter(
                    SocialStyleID__exact=result.SocialStyle_ID).all()
                relation = Relational.objects.filter(
                    MySocialStyle_ID__exact=result.SocialStyle_ID).all()
                socialStyle = SocialStyle.objects.get(
                    SocialStyle_ID__exact=result.SocialStyle_ID)

            except Exception as e:
                print(e)
                return HttpResponse(json.dumps({}))
            response_body = {}
            response_body["Time"] = result.Date
            response_body["X"] = result.X
            response_body["Y"] = result.Y
            response_body["Feature"] = list(
                feature.values_list('Feature_Explanation', flat=True))
            response_body["Profession"] = list(
                profession.values_list('Profession_Name', flat=True))
            response_body["Relational_Description"] = list(
                relation.values_list('Relational_Description', flat=True)
            )
            response_body["Explanation"] = socialStyle.Type_Explanation
            response_body["SocialStyle"] = socialStyle.Type_Name
            res_json = json.dumps(response_body)
            return HttpResponse(res_json)
        else:
            try:
                result = Result.objects.filter(User_ID=userid).all()
                latest = 0
                SocialStyle_ID = 0
                dates = []
                for res in result:

                    if res.Date > latest:
                        latest = res.Date
                        SocialStyle_ID = res.SocialStyle_ID.SocialStyle_ID
                    dates.append(res.Date)
                feature = Feature.objects.filter(
                    SocialStyle_ID__exact=SocialStyle_ID).all()
                profession = Profession.objects.filter(
                    SocialStyleID__exact=SocialStyle_ID).all()
                relation = Relational.objects.filter(
                    MySocialStyle_ID__exact=SocialStyle_ID).all()
                socialStyle = SocialStyle.objects.get(
                    SocialStyle_ID=SocialStyle_ID)
                result = Result.objects.get(
                    Date=latest
                )
            except Exception as e:
                print(e)
                return HttpResponse(json.dumps({}))
            response_body = {}
            response_body["Time"] = result.Date
            response_body["X"] = result.X
            response_body["Y"] = result.Y
            response_body["Feature"] = list(
                feature.values_list('Feature_Explanation', flat=True))
            response_body["Profession"] = list(
                profession.values_list('Profession_Name', flat=True))
            response_body["Relational_Description"] = list(
                relation.values_list('Relational_Description', flat=True)
            )
            response_body["Explanation"] = socialStyle.Type_Explanation
            response_body["SocialStyle"] = socialStyle.Type_Name
            response_body["Previous"] = dates
            res_json = json.dumps(response_body)
            return HttpResponse(res_json)
