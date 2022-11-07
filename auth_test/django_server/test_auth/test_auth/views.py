from django.shortcuts import redirect
from django.http import HttpResponse,JsonResponse
import requests
import json
import secrets
import os
from django.views.decorators.csrf import csrf_exempt
# Create your views here.
@csrf_exempt
def auth_accounts(request):
    #アカウント作成する場合の関数。Cheer_IDjsonで取得し問題がなければこれでDBに登録する。


    if request.method != "POST" and request.method != "OPTIONS":
        return HttpResponse(status=405)
    elif request.method == "POST":
        print(request.body)
        try:
            #jsonのデコード
            req = json.loads(request.body)
        except json.decoder.JSONDecodeError:
            print("json?")
            return HttpResponse(status=400)
        try:
            #jsonないにおけるcheer_IDの存在確認
            req["Cheer_ID"]
        except:
            return HttpResponse(status=400)
        #session_ID,tokenの作成
        session_ID = secrets.token_hex(6)
        token = secrets.token_hex(10)
        header = {
            'Content-Type': 'application/json'
        }
        try:
            req["Cheer_ID"] = int(req["Cheer_ID"])
        except:
            return HttpResponse(status=400)
        data = {"Cheer_ID": req["Cheer_ID"],"session_ID":session_ID,"token":token}
        print("res")

        for x in range(0,10):
            req = requests.post("http://web-back:8000/api/token",headers=header,json=data)
            if req.status_code == 200:
                print('OK')
                res_data = {"session_ID": session_ID, "token": token}
                response = JsonResponse(data=res_data, status=200)
                break
        else:
             response = HttpResponse(status=500)
        return response
    else:
        print("OPTIONS")
        print(request.headers['Origin'])
        assert "http://localhost:8080" == request.headers['Origin']
        response = HttpResponse()
        #response['Access-Control-Allow-Origin'] = "localhost:8080"
        response['Access-Control-Allow-Credentials'] = 'true'
        response['Access-Control-Allow-Headers'] = "Content-Type, Accept, X-CSRFToken, xhr"
        response['Access-Control-Allow-Methods'] = "GET, POST, OPTIONS"

        return response
