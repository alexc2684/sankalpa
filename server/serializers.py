from rest_framework import serializers 
from .models import Media

class MediaSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Media
        fields = ('media_data', 'user_id', 'date_created')