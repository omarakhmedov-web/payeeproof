window.PAYEEPROOF_POSTHOG_CONFIG = window.PAYEEPROOF_POSTHOG_CONFIG || {
  token: 'REPLACE_WITH_POSTHOG_PROJECT_API_KEY',
  api_host: 'https://us.i.posthog.com',
  defaults: '2026-01-30',
  autocapture: true,
  capture_pageview: false,
  capture_pageleave: true,
  person_profiles: 'identified_only',
  persistence: 'localStorage+cookie',
  debug: false
};
