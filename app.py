from flask import Flask, request, jsonify
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/get-node-info', methods=['POST'])
def get_node_info():
    data = request.json
    node_names = data.get('nodeNames')
    
    if not node_names:
        return jsonify({'error': 'No node names provided'}), 400
    
    df = pd.read_csv(r"nodelatlng.csv")
    node_info = []
    
    for name in node_names:
        node_row = df[df['Name'] == name]
        if not node_row.empty:
            info = {
                'name': name,
                'lat': float(node_row.iloc[0]['Latitude']),
                'lng': float(node_row.iloc[0]['Longitude'])
            }
            node_info.append(info)
    return jsonify(node_info)
if __name__ == '__main__':
    app.run(debug=True)
