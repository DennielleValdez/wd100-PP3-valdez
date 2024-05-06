// PRODUCT PAGE

let productContainer = document.querySelector("#product-Container");
let modalContainer = document.querySelector("#modal-Container");
let cartContainer = document.querySelector("#cart-container");




// ADD TO CART, MODAL and REMOVE (NOT WORKING)

const addToCart = (img1, name, price) => {
    cartProducts.push({cart_img: img1, cart_name: name, cart_price: price});
    localStorage.setItem("products_cart", JSON.stringify(cartProducts));
        showCart();
        alert('Product added to cart!');
    };

const removeFromCart = (index) => {
    cartProducts.splice(index, 1);
    localStorage.setItem("products_cart", JSON.stringify(cartProducts));
    showCart();
    alert('Product removed from cart!');
}
    
const showCart = () => {
    cartContainer.innerHTML= ""; 
    // cartContainer.innerHTML= cartProducts;
    // alert(cartProducts);
    cartProducts.forEach((cart,index) => {
        cartContainer.innerHTML += `
            <tr>
                <td>
                    <img src="${cart.cart_img}" alt="" width="200">
                </td>
                <td>
                    ${cart.cart_name}
                </td>
                <td>
                    ${cart.cart_price}
                </td>
                <td>
                    <button class="btn deleteBtn" onclick="removeFromCart(${index})"><i class="fa-regular fa-trash-can"></i></button>
                </td>
            </tr>
            <div class="total-price">
                <h2>Total Price: $<span id="totalPrice"></span></h2>
            </div> 
        `;
    });
};

// PRODUCT GALLERY (WORKING)

const productGallery = () => {
    AllProducts.forEach((item) => {

        productContainer.innerHTML += `
        <div class="col-lg-3 col-md-4 col-sm-6 col-12">
            <div class="productcard">
                <div class="icon">
                    <h3><i class="fa-regular fa-heart"></i></h3>
                </div>
            <img src="${item.product_img1}" alt="">
            <div class="productcard-body">
                <h5 class="card-title">${item.product_name}asdas</h5>
                <h6>${item.product_price}</h6>
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#cart-modal-${item.product_No}" >
                    View details
                </button>
            </div>
        </div>
        
        <div class="modal fade" id="cart-modal-${item.product_No}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-xl">
                <div class="modal-content">
                    
                    <div class="modal-body">
                        <div class="row g-5">
                        <div class="col-md-6">
                            <img src="${item.product_img1}" id="main-image" width="400" height="" alt="">
                            <br><br><br>
                            <img src="${item.product_img1}" class="gallery-images" id="gallery-1" width="132" height="100" alt="">
                            <img src="${item.product_img2}" class="gallery-images" id="gallery-2" width="132" height="100" alt="">
                            <img src="${item.product_img3}" class="gallery-images" id="gallery-3" width="132" height="100" alt="">
                        </div>
        
                    <div class="col-md-6">
                        <div class="modal-header">
                            <div class="Name" style="color:black">
                                <h2>${item.product_name}</h2>
                            </div>
                        </div> 
                        <br>
                        <div class="desc" style="color:black">
                            <h3>${item.product_desc1}</h3>
                            <h3>${item.product_desc2}</h3>
                            <h3>${item.product_desc3}</h3>
                            <h3>${item.product_desc4}</h3>
                        </div>
                        <br>
                        <div class="price" style="color:black">
                            <h2>${item.product_price}</h2>
                            <br>
                            <p>${item.product_deltime}</p>
                        </div>
                        <br>
                        <button class="btn btn-primary addToCartbtn" onclick="addToCart('${item.product_img1}','${item.product_name}','${item.product_price}');">
                            Add to cart
                        </button>
                    </div>
                        </div>
                        <button type="button" class="btn btn-secondary close" data-bs-dismiss="modal">Close</button>
                    </div>
               
                </div>
            </div>
        </div>
        `;
    }); 
}
productGallery();
showCart();

// IMAGES CHANGE (WORKING)
    let main_image = document.querySelector("#main-image");
    let galleryImages = document.querySelectorAll(".gallery-images");
    // alert(galleryImages.length);
    

    const imageChange = (e) => {
        let imgAttr = e.target.getAttribute("src");
        main_image.setAttribute("src", imgAttr);
    };

    galleryImages.forEach((image) => {
        image.addEventListener("click",imageChange)
    });



// SEARCH (WORKING)

const filterSearch = (e) => {

    productContainer.innerHTML = "";
    const searchString = document.querySelector("#searchInput").value.toLowerCase();
    const filterSearch = AllProducts.filter(value => {
        return value.product_name.toLowerCase().includes(searchString);
    });
    if (filterSearch.length > 0){
        for(let index = 0; index < filterSearch.length; index++){
            productContainer.innerHTML += `
            <div class="col-md-3">
                        <div class="productcard">
                            <img src="${filterSearch[index].product_img1}" alt="">
                            <div class="productcard-body">
                                <h5 class="card-title">${filterSearch[index].product_name}</h5>
                                <h6>${filterSearch[index].product_price}</h6>
                                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#cart-modal" onclick="openModal(${filterSearch[index].product_No})">
                                    View details
                                </button>
                            </div>
                        </div>
                </div>
            `;
        };
    }
    else {
        productContainer.innerHTML = `<h5>Item Not Found</h5>`;
    }
};

    // TO MAKE THE SEARCHED PRODUCTS STAY

const handleSearchInput = (e) => {
    const searchString = e.target.value.toLowerCase();
    const filteredProducts = filterSearch(searchString);
    renderProducts(filteredProducts);
  };
  
document.getElementById('searchInput').addEventListener('input', handleSearchInput);


// CAROUSEL (WORKING)

document.addEventListener('DOMContentLoaded', function () {
    const carouselSlide = document.querySelector('.carousel-slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const images = document.querySelectorAll('.carousel-slide img');

    let counter = 0;
    const slideWidth = images[0].clientWidth;

    nextBtn.addEventListener('click', () => {
        if (counter >= images.length - 1) return;
        counter++;
        carouselSlide.style.transform = `translateX(${-slideWidth * counter}px)`;
    });

    prevBtn.addEventListener('click', () => {
        if (counter <= 0) return;
        counter--;
        carouselSlide.style.transform = `translateX(${-slideWidth * counter}px)`;
    });
});
