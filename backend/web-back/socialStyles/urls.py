from django.urls import path
from . import views

urlpatterns = [
    path('questions',views.questions),
    path('send_param',views.submit_to_history),
    path('get_result',views.getresult)
]