from django.urls import path, include
from rest_framework import routers
from . import views
from django.conf import settings #add this
from django.conf.urls.static import static #add this

router = routers.DefaultRouter()
router.register(r'media', views.MediaViewSet)
router.register(r'post', views.PostViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('share/', views.post_to_instagram, name='share'),
    path('start-scheduler/', views.start_scheduler, name='start-scheduler'),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')) 
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
