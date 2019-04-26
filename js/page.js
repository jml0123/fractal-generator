/* Path outline via Anime JS*/
/* current = anime({
  targets: 'path',
  strokeDashoffset: {
    value: 0,
    duration: 700,
    easing: 'easeOutQuart'
  },
  strokeDasharray: {
    value: '240 1386',
    duration: 700,
    easing: 'easeOutQuart'
  }
}); */
const scaleItem = anime({
  targets: '.introimg',
  scale: [0.33, 0.88],
  rotate: 121,
  duration: 3000,
  autoplay: true,
  easing: 'easeInOutQuad',
})

anime.timeline({loop: true})
  .add({
    targets: '.introLetters .letter',
    opacity: [0,1],
    scale: [0, 1],
    easing: "easeInOutQuad",
    duration: 2250,
    delay: function(el, i) {
      return 150 * (i+1)
    }
  }).add({
    targets: '.introLetters',
    opacity: 0,
    scale: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });

const shapeIntro = document.getElementById('shapeIntro');



function enlargeCounterProportional(target, maxClicks, size, color, invert) {
  const element = document.getElementById(target);
  const initHeight = document.getElementById(target).offsetHeight;
  const initWidth = document.getElementById(target).offsetWidth;
  const initBorder = document.getElementById(target).style.border;

  //const maxW = document.getElementById("myDiv").style.maxWidth;
  //const maxH = document.getElementById("myDiv").style.maxHeight;

  const proportion = size / maxClicks;
  var borderColor = color;
  
  if (invert) {
    borderColor = invertColor(borderColor);
  }

  console.log(initHeight, initWidth);
  element.addEventListener("dblclick", function(event) {var target = event.currentTarget; enlarge (target, 
    proportion, proportion, maxClicks, 
    initHeight, initWidth, initBorder, borderColor) });
 
};




function textcolorrandomizer(type, target) {

    var colorArray = ["#f44141", "#f4a73a", "#f4e541", "#41f449", "#4256f4","#bd87ff", "#ef28c4"];


    if (type == "id") {
        const element = document.getElementById(target);
        var randomColor = colorArray[Math.floor(Math.random() * colorArray.length)];
        console.log(randomColor);
        element.style.color = randomColor; 
    }

    if (type == "class") {
        const nodes = document.getElementsByClassName(target);
        for (i = 0; i < nodes.length; i ++) {
            var randomColor = colorArray[Math.floor(Math.random() * colorArray.length)];
            console.log(randomColor);
            nodes[i].style.color = randomColor; }
    }

    else {
        console.log(this + "is not a valid DOM element type");
        
    }
};


function bgcolorrandomizer(type, target) {
  
  const colorArray = ["#f44141", "#f4a73a", "#f4e541", "#41f449", "#4256f4","#bd87ff", "#ef28c4", "none", "none", "none", "none"];

  /*subset must be a valid color target: e.g. backgroundColor or color*/
  if (type == "id") {
    const element = document.getElementById(target);
    var randomColor = colorArray[Math.floor(Math.random() * colorArray.length)];
    console.log(randomColor);
    element.style.background = randomColor; 
  }
  if (type == "class") {
    const nodes = document.getElementsByClassName(target);
    for (i = 0; i < nodes.length; i ++) {
      var randomColor = colorArray[Math.floor(Math.random() * colorArray.length)];
      console.log(randomColor);
      nodes[i].style.background = randomColor; }
  }
  
  else {
    console.log(this + "is not a valid DOM element type");
  }
}






