# Generated by Django 5.2.1 on 2025-05-30 05:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bookly_rooms', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='booklyrooms',
            name='capacity',
            field=models.PositiveIntegerField(default=1),
        ),
    ]
