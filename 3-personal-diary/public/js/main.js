const weatherForm = document.querySelector("form");
const search = document.querySelector("textarea");
const messageOne = document.querySelector("#message-1");

document.addEventListener("DOMContentLoaded", function (event) {
    // Your code to run since DOM is loaded and ready
});

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const message = search.value;
    console.log(message)

    fetch("/meaning?word=" + word).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {

                let html = "";

                html += "<p><b>Word</b>: " + data.result.word + "</p>";
                html += "<p><b>Pronunciation:</b> <i>" + data.result.pronunciation + "</i></p>";
                html += "<br>";

                data.result.definitions.forEach(element => {
                    html += "<i>" + element.type + "</i>";
                    html += "<p><b>Definition:</b> " + element.definition + "</p>";
                    html += "<p><b>Example:</b> " + element.example + "</p>";
                    html += "<br>"
                });

                messageOne.innerHTML = html;
            }
        });
    });
    

});
