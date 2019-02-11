// {(https://boxswap.io/img/tokenImages/zrx.svg,
//     http://api.axieinfinity.com/assets/axies/9318/static/d2bba49.png,
//     “AXIE INFINITY”,
//     “#5459”,
//     “0x Protocol”,
//     “500 ZRX”)}
const { createCanvas, loadImage, Image} = require('canvas')
const request  = require('request');
const fs = require('fs');
const admin = require('firebase-admin');


var url = 'http://api.axieinfinity.com/assets/axies/9318/static/d2bba49.png';

function initimage(){
    const canvas = createCanvas(400, 300)
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'rgba(255,255,255, 1)';
    ctx.fillRect(0, 0, 400, 300);

    return canvas;
}

function drawtext(ctx, str11, str12, str21, str22){
    ctx.fillStyle = 'rgba(255,0,0, 1)';
    ctx.font = '14px Impact';

    ctx.fillText(str11, 40, 200);
    ctx.fillText(str12, 60, 240);
    ctx.fillText(str21, 280, 200);
    ctx.fillText(str22, 300, 240);
}
function drawimage(ctx, posx, posy, buffer, size){
    const img = new Image();

    //drawimage 
    img.onload = () => ctx.drawImage(img,
      0, 0, img.width, img.height, // source dimensions
      posx, posy, size, img.height * size / img.width                 // destination dimensions
    );

    img.onerror = err => { throw err };
    img.src = buffer;
}

function main()
{
    request({ url, encoding: null }, (err, resp, buffer) => {

        //setbackground
        const canvas = initimage();
        ctx = canvas.getContext('2d');
        
        drawtext(ctx, 'AXIE INFINITY', '#5459','0x Protocol', '500 ZRX');
        //first image
        drawimage(ctx, 10, 30, buffer, 140);
        console.log('first image added');
    
        
        url = 'https://boxswap.io/img/tokenImages/zrx.svg';
        request({ url, encoding: null }, (err, resp, buffer2) => {
            //second image
            drawimage(ctx, 250, 30, buffer2, 140);
            console.log("seconde image added");
    
            //arrow image
            drawimage(ctx, 170, 40, 'swap-horiz.png', 60);
            console.log("arrow image added");
    
            //generate file
            const buf = canvas.toBuffer();
            //fs.writeFileSync("res.png", buf);
            
            // out = fs.createWriteStream('./res.png')
            // stream = canvas.pngStream();

            // stream.on('data', chunk => {
            //     out.write(chunk);
            // });

            // stream.on('end', () => {
            //     console.log('saved png');
            // });

            var serviceAccount = require("./test-b34c7-30c9c5737c12.json");

            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
                storageBucket: "gs://test-b34c7.appspot.com"
            });

            
            var name = Number(new Date());
            var storage = admin.storage();
            var bucket = storage.bucket();
            const file = bucket.file(`Mergeimage/${name}-image.png`)
            
            // const out = file.createWriteStream({
            // 	metadata: {
            // 		contentType: 'image/png'
            // 	}
            // });
            file.save(buffer);
        });
    });
}

main();
