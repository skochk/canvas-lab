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
  
    drawGrid();
    let a = calcArray(smallRadius,bigRadius);
    print(a);

    let moveOnClick = false;

    //old move version

    // document.querySelector('.moveState').addEventListener('click',function(){
    //     moveOnClick = !moveOnClick; //change to opposite state
    //     if(moveOnClick){
    //         document.querySelector('.moveState').innerHTML = 'disable move of detail on click';
    //     }else{
    //         document.querySelector('.moveState').innerHTML = 'allow move of detail on click'; 
    //     }
    //     console.log(moveOnClick);
    // });

    canvas.addEventListener('mousedown',function(e){
        if((e.clientX > figurePos.x - 70 &&  e.clientY > figurePos.y -50)&&
           (e.clientX < figurePos.x + 70 &&  e.clientY < figurePos.y +100)
        ){
            moveOnClick = true;
        }
    })
    canvas.addEventListener('mouseup',function(){
        moveOnClick = false;
    })


    canvas.addEventListener('mousemove', async function(e){
        // canvas.addEventListener('click',function(e){
            if(moveOnClick == true){
                context.clearRect(0, 0, canvas.width, canvas.height);
                let a = calcArray(smallRadius,bigRadius);
                drawGrid();
                figurePos.x = e.clientX;
                figurePos.y = e.clientY;
                print(a);
            }
        // });
    });


    

    document.querySelector('.smallButton').addEventListener('click',async function(){
        smallRadius = document.querySelector('.small').value;
        await context.clearRect(0, 0, canvas.width, canvas.height);
        let a = await calcArray(smallRadius,bigRadius);
        await drawGrid();
        await print(a);
        
    });

    document.querySelector('.bigButton').addEventListener('click', async function(){
        bigRadius = document.querySelector('.big').value;
        await context.clearRect(0, 0, canvas.width, canvas.height);
        let a = await calcArray(smallRadius,bigRadius);
        await drawGrid();
        await print(a);

    })



    function print(a){
        context.beginPath();
        context.lineWidth = 5;
        for(let i = 0; i < a.length; i++){
            if(a[i][2] == "move"){
                context.moveTo(a[i][0],a[i][1]);
                context.lineTo(a[i][0],a[i][1]);
            }else{
                context.lineTo(a[i][0],a[i][1]);
                context.stroke();
            }
            context.stroke();
        }
        context.stroke();

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
        //center circle small
        arr.push([Math.cos(0) * smallRadius+figurePos.x, Math.sin(0) * smallRadius+figurePos.y ,"move" ]);
        for(var angle = 0; angle <= 2 * Math.PI; angle += step) {
            Xpos = Math.cos(angle) * smallRadius;
            Ypos = Math.sin(angle) * smallRadius;   
            arr.push([Xpos+figurePos.x,Ypos+figurePos.y]);
        }
        //center bottom small circle    
        arr.push([Math.cos(- 1/7 * Math.PI) * smallRadius+figurePos.x, Math.sin(- 1/7 * Math.PI) * smallRadius+figurePos.y + 50  ,"move"]);
        for(var angle = - 1/7 * Math.PI; angle <= 10/8 * Math.PI; angle += step) {
            Xpos = Math.cos(angle) * smallRadius;
            Ypos = Math.sin(angle) * smallRadius;
            arr.push([Xpos+figurePos.x,Ypos+figurePos.y+50]);
        }
        //top circle
       arr.push([Math.cos(7/8 * Math.PI)  * smallRadius + figurePos.x,   Math.sin(7/8 * Math.PI) * smallRadius+figurePos.y-50  ,"move"]);
        for(var angle = 7/8 * Math.PI; angle <= 22/10 * Math.PI; angle += step) {
            Xpos = Math.cos(angle) * smallRadius;
            Ypos = Math.sin(angle) * smallRadius;
            arr.push([Xpos+figurePos.x,Ypos+figurePos.y-50])
        }
        //left big circle
        arr.push([Math.cos(1/13 * Math.PI)  * smallRadius + figurePos.x - 40,   Math.sin(1/13 * Math.PI) * smallRadius+figurePos.y+30 ,"move"]);
        for(var angle = 1/13 * Math.PI; angle <= 3/2 * Math.PI; angle += step) {
            Xpos = Math.cos(angle) * bigRadius;
            Ypos = Math.sin(angle) * bigRadius;
            arr.push([Xpos+figurePos.x-50,Ypos+figurePos.y+30]);
           
        }
        //right big circle
        arr.push([Math.cos(-1/2 * Math.PI)  * smallRadius + figurePos.x + 50,   Math.sin(-1/2 * Math.PI) * smallRadius+figurePos.y+20 ,"move"]);
        for(var angle = -1/2 * Math.PI; angle <= 9/10 * Math.PI; angle += step) {
            Xpos = Math.cos(angle) * bigRadius;
            Ypos = Math.sin(angle) * bigRadius;
            arr.push([Xpos+figurePos.x+50,Ypos+figurePos.y+30]);
        } 
        return arr;

    }



    function drawGrid(){
        context.beginPath();
        context.lineWidth = 1;
        context.font = "10px Segoe UI";
        context.textAlign = "left";
        //     vertical grid loop
        for(let i = 0.5; i<canvas.offsetWidth; i=i+20){
            context.lineWidth = 1;
            context.strokeStyle = "black";
            context.moveTo(i,0);
            context.fillText((i-0.5)/10,i+5,10);
            context.lineTo(i,canvas.offsetHeight);
            context.stroke();
        }
        context.closePath();
        // horizontal grid loop
        context.beginPath();
        context.lineWidth = 1;
        for(let i = 0.5; i<canvas.offsetWidth; i=i+20){
            context.lineWidth = 1;
            context.strokeStyle = "black";
            context.moveTo(0,i);
            context.fillText((i-0.5)/10,1,i+10);
            context.lineTo(canvas.offsetWidth,i);
            context.stroke();
        }
        context.closePath();

        //coordinates line
			context.font = "40px Segoe UI";
			context.textAlign = "center";
			
			//Y Start line
			context.lineWidth = 3;
			context.strokeStyle = "black";
			context.beginPath();
			context.moveTo(20, 20);
			context.lineTo(20, canvas.offsetHeight/1.1);
            context.stroke();
            context.fillText("Y",40, canvas.offsetHeight/1.1)


            //X Start line
			context.lineWidth = 3;
			context.strokeStyle = "black";
			context.beginPath();
			context.moveTo(19, 20);
			context.lineTo(canvas.offsetWidth/1.1, 20);
            context.stroke();
            context.fillText("X",canvas.offsetWidth/1.1, 50)

			

    }
        
 


});