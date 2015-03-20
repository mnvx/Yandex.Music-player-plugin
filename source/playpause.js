// Copyright (c) 2015 Nikolay Matushenkov. All rights reserved.
// Use of this source code is governed by a MIT-style license that can be
// found at http://opensource.org/licenses/MIT.

/**
 * Methods for working with Yandex Music
 */
var yandexMusicGoogleChromePlayer = {

  /**
   * Click at Play/pause button
   */
  onClick: function() {
    var btn = document.getElementsByClassName('player-controls__btn_play');
    if (btn.length == 0) {
      chrome.extension.sendRequest("error");
      return;
    }
    var btnPlay = btn[0];
    
    if (btnPlay.classList.contains('player-controls__btn_pause')) {
      chrome.extension.sendRequest("pause");
    }
    else {
      chrome.extension.sendRequest("play");
    }
    // Нажмём кнопку Play/pause
    btnPlay.click();
  }

};

yandexMusicGoogleChromePlayer.onClick();