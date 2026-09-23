import jsonData from './rl-directory.json' with { type: 'json' };
document.getElementById('main-form').addEventListener('submit', onSubmit)
let countArr = [];
document.getElementById('threshhold').defaultValue = "10";


let base, skin, eyes, maneShape, maneCol, mark1, mark2, mark3, mark4, mark5, mark6, mark7, mark8, mark9, mark10, threshhold;
let marks = [];

function onSubmit(event){
    let valid = true;
    countArr = [];
    document.querySelector(".result-div").innerHTML = "";
    event.preventDefault();

    const formData = new FormData(event.target);
    base = formData.get('base');
    skin = formData.get('skin');
    eyes = formData.get('eyes');
    maneShape = formData.get('maneshape');
    maneCol = formData.get('manecol');
    mark1 = formData.get('marking1');
    mark2 = formData.get('marking2');
    mark3 = formData.get('marking3');
    mark4 = formData.get('marking4');
    mark5 = formData.get('marking5');
    mark6 = formData.get('marking6');
    mark7 = formData.get('marking7');
    mark8 = formData.get('marking8');
    mark9 = formData.get('marking9');
    mark10 = formData.get('marking10');
    threshhold = formData.get('threshhold');
    marks = [mark1, mark2, mark3, mark4, mark5, mark6, mark7, mark8, mark9, mark10];


    let t;
    if (base == null || base.replace(/\s+/g, "") == ""){
        t = document.getElementById('base');
        t.value = "";
        t.placeholder = "Base field cannot be empty."
        t.style.border = "1px solid red";
        valid = false;
    } else {
        t = document.getElementById('base');
        t.placeholder = "";
        t.style.border = "1px solid black";
    }

    if (skin == null || skin.replace(/\s+/g, "") == ""){
        t = document.getElementById('skin');
        t.value="";
        t.placeholder = "Skin field cannot be empty.";
        t.style.border = "1px solid red";
        valid = false;
    } else {
        t = document.getElementById('skin');
        t.placeholder = "";
        t.style.border = "1px solid black";
    }

    if (eyes == null || eyes.replace(/\s+/g, "") == ""){
        t = document.getElementById('eyes');
        t.value="";
        t.placeholder = "Eye color field cannot be empty.";
        t.style.border = "1px solid red";
        valid = false;
    } else {
        document.getElementById('eyes').style.border = "1px solid black";
        t.placeholder = "";
        t.style.border = "1px solid black";
    }

    if (maneShape == null || maneShape.replace(/\s+/g, "") == ""){
        t = document.getElementById('maneshape');
        t.value="";
        t.placeholder = "Mane shape field cannot be empty.";
        t.style.border = "1px solid red";
        valid = false;
    } else {
        t = document.getElementById('maneshape');
        t.placeholder = "";
        t.style.border = "1px solid black";
    }

    if (maneCol == null || maneCol.replace(/\s+/g, "") == ""){
        t = document.getElementById('manecol');
        t.value="";
        t.placeholder = "Mane color field cannot be empty.";
        t.style.border = "1px solid red";
        valid = false;
    } else {
        t = document.getElementById('manecol');
        t.placeholder = "";
        t.style.border = "1px solid black";
    }

    if (valid == false){
        return false;
    }

    readJSON();
}

function readJSON(){
    for(let i = 0; i < jsonData.length; i++) {
        let count = 0;
        if (jsonData[i].Base.toLowerCase() == base.toLowerCase()) {
            count+=1;
        }
        if (jsonData[i].Skin.toLowerCase() == skin.toLowerCase()) {
            count+=1;
        }
        if (jsonData[i].Eyes.toLowerCase() == eyes.toLowerCase()) {
            count+=1;
        }
        if (jsonData[i].ManeShape.toLowerCase() == maneShape.toLowerCase()) {
            count+=1;
        }
        if (jsonData[i].ManeColor.toLowerCase() == maneCol.toLowerCase()) {
            count+=1;
        }
        for(let j = 0; j < marks.length; j++){
            let temp = jsonData[i].Markings[j].split("(")[0];
            temp = temp.substring(0, temp.length - 1);
            if (temp.toLowerCase() == marks[j].toLowerCase()) {
                count+=1;
            }
        }
        countArr.push(count);
    }
    results();
}

function results(){
    let found = true;
    let customHtml = [];
    let resultDiv = document.querySelector(".result-div");

    for(let i = 0; i < countArr.length; i++) {
        if (countArr[i] >= threshhold) {
            let t_html;
            if (countArr[i] >= 10) {
                t_html = '<div style="margin:5px;padding:5px;><p><p>"'+countArr[i]+'/15 Near-Raffle Lioness Clone of the ';
            }
            else{
                t_html = '<div style="margin:5px;padding:5px;"><p><p>Shares '+countArr[i]+'/15 Traits with the ';
            }
            t_html+=jsonData[i].Date+" Raffle Lioness</p><ul>"
            console.log(t_html);

            resultDiv.innerHTML += "<h3>"+jsonData[i].Date+"</h3><p>Shares "+countArr[i]+"/15 traits.</p>";

            if (jsonData[i].Base.toLowerCase() == base.toLowerCase()) {
                resultDiv.innerHTML += "<p><b>Base: "+jsonData[i].Base+"</b></p>";
            }
            else{
                resultDiv.innerHTML += "<p>Base: "+jsonData[i].Base+"</p>";
            }

            if (jsonData[i].Skin.toLowerCase() == skin.toLowerCase()) {
                resultDiv.innerHTML += "<p><b>Skin: "+jsonData[i].Skin+"</b></p>";
            }
            else{
                resultDiv.innerHTML += "<p>Skin: "+jsonData[i].Skin+"</p>";
            }

            if (jsonData[i].Eyes.toLowerCase() == eyes.toLowerCase()) {
                resultDiv.innerHTML += "<p><b>Eyes: "+jsonData[i].Eyes+"</b></p>";
            }
            else{
                resultDiv.innerHTML += "<p>Eyes: "+jsonData[i].Eyes+"</p>";
            }

            if (jsonData[i].ManeShape.toLowerCase() == maneShape.toLowerCase()) {
                resultDiv.innerHTML += "<p><b>Mane Shape: "+jsonData[i].ManeShape+"</b></p>";
            }
            else{
                resultDiv.innerHTML += "<p>Mane Shape: "+jsonData[i].ManeShape+"</p>";
            }

            if (jsonData[i].ManeColor.toLowerCase() == maneCol.toLowerCase()) {
                resultDiv.innerHTML += "<p><b>Mane Color: "+jsonData[i].ManeColor+"</b></p>";
            }
            else{
                resultDiv.innerHTML += "<p>Mane Color: "+jsonData[i].ManeColor+"</p>";
            }

            for(let k = 0; k < marks.length; k++){
                let temp = jsonData[i].Markings[k].split("(")[0];
                temp = temp.substring(0, temp.length - 1);
                if (temp.toLowerCase() == marks[k].toLowerCase()) {
                    resultDiv.innerHTML += "<p><b>Marking "+String(k+1)+": "+jsonData[i].Markings[k]+"</b></p>";
                }
                else{
                    resultDiv.innerHTML += "<p>Marking "+String(k+1)+": "+jsonData[i].Markings[k]+"</p>";
                }
            }
            resultDiv.innerHTML+="<br><br>";

            customHtml.push(t_html);


            found = true;
        }
        console.log(customHtml);
    }
    if (!found) {
        resultDiv.innerHTML = "<h3>No Raffle Lionesses that share at least "+threshhold+"/15 traits found.</h3>";
    }
}
