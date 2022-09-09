// Este script se ejecutara al presionar el icono de la extension
chrome.action.onClicked.addListener((tab) => {
  // Se ejecutara el script guardado con el nombre "scraper.js"
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    files: ['scraper.js']
  });
});