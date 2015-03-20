// Copyright (c) 2015 Nikolay Matushenkov. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found at http://opensource.org/licenses/MIT.

/**
 * Methods for working with Yandex Music
 */
var yandexMusicGoogleChromePrevious = {

  /**
   * Click at Previous button
   */
  onClick: function() {
    var btn = document.getElementsByClassName('player-controls__btn_prev');
    if (btn.length == 0) {
      chrome.extension.sendRequest("error");
      return;
    }
    var btnPrevious = btn[0];
    chrome.extension.sendRequest("play");

    // Нажмём кнопку Previous
    btnPrevious.click();
  }

};

yandexMusicGoogleChromePrevious.onClick();