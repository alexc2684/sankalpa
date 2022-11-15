from rest_framework import serializers 
from .models import Media, Post

class MediaSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = Media
    fields = ('media_data', 'user_id', 'date_created')

class PostSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = Post
    fields = ('user_id', 'caption', 'location', 'is_posted', 'is_instagram_post', 'media', 'post_date_time', 'date_created')

  def create(self, validated_data):
    return Post.objects.create(**validated_data)

  def update(self, instance, validated_data):
    instance.user_id = validated_data.get('user_id', instance.user_id)
    instance.caption = validated_data.get('caption', instance.caption)
    instance.location = validated_data.get('location', instance.location)
    instance.is_posted = validated_data.get('is_posted', instance.is_posted)
    instance.is_instagram_post = validated_data.get('is_instagram_post', instance.is_instagram_post)
    instance.media = validated_data.get('media', instance.media)
    instance.post_date_time = validated_data.get('post_date_time', instance.post_date_time)
    instance.date_created = validated_data.get('date_created', instance.date_created)
    instance.save()
    return instance
