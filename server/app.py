from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf

app = Flask(__name__)
CORS(app)

model = tf.keras.models.load_model('../saved_model/')

@app.route('/process', methods=['POST'])
def process_query():
    data = request.get_json()

    if not data:
        return jsonify({"error": "data Invalid JSON data"}), 400

    if 'abstract' not in data:
        return jsonify({"error": "Abstract is required"}), 400
    
    abstract = data['abstract']
    
    try: 
        tensor_abstract = tf.constant([abstract])
        
        result = model.predict(tensor_abstract)[0]

    except Exception as e:
        print(e)
        return jsonify({'error': "Prediction error"})

    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

