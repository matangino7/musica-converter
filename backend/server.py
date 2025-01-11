from flask import Flask, request, jsonify
from yt_dlp import YoutubeDL

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

if __name__ == '__main__':
    app.run(debug=True, port=5000)
