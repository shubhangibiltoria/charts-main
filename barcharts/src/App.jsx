import React, { useEffect, useState } from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import axios from 'axios';
import './App.css';

import { Chart as ChartJS, defaults } from 'chart.js/auto';

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = 'start';
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = 'black';

function App() {
  const [users, setUsers] = useState([]);
  const [aggregatedData, setAggregatedData] = useState({
    countries: [],
    sectors: [],
  });
  const [countryFilter, setCountryFilter] = useState('');
  const [sectorFilter, setSectorFilter] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    aggregateData();
  }, [users, countryFilter, sectorFilter]);

  const fetchData = () => {
    axios.get('http://localhost:3001/getUsers')
      .then(response => setUsers(response.data))
      .catch(error => console.error(error));
  };

  const aggregateData = () => {
    // Apply filters to users
    const filteredUsers = users.filter(user => {
      return (
        (!countryFilter || user.country === countryFilter) &&
        (!sectorFilter || user.sector === sectorFilter)
      );
    });

    // Aggregate data for countries
    const countries = filteredUsers.reduce((acc, user) => {
      const existingCountry = acc.find(item => item.country === user.country);
      if (existingCountry) {
        existingCountry.intensity += user.intensity;
        existingCountry.relevance += user.relevance;
        existingCountry.likelihood += user.likelihood;
      } else {
        acc.push({
          country: user.country,
          intensity: user.intensity,
          relevance: user.relevance,
          likelihood: user.likelihood,
        });
      }
      return acc;
    }, []);

    // Aggregate data for sectors
    const sectors = filteredUsers.reduce((acc, user) => {
      const existingSector = acc.find(item => item.sector === user.sector);
      if (existingSector) {
        existingSector.likelihood += user.likelihood;
      } else {
        acc.push({
          sector: user.sector,
          likelihood: user.likelihood,
        });
      }
      return acc;
    }, []);

    setAggregatedData({ countries, sectors });
  };

  const handleCountryFilterChange = (event) => {
    setCountryFilter(event.target.value);
  };

  const handleSectorFilterChange = (event) => {
    setSectorFilter(event.target.value);
  };

  return (
    <div className="App">
      <div className="filter">
        <label>
          Country Filter:
          <select value={countryFilter} onChange={handleCountryFilterChange}>
            <option value="">All</option>
            {users.map((user, index) => (
              <option key={`country-${user.country}-${index}`} value={user.country}>
                {user.country}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="filter">
        <label>
          Sector Filter:
          <select value={sectorFilter} onChange={handleSectorFilterChange}>
            <option value="">All</option>
            {users.map((user, index) => (
              <option key={`sector-${user.sector}-${index}`} value={user.sector}>
                {user.sector}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="dataCard revenueCard">
        <Line
          data={{
            labels: aggregatedData.countries.map(data => data.country),
            datasets: [
              {
                label: 'intensity',
                data: aggregatedData.countries.map(data => data.intensity),
                backgroundColor: '#064FF0',
                borderColor: '#064FF0',
              },
              {
                label: 'relevance',
                data: aggregatedData.countries.map(data => data.relevance),
                backgroundColor: '#FF3030',
                borderColor: '#FF3030',
              },
            ],
          }}
          options={{
            elements: {
              line: {
                tension: 0.5,
              },
            },
            plugins: {
              title: {
                text: 'intensity & country',
              },
            },
          }}
        />
      </div>

      <div className="dataCard customerCard">
        <Bar
          data={{
            labels: aggregatedData.countries.map(data => data.country),
            datasets: [
              {
                label: 'Count',
                data: aggregatedData.countries.map(data => data.likelihood),
                backgroundColor: 'rgba(75,192,192,0.6)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
              },
            ],
          }}
          options={{
            scales: {
              x: {
                type: 'category',
              },
              y: {
                beginAtZero: true,
              },
            },
            plugins: {
              title: {
                text: 'Count',
              },
            },
          }}
        />
      </div>

      <div className="dataCard categoryCard">
        <Doughnut
          data={{
            labels: aggregatedData.sectors.map(data => data.sector),
            datasets: [
              {
                label: 'Count',
                data: aggregatedData.sectors.map(data => data.likelihood),
                backgroundColor: [
                  'rgba(43, 63, 229, 1)',
                  'rgba(250, 192, 19, 10)',
                  'rgba(253, 135, 13, 20)',
                  'rgba(111, 12, 130, 30)',
                  'rgba(11, 12, 35, 40)',
                  'rgba(151, 12, 235, 50)',
                  'rgba(121, 12, 13, 60)',
                  'rgba(171, 12, 135, 70)',
                  'rgba(181, 12, 135, 80)',
                  'rgba(11, 122, 135, 90)',
                  'rgba(78, 142, 135, 0.8)',
                  'rgba(51, 63, 135, 0.8)',
                  'rgba(91, 102, 13, 0.8)',
                  'rgba(101, 12, 13, 0.8)',
                  'rgba(11, 12, 135, 0.8)',
                  'rgba(81, 121, 13, 0.8)',
                  'rgba(251, 102, 135, 0.8)',
                  'rgba(131, 142, 35, 0.8)',
                ],
                borderColor: [
                  'rgba(43, 63, 229, 1)',
                  'rgba(250, 192, 19, 10)',
                  'rgba(253, 135, 13, 20)',
                  'rgba(111, 12, 130, 30)',
                  'rgba(11, 12, 35, 40)',
                  'rgba(151, 12, 235, 50)',
                  'rgba(121, 12, 13, 60)',
                  'rgba(171, 12, 135, 70)',
                  'rgba(181, 12, 135, 80)',
                  'rgba(11, 122, 135, 90)',
                  'rgba(78, 142, 135, 0.8)',
                  'rgba(51, 63, 135, 0.8)',
                  'rgba(91, 102, 13, 0.8)',
                  'rgba(101, 12, 13, 0.8)',
                  'rgba(11, 12, 135, 0.8)',
                  'rgba(81, 121, 13, 0.8)',
                  'rgba(251, 102, 135, 0.8)',
                  'rgba(131, 142, 35, 0.8)',
                ],
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                text: 'Likelihood',
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default App;
