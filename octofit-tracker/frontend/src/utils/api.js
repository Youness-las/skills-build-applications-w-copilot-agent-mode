/**
 * Get the API base URL based on environment
 * Supports both GitHub Codespaces and localhost development
 */
export function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }
  
  // Fallback to localhost
  return 'http://localhost:8000';
}

/**
 * Fetch with error handling
 */
export async function fetchAPI(endpoint, options = {}) {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}
