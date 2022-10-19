# Generated by Django 3.0.5 on 2022-10-10 17:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('socialStyles', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Feature',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Feature_Explanation', models.TextField()),
                ('SocialStyle_ID', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Profession',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Profession_Name', models.TextField()),
                ('SocialStyleID', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Relational',
            fields=[
                ('Relational_ID', models.BigAutoField(primary_key=True, serialize=False)),
                ('Relational_Description', models.TextField()),
                ('MySocialStyle_ID', models.IntegerField()),
                ('TargetSocialStyle_ID', models.IntegerField()),
                ('Relational_Type', models.BooleanField()),
            ],
        ),
        migrations.CreateModel(
            name='Result',
            fields=[
                ('Result_ID', models.BigAutoField(primary_key=True, serialize=False)),
                ('User_ID', models.IntegerField()),
                ('SocialStyle_ID', models.IntegerField()),
                ('X', models.FloatField()),
                ('Y', models.FloatField()),
                ('Date', models.BigIntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='SocialStyle',
            fields=[
                ('SocialStyle_ID', models.BigAutoField(primary_key=True, serialize=False)),
                ('Type_Name', models.TextField()),
                ('Type_Explanation', models.TextField()),
            ],
        ),
    ]