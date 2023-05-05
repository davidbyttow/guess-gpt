import threading
import time
import unittest

import requests

from app.routes import app
from app import store


class TestServer(unittest.IsolatedAsyncioTestCase):
    @classmethod
    async def asyncSetUp(self):
        app.config["TESTING"] = True
        self.client = app.test_client()

if __name__ == "__main__":
    unittest.main()
