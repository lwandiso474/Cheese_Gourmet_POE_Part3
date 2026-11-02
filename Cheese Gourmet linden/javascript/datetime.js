// datetime.js - shows the current date and time in the footer of every page.
// The text refreshes every second so the clock stays accurate.

function updateDateTime() {
    var box = document.getElementById("datetime");
    if (!box) {
        return; // this page has no date/time paragraph
    }

    var now = new Date();
    var dateOptions = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    var timeOptions = { hour: "2-digit", minute: "2-digit", second: "2-digit" };

    box.textContent = now.toLocaleDateString("en-ZA", dateOptions) + " | " +
        now.toLocaleTimeString("en-ZA", timeOptions);
}

document.addEventListener("DOMContentLoaded", function () {
    updateDateTime();                  // show it immediately
    setInterval(updateDateTime, 1000); // then update every second
});
