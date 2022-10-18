from django.test import TestCase, RequestFactory
from .views import questions
token_url = "http://localhost:80/api/token"
questions_url = "http://localhost:80/api/questions"
data = {"Cheer_ID":12345,"session_ID":"asdffff","token":"asddef"}
req = RequestFactory()
req.post(token_url,data)
req = RequestFactory()
req.post(questions_url,{"session_ID":data["session_ID"],"token":data["token"]})
server_res = questions(req)
print(server_res.content)
