from django.contrib import admin
from .models import User, SocialStyle, Result, Profession, Feature, Relational,Questions
# Register your models here.
admin.site.register(User)
admin.site.register(SocialStyle)
admin.site.register(Result)
admin.site.register(Profession)
admin.site.register(Feature)
admin.site.register(Relational)
admin.site.register(Questions)