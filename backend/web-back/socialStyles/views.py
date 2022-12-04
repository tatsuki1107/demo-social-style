from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json
import redis
import os
from .models import User, Result, SocialStyle, Profession, Feature, Relational,LatestResult
import random
from .apps import feature_dict,profession_dict,relation_dict,social_style_dict,questions
import time
# Create your views here.



@csrf_exempt
def question(request):
    print("db?")
    token_db = redis.Redis(host=os.environ["REDIS_HOST"], port=6379, db=0,password="Soc1@lStyle")
    print("db")
    if not (os.environ['ORIGIN_HOST'] in request.META['HTTP_ORIGIN']):
        print("error")
        return HttpResponse(status=403)


    if request.method == 'OPTIONS':
        response = HttpResponse()
     #   response['Access-Control-Allow-Origin'] = 'http://dev.cheercareer.jp'
        response['Access-Control-Allow-Credentials'] = 'true'
        response['Access-Control-Allow-Headers'] = "Content-Type, Accept, X-CSRFToken"
        response['Access-Control-Allow-Methods'] = "POST, OPTIONS"

        return response
    elif request.method == 'POST':
        try:
            res = json.loads(request.body)
        except:
            return HttpResponse(status=400)
        if (("session_id" not in res) or ("token" not in res) or (type(res["session_id"]) != str) or (type(res["token"]) != str)):
            return HttpResponse(status=400)
        session_token = res["session_id"]+res["token"]
        user_id = token_db.get(session_token)
        if user_id == None:
            # セッションが切れていた場合はエラーを返す
            print("error")
            return 500
        # セッションの確認が取れた場合質問内容と差し替えたtokenを発行し返す。
        how_many = len(questions)

        if how_many <= 20:
            return_questions = json.dumps(
                questions, indent=0, ensure_ascii=False)
        else:
            num = set()
            while len(num) < 20:
                num.add(random.randint(0, how_many))
            return_questions = []
            for i in num:
                return_questions.append(questions[i])
            return_questions = json.dumps(return_questions)
        token_db.expire(session_token, 3600)
        return HttpResponse(return_questions)


@csrf_exempt
def submit_to_history(request):
    if not (os.environ['ORIGIN_HOST'] in request.META['HTTP_ORIGIN']):
        return HttpResponse(status=403)

    if request.method == 'OPTIONS':
        response = HttpResponse()
        response['Access-Control-Allow-Credentials'] = 'true'
        response['Access-Control-Allow-Headers'] = "Content-Type, Accept, X-CSRFToken"
        response['Access-Control-Allow-Methods'] = "POST, OPTIONS"
        return response

    if request.method == 'POST':
        try:
            request_json = json.loads(request.body)
            request_json["X"] = float(request_json["X"])
            request_json["Y"] = float(request_json["Y"])
        except:
            return HttpResponse(status=400)
        if (("X" not in request_json) or ("Y" not in request_json) or ("session_id" not in request_json) or ("token" not in request_json)):
            return HttpResponse(status=401)
        elif ((not (0 <= request_json["X"] <= 100)) or (
                not (0 <= request_json["Y"] <= 100)) or (type(request_json["session_id"]) != str) or (type(request_json["token"]) != str)):
            return HttpResponse(status=400)
        else:
            session_token = request_json["session_id"] + request_json["token"]
            token_db = redis.Redis(
                host=os.environ["REDIS_HOST"], port=6379, db=0,password="Soc1@lStyle")
            user_id = token_db.get(session_token)
            user = User.objects.get(user_id=user_id)
            if user_id == None:
                return HttpResponse(status=500)
            now = time.time()

            if request_json["X"] >= 50 and request_json["Y"] >= 50:
                social_style = SocialStyle.objects.get(social_style_id=1)
            elif request_json["X"] >= 50 and request_json["Y"] <= 50:
                social_style = SocialStyle.objects.get(social_style_id=2)
            elif request_json["X"] <= 50 and request_json["Y"] <= 50:
                social_style = SocialStyle.objects.get(social_style_id=3)
            else:
                social_style = SocialStyle.objects.get(social_style_id=4)
            try:
                Result.objects.create(
                    user_id=user, social_style_id=social_style, x=request_json["X"], y=request_json["Y"], date=now)
            except Exception as e:
                print(e)
                return HttpResponse(status=500)
            try:
                print(user.cheer_id)
                latest_result = LatestResult.objects.get(cheer_id=user.cheer_id)
                latest_result.latest_social_style_id = social_style.social_style_id
                latest_result.save()
                return HttpResponse(status=200)
            except Exception as e:
                print(e)
                LatestResult.objects.create(cheer_id=user.cheer_id,latest_social_style_id=social_style.social_style_id)
                return HttpResponse(status=200)
    else:
        return HttpResponse(status=400)


