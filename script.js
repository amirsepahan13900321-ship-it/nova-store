
/* =====================================================
   NOVA STORE - SCRIPT.JS
===================================================== */


/* =====================================================
   1. CART
===================================================== */

// گرفتن سبد خرید از حافظه مرورگر
let cart = JSON.parse(localStorage.getItem("novaCart")) || [];


/* =====================================================
   2. ذخیره سبد خرید
===================================================== */

function saveCart() {

    localStorage.setItem(
        "novaCart",
        JSON.stringify(cart)
    );

}


/* =====================================================
   3. تعداد محصولات سبد خرید
===================================================== */

function updateCartCount() {

    const cartCount = document.getElementById("cartCount");

    if (!cartCount) return;


    let totalItems = 0;


    cart.forEach(function(item) {

        totalItems += item.quantity;

    });


    cartCount.textContent = totalItems;

}


/* =====================================================
   4. افزودن محصول به سبد
===================================================== */

function addToCart(product) {


    const existingProduct = cart.find(function(item) {

        return item.id === product.id;

    });


    if (existingProduct) {

        existingProduct.quantity += 1;

    } else {

        cart.push({

            id: product.id,

            name: product.name,

            price: product.price,

            image: product.image,

            quantity: 1

        });

    }


    saveCart();

    updateCartCount();


    alert(
        product.name +
        " به سبد خرید اضافه شد."
    );

}


/* =====================================================
   5. دکمه‌های افزودن به سبد
===================================================== */

const addCartButtons =
    document.querySelectorAll(".add-cart");


addCartButtons.forEach(function(button) {


    button.addEventListener(
        "click",
        function() {


            const product = {

                id: Number(
                    button.dataset.id
                ),

                name:
                    button.dataset.name,

                price:
                    Number(
                        button.dataset.price
                    ),

                image:
                    button.dataset.image

            };


            addToCart(product);

        }
    );

});


/* =====================================================
   6. منوی موبایل
===================================================== */

const menuBtn =
    document.getElementById("menuBtn");


const navigation =
    document.querySelector(".navigation");


if (menuBtn && navigation) {


    menuBtn.addEventListener(
        "click",
        function() {


            navigation.classList.toggle(
                "active"
            );


        }
    );


}


/* =====================================================
   7. بستن منوی موبایل بعد از کلیک
===================================================== */

const navigationLinks =
    document.querySelectorAll(
        ".navigation a"
    );


navigationLinks.forEach(function(link) {


    link.addEventListener(
        "click",
        function() {


            if (navigation) {

                navigation.classList.remove(
                    "active"
                );

            }


        }
    );


});


/* =====================================================
   8. بروزرسانی تعداد سبد هنگام باز شدن سایت
===================================================== */

updateCartCount();


/* =====================================================
   9. انیمیشن ساده هنگام اسکرول
===================================================== */

const cards =
    document.querySelectorAll(
        ".product-card, .feature, .contact-card"
    );


const observer =
    new IntersectionObserver(

        function(entries) {


            entries.forEach(
                function(entry) {


if (
                        entry.isIntersecting
                    ) {


                        entry.target.style.opacity =
                            "1";


                        entry.target.style.transform =
                            "translateY(0)";


                    }


                }
            );


        },

        {
            threshold: 0.15
        }

    );


cards.forEach(function(card) {


    card.style.opacity = "0";

    card.style.transform =
        "translateY(25px)";

    card.style.transition =
        "opacity 0.6s ease, transform 0.6s ease";


    observer.observe(card);

});


/* =====================================================
   10. جلوگیری از کلیک اشتباه روی دکمه محصول
===================================================== */

document
    .querySelectorAll(".add-cart")
    .forEach(function(button) {


        button.addEventListener(
            "click",
            function(event) {

                event.stopPropagation();

            }
        );


    });


/* =====================================================
   NOVA STORE
   END
===================================================== */
