// Authentication needed - setup method

import http from 'k6/http';
import { check } from 'k6';

export const options = {
  scenarios: {
    protectedForecast: {
      exec: 'protectedForecast',
      executor: 'constant-arrival-rate',
      duration: '1s',
      rate: 1,
      timeUnit: '1s',
      preAllocatedVUs: 10,
      maxVUs: 50,
    },
  },
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(95)<200'], // 95% of requests should be below 200ms
  },
};

export function setup() {
  
  const url = 'https://login.microsoftonline.com/76998163-a8cf-4ef2-8451-0e30c33d1459/oauth2/v2.0/token'
  
  const requestBody = {
    client_id: '53abab84-2561-49df-b653-b3b9d9a58803',
    client_secret: __ENV.client_secret,
    scope: 'api://53abab84-2561-49df-b653-b3b9d9a58803/.default',
  };

  requestBody['grant_type'] ='client_credentials';

  const response = http.post(url, requestBody);
  return response.json();
}

export function protectedForecast(authResponse) {

  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authResponse.access_token}`
    }
  };

  const res = http.get(`https://${__ENV.host}/protectedforecast`, params);
  check(res, { 'status was 200': (r) => r.status == 200 });
}