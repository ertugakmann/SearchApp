const form = document.querySelector("#form");
const searchText = document.querySelector(".search-text");
const buttonWrapper = document.querySelector(".button-wrapper");
const searchButton = document.querySelector(".search-button");
const clearButton = document.querySelector(".clear-button");
const imageListWrapper = document.querySelector(".imagelist-wrapper");


runEventsListener();

function runEventsListener(e) {
    form.addEventListener("submit", search);
    clearButton.addEventListener("click", clear)
}

function clear(e) {
    searchText.value = "";
    Array.from(imageListWrapper.children).forEach((child) => child.remove());
    console.clear()
}

function search(e) {
    const value = searchText.value.trim();

    fetch(`https://api.unsplash.com/search/photos?query=${value}`, {
        method: "GET",
        headers: {
            Authorization: "Client-ID BpYmb9z-uIZyjX6lzjgrrOYcAactQSJQh_djnJI-U-o"
        }
    })
        .then((res) => res.json())
        .then((data) => {
            Array.from(data.results).forEach((image) => {
                console.log(image.urls.small)
                addImagesToUI(image.urls.small);
            })

        }
        )
        .catch((err) => console.log(err));
    e.preventDefault();
    imageListWrapper.innerHTML = ""

}

function addImagesToUI(url) {
    const div = document.createElement("div");
    div.className = "card";
    
    const img = document.createElement("img");
    img.setAttribute("src", url);
    img.height = '400';
    img.width = '400';
    img.display = "inline"

    div.append(img);
    imageListWrapper.append(div);
}