# Generated by Django 3.0.5 on 2022-11-19 09:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('socialStyles', '0002_auto_20221028_0318'),
    ]

    operations = [
        migrations.RenameField(
            model_name='feature',
            old_name='Feature_Explanation',
            new_name='feature_explanation',
        ),
        migrations.RenameField(
            model_name='feature',
            old_name='SocialStyle_ID',
            new_name='social_style_id',
        ),
        migrations.RenameField(
            model_name='profession',
            old_name='Profession_Name',
            new_name='profession_name',
        ),
        migrations.RenameField(
            model_name='profession',
            old_name='SocialStyleID',
            new_name='social_style_id',
        ),
        migrations.RenameField(
            model_name='relational',
            old_name='MySocialStyle_ID',
            new_name='my_social_style_id',
        ),
        migrations.RenameField(
            model_name='relational',
            old_name='Relational_Description',
            new_name='relational_description',
        ),
        migrations.RenameField(
            model_name='relational',
            old_name='Relational_ID',
            new_name='relational_id',
        ),
        migrations.RenameField(
            model_name='relational',
            old_name='Relational_Type',
            new_name='relational_type',
        ),
        migrations.RenameField(
            model_name='relational',
            old_name='TargetSocialStyle_ID',
            new_name='target_social_style_id',
        ),
        migrations.RenameField(
            model_name='result',
            old_name='Date',
            new_name='date',
        ),
        migrations.RenameField(
            model_name='result',
            old_name='Result_ID',
            new_name='result_id',
        ),
        migrations.RenameField(
            model_name='result',
            old_name='SocialStyle_ID',
            new_name='social_style_id',
        ),
        migrations.RenameField(
            model_name='result',
            old_name='User_ID',
            new_name='user_id',
        ),
        migrations.RenameField(
            model_name='result',
            old_name='X',
            new_name='x',
        ),
        migrations.RenameField(
            model_name='result',
            old_name='Y',
            new_name='y',
        ),
        migrations.RenameField(
            model_name='socialstyle',
            old_name='SocialStyle_ID',
            new_name='social_style_id',
        ),
        migrations.RenameField(
            model_name='socialstyle',
            old_name='Type_Explanation',
            new_name='type_explanation',
        ),
        migrations.RenameField(
            model_name='socialstyle',
            old_name='Type_Name',
            new_name='type_name',
        ),
        migrations.RenameField(
            model_name='user',
            old_name='Cheer_ID',
            new_name='cheer_id',
        ),
        migrations.RenameField(
            model_name='user',
            old_name='User_ID',
            new_name='user_id',
        ),
        migrations.AlterModelTable(
            name='feature',
            table='feature',
        ),
        migrations.AlterModelTable(
            name='profession',
            table='profession',
        ),
        migrations.AlterModelTable(
            name='relational',
            table='relational',
        ),
        migrations.AlterModelTable(
            name='result',
            table='result',
        ),
        migrations.AlterModelTable(
            name='socialstyle',
            table='social_style',
        ),
        migrations.AlterModelTable(
            name='user',
            table='user',
        ),
    ]
