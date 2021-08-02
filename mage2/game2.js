var dolls = [
    { img: "img_doll/gray1.png", position: "1", img_zmani: "img_doll/miki1.png" },
    { img: "img_doll/gray2.png", position: "2", img_zmani: "img_doll/miki_2.png" },
    { img: "img_doll/red4.png", position: "4", img_zmani: "img_doll/miki_4.png" },
    { img: "img_doll/gray2.png", position: "2", img_zmani: "img_doll/miki_2.png" },
    { img: "img_doll/red1.png", position: "1", img_zmani: "img_doll/miki1.png" },
    { img: "img_doll/red3.png", position: "3", img_zmani: "img_doll/miki_3.png" },
    { img: "img_doll/red4.png", position: "4", img_zmani: "img_doll/miki_4.png" },
    { img: "img_doll/waite1.png", position: "1", img_zmani: "img_doll/miki1.png" },
    { img: "img_doll/red1.png", position: "1", img_zmani: "img_doll/miki1.png" },
    { img: "img_doll/waite3.png", position: "3", img_zmani: "img_doll/miki_3.png" },
    { img: "img_doll/red3.png", position: "3", img_zmani: "img_doll/miki_3.png" },
    { img: "img_doll/red4.png", position: "4", img_zmani: "img_doll/miki_4.png" },
    { img: "img_doll/waite1.png", position: "1", img_zmani: "img_doll/miki1.png" },
    { img: "img_doll/waite3.png", position: "3", img_zmani: "img_doll/miki_3.png" }
];
var miki = [
    { img: "img_doll/miki_2.png", position: "2" },
    { img: "img_doll/miki_3.png", position: "3" },
    { img: "img_doll/miki_4.png", position: "4" },
    { img: "img_doll/miki1.png", position: "1" }
];
var Dolss = [];
var nums = [];
var i = 0;
var count = 0;
var point = 0;
var p_point;
var sound_win = "sound/Beep3.mp3";
var sound_pus = "sound/Space%20Gun%2001.wav";
var sound_end = "sound/GAMESHOW.WAV";
function create_dalls() {
    localStorage.setItem('point', 0);
    var id;
    for (var i = 1; i < 34; i++) {
        var img = document.createElement("img");
        var num = ((parseInt(Math.random() * 100) % dolls.length));
        img.src = dolls[num].img;
        img.id = "doll" + i;
        if (i % 2 == 0)
            img.classList.add("img_doll_1");
        else if (i % 3 == 0)
            img.classList.add("img_doll_2");
        else
            img.classList.add("img_doll_3");
        document.getElementById("all").appendChild(img);
        img.addEventListener("click", check);
        Dolss.push({
            img: dolls[num].img, img_Zmani: dolls[num].img_zmani,
            id_doll: i, Position: dolls[num].position
        });

    }
    look_miki();
    setTimeout(function () {
        var sound = document.createElement("audio");
        sound.src = sound_end;
        sound.play();
    },99 * 1000);
    setTimeout(function () {
        window.location = "winer.html";
    }, 100 * 1000);
}

function look_miki() {
    var num_img = 0, img_doll, Id_doll, doll;
    for (var i = 0; i < 3; i++) {
        num_img = parseInt((Math.random() * 100) % (Dolss.length));
        img_doll = Dolss[num_img];
        while (img_doll.Position != miki[i].position) {
            num_img = parseInt((Math.random() * 100) % (Dolss.length));
            img_doll = Dolss[num_img];
        }
        Id_doll = img_doll.id_doll;
        nums.push({
            num: num_img, flag: 0
        });
        document.getElementById("doll" + Id_doll).src = img_doll.img_Zmani;
        setTimeout(look_return,1000);
    }

}
function look_return() {
    for (var i = 0; i < 3; i++)
    {
        document.getElementById("doll" + ((nums[i].num) + 1)).src = Dolss[nums[i].num].img;
        //document.getElementById("doll" + (nums[i] + 1)).addEventListener("click", check);
    }
}
function check(event) {
    var flags = 0;
    for (var i = 0; i < nums.length; i++)
    {
        if (event.target.id == "doll" + ((nums[i].num) + 1) )   
        {
            if (nums[i].flag != 1)
            {
                flags = 1;
                count++;
                nums[i].flag = 1;
                document.getElementById("doll" + ((nums[i].num) + 1)).classList.add("choois");
                break;
            }
            flags = 1;
            break;
        }
    }
    if (flags == 0)
        count++;
    if (count == 3 && flags==1) {
        point = parseInt(localStorage.getItem('point'));
        point += 5;
        localStorage.setItem('point', point);
        p_point = document.createElement("p");
        p_point.innerHTML = "+ 5";
        p_point.classList.add("p_point");
        document.getElementById("div_point").appendChild(p_point);
        var s = document.createElement("audio");
        s.src = sound_win;
        s.play();
        setTimeout(function () {
            document.getElementById("div_point").innerHTML = "";
        }, 1000);
        count = 0;
        clear();
        nums = [];
        look_miki(); 
    }
    else if (count == 3 )
    {
        if (point > 0)
        {
            point = parseInt(localStorage.getItem('point'));
            point -= 5;
            localStorage.setItem('point', point);
            p_point = document.createElement("p");
            p_point.innerHTML = "- 5";
            p_point.classList.add("p_point");
            document.getElementById("div_point").appendChild(p_point);
            var s_pus = document.createElement("audio");
            s_pus.src = sound_pus;
            s_pus.play();
            setTimeout(function () {
                document.getElementById("div_point").innerHTML = "";
            }, 1000);
        } 
        clear();
        nums = [];
        count = 0;       
        look_miki();
    }
        
}
function clear() {
    for (var i = 0; i < nums.length; i++)
        document.getElementById("doll" + ((nums[i].num) + 1)).classList.remove("choois");
}

          
