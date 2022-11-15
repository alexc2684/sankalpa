# Generated by Django 3.1.5 on 2022-11-14 17:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0002_auto_20221110_1738'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='media',
            options={'ordering': ('date_created',)},
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_id', models.CharField(max_length=100)),
                ('caption', models.TextField()),
                ('location', models.CharField(max_length=100)),
                ('is_posted', models.BooleanField(default=False)),
                ('is_instagram_post', models.BooleanField(default=False)),
                ('post_date_time', models.DateTimeField()),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('media', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='server.media')),
            ],
            options={
                'ordering': ('date_created',),
            },
        ),
    ]