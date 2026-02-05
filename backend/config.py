import os
from pathlib import Path
from dotenv import load_dotenv

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

class Config:
    # MongoDB
    MONGO_URL = os.environ['MONGO_URL']
    DB_NAME = os.environ['DB_NAME']
    
    # Angel One Credentials
    ANGEL_API_KEY = os.environ.get('ANGEL_API_KEY', '')
    ANGEL_CLIENT_ID = os.environ.get('ANGEL_CLIENT_ID', '')
    ANGEL_PASSWORD = os.environ.get('ANGEL_PASSWORD', '')
    ANGEL_TOTP_SECRET = os.environ.get('ANGEL_TOTP_SECRET', '')
    
    # CORS
    CORS_ORIGINS = os.environ.get('CORS_ORIGINS', '*').split(',')
    
    # Scanner Config
    SCANNER_INTERVAL = 2  # seconds
    CACHE_DURATION = 300  # 5 minutes
    
    # Strike Range Config
    STRIKE_RANGE = {
        'NIFTY': 30,
        'BANKNIFTY': 40,
        'FINNIFTY': 30,
        'STOCKS': 20
    }
    
    # Explosion Detection Thresholds
    EXPLOSION_THRESHOLDS = {
        'price_change': 40,  # %
        'volume_spike': 5,   # x times
        'oi_change': 15,     # %
        'iv_change': 10,     # %
        'score_threshold': 8
    }
    
    # News Impact - Reduced thresholds
    NEWS_IMPACT_THRESHOLDS = {
        'price_change': 30,  # %
        'volume_spike': 3,   # x times
    }
    
    # Safety Filters
    VIX_THRESHOLD = 25
    
    # Signal Weights
    SIGNAL_WEIGHTS = {
        'ema_trend': 2,
        'rsi': 1,
        'volume': 2,
        'price_action': 3,
        'market_structure': 2,
        'breadth': 1,
        'institutional': 2
    }

config = Config()
