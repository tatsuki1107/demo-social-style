from django.urls import path, include
from .views import ListSocialStyle, DetailSocialStyle

urlpatterns = [
    path('<int:pk>/', DetailSocialStyle.as_view()),
    path('', ListSocialStyle.as_view())
]
