import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 20 },   // Ramp up
    { duration: '30s', target: 20 },   // Sustain
    { duration: '10s', target: 0 },    // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% under 500ms
  },
};

export default function () {
  const res = http.get('http://127.0.0.1:3000/');
  check(res, { 'status 200': (r) => r.status === 200 });
  sleep(1);
}
