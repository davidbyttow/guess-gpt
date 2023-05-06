import argparse

from app.routes import app

parser = argparse.ArgumentParser()
parser.add_argument("--port", type=int, default=5001)
args = parser.parse_args()
port = args.port

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=port)
