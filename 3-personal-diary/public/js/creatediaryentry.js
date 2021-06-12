const diaryForm = document.querySelector("form");
const message = document.querySelector("textarea");
const messageOne = document.querySelector("#message-1");

diaryForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const message = search.value;
    console.log(message)

    fetch("/diary", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({message : message})}
    ).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {

                let html = "";

                html += "<p><b>Word</b>: " + data._id + "</p>";
                html += "<p><b>Pronunciation:</b> <i>" + data.message + "</i></p>";
                html += "<br>";

                messageOne.innerHTML = html;
            }
        });
    });


});