async function connctionToBle() {
    try {
        const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true
        });
        console.log('選択されたデバイス:', device.name);
    } catch(error) {
        console.log('デバイスの選択に失敗しました:', error);
    }
}

/** constant init  */
let image;
let image_name = '';
let height = 160;
let weight = 128;

$(function() {
    $('.connect_btn').click(function(){
        connctionToBle();
    });

    $('#file_put_btn').change(function(){
        var image = imageLoad();
    });

});

// ファイルの取得処理
function imageLoad() {
    var image = $('#file_put_btn')[0].files[0];
    if (!image) {
        alert('ファイルが選択されていません');
    } else {
        console.log(image);
    }
}

// 画像ファイルリサイズ
function resize() {
    
}
