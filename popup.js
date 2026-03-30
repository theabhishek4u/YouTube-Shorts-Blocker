document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.getElementById('toggleBlocker');
  
  // Load current state
  chrome.storage.sync.get(['shortsBlockerEnabled'], function(result) {
    const isEnabled = result.shortsBlockerEnabled !== false; // Default to true
    toggle.checked = isEnabled;
    updateUI(isEnabled);
  });

  // Handle toggle change
  toggle.addEventListener('change', function() {
    const isEnabled = toggle.checked;
    
    // Save state to storage
    chrome.storage.sync.set({ shortsBlockerEnabled: isEnabled }, function() {
      updateUI(isEnabled);
    });
  });

  // Update UI appearance
  function updateUI(isEnabled) {
    const body = document.body;
    const statusText = document.getElementById('statusText');
    
    if (isEnabled) {
      body.classList.add('is-active');
      statusText.textContent = 'Shield Active';
    } else {
      body.classList.remove('is-active');
      statusText.textContent = 'Shield Disabled';
    }
  }
});
