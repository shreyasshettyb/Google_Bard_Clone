from bardapi import Bard
from flask import Flask, jsonify, render_template, request

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')
#Paste Your Bard Cookkie Token.
@app.route('/process_text', methods=['POST'])
def process_text():
    token = ''
    bard = Bard(token=token)
    data = request.get_json()
    input_text = data['text']
    ans=bard.get_answer(input_text)['content']
    return jsonify(ans)
if __name__ == '__main__':
    app.run(debug=True)
