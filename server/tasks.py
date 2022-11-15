from .instagram_utils import post_to_instagram
from celery import shared_task
import time

@shared_task
def start_instagram_scheduler():
  while True:
    post_to_instagram()
    print('Waiting for available posts...')
    time.sleep(60)
