from rest_framework import viewsets

from .serializers import MediaSerializer
from .models import Media

class MediaViewSet(viewsets.ModelViewSet):
    queryset = Media.objects.all().order_by('user_id')
    serializer_class = MediaSerializer
    