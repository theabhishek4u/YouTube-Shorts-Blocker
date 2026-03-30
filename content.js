// YouTube Shorts Blocker - Content Script

(function() {
  'use strict';

  let isEnabled = true;
  let shortsPageCheckInterval = null;

  // Initialize the blocker
  function init() {
    // Get saved state from storage
    chrome.storage.sync.get(['shortsBlockerEnabled'], function(result) {
      isEnabled = result.shortsBlockerEnabled !== false; // Default to true
      updateBlockerState();
      startObserver();
      checkForShortsPage();
    });

    // Listen for changes to the enabled state
    chrome.storage.onChanged.addListener(function(changes, namespace) {
      if (changes.shortsBlockerEnabled) {
        isEnabled = changes.shortsBlockerEnabled.newValue;
        updateBlockerState();
        if (isEnabled) {
          checkForShortsPage();
        }
      }
    });
  }

  // Update the body class based on enabled state
  function updateBlockerState() {
    if (isEnabled) {
      document.body.classList.add('shorts-blocker-enabled');
    } else {
      document.body.classList.remove('shorts-blocker-enabled');
    }
  }



  // Check if we're on a Shorts page and redirect
  function checkForShortsPage() {
    if (!isEnabled) return;

    const url = window.location.href;
    if (url.includes('/shorts/')) {
      // Redirect to home page
      window.location.replace('https://www.youtube.com/');
    }
  }

  // Remove Shorts elements that might slip through CSS
  function removeShortsElements() {
    if (!isEnabled) return;

    // Remove Shorts shelf containers
    const shortsSelectors = [
      'ytd-reel-shelf-renderer',
      'ytd-rich-shelf-renderer[is-shorts]',
      'ytd-rich-section-renderer:has(ytd-rich-shelf-renderer[is-shorts])'
    ];

    shortsSelectors.forEach(selector => {
      try {
        document.querySelectorAll(selector).forEach(el => {
          el.style.display = 'none';
        });
      } catch (e) {
        // :has() might not be supported, fallback handled by CSS
      }
    });

    // Remove individual Shorts videos - only lockup components, not regular videos
    document.querySelectorAll('ytm-shorts-lockup-view-model, ytm-shorts-lockup-view-model-v2').forEach(el => {
      el.style.display = 'none';
    });
  }

  // MutationObserver to handle dynamically loaded content
  function startObserver() {
    const observer = new MutationObserver((mutations) => {
      let shouldCheck = false;
      
      for (const mutation of mutations) {
        if (mutation.addedNodes.length > 0) {
          shouldCheck = true;
          break;
        }
      }

      if (shouldCheck) {
        removeShortsElements();
      }
    });

    // Start observing once the body is available
    if (document.body) {
      updateBlockerState();
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    } else {
      document.addEventListener('DOMContentLoaded', () => {
        updateBlockerState();
        observer.observe(document.body, {
          childList: true,
          subtree: true
        });
      });
    }

    // Also check on URL changes (YouTube is a SPA)
    let lastUrl = location.href;
    new MutationObserver(() => {
      const url = location.href;
      if (url !== lastUrl) {
        lastUrl = url;
        updateBlockerState(); // Re-check if we should block on this page
        checkForShortsPage();
        removeShortsElements();
      }
    }).observe(document, { subtree: true, childList: true });
  }

  // Start the extension
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Also run immediately to catch early loads
  checkForShortsPage();
})();
