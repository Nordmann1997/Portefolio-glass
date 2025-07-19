document.addEventListener("keydown", (event) => {
    let letter = document.createElement("div");
    letter.textContent = event.key;
    letter.style.position = "fixed";
    letter.style.left = `${Math.random() * window.innerWidth}px`;
    letter.style.top = `-50px`;
    letter.style.fontSize = "40px";
    letter.style.color = "black";
    letter.style.opacity = "1";
    letter.style.transition = "transform 3s ease-in, opacity 3s ease-in";
    document.body.appendChild(letter);

    setTimeout(() => {
        letter.style.transform = `translateY(100vh) rotate(${Math.random() * 360}deg)`;
    }, 10);

    setTimeout(() => {
        letter.remove();
    }, 3000);
});

