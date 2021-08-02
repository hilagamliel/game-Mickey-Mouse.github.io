var Length_doll = 0;
var Craet_all_doll_interval;
var Index = 0;
var Revach_dice = 2;
var num_of_dice = 24;
var start = 25;
var Minute = 10;
var High = 2;
var Minute_creat = 1000;
var Top_doll = 0;
var top_dice = 138;
var size_dall = 8;
var point = 0;
var point_doll = 0;
var point_hart;
var position_doll = 4;
var div_point;
var level = 1;
var hart;
var max = 50;
var sum_point = 0;
var Audio = "sound/alert_drip.wav ";
var pus = "sound/Flash%20Button%20Sounds-13485-Free-Loops.com.mp3";   
var sound_game = "sound/GROOVY2.WAV";
var img_hart = "img_game_mini/vel.png";
var img_point = "img_game_mini/mony.PNG";
var img_game_over ="img_game_mini/img_game_over.gif";
var img_wine ="img_game_mini/win.gif";
var Img_of_doll = ["img_game_mini/doll_gray.gif","img_game_mini/doll_pink.gif" ];
var Bool_img = [];
var Mydoll = [];
var Object_dice = [];
function chek() {
    Bool_img = [];
    Mydoll = [];
    Object_dice = [];
    if (level == 1)
    {
        localStorage.setItem('hart', 3);
        point_hart = localStorage.getItem('hart');
        size_dall = 8;
        Minute = 10;
        position_doll = 4;
        Minute_creat = 1000;
        top_dice = 138;
        max =50;
        point = 0;
        point_doll = 0;
        level = 1;
        Index = 0;
    }
    if (level == 2 || level == 3) {
        point_hart = localStorage.getItem('hart');
        max = 100;
        size_dall = 6;
        position_doll = 3;
        top_dice = 98;
        Minute_creat = 800;
        if (level == 2)
            Minute = 10;
        else
            Minute = 5;
    }
    else if (level == 4 || level == 5) {
        point_hart = localStorage.getItem('hart');
        size_dall = 4;
        position_doll = 2;
        top_dice = 68;
        Index = 0;
        max = 150;
        if (level == 4) {
            Minute = 10;
            Minute_creat = 600;
        }

        else {
            Minute = 5;
            Minute_creat = 600;
        }
    }
}
function updateLevel() {
    localStorage.setItem('level', level);
    //הגדרת משתנה המחזיק את השלב הגבוה ביותר
    var storageLevel = parseInt(localStorage.getItem("maxLevel"));
    if (level < storageLevel)
        return;
    localStorage.setItem('maxLevel', level); 
}
function Main() {
    var l = localStorage.getItem('level');
    if (!l)
    {
        localStorage.setItem('level',1);
        level = 1;
    }
    else
        level = parseInt(l);
    sum_point = localStorage.getItem('sum_point');
    if (!sum_point)
        localStorage.setItem('sum_point', 0);
    chek();
    all.innerHTML = "";
    Mixed();
    Create_all_doll();
    Creat_dice();
    Top_doll = document.getElementsByClassName("dice_gray")[0].offsetTop - top_dice;
    create_point();
    create_hart();
    create_level();
    var a = document.createElement("audio");
    a.loop = "loop";
    a.src = sound_game;
    a.play();
  
}
function Mixed() {
    var Img, id, index;
    var count = 0, img;//ערבוב התמונות מתוך מערך התמונות לתוך מערך למשחק
    for (var i = 0; i < 48 / size_dall; i++) {
        index = Math.round(Math.random());
        if (index == 0) {
            Img = Img_of_doll[0];
            id = 0;
            Mydoll.push({
                img_url: Img,
                img_color: id,
            });

        }
        else {
            Img = Img_of_doll[1];
            id = 1;
            Mydoll.push({
                img_url: Img,
                img_color: id,
            });

        }
    }
    img = Mydoll[0].img_url;
    for (var i = 1; i < Mydoll.length; i++) {
        if (Mydoll[i].img_url == img)
            count++;
    }
    if (count == 0 || count > Mydoll.length / 2)
        Mixed();
}
function Create_all_doll() {//יצירת התמונות//איפוס מערך המכיל ערך                   //על כל תמונה אם היא כבר נוצרה או לא
    Craet_all_doll_interval = setInterval(function () {//שליחת התמונה להיווצרות כל כמה זמן
        Create_dol((Index % Mydoll.length));
        Index++;
        if (point_doll == max) {
            if (level == 5)
            {
                sum_point = parseInt( localStorage.getItem('sum_point'));
                sum_point += point;
                localStorage.setItem('sum_point', sum_point);
                stop_all_doll();
                for (var i = 0; i < Mydoll.length; i++)
                    clearInterval(Mydoll[i].movinterval);
                window.location = "../winner/winner.html";
            }
            else {
                stop_all_doll();
                winer();
                Index = 0;
                point_doll = 0;
            }

        }
    }, Minute_creat);
    //Minute_creat

} 
function Create_dol(Index) {  //יצירת התמונה והעמדתה על המסך
    var img = document.createElement("img");//יצירת אובייקט מסוג תמונה
    img.src = Mydoll[Index].img_url;
    img.classList.add("img_doll");               //הוספת class לתמונה
    do
        var rand = Math.round(Math.random() * 100) % (48 / size_dall);
    while (Bool_img[rand] == 1)
    Mydoll[Index].position = rand * position_doll;
    img.style.left = start + (size_dall * rand) + "vw";
    img.style.width = size_dall + "vw";//לא הצלחתי להסביר פה תתקשרי אלי או שתביני לבד
    Bool_img[rand] = 1;
    Length_doll++;
    if (Length_doll == 48 / size_dall) {
        for (var i = 0; i < 48 / size_dall; i++)
            Bool_img[i] = 0;
        Length_doll = 0;
    }
    img.style.top = -25 + "vh";
    Mydoll[Index].elem = img;
    //  העמדת התמונה במקום מעל המסך כדי שלא יקפוץ פתאום למסך
    Mydoll[Index].movinterval = setInterval(function () {//כל כמה זמן הבבוה נשלחת ךפונקציה שמוזיזה אותה
        if (MovDall(img) == false)
            Check_doll(Mydoll[Index]);
    }, Minute); //Minute
    all.appendChild(img);

}
function MovDall(dall) {//פונקציה שמוזיזה את הבובה
    var top = dall.offsetTop;
    if (top < Top_doll) {
        top += High; //High
        dall.style.top = top + "px";
    }
    else {
        return false;
    }
}
function Creat_dice() {//יצירת הקוביות והנחתן על המסך
    for (var k = 0; k < num_of_dice;  k++) {
        var Dice = document.createElement("div");
        Object_dice[k] = {};
        Object_dice[k].position = k;
        Dice.style.top = (85 + "vh");
        Dice.style.left = (start + k * Revach_dice + "vw");
        Dice.onclick = Swap;
        if (k < 12) {
            Dice.classList.add("dice_pink");
            Object_dice[k].color = 1;
        }
        else {
            Dice.classList.add("dice_gray");
            Object_dice[k].color = 0;
        }
        Object_dice[k].elem = Dice;
        all.appendChild(Dice)

    }
    document.onkeypress = function (e){
        if(e.keyCode == 32)
            Swap();
   };
}

