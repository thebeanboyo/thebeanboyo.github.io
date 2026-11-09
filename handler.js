import jsonData from './rl-directory.json' with { type: 'json' };
document.getElementById('main-form').addEventListener('submit', onSubmit)
let countArr = [];
document.getElementById('threshhold').defaultValue = "10";


let base, skin, eyes, maneShape, maneCol, mark1, mark2, mark3, mark4, mark5, mark6, mark7, mark8, mark9, mark10, threshhold;
let marks = [];
let customHtmlList = [];

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
    document.querySelectorAll('.btn').forEach(e => e.remove());
    customHtmlList = [];
    let success = 0;
    let resultDiv = document.querySelector(".result-div");

    for(let i = 0; i < countArr.length; i++) {
        if (countArr[i] >= threshhold) {
            let customHtml = "";

            if (countArr[i] >= 10) {
                customHtml += '<div style="margin:5px;padding:5px;"><p>'+countArr[i]+'/15 Near-Raffle Lioness Clone of the ';
            }
            else{
                customHtml += '<div style="margin:5px;padding:5px;"><p>Shares '+countArr[i]+'/15 Traits with the ';
            }

            customHtml+=jsonData[i].Date+" Raffle Lioness</p><ul>";
            resultDiv.innerHTML += "<h3>"+jsonData[i].Date+" <input type='image' src='copy.png' name='"+jsonData[i].Date+"' class='btn submit' dataIndex='"+success+"' width='18em'><div class='hovertxt'>Click to copy tracking HTML for lion bio!</div></h3><p>Shares "+countArr[i]+"/15 traits.</p>";

            if (jsonData[i].Base.toLowerCase() == base.toLowerCase()) {
                resultDiv.innerHTML += "<p><b>Base: "+jsonData[i].Base+"</b></p>";
                customHtml += "<li><b>Base: "+jsonData[i].Base+"</b></li>";
            }
            else{
                resultDiv.innerHTML += "<p>Base: "+jsonData[i].Base+"</p>";
                customHtml += "<li>Base: "+jsonData[i].Base+"</li>";
            }

            if (jsonData[i].Skin.toLowerCase() == skin.toLowerCase()) {
                resultDiv.innerHTML += "<p><b>Skin: "+jsonData[i].Skin+"</b></p>";
                customHtml += "<li><b>Skin: "+jsonData[i].Skin+"</li></p>";
            }
            else{
                resultDiv.innerHTML += "<p>Skin: "+jsonData[i].Skin+"</p>";
                customHtml += "<li>Skin: "+jsonData[i].Skin+"</li>";
            }

            if (jsonData[i].Eyes.toLowerCase() == eyes.toLowerCase()) {
                resultDiv.innerHTML += "<p><b>Eyes: "+jsonData[i].Eyes+"</b></p>";
                customHtml += "<li><b>Eyes: "+jsonData[i].Eyes+"</b></li>";
            }
            else{
                resultDiv.innerHTML += "<p>Eyes: "+jsonData[i].Eyes+"</p>";
                customHtml += "<li>Eyes: "+jsonData[i].Eyes+"</li>";
            }

            if (jsonData[i].ManeShape.toLowerCase() == maneShape.toLowerCase()) {
                resultDiv.innerHTML += "<p><b>Mane Shape: "+jsonData[i].ManeShape+"</b></p>";
                customHtml += "<li><b>Mane Shape: "+jsonData[i].ManeShape+"</b></li>";
            }
            else{
                resultDiv.innerHTML += "<p>Mane Shape: "+jsonData[i].ManeShape+"</p>";
                customHtml += "<li>Mane Shape: "+jsonData[i].ManeShape+"</li>";
            }

            if (jsonData[i].ManeColor.toLowerCase() == maneCol.toLowerCase()) {
                resultDiv.innerHTML += "<p><b>Mane Color: "+jsonData[i].ManeColor+"</b></p>";
                customHtml += "<li><b>Mane Color: "+jsonData[i].ManeColor+"</b></li>";
            }
            else{
                resultDiv.innerHTML += "<p>Mane Color: "+jsonData[i].ManeColor+"</p>";
                customHtml += "<li>Mane Color: "+jsonData[i].ManeColor+"</li>";
            }

            for(let k = 0; k < marks.length; k++){
                let temp = jsonData[i].Markings[k].split("(")[0];
                temp = temp.substring(0, temp.length - 1);
                if (temp.toLowerCase() == marks[k].toLowerCase()) {
                    resultDiv.innerHTML += "<p><b>Marking "+String(k+1)+": "+jsonData[i].Markings[k]+"</b></p>";
                    customHtml += "<li><b>M"+String(k+1)+": "+jsonData[i].Markings[k]+"</b></li>";
                }
                else{
                    resultDiv.innerHTML += "<p>Marking "+String(k+1)+": "+jsonData[i].Markings[k]+"</p>";
                    customHtml += "<li>M"+String(k+1)+": "+jsonData[i].Markings[k]+"</li>";
                }
            }
            resultDiv.innerHTML+="<br><br>";
            customHtml+="</ul><p style='font-size:0.75em;padding:1em;margin-top:-1.25em;'>RLC Tracking HTML generated by <a href='https://www.lioden.com/territory.php?id=148817'>thebeanboyo (#148817)</a>\'s <a href='https://thebeanboyo.github.io/'>Raffle Lioness Clone search tool</a>.</p></div>";

            customHtmlList.push(customHtml);

            success++;
        }

    }
    if (success == 0) {
        resultDiv.innerHTML = "<h3>No Raffle Lionesses that share at least "+threshhold+"/15 traits found.</h3>";
        return false;
    }
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', (i) => {
            let j = i.target.getAttribute('dataIndex');
            let name = i.target.getAttribute('name');
            navigator.clipboard.writeText(customHtmlList[j]);
            alert('HTML for '+name+' Copied to clipboard.');
        });
    });


}

