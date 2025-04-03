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

// $(function() {

// });


const inputImage = document.getElementById('file_put_btn');
inputImage.addEventListener("change", () => {

    let file = inputImage.files[0];
    reader.readAsDataURL(file);

    reader.onload = () => {
        let image = new Image();
        image.src = reader.result;

        image.onload = () => {
            canvas.width = 80;
            canvas.height = 160;

            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        }
    }
});

/* Web Bluetooth API */
// async function connctionToBluetooth() {
//     try {
//         const SERVICE_UUID = "b65ac29b-346b-4c47-a64c-c6785bb7800b";
//         const device = await navigator.bluetooth.requestDevice({
//             acceptAllDevices: true,
//             optionalServices: [SERVICE_UUID]
//         });
//         connectionStatus = true;
//         console.log('選択されたデバイス:', device.name);

//         const server = await device.gatt.connect();
//         console.log("connected");
//         const services = await server.getPrimaryServices();
//         console.log("services", services);

//         if (server) {
//             console.log( "connect true;");
//             console.log(server);
//         } else {
//             console.log( "connect false;");
//         }
//     } catch(error) {
//         console.log('デバイスの選択に失敗しました:', error);
//     }
// }

// TEST web bluetooth
const SERVICE_UUID = "b65ac29b-346b-4c47-a64c-c6785bb7800b";
const CHARACTERISTIC_UUID = "9b3f623b-9c48-4fca-840e-b43e6b4fc8e5";
let characteristic;

async function sendImage() {
    const fileInput = document.getElementById('file_put_btn');
    
    if (!fileInput.files.length) {
        console.log("not read Image file !!");
    }

    const file = fileInput.files[0];
    const imageData = await file.arrayBuffer();
    const uint8Data = new Uint8Array(imageData);
    const totalLength = uint8Data.length;

    console.log(`Image file loaded : ${totalLength} bytes.`);

    try {
        const device = await navigator.bluetooth.requestDevice({
            filters: [{ name: "SmartPhoneForDolls"}],
            optionalServices: [SERVICE_UUID]
        });
        const server = await device.gatt.connect();
        const service = await server.getPrimaryService(SERVICE_UUID);
        characteristic = await service.getCharacteristic(CHARACTERISTIC_UUID);

        console.log("connected to ESP32");

        const chunkSize = 244;
        for (let i = 0; i < totalLength; i+= chunkSize) {
            const chunk = uint8Data.slice(i, i + chunkSize);
            await characteristic.writeValue(chunk);
            console.log(`Status sent ${i + chunk.length} / ${totalLength} bytes`);
            await new Promise(resoleve => setTimeout(resoleve, 10));
        }

        // fin data
        // let endStr = Uint8Array.from(0x00);
        // console.log(endStr);
        // await characteristic.writeValue(endStr);
        console.log("completed send image file.");
    } catch (e) {
        console.log("error!!");
        console.log(e);
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


// receive image file 
async function receiveImage() {
    
}

$(function() {
    $('.connect_btn').on('click', function() {
        connctionToBluetooth();
    });
});