"use strict";

// Duomenis pasiimsime iš: https://magnetic-melon-yam.glitch.me

/*
1. Naudojant tik JS, sukurkite lentelę ir į ją įrašykite duomenis (id, name, city, fav_color).
2. Naudojant JS metodus, padalinkite vardą į dvi dalis: vardą ir pavardę (lentelėje).
3. Pridėkite prie lentelės (tarp id ir name) nuotrauką.
4. Sukurkite checkbox virš lentelės su JS. Jį paspaudus, rodys tik tuos žmones, kurie yra VIP.
5. Sukurkite virš lentelės ir search laukelį (forma su input type search ir mygtukas). Suvedus duomenis, lentelėje turi prasifiltruoti pagal vardą arba pavardę (fullname contains search string). Capitalizacija turėtų būti nesvarbi.
*/

const state = {};

const createTitleBox = () => {
  const checkBox = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  checkBox.setAttribute("id", "vip");
  document.body.append(checkBox);

  const checkBoxLabel = document.createElement("label");
  checkBoxLabel.setAttribute("for", "vip");
  checkBoxLabel.innerText = "VIP";
  document.body.append(checkBoxLabel);

  const div = document.createElement("div");
  div.append(checkBox, checkBoxLabel);
  document.body.append(div);

  const searchBox = document.createElement("input");
  searchBox.setAttribute("type", "search");
  searchBox.setAttribute("id", "search");
  searchBox.setAttribute("name", "search");
  searchBox.setAttribute("placeholder", "Enter fullname");
  document.body.append(searchBox);

  const searchButton = document.createElement("button");
  searchButton.innerHTML = "Search for name";
  document.body.append(searchButton);

  const forma = document.createElement("form");
  forma.append(searchBox, searchButton);
  document.body.append(forma);

  const section = document.createElement("section");
  section.setAttribute("id", "header");
  section.append(div, forma);
  document.body.append(section);
};

const createTable = () => {
  const id = document.createElement("th");
  id.innerText = "ID";
  document.body.append(id);

  const image = document.createElement("th");
  image.innerText = "Image";

  const name = document.createElement("th");
  name.innerText = "Name";

  const surname = document.createElement("th");
  surname.innerText = "Surname";

  const city = document.createElement("th");
  city.innerText = "City";

  const favColor = document.createElement("th");
  favColor.innerText = "Fav color";

  const tr = document.createElement("tr");
  tr.append(id, image, name, surname, city, favColor);

  const thead = document.createElement("thead");
  thead.append(tr);

  const table = document.createElement("table");
  table.append(thead, document.createElement("tbody"));
  document.body.append(table);
};

createTitleBox();
createTable();

function populateTable(addToTable) {
  const tbody = document.querySelector("tbody");
  tbody.innerText = "";

  addToTable.forEach((x) => {
    const id = document.createElement("td");
    id.innerText = x.id;

    const [firstName, secondName] = x.name.split(" ");

    const img = document.createElement("img");
    img.src = x.image;
    img.setAttribute("alt", firstName);
    const image = document.createElement("td");
    image.append(img);

    const name = document.createElement("td");
    name.innerText = firstName;

    const surname = document.createElement("td");
    surname.innerText = secondName;

    const city = document.createElement("td");
    city.innerText = x.city;

    const favColor = document.createElement("td");
    favColor.innerText = x.fav_color;

    const tr = document.createElement("tr");
    tr.append(id, image, name, surname, city, favColor);
    tbody.append(tr);
  });
}

function renderTable(addToTable) {
  const tbody = document.querySelector("tbody");
  tbody.innerText = "";

  addToTable.forEach((x) => {
    const id = document.createElement("td");
    id.innerText = x.id;

    const [firstName, secondName] = x.name.split(" ");

    const img = document.createElement("img");
    img.src = x.image;
    img.setAttribute("alt", firstName);
    const image = document.createElement("td");
    image.append(img);

    const name = document.createElement("td");
    name.innerText = firstName;

    const surname = document.createElement("td");
    surname.innerText = secondName;

    const city = document.createElement("td");
    city.innerText = x.city;

    const favColor = document.createElement("td");
    favColor.innerText = x.fav_color;

    const tr = document.createElement("tr");
    tr.append(id, image, name, surname, city, favColor);
    tbody.append(tr);
  });
}

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const searchString = document.getElementById("search").value.toLowerCase();
  renderTable(
    state.addToTable.filter((x) => x.name.toLowerCase().includes(searchString))
  );
});

document.getElementById("vip").addEventListener("change", (e) => {
  e.preventDefault();
  populateTable(
    e.target.checked ? state.addToTable.filter((x) => x.vip) : state.addToTable
  );
});

const API_URL = "https://magnetic-melon-yam.glitch.me";

async function fetchData() {
  try {
    let response = await fetch(API_URL);
    if (response.ok) {
      state.addToTable = await response.json();
      populateTable(state.addToTable);
    }
  } catch (error) {
    console.error(error);
  }
}

fetchData();
