import requests
import logging
from typing import List, Dict
import pandas as pd
from datetime import datetime, timedelta

logger = logging.getLogger(__name__)

class SymbolMaster:
    def __init__(self):
        self.symbols_df = None
        self.fno_symbols = []
        self.option_symbols = []
        
    def load_symbol_master(self) -> bool:
        """Load symbol master from Angel One"""
        try:
            # Angel One OpenAPI symbol master URL
            url = "https://margincalculator.angelbroking.com/OpenAPI_File/files/OpenAPIScripMaster.json"
            
            response = requests.get(url, timeout=30)
            if response.status_code == 200:
                data = response.json()
                self.symbols_df = pd.DataFrame(data)
                logger.info(f"Loaded {len(self.symbols_df)} symbols")
                return True
            else:
                logger.error(f"Failed to load symbol master: {response.status_code}")
                return False
                
        except Exception as e:
            logger.error(f"Error loading symbol master: {str(e)}")
            return False
    
    def get_fno_stocks(self) -> List[str]:
        """Get F&O stock list"""
        if self.symbols_df is None:
            self.load_symbol_master()
        
        try:
            # Filter F&O stocks
            fno_df = self.symbols_df[
                (self.symbols_df['exch_seg'] == 'NFO') &
                (self.symbols_df['instrumenttype'] == 'OPTIDX')
            ]
            
            # Get unique underlying symbols
            self.fno_symbols = fno_df['name'].unique().tolist()
            return self.fno_symbols
            
        except Exception as e:
            logger.error(f"Error getting F&O stocks: {str(e)}")
            return []
    
    def get_option_contracts(self, underlying: str, weekly: bool = True, monthly: bool = True) -> List[Dict]:
        """Get option contracts for an underlying"""
        if self.symbols_df is None:
            self.load_symbol_master()
        
        try:
            # Get current date
            today = datetime.now()
            
            # Filter options for this underlying
            options_df = self.symbols_df[
                (self.symbols_df['name'] == underlying) &
                (self.symbols_df['instrumenttype'].isin(['OPTIDX', 'OPTSTK']))
            ].copy()
            
            if options_df.empty:
                return []
            
            # Convert expiry to datetime
            options_df['expiry_date'] = pd.to_datetime(options_df['expiry'], format='%d%b%Y', errors='coerce')
            
            # Filter future expiries only
            options_df = options_df[options_df['expiry_date'] >= today]
            
            # Get current week end and month end
            current_week_end = today + timedelta(days=(4 - today.weekday()) % 7)
            current_month_end = (today.replace(day=1) + timedelta(days=32)).replace(day=1) - timedelta(days=1)
            
            # Filter based on weekly/monthly
            filtered_df = options_df[
                ((weekly) & (options_df['expiry_date'] <= current_week_end)) |
                ((monthly) & (options_df['expiry_date'] <= current_month_end))
            ]
            
            # Convert to list of dicts
            contracts = []
            for _, row in filtered_df.iterrows():
                contracts.append({
                    'symbol': row['symbol'],
                    'name': row['name'],
                    'token': row['token'],
                    'exchange': row['exch_seg'],
                    'strike': float(row['strike']) / 100 if 'strike' in row else 0,
                    'option_type': row['symbol'][-2:],  # CE or PE
                    'expiry': row['expiry'],
                    'expiry_date': row['expiry_date'].strftime('%Y-%m-%d'),
                    'lotsize': int(row.get('lotsize', 1))
                })
            
            return contracts
            
        except Exception as e:
            logger.error(f"Error getting option contracts for {underlying}: {str(e)}")
            return []
    
    def get_all_index_options(self) -> List[Dict]:
        """Get all index options (NIFTY, BANKNIFTY, FINNIFTY)"""
        all_options = []
        indices = ['NIFTY', 'BANKNIFTY', 'FINNIFTY']
        
        for index in indices:
            options = self.get_option_contracts(index, weekly=True, monthly=True)
            all_options.extend(options)
        
        return all_options
    
    def get_ltp_token(self, symbol: str, exchange: str = 'NSE') -> Optional[str]:
        """Get token for a symbol to fetch LTP"""
        if self.symbols_df is None:
            self.load_symbol_master()
        
        try:
            match = self.symbols_df[
                (self.symbols_df['symbol'] == symbol) &
                (self.symbols_df['exch_seg'] == exchange)
            ]
            
            if not match.empty:
                return match.iloc[0]['token']
            return None
            
        except Exception as e:
            logger.error(f"Error getting token for {symbol}: {str(e)}")
            return None

# Singleton instance
symbol_master = SymbolMaster()
