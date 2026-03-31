(function (window, document) {
  const defaultConfig = {
    token: '',
    api_host: 'https://us.i.posthog.com',
    defaults: '2026-01-30',
    autocapture: true,
    capture_pageview: false,
    capture_pageleave: true,
    person_profiles: 'identified_only',
    persistence: 'localStorage+cookie',
    debug: false
  };

  const config = Object.assign({}, defaultConfig, window.PAYEEPROOF_POSTHOG_CONFIG || {});
  const token = String(config.token || '').trim();
  const apiHost = String(config.api_host || defaultConfig.api_host).trim().replace(/\/$/, '');
  const enabled = !!token && !/^REPLACE_WITH_POSTHOG/i.test(token);
  const queue = [];

  function storageAvailable(storage) {
    try {
      const key = '__pp_analytics_test__';
      storage.setItem(key, '1');
      storage.removeItem(key);
      return true;
    } catch (error) {
      return false;
    }
  }

  const hasSessionStorage = storageAvailable(window.sessionStorage);
  const hasLocalStorage = storageAvailable(window.localStorage);

  function getStorage(scope) {
    if (scope === 'local') return hasLocalStorage ? window.localStorage : null;
    return hasSessionStorage ? window.sessionStorage : null;
  }

  function readStorage(storage, key) {
    if (!storage) return null;
    try {
      return storage.getItem(key);
    } catch (error) {
      return null;
    }
  }

  function writeStorage(storage, key, value) {
    if (!storage) return;
    try {
      storage.setItem(key, value);
    } catch (error) {}
  }

  function onReady(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback, { once: true });
      return;
    }
    callback();
  }

  function baseProperties(properties) {
    return Object.assign(
      {
        page_path: window.location.pathname,
        page_url: window.location.href,
        page_title: document.title
      },
      properties || {}
    );
  }

  function enqueue(method, args) {
    if (window.posthog && typeof window.posthog[method] === 'function') {
      try {
        window.posthog[method].apply(window.posthog, args);
      } catch (error) {}
      return;
    }
    queue.push([method, args]);
  }

  function flushQueue() {
    if (!window.posthog) return;
    while (queue.length) {
      const item = queue.shift();
      const method = item[0];
      const args = item[1];
      if (typeof window.posthog[method] !== 'function') continue;
      try {
        window.posthog[method].apply(window.posthog, args);
      } catch (error) {}
    }
  }

  function capture(eventName, properties) {
    if (!enabled || !eventName) return false;
    enqueue('capture', [eventName, baseProperties(properties)]);
    return true;
  }

  function captureOnce(storageKey, eventName, properties, options) {
    if (!enabled || !storageKey || !eventName) return false;
    const scope = options && options.scope === 'local' ? 'local' : 'session';
    const storage = getStorage(scope);
    if (storage && readStorage(storage, storageKey)) return false;
    writeStorage(storage, storageKey, '1');
    return capture(eventName, properties);
  }

  function identify(distinctId, properties) {
    if (!enabled || !distinctId) return false;
    enqueue('identify', [distinctId, properties || {}]);
    return true;
  }

  function captureBodyViewEvent() {
    const body = document.body;
    if (!body) return;
    const eventName = body.getAttribute('data-analytics-view');
    if (!eventName) return;
    const pageName = body.getAttribute('data-analytics-page') || eventName;
    capture(eventName, { page_name: pageName });
  }

  const analytics = window.PayeeProofAnalytics = window.PayeeProofAnalytics || {};
  analytics.enabled = function () { return enabled; };
  analytics.capture = capture;
  analytics.captureOnce = captureOnce;
  analytics.identify = identify;
  analytics.page = captureBodyViewEvent;

  if (!enabled) return;

  function initPostHog() {
    if (!window.posthog || typeof window.posthog.init !== 'function') return;
    window.posthog.init(token, {
      api_host: apiHost,
      defaults: config.defaults,
      autocapture: !!config.autocapture,
      capture_pageview: !!config.capture_pageview,
      capture_pageleave: !!config.capture_pageleave,
      person_profiles: config.person_profiles,
      persistence: config.persistence,
      debug: !!config.debug
    });
    flushQueue();
    onReady(captureBodyViewEvent);
  }

  if (window.posthog && typeof window.posthog.init === 'function') {
    initPostHog();
    return;
  }

  const script = document.createElement('script');
  script.async = true;
  script.crossOrigin = 'anonymous';
  script.src = apiHost + '/static/array.js';
  script.onload = initPostHog;
  document.head.appendChild(script);
})(window, document);
