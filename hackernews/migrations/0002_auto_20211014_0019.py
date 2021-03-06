# Generated by Django 3.2.8 on 2021-10-13 21:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hackernews', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='comment',
            options={'ordering': ('comment_date',)},
        ),
        migrations.AlterModelOptions(
            name='newspost',
            options={'ordering': ('pub_date',)},
        ),
        migrations.AddField(
            model_name='newspost',
            name='text',
            field=models.CharField(blank=True, max_length=1500),
        ),
        migrations.AlterField(
            model_name='newspost',
            name='url',
            field=models.CharField(blank=True, max_length=200),
        ),
    ]
