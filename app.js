const DATA_URL =
"https://raw.githubusercontent.com/digidevsoft-glitch/learningwebsite/refs/heads/main/websiteforlearning";

let data;
let currentNiche;
let currentSubject;

async function loadData(){

const res = await fetch(DATA_URL);
data = await res.json();

showNiches();

}

function showNiches(){

const container = document.getElementById("niches");
container.innerHTML = `<div class="section-title">Categories</div>`;

let html = `<div class="grid">`;

data.niches.forEach(niche =>{

html += `
<div class="card" onclick="openNiche('${niche.name}')">
${niche.name}
</div>
`;

});

html += `</div>`;

container.innerHTML += html;

}

function openNiche(name){

currentNiche = data.niches.find(n=>n.name===name);

const container = document.getElementById("subjects");

let html = `<div class="section-title">${name} Subjects</div><div class="grid">`;

currentNiche.subjects.forEach(sub=>{

html += `
<div class="card" onclick="openSubject('${sub.name}')">
${sub.name}
</div>
`;

});

html += "</div>";

container.innerHTML = html;

}

function openSubject(name){

currentSubject = currentNiche.subjects.find(s=>s.name===name);

const container = document.getElementById("classes");

let html = `<div class="section-title">${name} Classes</div><div class="grid">`;

for(const cls in currentSubject.classVideos){

html += `
<div class="card" onclick="openClass('${cls}')">
${cls}
</div>
`;

}

html += "</div>";

container.innerHTML = html;

}

function openClass(cls){

const videos = currentSubject.classVideos[cls];

const container = document.getElementById("videos");

let html = `<div class="section-title">${cls} Lessons</div>`;

videos.forEach(v=>{

if(v){

const id = v.split("v=")[1];

html += `
<div style="margin-bottom:20px">
<iframe src="https://www.youtube.com/embed/${id}" allowfullscreen></iframe>
</div>
`;

}

});

container.innerHTML = html;

}

loadData();
