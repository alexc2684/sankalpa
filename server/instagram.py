import requests
import json
import environ

env = environ.Env()

environ.Env.read_env()

INSTA_BIZ_ID = env('INSTA_BIZ_ID')
USER_ACCESS_TOKEN = env('USER_ACCESS_TOKEN')

def create_instagram_container(img_uri, caption):
    post_url = 'https://graph.facebook.com/v15.0/{}/media'.format(INSTA_BIZ_ID)
    payload = {
        'image_url': img_uri,
        'caption': caption,
        'access_token': USER_ACCESS_TOKEN
        }

    r = requests.post(post_url, data=payload)
    print(r.text)
    return json.loads(r.text)

def post_to_instagram(result):
    if 'id' in result:
        creation_id = result['id']
        second_url = 'https://graph.facebook.com/v15.0/{}/media_publish'.format(INSTA_BIZ_ID)
        second_payload = {
        'creation_id': creation_id,
        'access_token':  USER_ACCESS_TOKEN
        }
        r = requests.post(second_url, data=second_payload)
        print('--------Your post is live on Instagram--------')
        print(r.text)
    else:
        print('Error occured while posting to Instagram')


def share_post_to_instagram(img_uri, caption):
  print('--------Sharing post to Instagram--------')
  post_container = create_instagram_container(img_uri, caption)
  post_to_instagram(post_container)
  print('--------Post successfully shared--------')
