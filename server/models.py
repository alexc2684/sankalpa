from django.db import models

# A model for storing photos and their metadata
class Media(models.Model):
  media_data = models.ImageField(upload_to='media')
  user_id = models.CharField(max_length=100)
  date_created = models.DateTimeField(auto_now_add=True)

  class Meta:
    ordering = ('date_created',)

  def __str__(self):
    return self.media_data.name

class Post(models.Model):
  user_id = models.CharField(max_length=100)
  caption = models.TextField()
  location = models.CharField(max_length=100)
  is_posted = models.BooleanField(default=False)
  is_instagram_post = models.BooleanField(default=False)
  media = models.ForeignKey(Media, on_delete=models.CASCADE)
  post_date_time = models.DateTimeField()
  date_created = models.DateTimeField(auto_now_add=True)

  class Meta:
    ordering = ('post_date_time',)

  def __str__(self):
    return self.media.media_data.name
      