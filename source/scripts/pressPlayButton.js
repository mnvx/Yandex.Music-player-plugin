//Найдём кнопку с id="play"
var playButton = document.getElementById('play');

//Если ее еще нет, то присвоим нужной кнопке этот id
if (playButton == null) {
        //Найдём саму кнопку
        var button = $('.b-jambox__play');
        button.attr('id', 'play');

        //И повесим обработчик
        playButton = document.getElementById('play');
        playButton.addEventListener('click',function () {
	        if (button.hasClass('b-jambox__play_state_play')) {
	        	chrome.extension.sendRequest("playing");
        	}
	        else {
	                chrome.extension.sendRequest("paused");
	        }
        }, false);
}

//Нажмём кнопку
var evt = document.createEvent("MouseEvents");
evt.initMouseEvent("click",
    true,true,this,0,0,0,0,0,false,false,false,false,0, null
);
playButton.dispatchEvent(evt);





