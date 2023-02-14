let xhr;
let endPoint = "https://restcountries.com/v2/all";
let fillCountreis;
function setCountries() {
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = processCountries;
    xhr.open('GET', endPoint, true);
    xhr.send(null);
}
let countriesObj = [];
function processCountries() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        let jsonStr = xhr.responseText;
        let obj = JSON.parse(jsonStr);
        fillCountreis = document.getElementById('countries');
        let i = 0;
        for (let country of obj) {
            countriesObj[i++] = country;
            fillCountreis.innerHTML += `<option>${country.name}</option>`;
        }
    } else if (xhr.readyState === 4 && xhr.status !== 200) {
        alert("Error: \n" + xhr.statusText);
    }
}


function showDetails() {
    setCountries();
    run();
}
function run() {
    let select = document.getElementById("countries");
    select.addEventListener('change', () => {
        let selCon = select.value;
        for (let obj of countriesObj) {
            if (obj.name == selCon) {
                let div = document.querySelector('#details');
                div.innerHTML="";
                div.classList = "details";
                let flag = document.createElement('img');
                flag.src = obj.flag;
                flag.style.width = "25%";
                div.appendChild(flag);
                div.innerHTML+="<br>";
                let country = document.createElement('h1');
                country.innerHTML = obj.name;
                div.appendChild(country);
                let region = document.createElement('p');
                region.innerHTML = obj.region;
                div.appendChild(region);
                div.innerHTML += "<br><hr>";
                region.textAlign="justify";
                let population = document.createElement('h3');
                population.innerHTML = "👨‍👩‍👧‍👦 " + (obj.population / 1000000).toFixed(2) + " Millon";
                div.appendChild(population);
                let language = document.createElement('h3');
                language.innerHTML = "🗣️ " + obj.languages[0].name;
                div.appendChild(language);
                let currency = document.createElement('h3');
                currency.innerHTML = "💰 " + obj.currencies[0].name;
                div.appendChild(currency);
            }
        }

    });
}