function Swap() {
    for (var i = 0; i < Object_dice.length; i++) {
        if (Object_dice[i].elem.classList[0] == "dice_gray") {
            Object_dice[i].elem.classList.remove("dice_gray");
            Object_dice[i].elem.classList.add("dice_pink");
            Object_dice[i].color = 1;
        }
        else {
            Object_dice[i].elem.classList.remove("dice_pink");
            Object_dice[i].elem.classList.add("dice_gray");
            Object_dice[i].color = 0;
        }
    }

}
function Check_doll(object_doll) {
    var flag = 0;
    for (var i = 0; i < Object_dice.length; i++) {
        if (Object_dice[i].position == object_doll.position && Object_dice[i].color == object_doll.img_color) {
            object_doll.elem.classList.add("dall_noun");
            clearInterval( object_doll.movinterval);
            flag = 1;
            point += 5;
            point_doll++;
            div_point.innerHTML = point;
            var aoudio = document.createElement("audio");
            aoudio.src = Audio;
            aoudio.play();
            break;
        }
    }
    if (flag == 0) {
        if (point_hart == 0) {
            stop_all_doll();
            Game_over();
            Index = 0;
            point_hart =4;
        }
        else {
            object_doll.elem.classList.add("dall_noun");
            clearInterval(object_doll.movinterval);
        }
        if (point > 0)
            point -= 5;
        point_hart--;
        localStorage.setItem('hart', point_hart);
        div_point.innerHTML = point;
        hart.innerHTML = point_hart;
        var aoudio_2 = document.createElement("audio");
        aoudio_2.src = pus;
        aoudio_2.play();
    }

}
function stop_all_doll() {
    clearInterval(Craet_all_doll_interval);
    all.innerHTML = "";
}
function Game_over() {
    var Img = document.createElement("img");
    Img.src = "../game_mini/img_game_mini/img_game_over.gif";
    Img.classList.add("img_game_over");
    all.appendChild(Img);
    level = 1;
    localStorage.setItem('maxLevel', 1);
    localStorage.setItem('level', 1);
    localStorage.setItem('sum_point', 0);
    Index = 0;
    create_point_end_game();  
    button_exist();
}
function winer() {
    var img = document.createElement("img");
    img.src = img_wine;
    img.classList.add("img_winer_game");
    all.appendChild(img);
     localStorage.setItem('maxLevel', level + 1);
       sum_point = parseInt(localStorage.getItem('sum_point'));;
    sum_point += point;
    localStorage.setItem('sum_point', sum_point);
    create_point_end_game();
    button_contiu();
    button_exist();
}
function create_point() {
    div_point = document.createElement("div");
    div_point.classList.add("Point");
    div_point.innerHTML = point;
    all.appendChild(div_point);
    var img = document.createElement("img");
    img.src = img_point;
    img.classList.add("img_point");
    all.appendChild(img);

}
function create_level() {
    var level_text = document.createElement("p");
    level_text.classList.add("level");
    level_text.innerHTML = "level " + level;
    all.appendChild(level_text);
}
function create_point_end_game() {
    var div_point = document.createElement("div");
    div_point.classList.add("div_point");
    all.appendChild(div_point);
    var i = 0;
    
    var clearpoint_interval = setInterval(function () {
        div_point.innerHTML = "point: " + i;
        if (i == point)
            clearInterval(clearpoint_interval);
        i++;
    }, 10);
}
function create_hart() {
    hart = document.createElement("div");
    hart.classList.add("Hart");
    hart.innerHTML = point_hart;
    all.appendChild(hart);
    var img = document.createElement("img");
    img.src = img_hart;
    img.classList.add("img_hart");
    all.appendChild(img);
}

