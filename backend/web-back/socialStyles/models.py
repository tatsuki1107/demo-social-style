from django.db import models
# socialStyle_IDは第一象限,第二象限,第三象限,第四象限に相当する。


class User(models.Model):
    user_id = models.BigAutoField(primary_key=True)
    cheer_id = models.BigIntegerField()
    class Meta:
        db_table = 'user'
class LatestResult(models.Model):
    cheer_id = models.ForeignKey(User,on_delete=models.PROTECT)
    latest_social_style_id = models.TextField(null=False)
    class Meta:
        db_table='latest_result'
class SocialStyle(models.Model):
    social_style_id = models.IntegerField(primary_key=True)
    type_name = models.TextField(null=False)
    type_explanation = models.TextField(null=False)
    class Meta:
        db_table = 'social_style'

class Result(models.Model):
    result_id = models.BigAutoField(primary_key=True)
    user_id = models.ForeignKey(User,on_delete=models.CASCADE)
    social_style_id = models.ForeignKey(SocialStyle,on_delete=models.PROTECT)
    x = models.FloatField(null=False)
    y = models.FloatField(null=False)
    date = models.BigIntegerField(null=False)
    class Meta:
        db_table = 'result'

class Profession(models.Model):
    profession_name = models.TextField(null=False)
    social_style_id = models.ForeignKey(SocialStyle,on_delete=models.CASCADE)
    class Meta:
        db_table = 'profession'

class Feature(models.Model):
    feature_explanation = models.TextField()
    social_style_id = models.ForeignKey(SocialStyle,on_delete=models.CASCADE)
    class Meta:
        db_table = 'feature'

class Relational(models.Model):
    # relational_typeは相性が良ければTrue,わるければFalse
    relational_id = models.BigAutoField(primary_key=True)
    relational_description = models.TextField(null=False)
    my_social_style_id = models.ForeignKey('SocialStyle',related_name='My_SS',on_delete=models.CASCADE)
    target_social_style_id = models.ForeignKey('SocialStyle',related_name='Target_SS',on_delete=models.CASCADE)
    relational_type = models.BooleanField(null=False)
    class Meta:
        db_table = 'relational'
class Questions(models.Model):
    question_id = models.BigAutoField(primary_key=True)
    questions = models.TextField(null=False)
    select_type = models.IntegerField(null=False)
    pos = models.TextField(null=False)
    class Meta:
        db_table = 'questions'