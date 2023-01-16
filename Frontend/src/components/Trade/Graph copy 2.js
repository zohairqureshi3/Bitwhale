import React, { useEffect, useState } from 'react'

const Graph = () => {

   const [crSymbol, setCrSymbol] = useState('ETHUSDT');

   const handleSymbol = (e) => {
      let sym = e.target.value;
      setCrSymbol(sym)
   }

   useEffect(async () => {
      await showGraph();
      const TradingView = document.createElement('script');

      TradingView.src = "https://s3.tradingview.com/tv.js";
      TradingView.async = true;
    
      document.body.appendChild(TradingView);
    
      return () => {
      //   document.body.removeChild(script);
         new TradingView.widget({
            "autosize": true,
            "symbol": "BINANCE:BTCUSDT",
            "timezone": "Etc/UTC",
            "theme": "dark",
            "style": "1",
            "locale": "en",
            "toolbar_bg": "#f1f3f6",
            "enable_publishing": false,
            "withdateranges": true,
            "range": "YTD",
            "hide_side_toolbar": false,
            "allow_symbol_change": true,
            "watchlist": [
               "BINANCE:BTCUSDT",
               "BINANCE:ETHUSDT",
               "BINANCE:XRPUSDT"
            ],
            "details": true,
            "show_popup_button": true,
            "popup_width": "1000",
            "popup_height": "650",
            "container_id": "tradingview_d75e4"
         });
      }
   }, []);

   const showGraph = async () => {
      const priceChart = document.getElementById('price-chart')
      // new TradingView.widget({
      //    "autosize": true,
      //    "symbol": "BINANCE:BTCUSDT",
      //    "timezone": "Etc/UTC",
      //    "theme": "dark",
      //    "style": "1",
      //    "locale": "en",
      //    "toolbar_bg": "#f1f3f6",
      //    "enable_publishing": false,
      //    "withdateranges": true,
      //    "range": "YTD",
      //    "hide_side_toolbar": false,
      //    "allow_symbol_change": true,
      //    "watchlist": [
      //       "BINANCE:BTCUSDT",
      //       "BINANCE:ETHUSDT",
      //       "BINANCE:XRPUSDT"
      //    ],
      //    "details": true,
      //    "show_popup_button": true,
      //    "popup_width": "1000",
      //    "popup_height": "650",
      //    "container_id": "tradingview_d75e4"
      // });
   }

   return (
      <>
         <div className="tradingview-widget-container">
            <div id="tradingview_f04dc"></div>
            <div className="tradingview-widget-copyright"><a href="https://www.tradingview.com/symbols/BTCUSDT/?exchange=BINANCE" rel="noopener" target="_blank"><span className="blue-text">BTCUSDT Chart</span></a> by TradingView</div>
            <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
            <script type="text/javascript">
               new TradingView.widget(
                  "autosize": true,
                  "symbol": "BINANCE:BTCUSDT",
                  "timezone": "Etc/UTC",
                  "theme": "dark",
                  "style": "1",
                  "locale": "en",
                  "toolbar_bg": "#f1f3f6",
                  "enable_publishing": false,
                  "withdateranges": true,
                  "range": "YTD",
                  "hide_side_toolbar": false,
                  "allow_symbol_change": true,
                  "watchlist": [
                     "BINANCE:BTCUSDT",
                     "BINANCE:ETHUSDT",
                     "BINANCE:XRPUSDT",
                     "BINANCE:XRPBTC",
                     "BINANCE:XRPETH",
                     "BINANCE:ETHBTC"
                  ],
                  "details": true,
                  "show_popup_button": true,
                  "popup_width": "1000",
                  "popup_height": "650",
                  "container_id": "tradingview_f04dc"
                  );
               </script>
            </div>

        
         
      </>
   )
}

export default Graph