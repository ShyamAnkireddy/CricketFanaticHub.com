        /*--------------------common--------------------*/

document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll('a[href^="#"]');   
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href.includes('.html') && href.includes('#aboutUs')) {
                document.body.style.opacity = 0;                    
                setTimeout(() => {
                    window.location.href = href;
                }, 500);
            } else if (href.startsWith('#')) {
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function addToCart(productName, productPrice) {
    var cartPopup = document.getElementById('cartPopup');
    cartPopup.innerHTML = `Product "${productName}" added to cart!`;

    cartPopup.style.display = 'block';

    setTimeout(function () {
        cartPopup.style.display = 'none';
    }, 2000);
}

function buyNow(productName, productPrice) {
    var tax = 0.1 * productPrice;
    var total = productPrice + tax;

    var billDetails = `Product: ${productName}<br>Price: ${productPrice}<br>Tax (10%): ${tax.toFixed(2)}<br>Total: ${total.toFixed(2)}`;

    var billContainer = document.getElementById('billContainer');
    var billDetailsElement = document.getElementById('billDetails');

    billDetailsElement.innerHTML = billDetails;
    billContainer.style.display = 'block';

    setTimeout(function () {
        billContainer.style.display = 'none';
    }, 3000);
}

        /*--------------------cart--------------------*/

function placeOrder() {
    var quantityInputs = document.querySelectorAll('.cart input[type="number"]');
    var quantities = Array.from(quantityInputs).map(input => parseInt(input.value));
    var prices = [599, 999, 599, 599]; 
    var subtotal = 0;
    for (var i = 0; i < quantities.length; i++) {
      subtotal += quantities[i] * prices[i];
    }
    var tax = subtotal * 0.1; 
    var total = subtotal + tax;

    var processingMessage = document.getElementById('processingMessage');
    processingMessage.style.display = 'block';

    setTimeout(function() {
      processingMessage.style.display = 'none';

      var billDetailsTable = document.querySelector('#billDetails table');
      billDetailsTable.innerHTML = `
        <tr>
          <td>Subtotal</td>
          <td>₹ ${subtotal}</td>
        </tr>
        <tr>
          <td>Tax (10%)</td>
          <td>₹ ${tax.toFixed(2)}</td>
        </tr>
        <tr>
          <td>Total</td>
          <td>₹ ${total.toFixed(2)}</td>
        </tr>
      `;

      document.getElementById("billDetails").style.display = "block";
      setTimeout(function () {
        document.getElementById("billDetails").style.display = "none";
      }, 4000);

      var congratsMessage = document.querySelector('.congrats-message');
      congratsMessage.classList.add('show-congrats');
    }, 4000);
  }

  function removeProduct(link) {
    var row = link.closest('tr');
    row.remove();
    updateTotal();
  }

  function updateTotal() {
    var quantityInputs = document.querySelectorAll('.cart input[type="number"]');
    var quantities = Array.from(quantityInputs).map(input => parseInt(input.value));
    var prices = [599, 999, 599, 599]; 
    var subtotal = 0;
    for (var i = 0; i < quantities.length; i++) {
      subtotal += quantities[i] * prices[i];

      var row = quantityInputs[i].closest('tr');
      var subtotalElement = row.querySelector('td:nth-child(3)');
      subtotalElement.textContent = `₹ ${quantities[i] * prices[i]}`;
    }

    var tax = subtotal * 0.1;
    var total = subtotal + tax;

    var totalElements = document.querySelectorAll('.total table td:nth-child(2)');
    totalElements[0].textContent = `₹ ${subtotal}`;
    totalElements[1].textContent = `₹ ${tax.toFixed(2)}`;
    totalElements[2].textContent = `₹ ${total.toFixed(2)}`;
  }
/*--------------------login--------------------*/

function showLogin() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
    document.querySelector('.buttons-container').style.display = 'none';
}

function showRegister() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
    document.querySelector('.buttons-container').style.display = 'none';
}

function validateLogin() {
    var username = document.getElementById('loginUsername').value;
    var password = document.getElementById('loginPassword').value;
    var messageContainer = document.getElementById('loginMessage');

    var storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    var user = storedUsers.find(u => u.username === username && u.password === password);

    if (user) {
        messageContainer.innerText = 'Login successful. Redirecting to home.html...';
        
        setTimeout(function() {
            window.location.href = 'home.html';
        }, 2000);
        return false; 
    } else {
        messageContainer.innerText = 'Incorrect username or password. Please try again.';
        
        // After 3 seconds, refresh the page
        setTimeout(function() {
            location.reload();
        }, 3000);

        return false; 
    }
}

function registerUser() {
    var username = document.getElementById('registerUsername').value;
    var email = document.getElementById('registerEmail').value;
    var password = document.getElementById('registerPassword').value;
    var messageContainer = document.getElementById('registerMessage');

    var storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    if (storedUsers.some(u => u.username === username)) {
        messageContainer.innerText = 'Username already taken. Please choose a different one.';
        return false;
    }

    storedUsers.push({
        username: username,
        email: email,
        password: password
    });

    localStorage.setItem('users', JSON.stringify(storedUsers));

    messageContainer.innerText = 'Registration successful. Redirecting to home.html...';
    setTimeout(function() {
        window.location.href = 'home.html';
    }, 2000);
    return false;
}
