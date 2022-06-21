

let slider = document.querySelector(".picture-container");
let images = document.getElementsByTagName("section");

let prevButton = document.getElementById('prev');
let nextButton = document.getElementById('next');

let current = 0;

console.log(images.length);


function makeSelectors(){

    console.log("The makeSelector function is launched");

        let selector = document.createElement("div");
        document.querySelector(".slide-nav").appendChild(selector);
        selector.classList.add("selector");
        selector.classList.add("selected");
        selector.addEventListener("click", showImage);

        console.log("first Selector is created");    

        const selectors = [selector];

        console.log("current length of selectors is " + selectors.length);

    for( i = 1 ; i <= images.length -1; i++){

        let selector = document.createElement("div");
        document.querySelector(".slide-nav").appendChild(selector);
        selector.classList.add("selector");
        selector.addEventListener("click", showImage);
        selectors.push(selector);

        console.log("current length of selectors is " + selectors.length);

    }

    function showImage(event){

        console.log("Selector has been clicked");

        let imageHeight = images[current].offsetHeight; 

        for ( i = 0 ; i <= selectors.length -1; i++ ){
            
            selectors[i].classList.remove("selected");
            // images[i].classList.add("hidden");
            
        }
        
        event.target.classList.add("selected");

        for( i = 0 ; i <= selectors.length -1; i++ ){

            if(selectors[i].classList.contains("selected")){

            // images[i].classList.remove("hidden");

                current = i;

                currentImageHeight = ((current + 1)*imageHeight)-imageHeight;

                slider.style.transform="translatey(-"+currentImageHeight+"px)";


            }

        }
        
    }

    
}

function prevImage(){

    console.log("previous button was clicked");

    let selector = document.querySelectorAll(".selector");
    let imageHeight = images[current].offsetHeight; 
    
    console.log( "current Height of the image is" + " " + imageHeight + "px" );


    for( i = 0 ; i < selector.length; i++ ){

        if( selector[i].classList.contains("selected")){

            current = i;

        }

    }

    // images[current].classList.add("hidden");
    selector[current].classList.remove("selected");

    current --; 

    if( current < 0 ){


        console.log("condition 1 is triggered")
        current = images.length - 1;

        console.log(images[current]);


    }else if( current >= images.length){

        console.log("condition 2 is triggered")
        current = 0;

        currentImageHeight = (current*imageHeight)-imageHeight;

        slider.style.transform="translatey(-"+currentImageHeight+"px)";

        // images[current].classList.add("hidden");

        // console.log(images[current]);

    }

    // images[current].classList.remove("hidden");

    currentImageHeight = (current*imageHeight);

    slider.style.transform="translatey(-"+currentImageHeight+"px)";
    
    selector[current].classList.add("selected");

}

function nextImage(){

    console.log("Next button was clicked");

    let selector = document.querySelectorAll(".selector");

    let imageHeight = images[current].offsetHeight;



    for( i = 0 ; i < selector.length; i++ ){

        if( selector[i].classList.contains("selected")){

            current = i;

        }

    }


    currentImageHeight = (current +1)*imageHeight;

    console.log(currentImageHeight);

    slider.style.transform="translatey(-"+currentImageHeight+"px)";
    

    selector[current].classList.remove("selected");

    
    // images[current].classList.add("hidden");
    // images[current].classList.remove("show");

    current ++;

        console.log(images[current]);

        if( current >= images.length){

            current = 0;

            // images[current].classList.add("hidden");
            // images[current].classList.remove("show");

            currentImageHeight = (current)*imageHeight;

            console.log(currentImageHeight);
 
            slider.style.transform="translatey(-"+currentImageHeight+"px)";

            console.log(images[current]);

        }

    // images[current].classList.remove("hidden"); 
    // images[current].classList.add("show");  
    selector[current].classList.add("selected");

}

function autoSlide(){

    console.log("AutoSlide function is launched");    

    setInterval(nextImage, 5000);

} 

document.addEventListener('keydown', function(e) {
    
    switch (e.keyCode) {

        case 37:
            prevImage();
            break;

        case 39:
            nextImage();
            break;

    }

});


window.addEventListener('wheel', function(event)
{

 if (event.deltaY <= 2){

  console.log('scrolling up');
  prevImage();

 }

 else if (event.deltaY >= 2){

  console.log('scrolling down');

  nextImage();

 }
});

///////////SWIPE DETECTION///////////////

var touchstartX = 0;
var touchstartY = 0;
var touchendX = 0;
var touchendY = 0;


slider.addEventListener('touchstart', function(event) {
    touchstartX = event.changedTouches[0].screenX;
    touchstartY = event.changedTouches[0].screenY;
}, false);

slider.addEventListener('touchend', function(event) {
    touchendX = event.changedTouches[0].screenX;
    touchendY = event.changedTouches[0].screenY;
    handleGesure();
}, false); 

function handleGesure() {

    if (touchendX < touchstartX) {
        prevImage();
        console.log('swiped up!');
    }
    if (touchendX > touchstartX) {
        console.log('swiped right!');
    }
    if (touchendY < touchstartY) {
        nextImage();
        console.log('swiped down!');
    }
    if (touchendY > touchstartY) {
        console.log('swiped left!');
    }
    if (touchendY === touchstartY) {
        console.log('tapped');
    }

}

//autoSlide();

makeSelectors();
// prevButton.addEventListener("click", prevImage);
// nextButton.addEventListener("click", nextImage);

