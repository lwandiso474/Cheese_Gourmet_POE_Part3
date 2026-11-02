// contact.js - platter request form and opening hours

function showError(id, message) {
    document.getElementById(id).textContent = message;
}

// date as YYYY-MM-DD, offset by a number of days from today
function dateString(offsetDays) {
    var d = new Date();
    d.setDate(d.getDate() + offsetDays);
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") +
        "-" + String(d.getDate()).padStart(2, "0");
}

// pick the platter that fits the number of guests
function suggestPlatter(people) {
    if (people <= 4) { return 0; }   // small
    if (people <= 8) { return 1; }   // medium
    return 2;                        // large
}

function validateForm() {
    var valid = true;
    ["name", "email", "people", "date"].forEach(function (id) { showError(id + "-error", ""); });

    if (document.getElementById("name").value.trim().length < 2) {
        showError("name-error", "Please enter your name (at least 2 characters).");
        valid = false;
    }

    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(document.getElementById("email").value.trim())) {
        showError("email-error", "Please enter a valid email address, like name@example.com.");
        valid = false;
    }

    var people = parseInt(document.getElementById("people").value, 10);
    if (isNaN(people) || people < 1 || people > 200) {
        showError("people-error", "Please enter how many people, between 1 and 200.");
        valid = false;
    }

    var date = document.getElementById("date").value;
    if (date === "") {
        showError("date-error", "Please choose the date you need the platter.");
        valid = false;
    } else if (date < dateString(1)) {
        showError("date-error", "We need 24 hours' notice. Please choose tomorrow or later.");
        valid = false;
    }

    return valid;
}

// shows "open now" or "closed now" using Johannesburg time
function updateOpenStatus() {
    var box = document.getElementById("open-status");
    if (!box) { return; }

    var parts = new Intl.DateTimeFormat("en-ZA", {
        timeZone: "Africa/Johannesburg", weekday: "short",
        hour: "numeric", minute: "numeric", hour12: false
    }).formatToParts(new Date());

    var day = "", minutes = 0;
    parts.forEach(function (p) {
        if (p.type === "weekday") { day = p.value; }
        if (p.type === "hour") { minutes += (parseInt(p.value, 10) % 24) * 60; }
        if (p.type === "minute") { minutes += parseInt(p.value, 10); }
    });

    var open = false;
    if (["Mon", "Tue", "Wed", "Thu", "Fri"].indexOf(day) !== -1) {
        open = minutes >= 8 * 60 && minutes < 17 * 60;
    } else if (day === "Sat") {
        open = minutes >= 8 * 60 && minutes < 15 * 60;
    }

    box.textContent = open ? "We are open now" : "We are closed right now";
    box.className = "open-status " + (open ? "open" : "closed");
}

document.addEventListener("DOMContentLoaded", function () {
    updateOpenStatus();

    var form = document.getElementById("contact-form");
    if (!form) { return; }

    document.getElementById("date").min = dateString(1);

    // choosing a number of people selects a sensible platter
    document.getElementById("people").addEventListener("input", function () {
        var people = parseInt(this.value, 10);
        if (!isNaN(people) && people > 0) {
            document.getElementById("platter").selectedIndex = suggestPlatter(people);
        }
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        var result = document.getElementById("form-result");
        result.className = "";

        if (!validateForm()) {
            result.textContent = "";
            return;
        }

        // build the thank-you text and the data BEFORE the form is cleared
        var platter = document.getElementById("platter").value.split(" - ")[0].toLowerCase();
        var thanks = "Thank you, " + document.getElementById("name").value.trim() +
            "! Your request for a " + platter + " platter for " +
            document.getElementById("people").value + " people on " +
            document.getElementById("date").value + " has been sent. We will contact you to confirm.";
        var body = new URLSearchParams(new FormData(form)).toString();

        result.textContent = "Sending your request...";

        // Netlify Forms stores the submission and emails the site owner
        try {
            fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: body
            }).then(function (response) {
                if (!response.ok) {
                    throw new Error("Server answered " + response.status);
                }
                result.textContent = thanks;
                form.reset();
            }).catch(function (error) {
                console.error("Form error:", error);
                result.className = "failed";
                result.textContent = "Sorry, we could not send your request. Please phone us on 011 888 5387.";
            });
        } catch (error) {
            console.error("Form error:", error);
            result.className = "failed";
            result.textContent = "Sorry, we could not send your request. Please phone us on 011 888 5387.";
        }
    });
});
