class Food{
    constructor(foodStock, lastFed){
        this.image = loadImage("images/Milk.png");
        this.foodStock = foodStock;
        this.lastFed = lastFed;
    }
    getFood(){
        var foodCountRef = database.ref("/food");
        
        foodCountRef.on("value", function(data){
            console.log(data.val());
            return data.val();
        });
        
        
    }
    updateFood(food){
        database.ref("/").update({
            food : food
        });
    }
    deductFood(){

    }
    display(){
        var x = 80, y = 300;
        var foodCountRef = database.ref("/food");
        
        foodCountRef.on("value", function(data){
            var epic = data.val();
            list1.push(epic);
           // console.log(epic);
        });
        imageMode(CENTER);
    /// image(this.image,10,425,70,70);
        if(this.foodStock != 0){
            for(var i = 0; i < list1[0]; i++){
                if(i % 12 == 0){
                    x = 80;
                    y += 50;
                }
                image(this.image,x,y,70,70);
                x += 30;
            }
            console.log(list1[0])
            
        }
        
        
    }
}
