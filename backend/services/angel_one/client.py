from SmartApi import SmartConnect
import pyotp
import logging
from typing import Optional
from config import config

logger = logging.getLogger(__name__)

class AngelOneClient:
    _instance = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance._initialized = False
        return cls._instance
    
    def __init__(self):
        if self._initialized:
            return
            
        self.api_key = config.ANGEL_API_KEY
        self.client_id = config.ANGEL_CLIENT_ID
        self.password = config.ANGEL_PASSWORD
        self.totp_secret = config.ANGEL_TOTP_SECRET
        
        self.smart_api = None
        self.auth_token = None
        self.refresh_token = None
        self.feed_token = None
        
        self._initialized = True
    
    def login(self) -> bool:
        """Login to Angel One SmartAPI"""
        try:
            self.smart_api = SmartConnect(api_key=self.api_key)
            
            # Generate TOTP
            totp = pyotp.TOTP(self.totp_secret).now()
            
            # Login
            data = self.smart_api.generateSession(
                clientCode=self.client_id,
                password=self.password,
                totp=totp
            )
            
            if data['status']:
                self.auth_token = data['data']['jwtToken']
                self.refresh_token = data['data']['refreshToken']
                self.feed_token = self.smart_api.getfeedToken()
                
                logger.info("Angel One login successful")
                return True
            else:
                logger.error(f"Angel One login failed: {data.get('message')}")
                return False
                
        except Exception as e:
            logger.error(f"Angel One login exception: {str(e)}")
            return False
    
    def get_profile(self):
        """Get user profile"""
        try:
            if not self.smart_api:
                self.login()
            return self.smart_api.getProfile(self.refresh_token)
        except Exception as e:
            logger.error(f"Error getting profile: {str(e)}")
            return None
    
    def get_feed_token(self) -> Optional[str]:
        """Get feed token for WebSocket"""
        if not self.feed_token and self.smart_api:
            self.feed_token = self.smart_api.getfeedToken()
        return self.feed_token

# Singleton instance
angel_client = AngelOneClient()
