const lines = [
    "hi beb,",
    "",
    "i know you’re mad at me right now,",
    "",
    "and honestly...",
    "",
    "I don’t blame you. I understand fully well",
    "",
    "I’m really sorry. I know I overwhelmed you emotionally, and that wasn’t my intention at all. I just messed up, and I take full responsibility for it.",
    "",
    "I know what I said hurt you, and I hate that I made you feel that way.",
    "",
    "I miss you na kaayo, Beb,",
    "",
    "pero I also respect that you want space. I won’t force you to talk to me if you’re not ready.",
    "",
    "I just want you to know…",
    "",
    "I do know you... I know how much I hurt you, and I am really sorry",
    "",
    "I love you 💜",
    "",
    "— Bea"
];

let noIndex = 0;

const noTexts = [
    "Nawp 🙈",
    "Ngii 🥺",
    "Pleaaase? 💜"
];

/* ================= OPEN LETTER ================= */
function openLetter() {

    document.getElementById("envelope").classList.add("open");

    setTimeout(() => {
        document.getElementById("letter").classList.add("show");
        startTyping();
    }, 1200);

    document.addEventListener("click", closeOnOutside);
}

/* ================= TYPING EFFECT ================= */
function startTyping() {

    const container = document.getElementById("typedText");
    let i = 0;

    function typeLine() {

        if (i >= lines.length) {
            document.getElementById("forgiveSection").style.display = "block";
            return;
        }

        let p = document.createElement("p");
        let text = lines[i];
        let j = 0;

        let interval = setInterval(() => {

            if (j < text.length) {
                p.textContent += text.charAt(j);
            }

            j++;

            if (j >= text.length) {
                clearInterval(interval);
                i++;
                setTimeout(typeLine, 300);
            }

        }, 25);

        container.appendChild(p);
    }

    typeLine();
}

/* ================= MOBILE-SAFE NO BUTTON ================= */
function moveNoButtonAway(noBtn, yesBtn) {

    const container = document.getElementById("letter");

    const containerRect = container.getBoundingClientRect();
    const yesRect = yesBtn.getBoundingClientRect();

    const btnWidth = noBtn.offsetWidth || 100;
    const btnHeight = noBtn.offsetHeight || 40;

    const maxX = containerRect.width - btnWidth - 10;
    const maxY = containerRect.height - btnHeight - 10;

    let x, y;
    let safe = false;
    let attempts = 0;

    while (!safe && attempts < 50) {

        attempts++;

        x = Math.random() * maxX;
        y = Math.random() * maxY;

        let futureNo = {
            left: x + containerRect.left,
            right: x + btnWidth + containerRect.left,
            top: y + containerRect.top,
            bottom: y + btnHeight + containerRect.top
        };

        let overlap =
            !(futureNo.right < yesRect.left ||
              futureNo.left > yesRect.right ||
              futureNo.bottom < yesRect.top ||
              futureNo.top > yesRect.bottom);

        if (!overlap) safe = true;
    }

    noBtn.style.position = "absolute";
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
}

/* ================= BUTTON LOGIC (TOUCH + CLICK SAFE) ================= */
document.addEventListener("DOMContentLoaded", () => {

    const noBtn = document.getElementById("noBtn");
    const yesBtn = document.getElementById("yesBtn");

    const handleNo = () => {

        if (noIndex < noTexts.length) {
            noBtn.textContent = noTexts[noIndex];
            noIndex++;
        }

        moveNoButtonAway(noBtn, yesBtn);
    };

    // supports mobile + desktop
    noBtn.addEventListener("click", handleNo);
    noBtn.addEventListener("touchstart", handleNo, { passive: true });

    yesBtn.addEventListener("click", () => {
        document.getElementById("popup").style.display = "flex";
    });
});

/* ================= POPUP CLOSE ================= */
function closePopup() {
    document.getElementById("popup").style.display = "none";
}

/* ================= CLICK OUTSIDE RESET ================= */
function closeOnOutside(e) {

    const letter = document.getElementById("letter");
    const envelope = document.getElementById("envelope");

    if (!letter.contains(e.target) && !envelope.contains(e.target)) {

        document.getElementById("letter").classList.remove("show");
        document.getElementById("envelope").classList.remove("open");

        document.getElementById("typedText").innerHTML = "";
        document.getElementById("forgiveSection").style.display = "none";

        noIndex = 0;
        document.getElementById("noBtn").textContent = "No 😔";

        document.removeEventListener("click", closeOnOutside);
    }
}