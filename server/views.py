from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from .serializers import MediaSerializer
from .models import Media
from .instagram import share_post_to_instagram
from rest_framework.response import Response

class MediaViewSet(viewsets.ModelViewSet):
    queryset = Media.objects.all().order_by('user_id')
    serializer_class = MediaSerializer
    
# An API that takes a url and posts it to instagram
@api_view(['POST'])
def post_to_instagram(request):
  print(request.data)
  img_uri = request.data['img_uri']
  caption = request.data['caption']
  share_post_to_instagram(img_uri, caption)
  return Response({'message': 'success'}, status=status.HTTP_200_OK)