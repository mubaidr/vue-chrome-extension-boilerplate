// OnInstall handler
chrome.runtime.onInstalled.addListener(details => {
  console.log(details)
})

chrome.webRequest.onBeforeRequest.addListener(
  (a, b, c, d, e) => {
    console.log(a, b, c, d, e)
  },
  {
    urls: ['http://*/*', 'https://*/*']
  },
  ['blocking', 'requestBody']
)
