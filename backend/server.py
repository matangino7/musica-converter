from concurrent.futures import ThreadPoolExecutor
from flask import Flask, request, jsonify
from yt_dlp import YoutubeDL
from typing import List, Dict
from bs4 import BeautifulSoup
import requests
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

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
        data = json.loads(request.data.decode('utf-8'))
        if not data:
            return jsonify({'error': 'No data provided'}), 400

        if data['type'] == 'apple':
            music_data = extract_data_from_url(data['playlist_url'])
            # music_data = [{
            #     'album_url': "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/ad/4f/a7/ad4fa736-cf9b-ea9d-9712-cf0029dde3b3/772532150620_cover.jpg/1000x1000.png",
            #     'name': 'kljdslkjlkdjs',
            #     'youtube_url': "https://www.youtube.com/watch?v=1LvmC53OukU"
            # }]
        else:
            return jsonify({'error': 'not supported'}), 200

        return jsonify(music_data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
def fetch_and_parse_playlist(playlist_url: str) -> List[Dict[str, str]]:
    """Fetch HTML content and parse the playlist page."""
    html_response = requests.get(playlist_url).text
    soup = BeautifulSoup(html_response, "html.parser")
    script_tag = soup.find('script', {'id': 'serialized-server-data'})
    json_data = json.loads(script_tag.string)  # type: ignore
    return json_data

def extract_song_data(song_item: Dict) -> Dict[str, str]:
    """Extract song data and perform YouTube search."""
    return {
        'name': song_item['title'],
        'album_url': song_item['artwork']['dictionary']['url'].rsplit("/", 1)[0] + "/1000x1000.png",
        'youtube_url': search_youtube(song_item['title'])
    }

def extract_data_from_url(playlist_url: str) -> List[Dict[str, str]]:
    """Extract song data with threading."""
    json_data = fetch_and_parse_playlist(playlist_url)
    song_urls = []

    all_song_items = [
        item
        for section in json_data[0]['data']['sections']
        if section['itemKind'] == 'trackLockup'
        for item in section['items']
    ]

    with ThreadPoolExecutor(max_workers=10) as executor:
        results = executor.map(extract_song_data, all_song_items)
        song_urls.extend(results)

    return song_urls
    

if __name__ == '__main__':
    app.run(debug=True, port=5000)    
