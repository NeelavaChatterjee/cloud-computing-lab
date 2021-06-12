const messageOne = document.querySelector("#message-1");

document.addEventListener("DOMContentLoaded", function (event) {
    fetch("/diary").then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {

                let html = "";

                data.forEach(element => {
                    html += "<p><b>Date:</b> " + element.createdAt + "</p>";
                    html += "<p>" + element.message + "</p>";
                    html += "<button>delete</button>"
                    html += "<button>edit</button>"
                    html += "<hr>"
                });

                messageOne.innerHTML = html;
            }
        });
    });
});