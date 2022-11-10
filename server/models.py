from django.db import models

# A model for storing photos and their metadata
class Media(models.Model):
  media_data = models.ImageField(upload_to='media')
  user_id = models.CharField(max_length=100)
  date_created = models.DateTimeField(auto_now_add=True)

  def __str__(self):
        return self.name
