window.onload = () => {
    let searchButton = document.getElementById("search-button");
        searchButton.addEventListener("click", event => {
            let searchBox = document.getElementById("search-box");
            let searchTerm = searchBox.value;
            console.log(searchTerm);

        });
}
