//wait for page loading
document.addEventListener('DOMContentLoaded',function(){
    var canvas = document.getElementById('cv');
    var context = canvas.getContext('2d');
    
    let smallRadius = 20;
    let bigRadius = 30;
    let figurePos = {
        x: 150,
        y: 150,
    }
  
    
    let a = calcArray(smallRadius,bigRadius);
    print(a);

    document.querySelector('.smallButton').addEventListener('click',async function(){
        smallRadius = document.querySelector('.small').value;
        await context.clearRect(0, 0, canvas.width, canvas.height);
        let a = await calcArray(smallRadius,bigRadius);
        await print(a);
    });

    document.querySelector('.bigButton').addEventListener('click', async function(){
        bigRadius = document.querySelector('.big').value;
        await context.clearRect(0, 0, canvas.width, canvas.height);
        let a = await calcArray(smallRadius,bigRadius);
        await print(a);

    })



    function print(a){

        context.beginPath();
        context.lineWidth = 5;
        for(let i = 0; i < a.length; i++){
            if(a[i][2] == "move"){
                context.stroke();
                context.moveTo(a[i][0],a[i][1]);
            }else{
                context.lineTo(a[i][0],a[i][1]);
            }
            context.stroke();
        }
        context.stroke();
        context.closePath();
        
    }


    function calcArray(smallRadius,bigRadius){
        let arr = [];
        arr.push([figurePos.x-50, figurePos.y-25,"move"])
        arr.push([figurePos.x,figurePos.y-50]);
        arr.push([figurePos.x+50,figurePos.y-25]);
        arr.push([figurePos.x+50,figurePos.y+25]);
        arr.push([figurePos.x,figurePos.y+50]);
        arr.push([figurePos.x-50,figurePos.y+25]);
        arr.push([figurePos.x-50,figurePos.y-27]);

        var step = 2 * Math.PI / 20; // примечание 2 
        let Xpos, Ypos;

        arr.push([Math.cos(0) * smallRadius+figurePos.x, Math.sin(0) * smallRadius+figurePos.y ,"move" ]);
        for(var angle = 0; angle <= 2 * Math.PI; angle += step) {
            Xpos = Math.cos(angle) * smallRadius;
            Ypos = Math.sin(angle) * smallRadius;   
            arr.push([Xpos+figurePos.x,Ypos+figurePos.y]);
        }

        arr.push([Math.cos(- 1/7 * Math.PI) * smallRadius+figurePos.x, Math.sin(- 1/7 * Math.PI) * smallRadius+figurePos.y + 50  ,"move"]);
        for(var angle = - 1/7 * Math.PI; angle <= 10/8 * Math.PI; angle += step) {
            Xpos = Math.cos(angle) * smallRadius;
            Ypos = Math.sin(angle) * smallRadius;
            // context.lineTo(Xpos+figurePos.x,Ypos+figurePos.y+50);    
            arr.push([Xpos+figurePos.x,Ypos+figurePos.y+50]);
        }

       arr.push([Math.cos(7/8 * Math.PI)  * smallRadius + figurePos.x,   Math.sin(7/8 * Math.PI) * smallRadius+figurePos.y-50  ,"move"]);
        for(var angle = 7/8 * Math.PI; angle <= 22/10 * Math.PI; angle += step) {
            Xpos = Math.cos(angle) * smallRadius;
            Ypos = Math.sin(angle) * smallRadius;
            arr.push([Xpos+figurePos.x,Ypos+figurePos.y-50])
        }

        arr.push([Math.cos(1/13 * Math.PI)  * smallRadius + figurePos.x - 50,   Math.sin(1/13 * Math.PI) * smallRadius+figurePos.y+30 ,"move"]);
        for(var angle = 1/13 * Math.PI; angle <= 3/2 * Math.PI; angle += step) {
            Xpos = Math.cos(angle) * bigRadius;
            Ypos = Math.sin(angle) * bigRadius;
            arr.push([Xpos+figurePos.x-50,Ypos+figurePos.y+30]);
           
        }

        arr.push([Math.cos(-1/2 * Math.PI)  * smallRadius + figurePos.x + 50,   Math.sin(-1/2 * Math.PI) * smallRadius+figurePos.y+30 ,"move"]);
        for(var angle = -1/2 * Math.PI; angle <= 9/10 * Math.PI; angle += step) {
            Xpos = Math.cos(angle) * bigRadius;
            Ypos = Math.sin(angle) * bigRadius;
            arr.push([Xpos+figurePos.x+50,Ypos+figurePos.y+30]);
        } 
        return arr;

    }

    // vertical grid loop
// for(let i = 0.5; i<canvas.offsetWidth; i=i+20){
//     context.lineWidth = 1;
//     context.strokeStyle = "black";
//     context.moveTo(i,0);
//     context.fillText(i-0.5,i+5,10);
//     context.lineTo(i,canvas.offsetHeight);
//     context.stroke();
    
//     }
//     // horizontal grid loop
//     for(let i = 0.5; i<canvas.offsetWidth; i=i+20){
//     context.lineWidth = 1;
//     context.strokeStyle = "black";
//     context.moveTo(0,i);
//     context.fillText(i-0.5,1,i+10);
//     context.lineTo(canvas.offsetWidth,i);
    
//     context.stroke();
//     }
    
 


});