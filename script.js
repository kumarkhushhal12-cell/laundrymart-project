const services = [
  { name: "Dry Cleaning", price: 200 },
  { name: "Wash & Fold", price: 100 },
  { name: "Ironing", price: 30 },
  { name: "Stain Removal", price: 500 },
  { name: "Leather & Suede Cleaning", price: 999 },
  { name: "Wedding Dress Cleaning", price: 2800 }
];

const servicesDiv = document.getElementById("services");
const cartBody = document.getElementById("cartBody");
const totalAmount = document.getElementById("totalAmount");

let cart = [];

// Render services
services.forEach((service, index) => {
  const div = document.createElement("div");
  div.classList.add("service");
  div.innerHTML = `
    <span>${service.name} - ₹${service.price}</span>
    <button data-index="${index}">Add Item</button>
  `;
  servicesDiv.appendChild(div);
});

// Handle add/remove
servicesDiv.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const index = e.target.dataset.index;
    const service = services[index];
    const inCart = cart.find(item => item.name === service.name);

    if (inCart) {
      cart = cart.filter(item => item.name !== service.name);
      e.target.textContent = "Add Item";
      e.target.classList.remove("remove");
    } else {
      cart.push(service);
      e.target.textContent = "Remove Item";
      e.target.classList.add("remove");
    }
    renderCart();
  }
});

function renderCart() {
  cartBody.innerHTML = "";
  if (cart.length === 0) {
    cartBody.innerHTML = `<tr><td colspan="3">No items selected</td></tr>`;
    totalAmount.textContent = "0";
    return;
  }
  cart.forEach((item, i) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${i + 1}</td>
      <td>${item.name}</td>
      <td>₹${item.price}</td>
    `;
    cartBody.appendChild(row);
  });
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  totalAmount.textContent = total;
}
// Initialize EmailJS
(function () {
    emailjs.init("YHJbrGWT430sFbrpZ");
})();


// Select button
const bookBtn = document.querySelector(".book-btn");

bookBtn.addEventListener("click", function () {

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();

    // Simple validation
    if (name === "" || email === "" || phone === "") {
        alert("Please fill all fields!");
        return;
    }

    // Disable button while sending
    bookBtn.disabled = true;
    bookBtn.innerText = "Sending...";

    // EmailJS parameters
    const templateParams = {
        user_name: name,
        user_email: email,
        user_phone: phone
    };

    emailjs.send("service_ozxwxeq", "template_d9aww72", templateParams)
        .then(function () {

    // Success message
    let message = document.createElement("p");
    message.innerText = "Thank you For Booking the Service. We will get back to you soon!";
    message.style.color = "green";
    message.style.marginTop = "15px";

    document.querySelector(".booking").appendChild(message);

    // Clear form fields
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";

    // 🔥 CLEAR CART COMPLETELY
    cart = [];                     // empty array
    renderCart();                  // re-render cart (shows "No items selected")

    // 🔥 Reset all service buttons to "Add Item"
    const allButtons = document.querySelectorAll("#services button");
    allButtons.forEach(btn => {
        btn.textContent = "Add Item";
        btn.classList.remove("remove");
    });

    bookBtn.disabled = false;
    bookBtn.innerText = "Book Now";

});

});
