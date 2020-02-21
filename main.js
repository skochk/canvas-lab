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

    print(smallRadius,bigRadius);

    let arr = [];
    document.querySelector('.smallButton').addEventListener('click',function(){
        smallRadius = document.querySelector('.small').value;
        context.clearRect(0, 0, canvas.width, canvas.height);
        print(smallRadius,bigRadius);
    });

    document.querySelector('.bigButton').addEventListener('click', function(){
        bigRadius = document.querySelector('.big').value;
        context.clearRect(0, 0, canvas.width, canvas.height);
        print(smallRadius,bigRadius);
    })



    function print(smallRadius,bigRadius){
        
        context.lineWidth = 5;
        context.strokeStyle = "black";
              

    
        // main figure 
            context.moveTo(figurePos.x-50, figurePos.y-25);
            context.lineTo(figurePos.x,figurePos.y-50);
            context.lineTo(figurePos.x+50,figurePos.y-25);
            context.lineTo(figurePos.x+50,figurePos.y+25);
            context.lineTo(figurePos.x,figurePos.y+50);
            context.lineTo(figurePos.x-50,figurePos.y+25);
            context.lineTo(figurePos.x-50,figurePos.y-27);
            context.stroke();


        var step = 2 * Math.PI / 20; // примечание 2 
        let Xpos, Ypos;
        context.font = '9px Arial';


        //center circle small
        context.beginPath();
        for(var angle = 0; angle <= 2 * Math.PI; angle += step) {
            Xpos = Math.cos(angle) * smallRadius;
            Ypos = Math.sin(angle) * smallRadius;
            context.lineTo(Xpos+figurePos.x,Ypos+figurePos.y);
            // console.log(Xpos, Ypos, angle);
        }
        context.stroke();



        //center bottom small circle
        context.beginPath();
        for(var angle = - 1/7 * Math.PI; angle <= 10/8 * Math.PI; angle += step) {
            Xpos = Math.cos(angle) * smallRadius;
            Ypos = Math.sin(angle) * smallRadius;
            context.lineTo(Xpos+figurePos.x,Ypos+figurePos.y+50);       
        }
        context.stroke();
        
        
        //top circle
        context.beginPath();
        for(var angle = 7/8 * Math.PI; angle <= 22/10 * Math.PI; angle += step) {
            Xpos = Math.cos(angle) * smallRadius;
            Ypos = Math.sin(angle) * smallRadius;
            context.lineTo(Xpos+figurePos.x,Ypos+figurePos.y-50);
        }
        context.stroke();


        //left big circle
        context.beginPath();
        for(var angle = 1/13 * Math.PI; angle <= 3/2 * Math.PI; angle += step) {
            Xpos = Math.cos(angle) * bigRadius;
            Ypos = Math.sin(angle) * bigRadius;
            context.lineTo(Xpos+figurePos.x-50,Ypos+figurePos.y+30);
           
        }
        context.stroke();

            
        //right big circle
        context.beginPath();
        for(var angle = -1/2 * Math.PI; angle <= 9/10 * Math.PI; angle += step) {
            Xpos = Math.cos(angle) * bigRadius;
            Ypos = Math.sin(angle) * bigRadius;
            context.lineTo(Xpos+figurePos.x+50,Ypos+figurePos.y+30);
        } 
        context.stroke();
        context.beginPath();


    }

//     // vertical grid loop
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