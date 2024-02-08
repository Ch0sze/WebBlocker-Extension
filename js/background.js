// Listen for changes to the list of blocked URLs
chrome.storage.sync.onChanged.addListener((changes, namespace) => {
    if (namespace === "sync" && changes.blockedUrls) {
      const blockedUrls = changes.blockedUrls.newValue || [];
      chrome.webRequest.onBeforeRequest.addListener(
        function(details) {
          if (blockedUrls.some(url => details.url.includes(url))) {
            return { cancel: true };
          }
        },
        { urls: ["<all_urls>"] },
        ["blocking"]
      );
    }
  });
  
  // Initialize the listener
  chrome.storage.sync.get("blockedUrls", function (data) {
    const blockedUrls = data.blockedUrls || [];
    chrome.webRequest.onBeforeRequest.addListener(
      function(details) {
        if (blockedUrls.some(url => details.url.includes(url))) {
          return { cancel: true };
        }
      },
      { urls: ["<all_urls>"] },
      ["blocking"]
    );
  });
  