@csrf_exempt
def getresult(request):
    #print("res")
    if not (os.environ['ORIGIN_HOST'] in request.META['HTTP_ORIGIN']):
        #print("Error")
        return HttpResponse(status=403)

    if request.method == 'OPTIONS':
        response = HttpResponse()
        response['Access-Control-Allow-Credentials'] = 'true'
        response['Access-Control-Allow-Headers'] = "Content-Type, Accept, X-CSRFToken"
        response['Access-Control-Allow-Methods'] = "POST, OPTIONS"
        return response

    elif request.method == 'POST':
        try:
            request_json = json.loads(request.body)
        except:
            return HttpResponse(status=400)
        if (("session_id" not in request_json) or ("token" not in request_json)
                or (type(request_json["session_id"]) != str) or (type(request_json["token"]) != str)):
            return HttpResponse(status=400)
        session_token = request_json["session_id"]+request_json["token"]
        token_db = redis.Redis(host=os.environ["REDIS_HOST"], port=6379, db=0,password="Soc1@lStyle")
        user_id = token_db.get(session_token)
        if user_id == None:
            return HttpResponse(status=500)
        if "time" in request_json:
            try:
                #print("time")
                result = Result.objects.get(user_id=user_id, date=request_json["time"])
                social_style_id = result.social_style_id
                feature = Feature.objects.filter(
                    social_style_id__exact=social_style_id).all()
                profession = Profession.objects.filter(
                    social_style_id__exact=social_style_id).all()
                relation = Relational.objects.filter(
                    my_social_style_id__exact=social_style_id).all()
                social_style = SocialStyle.objects.get(
                    social_style_id=social_style_id.social_style_id)

            except Exception as e:
                #print(e)
                return HttpResponse(json.dumps({}))
            response_body = {}
            response_body["Time"] = result.date
            response_body["X"] = result.x
            response_body["Y"] = result.y
            response_body["Feature"] = list(
                feature.values_list('feature_explanation', flat=True))
            response_body["Profession"] = list(
                profession.values_list('profession_name', flat=True))
            response_body["Relational_Description"] = list(
                relation.values_list('relational_description', flat=True)
            )
            response_body["Explanation"] = social_style.type_explanation
            response_body["SocialStyle"] = social_style.type_name
            response_json = json.dumps(response_body)
            #print(response_json)
            return HttpResponse(response_json)
        else:
            try:
               # print("nontime")
                result = Result.objects.filter(user_id=user_id).all()
                latest = 0
                social_style_id = 0
                dates = []
                for res in result:

                    if res.date > latest:
                        latest = res.date
                        social_style_id = res.social_style_id.social_style_id
                    dates.append(res.date)
                feature = Feature.objects.filter(
                    social_style_id__exact=social_style_id).all()
                profession = Profession.objects.filter(
                    social_style_id__exact=social_style_id).all()
                relation = Relational.objects.filter(
                    my_social_style_id__exact=social_style_id).all()
                social_style = SocialStyle.objects.get(
                    social_style_id=social_style_id)
                #print(relation)
               # print(relation_dict)
                result = Result.objects.get(
                    date=latest
                )
                """print(list(
                relation.values_list('relational_description', flat=True)
            ))"""
            except Exception as e:
                print(e)
                return HttpResponse(json.dumps({}))
            response_body = {}
            response_body["Time"] = result.date
            response_body["X"] = result.x
            response_body["Y"] = result.y
            response_body["Feature"] = list(
                feature.values_list('feature_explanation', flat=True))
            response_body["Profession"] = list(

                profession.values_list('profession_name', flat=True))
            response_body["Relational_Description"] = list(
                relation.values_list('relational_description', flat=True)
            )
            response_body["Explanation"] = social_style.type_explanation
            response_body["SocialStyle"] = social_style.type_name
            response_body["Previous"] = dates
            response_json = json.dumps(response_body,ensure_ascii=False)
            #print(response_json)
            return HttpResponse(response_json)
