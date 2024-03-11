import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import moment from 'moment';
import { Box, Card, CardContent, Typography} from '@mui/material';

const maxDataPoints = 7; // Set the maximum number of data points

function MarketChart() {
  const [dataChart, setDataChart] = useState({});

  const fetchData = () => {
    fetch('https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=1&precision=2')
      .then(res => res.json())
      .then(json => {
        const { prices } = json;

        if (prices && Array.isArray(prices)) {
          // Limit the length of the chart
          const mappedprices = prices.map(item => ({
            x: moment(item[0]).format('HH:mm'),
            y: item[1]
          }));
          const limitedprices = mappedprices.slice(-maxDataPoints);

          setDataChart({
            options: {
              chart: {
                background: '#212229',
                id: 'realtime',
                animations: {
                  enabled: true,
                  easing: 'linear',
                  dynamicAnimation: {
                    speed: 1000
                  }
                },
                toolbar: {
                  show: false
                },
                zoom: {
                  enabled: false
                }
              },
              fill: {
                type: 'gradient',
                gradient: {
                  shade: 'dark',
                  gradientToColors: [ '#41e5c6'],
                  shadeIntensity: 1,
                  type: 'horizontal',
                  opacityFrom: 1,
                  opacityTo: 1,
                  stops: [0, 100, 100, 100]
                },
              },
              
              stroke: {
                width: 5,
                curve: 'smooth'
              },
              grid: {
                show: false,
                padding: {
                  top: -30,
                  right: 20,
                  bottom: -7,
                  left: 10
              },  
              },
              axisTicks: {
                show: true,
                color: '#FFFFFF',
              },
              xaxis: {
                categories: limitedprices.map(item => item?.x),
                labels: {
                  style: {
                    colors: ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'],
                    fontSize: '10px',
                  },
                },
              },
              yaxis: {
                labels: {
                  show: false,
                },
              },
            },
            series: [
              {
                name: "$",
                data: limitedprices.map(item => item?.y)
              }
            ]
          });

        } else {
          console.error('Unexpected data format:', prices);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    // Fetch data initially
    fetchData();

    // Set up interval to fetch data every minute (30 seconds)
    const intervalId = setInterval(fetchData, 30 * 1000);

    // Clean up interval when component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      {dataChart && dataChart?.series && (
        <Chart
          options={dataChart.options}
          series={dataChart.series}
          type="line"
        />
      )}
    </div>
  );
};


const MarketDashboard = ({ price, percentageChange }) => {
  const formattedPrice = price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return (
    <Card sx={{ maxWidth: '360px', backgroundColor: '#212229', borderRadius: '30px' }}>
      <CardContent>
      <Typography
        sx={{ padding: '15px 15px 5px 20px', fontWeight: '350', fontSize: '20px', color: '#6c6d74' }}
      >
        Ethereum Market
      </Typography>
        <Typography
          sx={{ padding: '0 0 5px 25px', fontWeight: '400', fontSize: '23px', color: '#c8c8c9' }}
        >
          $ {formattedPrice}
        </Typography>
        <Typography
          sx={{ paddingLeft: '30px', fontWeight: '400', fontSize: '12px', color: '#1cc887' }}
        >
          {percentageChange > 0 ? <span>&#9650;</span> : (percentageChange < 0 ? <span>&#9660;</span> : '')} {Math.abs(percentageChange).toFixed(2)}% (1h)
        </Typography>
        <Box display="flex" mt={2.5}>
          <MarketChart />
        </Box>
      </CardContent>
    </Card>
  );
};

const EthereumMarketChart = () => {
  const [latestPrice, setLatestPrice] = useState(null);
  const [percentageChange, setPercentageChange] = useState(null);

  useEffect(() => {
    const fetchPriceData = () => {
      fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h&locale=en&precision=2')
        .then(res => res.json())
        .then(json => {
          const ethereumData = json[0]; // Assuming Ethereum data is the first item in the array

          if (ethereumData) {
            setPercentageChange(ethereumData.price_change_percentage_24h);
          } else {
            console.error('Unexpected data format:', json);
          }
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    };

    fetchPriceData();

    const intervalId = setInterval(fetchPriceData, 45 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchData = () => {
      fetch('https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=1&precision=2')
        .then(res => res.json())
        .then(json => {
          const { prices } = json;

          if (prices && Array.isArray(prices)) {
            const latestPrice = prices[prices.length - 1]?.[1];
            setLatestPrice(latestPrice);
          } else {
            console.error('Unexpected data format:', prices);
          }
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    };

    fetchData();

    const intervalId = setInterval(fetchData, 30 * 1000);

    return () => clearInterval(intervalId);
  }, []);
  
  return (
    <>
      {latestPrice !== null && <MarketDashboard price={latestPrice} percentageChange={percentageChange} />}
    </>
  );
};

export default EthereumMarketChart;