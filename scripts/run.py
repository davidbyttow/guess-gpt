import argparse

from app.routes import app
from app.util import encrypt_string, decrypt_string

parser = argparse.ArgumentParser()
parser.add_argument("--port", type=int, default=5001)
args = parser.parse_args()
port = args.port


es = encrypt_string("donald trump")
print(">", es)
ds = decrypt_string(es)
print(">", ds)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=port)
