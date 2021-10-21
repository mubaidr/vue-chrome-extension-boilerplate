let settings = {
  isEnabled: true,
}

// dfault settings for development enviroment
if (process.env.NODE_ENV === 'development') {
  settings = {
    isEnabled: true,
  }

  console.info('Extension initiliazed with settings: ', settings)
}

function loadSettings() {
  chrome.storage.sync.get(items => {
    if (items.settings) settings = items.settings
  })
}

function saveSettings(updated) {
  if (updated) settings = updated

  chrome.storage.sync.set({
    settings,
  })
}

chrome.runtime.onMessage.addListener(message => {
  if (!settings.isEnabled) return

  console.log(message, settings)
})

chrome.runtime.onInstalled.addListener(() => {
  saveSettings()
})

loadSettings()
