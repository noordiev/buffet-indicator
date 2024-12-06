
import fs from 'fs';
import https from 'https';

const fredAPIKey = process.env.FRED_KEY;
if (!fredAPIKey) {
  console.error("FRED_KEY is not set. Exiting.");
  process.exit(1);
}

const BASE_URL = 'https://api.stlouisfed.org/fred/series/observations';
const GDP_SERIES_ID = 'GDP';
const WILSHIRE_SERIES_ID = 'WILL5000IND';

function fetchSeriesData(seriesId) {
  const url = `${BASE_URL}?series_id=${seriesId}&api_key=${fredAPIKey}&file_type=json&sort_order=desc&limit=5000`;
  
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json && json.observations) {
            resolve(json.observations);
          } else {
            reject(`No observations for series ${seriesId}`);
          }
        } catch (err) {
          reject(err);
        }
      });
    }).on('error', reject);
  });
}

async function main() {
  try {
    const [gdpData, wilshireData] = await Promise.all([
      fetchSeriesData(GDP_SERIES_ID),
      fetchSeriesData(WILSHIRE_SERIES_ID)
    ]);

    // Example data structure for data.json:
    // {
    //   "timestamp": "2024-12-06T00:00:00Z",
    //   "gdp": [{ "date": "2024-07-01", "value": "23456.7" }, ...],
    //   "wilshire": [{ "date": "2024-12-05", "value": "4200000" }, ...]
    // }

    const output = {
      timestamp: new Date().toISOString(),
      gdp: gdpData.map(d => ({ date: d.date, value: d.value })),
      wilshire: wilshireData.map(d => ({ date: d.date, value: d.value }))
    };

    fs.writeFileSync('data.json', JSON.stringify(output, null, 2));
    console.log("data.json updated successfully.");
  } catch (error) {
    console.error("Error fetching data:", error);
    process.exit(1);
  }
}

main();

