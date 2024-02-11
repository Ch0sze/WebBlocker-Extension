'use strict';

chrome.declarativeNetRequest.onRuleMatchedDebug.addListener((e) => {
  const msg = `Navigation blocked to ${e.request.url} on tab ${e.request.tabId}.`;
  console.log(msg);
});

console.log('Service worker started.');

chrome.tabs.onActivated.addListener(function(activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function(tab) {
    console.log('Tab changed to', tab.url);
    var cutUrl = rewriteURL(tab.url);
    console.log(cutUrl);
  });
});

function rewriteURL(url) {
  // Create a new URL object
  let parsedUrl = new URL(url);
  
  // Construct the basic address
  let basicAddress = parsedUrl.hostname;
  
  return basicAddress;
}