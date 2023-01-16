import React, { useEffect, useState } from 'react'
import { createChart } from "lightweight-charts";
import axios from 'axios';

const Graph = () => {

   const [currencies, setCurrencies] = useState(null);
   const [timeLimit, setTimeLimit] = useState('1m');
   const [crSymbol, setCrSymbol] = useState('ETHUSDT');

   const handleTime = (e) => {
      let val = e.target.value;
      setTimeLimit(val)
   }

   const handleSymbol = (e) => {
      let sym = e.target.value;
      setCrSymbol(sym)
   }

   useEffect(() => {
      console.log(crSymbol, "crSymbol")
      axios.get(`https://api.binance.com/api/v3/klines?symbol=${crSymbol}&interval=${timeLimit}&limit=250`)
         .then(res => {
            const currency = res.data;
            let candleData = currency?.map(d => ({
               time: d[0] / 1000,
               open: d[1] * 1,
               high: d[2] * 1,
               low: d[3] * 1,
               close: d[4] * 1,
            }))

            setCurrencies(candleData)
         })
   }, [timeLimit, crSymbol])

   useEffect(async () => {
      if (currencies) {
         await showGraph();
      }
   }, [currencies]);

   const showGraph = async () => {
      const priceChart = document.getElementById('price-chart')
      priceChart.innerHTML = ''

      var chart = createChart('price-chart', {
         width: 1130,
         height: 450,
         timeScale: {
            timeVisible: true,
            borderColor: "#485c7b",
         },
         rightPriceScale: {
            borderColor: "#485c7b",
         },
         layout: {
            backgroundColor: "#253248",
            textColor: "rgba(255, 255, 255, 0.9)"
         },
         grid: {
            vertLines: {
               color: "#334158"
            },
            horzLines: {
               color: "#334158"
            }
         },
      });

      var series = chart.addCandlestickSeries({
         upColor: 'rgb(38,166,154)',
         downColor: 'rgb(255,82,82)',
         wickUpColor: 'rgb(38,166,154)',
         wickDownColor: 'rgb(255,82,82)',
         borderVisible: false,
      });

      var volumeSeries = chart.addHistogramSeries({
         priceFormat: {
            type: 'volume',
         },
         priceScaleId: '',
         scaleMargins: {
            top: 0.9,
            bottom: 0,
         },
      });

      function calculateEMA(data, count) {

         var result = [];
         for (var i = 0; i < data?.length; i++) {
            result.push(data[i].close);
         }

         const k = 2 / (count + 1);
         let emaData = [];
         emaData[0] = result[0]

         for (let i = 1; i < result?.length; i++) {
            let newPoint = (result[i] * k) + (emaData[i - 1] * (1 - k))
            emaData.push(newPoint)
         }

         let currentEma = [...emaData].map((elem, i) => {
            return { time: data[i].time, value: elem }
         })
         return currentEma
      }

      function histogramData(data) {
         var colors = [
            'rgb(255,82,82)',
            undefined,
         ];
         var res = [];
         data.forEach((item, i) => {
            res.push({
               time: item.time,
               value: item.open,
               color: colors[i % colors.length]
            })
         })
         return res;
      }

      const data = currencies;
      series.setData(data);

      var vol = (histogramData(data));
      volumeSeries.setData(vol)
      console.log(data, "data");
      console.log(vol, "vol");

      var emaData9 = calculateEMA(data, 9);
      var emaLine = chart.addLineSeries({
         color: 'rgba(4, 0, 232, 1)',
         lineWidth: 2,
      });
      emaLine.setData(emaData9);

      var legend = document.createElement('div');
      legend.className = 'sma-legend';
      document.getElementById('price-chart').appendChild(legend);
      legend.style.display = 'block';
      legend.style.left = 3 + 'px';
      legend.style.top = 3 + 'px';

      var emaData26 = calculateEMA(data, 26);
      var emaLine2 = chart.addLineSeries({
         color: 'rgba(4, 111, 232, 1)',
         lineWidth: 2,
      });
      emaLine2.setData(emaData26);

      var legend2 = document.createElement('div');
      legend.className = 'sma-legend';
      document.getElementById('price-chart').appendChild(legend2);
      legend2.style.display = 'block';
      legend2.style.left = 3 + 'px';
      legend2.style.top = 3 + 'px';

      //websocket for real time graph dta
      const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${crSymbol.toLowerCase()}@kline_${timeLimit}`);
      ws.onmessage = function (event) {
         let message = JSON.parse(event.data)
         let candleStick = message.k

         series.update({
            time: candleStick.t / 1000,
            open: candleStick.o,
            high: candleStick.h,
            low: candleStick.l,
            close: candleStick.c
         });
      }
   };

   return (
      <>
         <div className='graph-btns'>
            <button className='btn' value='ETHUSDT' onClick={(e) => handleSymbol(e)}>ETHUSDT</button>
            <button className='btn' value='XRPUSDT' onClick={(e) => handleSymbol(e)}>XRPUSDT</button>
            <button className='btn' value='BTCUSDT' onClick={(e) => handleSymbol(e)}>BTCUSDT</button>
            <br />
            <button className='btn' value='1m' onClick={(e) => handleTime(e)}>1m</button>
            <button className='btn' value='5m' onClick={(e) => handleTime(e)}>5m</button>
            <button className='btn' value='15m' onClick={(e) => handleTime(e)}>15m</button>
            <button className='btn' value='30m' onClick={(e) => handleTime(e)}>30m</button>
            <button className='btn' value='1h' onClick={(e) => handleTime(e)}>1h</button>
         </div>
         <div id="price-chart"></div>
      </>
   )
}

export default Graph