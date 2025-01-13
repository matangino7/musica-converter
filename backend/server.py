from concurrent.futures import ThreadPoolExecutor
from flask import Flask, request, jsonify
from yt_dlp import YoutubeDL
from typing import List

app = Flask(__name__)

def search_youtube(query):
    """
    Searches YouTube and returns the URL of the first result.
    """
    try:
        with YoutubeDL({'quiet': True, 'format': 'bestaudio/best'}) as ydl:
            result = ydl.extract_info(f"ytsearch1:{query}", download=False)
            video_url = result['entries'][0]['webpage_url']
            return video_url
    except Exception as e:
        print(f"Error searching for '{query}': {e}")
        return None

@app.route('/get-youtube-urls', methods=['POST'])
def get_youtube_urls():
    """
    Endpoint to receive JSON data with song names and return a list of YouTube URLs.
    """
    try:
        data = request.json
        if not data:
            return jsonify({'error': 'No data provided'}), 400

        urls = []
        for song_id, song_data in data.items():
            song_name = song_data.get('attributes', {}).get('name')
            if song_name:
                url = search_youtube(song_name)
                if url:
                    urls.append({'song_id': song_id, 'url': url})

        return jsonify(urls), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

def playwright(playlist_url: str) -> List[str]:
    from bs4 import BeautifulSoup
    import requests
    import json

    html_response = requests.get(playlist_url).text
    soup = BeautifulSoup(html_response, "html.parser")
    script_tag = soup.find('script', {'id': 'serialized-server-data'})
    json_data = json.loads(script_tag.string)
    song_titles = []

    for section in json_data[0]['data']['sections']:
        if section['itemKind'] == 'trackLockup':
            for item in section['items']:
                song_titles.append(item['title'])

    with ThreadPoolExecutor() as executor:
        results = executor.map(search_youtube, song_titles)
        for url in results:
            print(url)
    

if __name__ == '__main__':
    print(playwright('https://music.apple.com/il/playlist/ahalashirimbeanglit/pl.u-MDAWvegFWGKWkka'))
    # app.run(debug=True, port=5000)
        
