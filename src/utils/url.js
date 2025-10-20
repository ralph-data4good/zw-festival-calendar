/**
 * Gets a query parameter from the URL
 * @param {string} key - Query parameter key
 * @returns {string|null} Query parameter value
 */
export function getQueryParam(key) {
  const params = new URLSearchParams(window.location.search);
  return params.get(key);
}

/**
 * Sets a query parameter in the URL without reloading
 * @param {string} key - Query parameter key
 * @param {string|null} value - Query parameter value (null to remove)
 */
export function setQueryParam(key, value) {
  const url = new URL(window.location);
  if (value === null || value === '') {
    url.searchParams.delete(key);
  } else {
    url.searchParams.set(key, value);
  }
  window.history.pushState({}, '', url);
}

/**
 * Sets multiple query parameters at once
 * @param {Object} params - Object of key-value pairs
 */
export function setQueryParams(params) {
  const url = new URL(window.location);
  Object.entries(params).forEach(([key, value]) => {
    if (value === null || value === '') {
      url.searchParams.delete(key);
    } else {
      url.searchParams.set(key, value);
    }
  });
  window.history.pushState({}, '', url);
}

/**
 * Gets all query parameters as an object
 * @returns {Object} All query parameters
 */
export function getAllQueryParams() {
  const params = new URLSearchParams(window.location.search);
  const result = {};
  params.forEach((value, key) => {
    result[key] = value;
  });
  return result;
}

