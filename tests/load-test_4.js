// Two concurrent scenarios in same test - calling two endpoints
// Can be logged to K6 Cloud

import http from 'k6/http';
import { check } from 'k6';

export const options = {
  discardResponseBodies: true,
  scenarios: {
    weatherforecast: {
      exec: 'weatherforecast',
      executor: 'constant-arrival-rate',
      duration: '30s',
      rate: 90,
      timeUnit: '1s',
      preAllocatedVUs: 10,
      maxVUs: 25,
    },
    swagger: {
      exec: 'swagger',
      executor: 'constant-arrival-rate',
      duration: '30s',
      rate: 10,
      timeUnit: '1s',
      preAllocatedVUs: 10,
      maxVUs: 25,
    },
  },
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(95)<200'], // 95% of requests should be below 200ms
  },
};

export function weatherforecast () {
  const res = http.get('https://localhost:7150/weatherforecast');
  check(res, { 'status was 200': (r) => r.status == 200 });
}

export function swagger () {
  const res = http.get('https://localhost:7150/swagger');
  check(res, { 'status was 200': (r) => r.status == 200 });
}