from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json
import redis
import os
from .models import User, Result, SocialStyle, LatestResult
import random
from .apps import feature_dict, profession_dict, relation_dict, social_style_dict, questions
import time
# Create your views here.
def header_judge(request):
    if not (os.environ['ORIGIN_HOST'] in request.META['HTTP_ORIGIN']):
        return HttpResponse(status=403)
    if request.method == 'OPTIONS':
        response = HttpResponse()
        response['Access-Control-Allow-Credentials'] = 'true'
        response['Access-Control-Allow-Headers'] = "Content-Type, Accept, X-CSRFToken"
        response['Access-Control-Allow-Methods'] = "POST, OPTIONS"
        return response

def check_session(request):
    try:
        request_json = json.loads(request.body)
    except:
        return [HttpResponse(status=400),HttpResponse(status=400)]
    if (("session_id" not in request_json) or ("token" not in request_json)
            or (type(request_json["session_id"]) != str) or (type(request_json["token"]) != str)):
        return [HttpResponse(status=401),HttpResponse(status=401)]
    session_token = request_json["session_id"] + request_json["token"]
    token_db = redis.Redis(host=os.environ["REDIS_HOST"], port=6379, db=0, password="Soc1@lStyle")
    user_id = token_db.get(session_token)
    if user_id == None:
        return [HttpResponse(status=500),HttpResponse(status=500)]
    else:
        return [request_json,user_id]
def generate_result(social_style_id,date,user_id):
    # getresultのレスポンス用jsonを作る関数.
  #  print(social_style_id)
    try:
        result = Result.objects.get(
            date=date,user_id=user_id
        )
    except Exception as e:
    #    print(e)
        return 1
    social_style = social_style_dict[social_style_id]
    response_body = {}
    response_body["Time"] = result.date
    response_body["X"] = result.x
    response_body["Y"] = result.y
    response_body["Feature"] = feature_dict[social_style_id]
    response_body["Profession"] = profession_dict[social_style_id]
    response_body["Relational_Description"] = relation_dict[social_style_id]
    response_body["Explanation"] = social_style["type_explanation"]
    response_body["SocialStyle"] = social_style["type_name"]
    return response_body

@csrf_exempt
def question(request):

    header_judge(request)

    if request.method == 'POST':
        [request_json,user_id] = check_session(request)
        if type(request_json) == HttpResponse:
            return request_json
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
        return HttpResponse(return_questions)


@csrf_exempt
def submit_to_history(request):
    header_judge(request)

    if request.method == 'POST':
        try:
            request_json = json.loads(request.body)
            request_json["X"] = float(request_json["X"])
            request_json["Y"] = float(request_json["Y"])
        except:
            return HttpResponse(status=400)

        if ((not (0 <= request_json["X"] <= 100)) or (
                not (0 <= request_json["Y"] <= 100))):
            return HttpResponse(status=400)
        [request_json,user_id] = check_session(request)
        if (type(request_json) == HttpResponse):
            return request_json
        user = User.objects.get(user_id=user_id)
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
       #     print(e)
            return HttpResponse(status=500)
        try:
            latest_result = LatestResult.objects.get(cheer_id=user.cheer_id)
            latest_result.latest_social_style_id = social_style.social_style_id
            latest_result.save()
            return HttpResponse(status=200)
        except Exception as e:
          #  print(e)
            LatestResult.objects.create(cheer_id=user.cheer_id,latest_social_style_id=social_style.social_style_id)
            return HttpResponse(status=200)
    else:
        return HttpResponse(status=400)


@csrf_exempt
def getresult(request):
    header_judge(request)

    if request.method == 'POST':
        [request_json,user_id] = check_session(request)
        if (type(request_json) == HttpResponse):
            return request_json
        if "time" in request_json:
            try:
                result = Result.objects.get(user_id=user_id, date=request_json["time"])
            except Exception as e:
                return HttpResponse(json.dumps({}))
            social_style_id = result.social_style_id.social_style_id
            response_body = generate_result(social_style_id=social_style_id,date=request_json["time"],user_id=user_id)
            response_json = json.dumps(response_body)
            return HttpResponse(response_json)
        else:
            try:
                result = Result.objects.filter(user_id=user_id).all()
                latest = 0
                social_style_id = 0
                dates = []
                for res in result:
                    if res.date > latest:
                        latest = res.date
                        social_style_id = res.social_style_id.social_style_id
                    dates.append(res.date)
            except:
                return HttpResponse(json.dumps({}))
            if latest == 0:
                return HttpResponse(json.dumps({}))
          #  print(social_style_id)
            response_body = generate_result(social_style_id=social_style_id,date=latest,user_id=user_id)
            if response_body == 1:
                return HttpResponse(status=500)
            response_body["Previous"] = dates
            response_json = json.dumps(response_body, ensure_ascii=False)
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
            res_dict = {'date':res.date,'social_style':{'social_style_id':social_style_id,'x':res.x,'y':res.y}}
            res_array.append(res_dict)
        return HttpResponse(res_array)
    except User.DoesNotExist:
        return HttpResponse(status=400)

@csrf_exempt
def fetch_results(request):
    #/resultsエンドポイントから来たjsonを処理し返す。
    try:
        req = json.loads(request.body)
      #  print(req["ids"])
    except:
        return HttpResponse(status=400)
    results = LatestResult.objects.filter(cheer_id__in=req["ids"]).all()
    res_results = []
    for x in results:
       # print(x)
        res_results.append({"cheer_id":x.cheer_id,"social_style_id":x.latest_social_style_id})
    response = {'results':res_results}

    return HttpResponse(json.dumps(response))

