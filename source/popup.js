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
   * Интервал ожидания даблклика, мс
   */
  interval: 300,

  /**
   * Если в настоящий момент обрабатывюется клики (для эмуляции дабл клика)
   */
  processingClick: false,

  /**
   * Для подсчета количества кликов
   */
  clickCount: 0,

  /**
   * Является ли url Yandex Music
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
    chrome.tabs.query({}, function(tabs) {
      for (var i = 0, tab; tab = tabs[i]; i++) {
        if (tab.url && this_.isPleerUrl(tab.url)) {
          this_.clickCount++;
          if (this_.clickCount == 1) {
            setTimeout(function () {
              this_.proccessClick(tab.id);
            }, this_.interval);
          }
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
    var this_ = this;
    if (this_.clickCount == 1) {
      chrome.tabs.executeScript(tabId, {
        file: "playpause.js"
      });
      this_.clickCount = 0;
    }
    else {
      // После даблклика подождем, может будет 3-й клик
      setTimeout(function () {
        if (this_.clickCount == 2) {
          chrome.tabs.executeScript(tabId, {
            file: "next.js"
          });
        }
        else {
          chrome.tabs.executeScript(tabId, {
            file: "previous.js"
          });
        }
        this_.clickCount = 0;
      }, this_.interval);
    }
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
