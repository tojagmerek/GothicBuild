const stats = {
    lvl: 0,
    lp: 0,
    nlp: 500,
    str: 10,
    dex: 10,
    mana: 10,
    hp: 40,
    h1: 10,
    h2: 10,
    bow: 10,
    cbow: 10
}

const ui = {
    lvl: document.getElementById("lvl"),
    lp: document.getElementById("leariningPoints"),
    nlp: document.getElementById("nextLvlPoints"),
    str: document.getElementById("StrengthPoints"),
    dex: document.getElementById("DexterityPoints"),
    mana: document.getElementById("ManaPoints"),
    hp: document.getElementById("HealthPoints"),
    h1: document.getElementById("oneHandedPoints"),
    h2: document.getElementById("twoHandedPoints"),
    bow: document.getElementById("bowsPoints"),
    cbow: document.getElementById("crossbowsPoints"),
}

const keys = ["lvl","lp", "nlp","str", "dex", "mana", "hp", "h1", "h2", "bow", "cbow"];

const limits = {
    str: 1,
    dex: 1,
    mana: 1,
    h1: 1,
    h2: 1,
    bow: 1,
    cbow: 1
}

const state = {
    weaponDmg: 5,
    monsterDef: 0
}

function setStats(key) {
    ui[key].textContent = stats[key];
    if(stats[key]>=120) limits[key] = 5;
    else if(stats[key]>=90) limits[key] = 4;
    else if(stats[key]>=60) limits[key] = 3;
    else if(stats[key]>=30) limits[key] = 2;
}

function renderAll() {
    keys.forEach(setStats)
}

document.querySelectorAll(".AddButton").forEach((btn) => {
    btn.addEventListener("click", () => {
        const key = btn.dataset.attribute;
        const delta = Number(btn.dataset.value);

        const beforeLvl = stats.lvl;

        if(stats.lp>=delta*limits[key] && key != "lvl") {
            stats[key] += delta;
            stats.lp -= delta * limits[key];
        }

        if(key === "lvl") {
            stats[key] += delta;
            stats.nlp += 500 * delta;
            stats.hp += 12 * delta;
            const gained = stats.lvl - beforeLvl;
            stats.lp += (gained * 10);
        }

        renderAll();
    });
});

const weaponMenu = document.getElementById("weaponMenu");
const weaponList = document.getElementById("weaponList");
const backButton = document.getElementById("backButton");
const weaponItems = document.getElementById("weaponItems");

document.querySelectorAll(".weapon").forEach((btn) => {
    btn.addEventListener("click", () => {
        weaponList.classList.remove("hidden");
        weaponMenu.classList.add("hidden");
    });
    btn.addEventListener("click", async () => {
        const type = btn.dataset.attribute;

        const res = await fetch("./assets/weapons.json");
        const data = await res.json();
        const filtered = data.filter(item => item.hands === type);

        weaponItems.innerHTML = filtered.map(item => `<button class="AddButton chooseWeapon" data-dmg="${item.damage}">${item.name} - DMG: ${item.damage}</button>`).join("");

        weaponItems.querySelectorAll(".chooseWeapon").forEach(btn => {
        btn.addEventListener("click", () => {
            if(stats.str>=btn.dataset.)
            state.weaponDmg = Number(btn.dataset.dmg);
    });
    });
    });
});

backButton.addEventListener("click", () => {
    weaponList.classList.add("hidden");
    weaponMenu.classList.remove("hidden");
});



function finalDmg() {
    
}

renderAll();