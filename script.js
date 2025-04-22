// script.js

// Search functionality for the main homepage
const searchInputHome = document.getElementById('searchInput');
const aboutUsSection = document.querySelector('.about-us-home');
const flipCard = document.querySelector('.flip-card');
const scroller = document.querySelector('.scroller');
const header = document.querySelector('header');

if (searchInputHome) {
    searchInputHome.addEventListener('input', function () {
        const searchText = this.value.toLowerCase();
        const bodyText = document.body.textContent.toLowerCase();
        // Basic filter - you might want to target specific elements for better search
        const shouldShowHeader = header ? header.textContent.toLowerCase().includes(searchText) : true;
        const shouldShowScroller = scroller ? scroller.textContent.toLowerCase().includes(searchText) : true;
        const shouldShowAboutUs = aboutUsSection ? aboutUsSection.textContent.toLowerCase().includes(searchText) : true;
        const shouldShowMenu = flipCard ? flipCard.textContent.toLowerCase().includes(searchText) : true;
        const shouldShowFooter = document.querySelector('footer') ? document.querySelector('footer').textContent.toLowerCase().includes(searchText) : true;

        document.body.style.display = (shouldShowHeader || shouldShowScroller || shouldShowAboutUs || shouldShowMenu || shouldShowFooter) ? 'block' : 'none';
        // This is a very basic implementation. Consider a more targeted approach.
    });
}

// Smooth scrolling for the contact link on the homepage
document.addEventListener('DOMContentLoaded', function() {
    const contactLinkHome = document.querySelector('header nav.nav-links a[href="#contact"]');
    const contactSectionFooter = document.querySelector('footer#contact');

    if (contactLinkHome && contactSectionFooter) {
        contactLinkHome.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default jump behavior
            contactSectionFooter.scrollIntoView({ behavior: 'smooth' });
        });
    }
});

// Search functionality for the products page
const searchInputProducts = document.getElementById('searchInputProducts');
const productsPage = document.querySelectorAll('.product-section .product');

if (searchInputProducts && productsPage.length > 0) {
    searchInputProducts.addEventListener('input', function () {
        const searchText = this.value.toLowerCase();
        productsPage.forEach(product => {
            const text = product.textContent.toLowerCase();
            product.style.display = text.includes(searchText) ? 'block' : 'none';
        });
    });
}

// Cart functionality (for both products.html and product_detail.html)
let cart = [];
const cartItemsDisplay = document.getElementById('cartItems');

function addToCart(productName, price) {
    cart.push({ productName, price });
    displayCart();
}

function displayCart() {
    if (cartItemsDisplay) {
        cartItemsDisplay.innerHTML = '';

        let total = 0;
        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.productName} - ₹${item.price}`;
            cartItemsDisplay.appendChild(li);
            total += item.price;
        });

        const totalPrice = document.createElement('p');
        totalPrice.textContent = `Total: ₹${total}`;
        cartItemsDisplay.appendChild(totalPrice);
    }
}

// Event listeners for "Add to Cart" buttons on the products page
const addToCartButtonsProducts = document.querySelectorAll('.product-section .add-to-cart');
addToCartButtonsProducts.forEach(button => {
    button.addEventListener('click', () => {
        const productElement = button.previousElementSibling;
        if (productElement && productElement.querySelector('h3') && productElement.querySelector('p')) {
            const productName = productElement.querySelector('h3').textContent;
            const priceText = productElement.querySelector('p').textContent.replace('₹', '').split('-')[0].trim();
            const price = parseInt(priceText);
            if (!isNaN(price)) {
                addToCart(productName, price);
            }
        }
    });
});

// Event listener for "Add to Cart" button on the product detail page (if present)
const addToCartButtonDetail = document.querySelector('.product-detail-page .add-to-cart');
if (addToCartButtonDetail) {
    addToCartButtonDetail.addEventListener('click', () => {
        const productNameElement = document.querySelector('.product-detail-page .detail-description h3');
        const priceElement = document.querySelector('.product-detail-page .detail-description .price');

        if (productNameElement && priceElement) {
            const productName = productNameElement.textContent;
            const priceText = priceElement.textContent.replace('₹', '').split('-')[0].trim();
            const price = parseInt(priceText);
            if (!isNaN(price)) {
                addToCart(productName, price);
            }
        }
    });
}