from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import MediaSerializer, PostSerializer
from .models import Media, Post
from .instagram import share_post_to_instagram
from .tasks import start_instagram_scheduler


class MediaViewSet(viewsets.ModelViewSet):
    queryset = Media.objects.all().order_by('user_id')
    serializer_class = MediaSerializer
    
class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by('user_id')
    serializer_class = PostSerializer

# An API that takes a url and posts it to instagram
@api_view(['POST'])
def post_to_instagram(request):
  print(request.data)
  img_uri = request.data['img_uri']
  caption = request.data['caption']
  share_post_to_instagram(img_uri, caption)
  return Response({'message': 'success'}, status=status.HTTP_200_OK)

# An API that will get all posts that are not posted and post them to instagram
@api_view(['GET'])
def start_scheduler(request):
  start_instagram_scheduler()
  return Response({'message': 'success'}, status=status.HTTP_200_OK)
