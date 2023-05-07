import re
import os
import json
import base64

from typing import Dict, Any
from cryptography.fernet import Fernet
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend


def fix_json(s: str) -> str:
    s = s.strip().replace("\n", "")
    return re.sub(r",(?=\s*[\]}])", "", s)


def load_malformed_json(s: str) -> Dict[str, Any]:
    try:
        return json.loads(fix_json(s))
    except ValueError:
        return None


passphrase = "this is not secure"
passphrase_bytes = passphrase.encode()
key = passphrase_bytes.ljust(32, b"\x00")
nonce = os.urandom(16)
cipher = Cipher(algorithms.AES(key), modes.CTR(nonce), backend=default_backend())


def encrypt_string(input_string: str):
    input_bytes = input_string.encode()
    encryptor = cipher.encryptor()
    encrypted_bytes = encryptor.update(input_bytes) + encryptor.finalize()
    return base64.b64encode(nonce + encrypted_bytes).decode()


def decrypt_string(input_string: str):
    decoded_bytes = base64.b64decode(input_string)
    nonce_decoded = decoded_bytes[:16]
    encrypted_bytes_decoded = decoded_bytes[16:]
    cipher_dec = Cipher(
        algorithms.AES(key), modes.CTR(nonce_decoded), backend=default_backend()
    )
    decryptor = cipher_dec.decryptor()
    decrypted_bytes = decryptor.update(encrypted_bytes_decoded) + decryptor.finalize()
    return decrypted_bytes.decode()
