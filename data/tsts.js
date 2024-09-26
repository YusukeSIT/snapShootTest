



document.addEventListener('click', () => {
  if (window.DeviceMotionEvent && window.DeviceMotionEvent.requestPermission) {
    DeviceMotionEvent.requestPermission()
                     .then((state) => {
                       if (state === 'granted') {

                          document.querySelectorAll('.permission_ui').forEach((del) => {
                            del.setAttribute('class', 'deleted_ui');
                          });
                          document.getElementById('main').removeAttribute('style');
                          document.getElementById('SideUIWrapper').removeAttribute('style');
                          document.getElementById('shutter').removeAttribute('style');

                       } else {                        
                        document.getElementById("discription").innerHTML = "ブラウザの「カメラ」　「動作の取得」を許可してください"
                       }
                     })
                     .catch((err) => console.error(err));
  } else {

    document.querySelectorAll('.permission_ui').forEach((del) => {
      del.setAttribute('class', 'deleted_ui');
    });
    document.getElementById('main').removeAttribute('style');
    document.getElementById('SideUIWrapper').removeAttribute('style');
    document.getElementById('shutter').removeAttribute('style');
  }
}, {
  once: true
});