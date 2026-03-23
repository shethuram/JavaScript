const data = {
  csk: {
    title: "Chennai Super Kings",
    image: "assets/images/csk.jpg",
    points: ["5 IPL Titles", "Led by MS Dhoni", "Very consistent team"]
  },
  mi: {
    title: "Mumbai Indians",
    image: "assets/images/mi.jpg",
    points: ["5 IPL Titles", "Led by Rohit Sharma", "Strong squad"]
  },
  rcb: {
    title: "RCB",
    image: "assets/images/rcb.jpg",
    points: ["1 IPL Title", "Virat Kohli team", "Huge fanbase"]
  }
};

const cards = document.querySelectorAll(".card");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalPoints = document.getElementById("modalPoints");
const closeBtn = document.querySelector(".close");

cards.forEach(card => {
  card.addEventListener("click", () => {
    const team = card.dataset.team;
    const t = data[team];

    modalImg.src = t.image;
    modalTitle.textContent = t.title;

    modalPoints.innerHTML = "";
    t.points.forEach(p => {
      const li = document.createElement("li");
      li.textContent = p;
      modalPoints.appendChild(li);
    });

    modal.classList.add("show");
  });
});

// close button
closeBtn.addEventListener("click", () => {
  modal.classList.remove("show");
});

// click outside
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("show");
  }
});