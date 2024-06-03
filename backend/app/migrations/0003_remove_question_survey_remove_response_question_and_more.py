# Generated by Django 4.2.10 on 2024-03-07 12:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("app", "0002_account_alter_response_user"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="question",
            name="survey",
        ),
        migrations.RemoveField(
            model_name="response",
            name="question",
        ),
        migrations.RemoveField(
            model_name="response",
            name="user",
        ),
        migrations.DeleteModel(
            name="Account",
        ),
        migrations.DeleteModel(
            name="Question",
        ),
        migrations.DeleteModel(
            name="Response",
        ),
        migrations.DeleteModel(
            name="Survey",
        ),
    ]
