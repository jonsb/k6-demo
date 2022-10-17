// With options - scenario/constant vus and thresholds

import http from 'k6/http';
import { check } from 'k6';

export const options = {
  discardResponseBodies: true,
  scenarios: {
    weatherforecast: {
      executor: 'constant-vus',
      vus: 10,
      duration: '30s',
    },
  },
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(95)<200'], // 95% of requests should be below 200ms
  },
};

export default function () {
  const res = http.get('https://localhost:7150/weatherforecast');
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}