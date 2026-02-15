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

function setStats(key) {
    ui[key].textContent = stats[key];
}

function renderAll() {
    keys.forEach(setStats)
}

document.querySelectorAll(".AddButton").forEach((btn) => {
    btn.addEventListener("click", () => {
        const key = btn.dataset.attribute;
        const delta = Number(btn.dataset.value);

        const beforeLvl = stats.lvl;

        if(stats.lp>=delta && key != "lvl") {
            stats[key] += delta;
            stats.lp -= delta;
        }

        if(key === "lvl") {
            stats[key] += delta;
            stats.nlp += 500 * delta;
            stats.hp += 12 * delta;
            const gained = stats.lvl - beforeLvl;
            stats.lp += (gained * 10);
        }

        renderAll();
    })
})

renderAll();