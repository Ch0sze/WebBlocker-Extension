chrome.tabs.onCreated.addListener(function(tab) {
  console.log('Tab created:');
  console.log(tab);
  chrome.tas.sendMessage(tab.id, {message: "hello!"});
});