@csrf_exempt
def token(request):
    # tokenエンドポイントにおける処理。
    # POST以外はBadRequestとして処理し,POSTの場合はsession_ID,tokenに問題がない場合redisにsessionToken,cheer_IDを保管する.
    if request.method == 'OPTIONS':
        response = HttpResponse()

        response['Access-Control-Allow-Credentials'] = 'true'
        response['Access-Control-Allow-Headers'] = "Content-Type, Accept, X-CSRFToken"
        response['Access-Control-Allow-Methods'] = "POST, OPTIONS"
        return response
    elif request.method != 'POST':
        return HttpResponse(status=400)
    try:
        request_json = json.loads(request.body)
        request_json["cheer_id"] = int(request_json["cheer_id"])
    except:
        return HttpResponse(status=400)
    # jsonの型確認。不正な場合は400を返す。
    if (("cheer_id" not in request_json) or ("session_id" not in request_json) or ("token" not in request_json)):
        return HttpResponse(status=401)
    elif (((request_json["cheer_id"] < 0)) or (type(request_json["session_id"]) != str) or (type(request_json["token"]) != str)):
        return HttpResponse(status=400)
    else:
        # Cheer_IDを確認したらdbにUser_IDが存在する場合は取得しredisに保管,ない場合は新規作成してからredisにUser_IDと結びつけて保管。

        session_token = request_json["session_id"] + request_json["token"]
        user_id = User.objects.get_or_create(cheer_id=request_json["cheer_id"])
        user_id = User.objects.get(cheer_id=request_json["cheer_id"]).user_id
        token_db = redis.Redis(
                host=os.environ["REDIS_HOST"], port=6379, db=0,password="Soc1@lStyle")
        token_db.set(session_token, user_id)
        token_db.expire(session_token, 3600)
        return HttpResponse(status=200)
@csrf_exempt
def fetch_user_status(request):
    #json内にcheer_idが存在し、整数値であるかを調べる

    try:
        req = json.loads(request.body)
        req["cheer_id"] = int(req["cheer_id"])
    except:
        return HttpResponse(status=400)
    #cheer_idがdbに存在するか調べる
    try:
        user = User.objects.get(cheer_id=req["cheer_id"])
        #該当のユーザーのデータを集める
        result = Result.objects.filter(user_id=user.user_id).all()
        res_array = []
        for res in result:
            social_style_id = res.social_style_id.social_style_id
            res_dict = {}
            res_dict['date'] = res.date
            social_style = {'social_style_id':social_style_id,'x':res.x,'y':res.y}
            res_dict['social_style'] = social_style
            res_array.append(res_dict)
        return HttpResponse(res_array)
    except User.DoesNotExist:
        return HttpResponse(status=400)
@csrf_exempt
def fetch_results(request):
    try:
        req = json.loads(request.body)
        req['start'] = int(req['start'])
        req['number_of_data'] = int(req['number_of_data'])
    except:
        return HttpResponse(status=400)
    how_much = LatestResult.objects.count()
    results = LatestResult.objects.order_by('cheer_id').all()[req['start']-1:req['start']+req['number_of_data']-1]
    res_results = []
    for x in results:
        print(x)

        res_results.append({"cheer_id":x.cheer_id,"social_style_id":x.latest_social_style_id})
    response = {'data_count':how_much,'results':res_results}

    return HttpResponse(json.dumps(response))

