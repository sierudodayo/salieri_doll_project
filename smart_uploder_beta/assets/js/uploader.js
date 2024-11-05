/* init */
const reader = new FileReader();
const canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// connection 
let connectionStatus = false;


window.onload = function() {
    // 接続状態表示遷移
    checkConnectStatus();
}

$(function() {

});


const inputImage = document.getElementById('file_put_btn');
inputImage.addEventListener("change", () => {

    let file = inputImage.files[0];
    reader.readAsDataURL(file);

    reader.onload = () => {
        let image = new Image();
        image.src = reader.result;

        image.onload = () => {
            canvas.width = 128;
            canvas.height = 160;

            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        }
    }
});

/* Web Bluetooth API */
async function connctionToBle() {
    try {
        const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true
        });
        connectionStatus = true;
        console.log('選択されたデバイス:', device.name);
    } catch(error) {
        console.log('デバイスの選択に失敗しました:', error);
    }
}

function checkConnectStatus() {
    if (!connectionStatus) {
        $('#connectStatus').text("未接続");
        console.log("未接続");
    } else {
        $('#connectStatus').text("接続");
        console.log("接続完了");
    }
}