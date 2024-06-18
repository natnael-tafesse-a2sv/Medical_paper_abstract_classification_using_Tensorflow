from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf

app = Flask(__name__)
CORS(app)

model = tf.saved_model.load('../model/')

@app.route('/process', methods=['POST'])
def process_query():
    data = request.get_json()

    if not data:
        return jsonify({"error": "data Invalid JSON data"}), 400

    if 'abstract' not in data:
        return jsonify({"error": "Abstract is required"}), 400

    print("")
    return jsonify({'result': "Hello World"})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

