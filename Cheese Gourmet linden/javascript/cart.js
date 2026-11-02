// cart.js - shopping cart for Cheese Gourmet
// Items are stored in localStorage so the cart survives page changes.

var CART_KEY = "cheeseGourmetCart";

// Read the cart from storage (returns an empty array if nothing is saved)
function loadCart() {
    try {
        var saved = localStorage.getItem(CART_KEY);
        return saved ? JSON.parse(saved) : [];
    } catch (e) {
        return [];
    }
}

function saveCart(cart) {
    try {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (e) {
        // storage blocked - cart will only last for this page
    }
}

var cart = loadCart();

function formatPrice(amount) {
    return "R" + amount.toFixed(2);
}

function addToCart(name, price) {
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].name === name) {
            cart[i].quantity++;
            saveCart(cart);
            updateCartDisplay();
            return;
        }
    }
    cart.push({ name: name, price: price, quantity: 1 });
    saveCart(cart);
    updateCartDisplay();
}

function changeQuantity(name, change) {
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].name === name) {
            cart[i].quantity += change;
            if (cart[i].quantity <= 0) {
                cart.splice(i, 1);
            }
            break;
        }
    }
    saveCart(cart);
    updateCartDisplay();
}

function clearCart() {
    cart = [];
    saveCart(cart);
    updateCartDisplay();
}

// Redraw the nav counter and (on the Products page) the cart panel
function updateCartDisplay() {
    var totalItems = 0;
    var totalPrice = 0;
    for (var i = 0; i < cart.length; i++) {
        totalItems += cart[i].quantity;
        totalPrice += cart[i].price * cart[i].quantity;
    }

    var counter = document.getElementById("cart-count");
    if (counter) {
        counter.textContent = totalItems;
    }

    var list = document.getElementById("cart-items");
    var totalBox = document.getElementById("cart-total");
    if (!list || !totalBox) {
        return; // this page has no cart panel
    }

    list.innerHTML = "";

    if (cart.length === 0) {
        var empty = document.createElement("li");
        empty.textContent = "Your cart is empty. Add a platter from the cards above.";
        list.appendChild(empty);
    }

    cart.forEach(function (item) {
        var li = document.createElement("li");
        li.textContent = item.name + " x " + item.quantity + " = " +
            formatPrice(item.price * item.quantity) + " ";

        var minus = document.createElement("button");
        minus.type = "button";
        minus.textContent = "-";
        minus.setAttribute("aria-label", "Remove one " + item.name);
        minus.addEventListener("click", function () {
            changeQuantity(item.name, -1);
        });

        var plus = document.createElement("button");
        plus.type = "button";
        plus.textContent = "+";
        plus.setAttribute("aria-label", "Add one " + item.name);
        plus.addEventListener("click", function () {
            changeQuantity(item.name, 1);
        });

        li.appendChild(minus);
        li.appendChild(plus);
        list.appendChild(li);
    });

    totalBox.textContent = "Total: " + formatPrice(totalPrice);
}

document.addEventListener("DOMContentLoaded", function () {
    // Every "Add to cart" button carries its item name and price in data attributes
    var buttons = document.querySelectorAll(".add-to-cart");
    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            addToCart(button.dataset.name, parseFloat(button.dataset.price));
            var note = document.getElementById("cart-message");
            if (note) {
                note.textContent = button.dataset.name + " added to your cart.";
            }
        });
    });

    var clearButton = document.getElementById("clear-cart");
    if (clearButton) {
        clearButton.addEventListener("click", clearCart);
    }

    var checkoutButton = document.getElementById("checkout");
    if (checkoutButton) {
        checkoutButton.addEventListener("click", function () {
            var note = document.getElementById("cart-message");
            if (cart.length === 0) {
                note.textContent = "Add at least one item before checking out.";
                return;
            }
            note.textContent = "Thank you for your order! We will contact you to confirm it.";
            clearCart();
        });
    }

    updateCartDisplay();
});
