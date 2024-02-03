// sorry for the spaghetti code and redundant variables, i wasn't exactly a good coder back then

const cols = 4;
const main = document.getElementById('main');
let parts = [];

let images = [
  "https://i.ibb.co/bg21Dms/more-liechenstein-mountain.jpg&auto=format&fit=crop&w=2700&q=80",
  "https://i.ibb.co/5h20HxN/Whats-App-Image-2023-06-30-at-22-52-31-c1ill-Vo-0-transformed.jpg&auto=format&fit=crop&w=2550&q=80",
  "https://i.ibb.co/P69SdVy/werdenburg-castle.jpg&auto=format&fit=crop&w=2550&q=80",
  "https://i.ibb.co/LPyNdbB/buchs-train-station.jpg&auto=format&fit=crop&w=2700&q=80",
  "https://i.ibb.co/k3xcW5d/liechenstein-mountain.jpg&auto=format&fit=crop&w=2700&q=80",
  "https://i.ibb.co/ZKrr6wq/pagani.jpg&auto=format&fit=crop&w=2700&q=80",
  "https://i.ibb.co/x5F92Ns/tree-river.jpg&auto=format&fit=crop&w=2700&q=80",
  "https://i.ibb.co/h8ScJg4/big-nasa-rocket.jpg&auto=format&fit=crop&w=2700&q=80",
  "https://i.ibb.co/M9dvWMy/nasa-big-building.jpg&auto=format&fit=crop&w=2700&q=80",
  "https://i.ibb.co/tBkn9BC/rocket-farter.jpg&auto=format&fit=crop&w=2700&q=80",
  "https://i.ibb.co/6tjmdGz/tim-henson.jpg&auto=format&fit=crop&w=2700&q=80",
  "https://i.ibb.co/rt8ntjT/freight.jpg&auto=format&fit=crop&w=2700&q=80",
  "https://i.ibb.co/HrNtRcx/french-mountain-which-isnt-one.jpg&auto=format&fit=crop&w=2700&q=80",
  "https://i.ibb.co/D7tj73v/plane-window.jpg&auto=format&fit=crop&w=2700&q=80",
  "https://i.ibb.co/mJZRk0x/air-shaft.jpg&auto=format&fit=crop&w=2700&q=80",
  "https://i.ibb.co/Lrbz001/bridge-to-nowhere.jpg&auto=format&fit=crop&w=2700&q=80",
  "https://i.ibb.co/WpxyP5x/church-very-big.jpg&auto=format&fit=crop&w=2700&q=80",
  "https://i.ibb.co/KVzBSpj/maroon-tunnel.jpg&auto=format&fit=crop&w=2700&q=80",
  "https://i.ibb.co/SxQxTsh/latvia-border.jpg&auto=format&fit=crop&w=2700&q=80",
  "https://i.ibb.co/DtYqvHR/water-fals.jpg&auto=format&fit=crop&w=2700&q=80",
  "https://i.ibb.co/FqM11YS/liechenstein-hotel.jpg&auto=format&fit=crop&w=2700&q=80",
  "https://i.ibb.co/q0gDJnd/lithuania-tower.jpg&auto=format&fit=crop&w=2700&q=80",
  "https://i.ibb.co/mXxK5ds/russian-embassy.jpg&auto=format&fit=crop&w=2700&q=80",
  "https://i.ibb.co/Dbts9mw/eiffel-tower.jpg&auto=format&fit=crop&w=2700&q=80",
  "https://i.ibb.co/vksPdg9/tunnel.jpg&auto=format&fit=crop&w=2700&q=80",
  "https://i.ibb.co/wyT9Xdr/green-tunnel.jpg&auto=format&fit=crop&w=2700&q=80"
];
let current = 0;
let playing = false;

for (let i in images) {
  new Image().src = images[i];
}

for (let col = 0; col < cols; col++) {
  let part = document.createElement('div');
  part.className = 'part';
  let el = document.createElement('div');
  el.className = "section";
  let img = document.createElement('img');
  img.src = images[current];
  el.appendChild(img);
  part.style.setProperty('--x', -100/cols*col+'vw');
  part.appendChild(el);
  main.appendChild(part);
  parts.push(part);
}

