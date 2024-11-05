/* init */
const reader = new FileReader();
const canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

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
        console.log('選択されたデバイス:', device.name);
    } catch(error) {
        console.log('デバイスの選択に失敗しました:', error);
    }
}
