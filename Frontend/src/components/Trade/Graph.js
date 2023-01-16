import React, { useEffect, useState } from 'react'
import TradingViewWidget from "react-tradingview-widget";

const Graph = () => {

   const coins = ['BTCUSDT', 'XRPUSDT', 'ETHBTC', 'ETHUSDT', 'XRPETH', 'XRPBTC']
   const [crSymbol, setCrSymbol] = useState('ETHUSDT');
   const [error, setError] = useState(0);

   useEffect(async () => {
      let parseUriSegment = window.location.pathname.split("/");
      if (parseUriSegment[2] && coins.includes(parseUriSegment[2])) {
         setCrSymbol(parseUriSegment[2])
         setError(2)
      }
      else {
         setCrSymbol('ETHUSDT')
         setError(1)
      }
   }, [window.location.href])


   return (
      <>
         {error == 1 ?
            <div className='bg-info mb-4 p-2 d-flex justify-content-between'>
               <p className='p-0 m-0'>Invalid URL added. using default coins: ETH - USDT </p>
               <span onClick={() => setError(false)}>X</span>
            </div>
            : null
         }
         {error ?
            <TradingViewWidget theme="Dark" symbol={crSymbol} />
            : null
         }
      </>
   )
}

export default Graph