let animOptions = {
  duration: 2.3,
  ease: Power4.easeInOut
};

function go(dir) {
  if (!playing) {
    playing = true;
    if (current + dir < 0) current = images.length - 1;
    else if (current + dir >= images.length) current = 0;
    else current += dir;

    function up(part, next) {
      part.appendChild(next);
      gsap.to(part, {...animOptions, y: -window.innerHeight}).then(function () {
        part.children[0].remove();
        gsap.to(part, {duration: 0, y: 0});
      })
    }

    function down(part, next) {
      part.prepend(next);
      gsap.to(part, {duration: 0, y: -window.innerHeight});
      gsap.to(part, {...animOptions, y: 0}).then(function () {
        part.children[1].remove();
        playing = false;
      })
    }

    for (let p in parts) {
      let part = parts[p];
      let next = document.createElement('div');
      next.className = 'section';
      let img = document.createElement('img');
      img.src = images[current];
      next.appendChild(img);

      if ((p - Math.max(0, dir)) % 2) {
        down(part, next);
      } else {
        up(part, next);
      }
    }
  }
}

window.addEventListener('keydown', function(e) {
  if (['ArrowDown', 'ArrowRight'].includes(e.key)) {
    go(1);
  }

  else if (['ArrowUp', 'ArrowLeft'].includes(e.key)) {
    go(-1);
  }
});

function lerp(start, end, amount) {
  return (1-amount)*start+amount*end
}

const cursor = document.createElement('div');
cursor.className = 'cursor';

const cursorF = document.createElement('div');
cursorF.className = 'cursor-f';
let cursorX = 0;
let cursorY = 0;
let pageX = 0;
let pageY = 0;
let size = 8;
let sizeF = 36;
let followSpeed = .16;

document.body.appendChild(cursor);
document.body.appendChild(cursorF);

if ('ontouchstart' in window) {
  cursor.style.display = 'none';
  cursorF.style.display = 'none';
}

cursor.style.setProperty('--size', size+'px');
cursorF.style.setProperty('--size', sizeF+'px');

window.addEventListener('mousemove', function(e) {
  pageX = e.clientX;
  pageY = e.clientY;
  cursor.style.left = e.clientX-size/2+'px';
  cursor.style.top = e.clientY-size/2+'px';
});

function loop() {
  cursorX = lerp(cursorX, pageX, followSpeed);
  cursorY = lerp(cursorY, pageY, followSpeed);
  cursorF.style.top = cursorY - sizeF/2 + 'px';
  cursorF.style.left = cursorX - sizeF/2 + 'px';
  requestAnimationFrame(loop);
}

loop();

let startY;
let endY;
let clicked = false;

function mousedown(e) {
  gsap.to(cursor, {scale: 4.5});
  gsap.to(cursorF, {scale: .4});

  clicked = true;
  startY = e.clientY || e.touches[0].clientY || e.targetTouches[0].clientY;
}
function mouseup(e) {
  gsap.to(cursor, {scale: 1});
  gsap.to(cursorF, {scale: 1});

  endY = e.clientY || endY;
  if (clicked && startY && Math.abs(startY - endY) >= 40) {
    go(!Math.min(0, startY - endY)?1:-1);
    clicked = false;
    startY = null;
    endY = null;
  }
}
window.addEventListener('mousedown', mousedown, false);
window.addEventListener('touchstart', mousedown, false);
window.addEventListener('touchmove', function(e) {
  if (clicked) {
    endY = e.touches[0].clientY || e.targetTouches[0].clientY;
  }
}, false);
window.addEventListener('touchend', mouseup, false);
window.addEventListener('mouseup', mouseup, false);

let scrollTimeout;
function wheel(e) {
  clearTimeout(scrollTimeout);
  setTimeout(function() {
    if (e.deltaY < -40) {
      go(-1);
    }
    else if (e.deltaY >= 40) {
      go(1);
    }
  })
}
window.addEventListener('mousewheel', wheel, false);
window.addEventListener('wheel', wheel, false);
