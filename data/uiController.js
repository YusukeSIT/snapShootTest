let uiButton = document.getElementById("UIVisibilityButton");
let sideUI = document.getElementById("SideUIWrapper");
var visible = true;

function changeUI() {
	if (visible == true) {
		sideUI.setAttribute('style', 'left:-200px');
		uiButton.setAttribute('value', '≫');
		uiButton.setAttribute('style', 'float:left');
		visible = false;
	}
	else if (visible == false) {
		sideUI.setAttribute('style', 'display:block');
		uiButton.setAttribute('value', '≪');
		uiButton.setAttribute('style', 'float:right');
		visible = true;
	}
}

let pW = document.getElementById('width');

pW.addEventListener('input', function() {
	pWidth = pW.value;
});



let pipeNumber = document.getElementById('pNumber');

pipeNumber.addEventListener('input', function() {
	deletePipes();
	pNumber = pipeNumber.value;
	createPipes();
});



let freqController = document.getElementById("freq");

freqController.addEventListener('input', function() {
	let buttons = document.getElementsByName("frequency");
	for(let i = 0; i < 3; i++) {
		if(buttons[i].checked) {
			frequ = buttons[i].getAttribute('value');
		}
	}
});



let DeviceVisible = document.getElementById('visible');

DeviceVisible.addEventListener('input', function() {
	let devices = document.getElementsByClassName('device');
	if (DeviceVisible.checked) {
		for (let i = 0; i < devices.length; i++) {
			devices[i].setAttribute('visible', 'true');
		}
	}
	else {
		for (let i = 0; i < devices.length; i++) {
			devices[i].setAttribute('visible', 'false');
		}
	}
});



var image = document.querySelector('#snap');
var take_photo_btn = document.querySelector('#take-photo');
var delete_photo_btn = document.querySelector('#delete-photo');
var download_photo_btn = document.querySelector('#download-photo');

//スナップショットボタン
take_photo_btn.addEventListener("click", function (e) {
    e.preventDefault();
    var video = document.querySelector('video');
    var snap = takeSnapshot(video);

    //スナップショット表示.
    image.setAttribute('src', snap);
    image.classList.add('visible');

    // 削除ボタンと保存ボタン有効
    delete_photo_btn.classList.remove("disabled");
    download_photo_btn.classList.remove("disabled");

    // 保存ボタンにスナップショットを渡す
    download_photo_btn.href = snap;
});

//削除ボタン
delete_photo_btn.addEventListener("click", function(e){

    e.preventDefault();

    // スナップショットを隠す
    image.setAttribute('src', "");
    image.classList.remove("visible");

    // 削除ボタンと保存ボタン無効
    delete_photo_btn.classList.add("disabled");
    download_photo_btn.classList.add("disabled");

});

//スナップショットを撮る
function takeSnapshot(video) {
    var resizedCanvas = document.createElement("canvas");
    var resizedContext = resizedCanvas.getContext("2d");
    var width = video.videoWidth;
    var height = video.videoHeight;
    var aScene = document.querySelector("a-scene").components.screenshot.getCanvas("perspective");

    if (width && height) {
        //videoのサイズをキャンバスにセット
        resizedCanvas.width = width;
        resizedCanvas.height = height;
        //キャンバスにvideoをコピー
        resizedContext.drawImage(video, 0, 0, width, height);

        //カメラの画角でar側の縮小処理を変える
        if (width > height) {
            // 横長（PC)
            resizedContext.drawImage(aScene, 0, 0, width, height);
        } else {
            // 縦長（スマホ）
            var scale = height / width;
            var scaledWidth = height * scale;
            var marginLeft = (width - scaledWidth) / 2;
            resizedContext.drawImage(aScene, marginLeft, 0, scaledWidth, height);
        }
        return resizedCanvas.toDataURL('image/png');
    }
}
