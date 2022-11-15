# a script that gets all Posts where isPosted is false and matches the current time, and posts them to instagram
from server.models import Post, Media
from server.instagram import share_post_to_instagram
from datetime import datetime
from django.utils import timezone

source_uri = 'https://73b6-71-83-117-239.ngrok.io/media/'

def post_to_instagram():
  posts = Post.objects.filter(is_posted=False)
  for post in posts:
    if post.post_date_time <= timezone.now():
      img_uri = source_uri + str(post.media.media_data)
      caption = post.caption
      share_post_to_instagram(img_uri, caption)
      post.is_posted = True
      post.save()
