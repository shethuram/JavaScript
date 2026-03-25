const container = document.getElementById("container");
const loader = document.getElementById("loader");

let page = 1;
let isLoading = false;
let hasMore = true;
const limit = 10;

// Fetch data
async function fetchData() {
    // Stop if already loading OR no more data
    if (isLoading || !hasMore) return;

    isLoading = true;
    loader.style.display = "block";

    try {
        const res = await fetch(
            `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
        );
        const data = await res.json();

        //  Stop condition
        if (data.length === 0) {
            hasMore = false;
            loader.innerText = "No more content";
            return;
        }

        appendData(data);
        page++;
    } catch (err) {
        console.error("Error fetching data:", err);
    }

    loader.style.display = "none";
    isLoading = false;
}

// Append data
function appendData(data) {
    data.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.body}</p>
        `;

        container.appendChild(card);
    });
}

// Scroll detection
function handleScroll() {
    const scrollPosition = window.innerHeight + window.scrollY;
    const threshold = document.body.offsetHeight - 100;

    if (scrollPosition >= threshold) {
        fetchData();
    }
}

// Initial load
fetchData();

// Listen to scroll
window.addEventListener("scroll", handleScroll);