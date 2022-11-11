import requests
import json

INSTA_BIZ_ID = '17841445917209667'
USER_ACCESS_TOKEN = 'EAAJgonltJHcBAOAA2K02vQ4Ckb16nqQyfYZBVSsZBcKOhsgQ6FfZClrishSMTtLGXQ9FSLUi4AHmfppySuLyVmxagyxmWBsmokWxBWTKwkZARB8iU4iIqJJqZAiQ33bEZADm9pGH594cNe9ZCQRKZB8a3SZAMmi2BxQcePZB3wfw65wOwXZAB3x5N1hTYOhE6lszZAoZD'

def create_ig_container(img_uri, caption):
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
    post_container = create_ig_container(img_uri, caption)
    post_to_instagram(post_container)
    


# share_post_to_instagram('https://1d48-71-83-117-239.ngrok.io/media/media/bloops_MPk6c3W.jpg', 'test')
# a function to post an image to instagram
