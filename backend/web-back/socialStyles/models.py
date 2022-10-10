from django.db import models
#socialStyle_IDは第一象限,第二象限,第三象限,第四象限に相当する。
class User(models.Model):
    User_ID = models.BigAutoField(primary_key=True)
    Cheer_ID = models.BigIntegerField()


class SocialStyle(models.Model):
    SocialStyle_ID = models.BigAutoField(primary_key=True)
    Type_Name = models.TextField(null=False)
    Type_Explanation = models.TextField(null=False)


class Result(models.Model):
    Result_ID = models.BigAutoField(primary_key=True)
    User_ID = models.IntegerField(null=False)
    SocialStyle_ID = models.IntegerField(null=False)
    X = models.FloatField(null=False)
    Y = models.FloatField(null=False)
    Date = models.BigIntegerField(null=False)


class Profession(models.Model):
    Profession_Name = models.TextField(null=False)
    SocialStyleID = models.IntegerField(null=False)


class Feature(models.Model):
    Feature_Explanation=models.TextField()
    SocialStyle_ID = models.IntegerField(null=False)


class Relational(models.Model):
    #relational_typeは相性が良ければTrue,わるければFalse
    Relational_ID = models.BigAutoField(primary_key=True)
    Relational_Description = models.TextField(null=False)
    MySocialStyle_ID = models.IntegerField(null=False)
    TargetSocialStyle_ID = models.IntegerField(null=False)
    Relational_Type = models.BooleanField(null=False)
