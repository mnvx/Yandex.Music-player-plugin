// Copyright (c) 2015 Nikolay Matushenkov. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found at http://opensource.org/licenses/MIT.

/**
 * Methods for working with Yandex Music
 */
var yandexMusicGoogleChromePlugin = {

  /**
   * Адрес Yandex Music
   */
  url: 'https://music.yandex.ru/',

  /**
   * Является url Yandex Music
   */
  isPleerUrl: function(url) {
    return url.indexOf(this.url) == 0;
  },
  
  /**
   * Открыть плеер в новой вкладке
   */
  openPleerInNewTab: function() {
    var tab = chrome.tabs.create({
      "url": this.url
    });
    return tab.id;
  },

  /**
   * Click on YM button
   */
  onClick: function() {
    var this_ = this;
    // Ищем вкладку с Yandex Music
    chrome.tabs.getAllInWindow(undefined, function(tabs) {
      for (var i = 0, tab; tab = tabs[i]; i++) {
        if (tab.url && this_.isPleerUrl(tab.url)) {
          this_.proccessClick(tab.id);
          return;
        }
      }
      // Если вкладку не нашли, то откроем плеер в новой вкладке
      this_.openPleerInNewTab();
    });
  },

  /**
   * Отправка сообытия в плеер (нажали play/pause)
   */
  proccessClick: function(tabId) {
    chrome.tabs.executeScript(tabId, {
      file: "player.js"
    });
  }

};

// Обработчик нажатия на иконку расширения
chrome.browserAction.onClicked.addListener(function(tab) {
  yandexMusicGoogleChromePlugin.onClick();
});

// Обработка ттвета от player.js
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  chrome.browserAction.setIcon({
    path: "favicon_" + request + ".ico"
  });
});
