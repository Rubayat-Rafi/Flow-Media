
import { useEffect } from 'react';

const MALICIOUS_EXTENSIONS = [
  {
    name: 'm3u8 Sniffer TV',
    identifiers: ['m3u8-sniffer', 'm3u8_sniffer_tv'],
    domSelectors: ['#m3u8-sniffer-element', '[extension-id*="m3u8"]']
  },
  {
    name: 'FetchV Video Downloader',
    identifiers: ['fetchv', 'fetch-v'],
    domSelectors: ['.fetchv-container', '[class*="fetchv"]']
  },
  {
    name: 'M3U8 Catcher by Chris',
    identifiers: ['m3u8-catcher'],
    domSelectors: ['#m3u8-catcher', '[data-extension*="chris-m3u8"]']
  },
  {
    name: 'HLS Player',
    identifiers: ['hls-player-ext', 'm3u8-player'],
    domSelectors: ['#hls-player-extension', 'video[hls-extension]']
  }
];

const useSilentExtensionBlocker = () => {
  useEffect(() => {
    const checkForExtensions = () => {
      // Check DOM elements
      const hasExtension = MALICIOUS_EXTENSIONS.some(ext => {
        return ext.domSelectors.some(selector => 
          document.querySelector(selector) !== null
        );
      });

      // Check window object for extension APIs
      const hasWindowHooks = 
        window.m3u8Sniffer !== undefined ||
        window.fetchVExtension !== undefined ||
        window.hlsDownloader !== undefined;

      if (hasExtension || hasWindowHooks) {
        // Clear the entire page content silently
        document.body.innerHTML = '';
        
        // Optional: Redirect after a delay
        setTimeout(() => {
          window.location.href = '/'; // Redirect to home or 404
        }, 100);
      }
    };

    // Initial check
    checkForExtensions();

    // Set up periodic checks
    const interval = setInterval(checkForExtensions, 5000);
    
    return () => clearInterval(interval);
  }, []);
};

export default useSilentExtensionBlocker;