// x - координата квадрата оси букв
var x;
// y - координата квадрата оси цифр
var y;

// чтобы не рисовать 64 квадрата поля, формируем игровое поле программно
var htmlString;
for (var i = 8; i > 0; i--){
    htmlString = "<div class=\"row\">";

    //кажадая строка содержит номер координаты, который мы выводим перед формировнием квадратов поля
    htmlString += "<div class=\"y-pos\">" + i + "</div>";
    for(var j = 1; j < 9; j++){
        var index = 8 * (i-1) + j
        htmlString += "<div class=\"square\" x=\"" + j + "\" y=\"" + i + "\"></div>";
    }
    htmlString += "</div>";
    document.getElementById("field").innerHTML += htmlString;
}

// Обработчик события "onclick" на игровом поле
document.getElementById("field").addEventListener("click", function (e){
    //Если класс нажатого элемента "square", то по атрибутам x, y получаем координаты выбранного квадрата
    if (e.target.attributes.class.nodeValue == "square"){

        // Очищаем поле от предыдущих нажатий
        if (document.querySelector(".selected-square"))
            document.querySelector(".selected-square").classList.remove("selected-square");
        
        if (document.querySelectorAll(".available-square"))
            document.querySelectorAll(".available-square").forEach(function(item, index, arr) {
                item.classList.remove("available-square");
            });

        //Получаем координаты выбранного квадрата
        x = parseInt(e.target.attributes.x.nodeValue);
        y = parseInt(e.target.attributes.y.nodeValue);
        
        // Выделяем выбранный квадрат, добавив соответсвующий класс
        document.querySelector("div[x=\"" + x + "\"][y=\"" + y + "\"]" ).classList.add("selected-square");
        
        // Проверяем вохмлжные ходы конем, и если ход возможен вызываем функцию, котора подсветит наш квадрат
        if (x-2 >= 1){
            if (y + 1 <= 8)
                setAvailableSquare(x-2, y+1);
            if (y - 1 >= 1)
                setAvailableSquare(x-2, y-1);    
            
        }
        if (x-1 >= 1){
            if (y + 2 <= 8){
                setAvailableSquare(x-1, y+2);
            }

            if (y - 2 >= 1){
                setAvailableSquare(x-1, y-2);
            }
        }    

        if (x+2 <= 8){
            if (y + 1 <= 8)
                setAvailableSquare(x+2, y+1);
            if (y - 1 >= 1)
                setAvailableSquare(x+2, y-1);    
        }
        
        if(x+1 <= 8){
            if (y + 2 <= 8){
                setAvailableSquare(x+1, y+2);
            }
            if (y - 2 >= 1){
                setAvailableSquare(x+1, y-2);
            }
        }
    }
})


//Функция выделяет указанный в координатах (x, y) квадрат
function setAvailableSquare(x, y){
    document.querySelector("div[x=\"" + x + "\"][y=\"" + y + "\"]" ).classList.add("available-square");
}




