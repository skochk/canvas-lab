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
    
    
    let changingPoint = false;
    let rotationCenter = {
        x: 150,
        y: 150
    }

    let gridArray = drawGrid();
    
    print(gridArray,1);
    let arrayGlobal = calcArray(smallRadius,bigRadius);
    print(arrayGlobal);

    let moveOnClick = false;

    //move figure by axis values
    document.querySelector('.moveByXY').addEventListener('click',function(){
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawGrid();
        let addToX = document.querySelector('.moveOnXaxis').value;
        let addToY = document.querySelector('.moveOnYaxis').value;
        if(addToX){
            figurePos.x += Number(addToX);
            for(let i = 0; i<arrayGlobal.length; i++){
                arrayGlobal[i][0] += Number(addToX);
            }
        }
        if(addToY){
            figurePos.y += Number(addToY);
            for(let i = 0; i<arrayGlobal.length; i++){
                arrayGlobal[i][1] += Number(addToY);
            }
        }
        print(arrayGlobal);
    })

    //move figure by cursor
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
        if(moveOnClick == true){
            if(e.clientX > figurePos.x){
                for(let i = 0; i<arrayGlobal.length; i++){
                    arrayGlobal[i][0] += Number(e.clientX - figurePos.x);
                }
            }else{
                for(let i = 0; i<arrayGlobal.length; i++){
                    arrayGlobal[i][0] -= Number(figurePos.x - e.clientX);
                }
            }
            if(e.clientY > figurePos.y){
                for(let i = 0; i<arrayGlobal.length; i++){
                    arrayGlobal[i][1] += Number(e.clientY - figurePos.y);
                }
            }else{
                for(let i = 0; i<arrayGlobal.length; i++){
                    arrayGlobal[i][1] -= Number(figurePos.y - e.clientY);
                }
            }
            context.clearRect(0, 0, canvas.width, canvas.height);
            drawGrid();
            figurePos.x = e.clientX;
            figurePos.y = e.clientY;
            print(arrayGlobal);
            
        }
    });


    //change text of button
    document.querySelector('.centerCoords').addEventListener('click',function(){
        changingPoint = !changingPoint;
        console.log(changingPoint);
        if(!changingPoint){
            document.querySelector('.centerCoords').innerHTML = "set Z point by cursor";
        }else{
            document.querySelector('.centerCoords').innerHTML = "stop changing Z point";
        }
    }); 

    // set Z point by cursor
    canvas.addEventListener('click',function(e){
        if(changingPoint){
            rotationCenter.x = e.clientX;
            rotationCenter.y = e.clientY;
            context.clearRect(0, 0, canvas.width, canvas.height);
            drawGrid();
            let array = calcArray(smallRadius,bigRadius);
            print(array);
            drawPoint(rotationCenter.x,rotationCenter.y);
            
        }
    });
    //set Z point by values
    document.querySelector('.setXY').addEventListener('click', function(){
        rotationCenter.x = document.querySelector('.centerX').value;
        rotationCenter.y = document.querySelector('.centerY').value;
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawGrid();
        let array = calcArray(smallRadius,bigRadius);
        print(array);
        drawPoint(Number(rotationCenter.x),Number(rotationCenter.y));
    })

    //rotate
    document.querySelector('.rotate').addEventListener('click', function(){
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawGrid();
        let angle = document.querySelector('.rotateAngle').value;
        let temp = document.querySelector('.rotateAngle').value;
        document.querySelector('.rotateAngle').value = 5 + Number(temp);
        let newArray =  rotateArray(arrayGlobal,angle,rotationCenter.x,rotationCenter.y);
        arrayGlobal = newArray;
        print(newArray);
        drawPoint(rotationCenter.x,rotationCenter.y);
    
    });
   


    
    //change radius
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

    //calculate affine 
    document.querySelector('.affineCall').addEventListener('click',function(){
        let affineArray = [];
        let items = document.querySelectorAll('.affineElement');
        for(let i = 0; i < items.length; i++){
            if(items[i].value === ""){
                affineArray.push(0);
            }else{
                affineArray.push(Number(items[i].value));
            }
        }
        //преобразование массива в двухмерный по 3 эл.
        let row1 = affineArray.slice(0,3);
        let row2 = affineArray.slice(3,6);
        let row3 = affineArray.slice(6,9);
        affineArray = [];
        affineArray.push(row1,row2,row3);
        console.log(affineArray);

        context.clearRect(0, 0, canvas.width, canvas.height);
        // drawGrid();
        let newGrid = affineCalc(gridArray, affineArray);
        print(newGrid,1);
        let newArr = affineCalc(arrayGlobal, affineArray);
        arrayGlobal = newArr;
        print(newArr);

    })



    function print(a, lineWidth){
        context.beginPath();
        context.lineWidth = 5;
        if(lineWidth){
            context.lineWidth = 1;
            context.strokeStyle = "black";
        }
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

    function rotateArray(array,angle,centerX,centerY){
        angle = angle * Math.PI / 180;
        let newX, newY;
        let newArr = [];
        for(let i = 0; i<array.length; i++){

            newX = centerX + (array[i][0] - centerX) * Math.cos(angle) - (array[i][1] - centerY) * Math.sin(angle);
            newY = centerY + (array[i][1] - centerY) * Math.cos(angle) + (array[i][0] - centerX) * Math.sin(angle);
            
            if(array[i][2]){
                newArr.push([newX,newY,"move"]);
            }else{
                newArr.push([newX,newY]);
            }
        }   
        console.log(newArr);
        return newArr;
    }

    function drawGrid(){
        let gridArray = [[0,0],'move'];
        context.beginPath();
        context.lineWidth = 1;
        context.font = "10px Segoe UI";
        context.textAlign = "left";
        //     vertical grid loop
        for(let i = 0.5; i<canvas.offsetWidth; i=i+20){
            context.lineWidth = 1;
            context.strokeStyle = "black";
            context.moveTo(i,0);
            context.font = "8px Arial";
            context.fillText((i-0.5),i+5,15);
            //context.lineTo(i,canvas.offsetHeight);
            context.stroke();

            gridArray.push([i,0,"move"]);
            gridArray.push([i,canvas.offsetHeight])
        }
        context.closePath();
        // horizontal grid loop
        context.beginPath();
        context.lineWidth = 1;
        for(let i = 0.5; i<canvas.offsetWidth; i=i+20){
            context.lineWidth = 1;
            context.strokeStyle = "black";
            context.moveTo(0,i);
            context.font = "8px Arial";
            context.fillText((i-0.5),8,i+10);
            // context.lineTo(canvas.offsetWidth,i);
            context.stroke();

            gridArray.push([0,i,'move']);
            gridArray.push([canvas.offsetWidth,i]);
        }
        context.closePath();

        //coordinates line
			context.font = "40px Segoe UI";
			context.textAlign = "center";
			
			//Y Start line
			context.lineWidth = 10;
			context.strokeStyle = "black";
			context.beginPath();
			context.moveTo(0.5, 0);
			context.lineTo(0.5, canvas.offsetHeight/1.1);
            context.stroke();
            context.fillText("Y",40, canvas.offsetHeight/1.1)


            //X Start line
			context.lineWidth = 10;
			context.strokeStyle = "black";
			context.beginPath();
			context.moveTo(0, 0);
			context.lineTo(canvas.offsetWidth/1.1, 0);
            context.stroke();
            context.fillText("X",canvas.offsetWidth/1.1, 50)

			
        return gridArray;
    }
    
    function drawPoint(x,y){
        console.log(x,y);
        //center of axis of rotation
        context.beginPath();
        context.arc(x, y, 5, 0, 2 * Math.PI);
        context.font = "20px Arial";
        context.fillText('Z',x+20,y+25);
        context.fillStyle = "black";
        context.fill();
    }
    
    function multipleMatrix(row,affineArray){
        let tempArray  = [];
        var row1 = affineArray[0][0] * row[0] + affineArray[0][1] * row [1] + affineArray[0][2] * 0;
        var row2 = affineArray[1][0] * row[0] + affineArray[1][1] * row [1] + affineArray[1][2] * 0;
        var row3 = affineArray[2][0] * row[0] + affineArray[2][1] * row [1] + affineArray[2][2] * 0;
        if(row[2]== "move"){
            row3 = "move";
        }
        tempArray.push(row1, row2, row3);
        return tempArray;
    }

    function affineCalc(array, affineArray){
        let newArray = [];
        for(let i = 0; i< array.length; i++){
            let temp = multipleMatrix(array[i],affineArray);
            newArray.push(temp);

        }
        return newArray;
    }
});