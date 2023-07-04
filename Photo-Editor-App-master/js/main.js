// image box
let imgBox = document.querySelector(".img-box");
let img = document.getElementById("img");
let upload = document.getElementById("upload");
// Filters box
let saturate = document.getElementById("saturate");
let contrast = document.getElementById("contrast");
let brightness = document.getElementById("brightness");
let sepia = document.getElementById("sepia");
let grayscale = document.getElementById("grayscale");
let blur = document.getElementById("blur");
let hueRotate = document.getElementById("hue-rotate");

let download = document.getElementById("download");
let reset = document.getElementById("reset");

// Canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Function to reset filters
function resetValue() {
  img.style.filter = "none";
  saturate.value = 100;
  contrast.value = 100;
  brightness.value = 100;
  sepia.value = 0;
  grayscale.value = 0;
  blur.value = 0;
  hueRotate.value = 0;
}

// Reset filters when user click on reset button
reset.onclick = () => {
  resetValue();
};

// hide image box and reset filters when page load
window.onload = () => {
  download.style.display = "none";
  reset.style.display = "none";
  imgBox.style.display = "none";
};

// Upload image when user select image
upload.onchange = () => {
  resetValue();
  download.style.display = "block";
  reset.style.display = "block";
  imgBox.style.display = "block";

  let file = new FileReader();
  file.readAsDataURL(upload.files[0]);
  file.onload = () => {
    img.src = file.result;
  };
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    img.style.display = "none";
  };
};

// Filter on image
let filters = document.querySelectorAll("ul li input");

filters.forEach((filter) => {
  filter.addEventListener("input", () => {
    ctx.filter = `
    saturate(${saturate.value}%)
    contrast(${contrast.value}%)
    brightness(${brightness.value}%)
    sepia(${sepia.value}%)
    grayscale(${grayscale.value})
    blur(${blur.value}px)
    hue-rotate(${hueRotate.value}deg)
    `;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  });
});

// download image when user click on download button
download.onclick = () => {
  download.href = canvas.toDataURL();
};

// add active class when user scroll down the page
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    document.querySelector("#canvas").classList.add("fixedCavas");
  } else {
    document.querySelector("#canvas").classList.remove("fixedCavas");
  }
});