function button_exist() {
    var exist = document.createElement("div");
    exist.classList.add("btn");
    exist.classList.add("exist");
    var a = document.createElement("a");
    a.href = "../level_game_mini/levels_game_mini.html";
    a.innerHTML = "exist";
    if (point_hart <= 0 && point_doll != max) {
        exist.classList.add("exist_game_over");
        a.classList.add("a_game_over");
    }
    exist.appendChild(a);
    all.appendChild(exist);
}
function button_agine() {
    var agine = document.createElement("div");
    agine.classList.add("btn");
    agine.classList.add("agine_contiu");
    agine.onclick = new_game;
    agine.innerHTML = "play agein";
    all.appendChild(agine);
}
function button_contiu() {
    var agine = document.createElement("div");
    agine.classList.add("btn");
    agine.classList.add("agine_contiu");
    agine.onclick = next_level;
    var x = level + 1;
    var a = document.createElement("a");
    a.innerHTML = "level " + x;
    agine.appendChild(a);
    all.appendChild(agine);

}

function next_level() {
    all.innerHTML = "";
    point = 0;
    point_doll = 0;
    Bool_img = [];
    Mydoll = [];
    Object_dice = [];
    level++;
    localStorage.setItem('level', level);
    updateLevel();
    Index = 0;
    if (level == 2 || level == 3) {
        max = 100;
        size_dall = 6;
        position_doll = 3;
        top_dice = 98;
        Minute_creat = 1000;
        if (level == 2)
            Minute = 10;
        else
            Minute = 5;
    }
    else if (level == 4 || level == 5) {
        size_dall = 4;
        position_doll = 2;
        top_dice = 68;
        Index = 0;
        max = 150;
        if (level == 4) {
            Minute = 10;
            Minute_creat = 700;
        }

        else {
            Minute = 5;
            Minute_creat = 600;
        }
    }

    Main();
}

