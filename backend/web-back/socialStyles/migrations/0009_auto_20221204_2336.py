# Generated by Django 3.0.5 on 2022-12-04 14:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('socialStyles', '0008_auto_20221204_2311'),
    ]

    operations = [
        migrations.AlterField(
            model_name='latestresult',
            name='cheer_id',
            field=models.BigIntegerField(primary_key=True, serialize=False),
        ),
    ]
