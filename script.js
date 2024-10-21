fetch('./config.json').then(res => res.json()).then(data => {
    const config = data;
    const customCursor = document.createElement('div');
    customCursor.classList.add('custom-cursor');
    document.body.appendChild(customCursor);

    const cursor = document.querySelector('.custom-cursor');

    // Update cursor position
    document.addEventListener('mousemove', (e) => {
        cursor.style.top = `${e.clientY}px`;
        cursor.style.left = `${e.clientX}px`;
    });

    // Apply hover effects to links and buttons
    document.querySelectorAll('a, button, input[type=text], textarea').forEach((el) => {
        var tempBgColor, tempColor;

        el.addEventListener('mouseenter', () => {
            const rect = el.getBoundingClientRect();
            tempBgColor = el.style.backgroundColor;
            tempColor = el.style.color;
            if (el.attributes.type?.value == 'text') {
                cursor.style.width = '2px';
                cursor.style.height = `${rect.height - 10}px`;
                cursor.style.backgroundColor = 'black';

            }
            else if (el.tagName == 'TEXTAREA') {
                cursor.style.width = '2px';
                cursor.style.height = '20px'; `${config.link.shadow.xoffset} ${config.link.shadow.yoffset} ${config.link.shadow.blurRadius} ${config.link.shadow.color}`
            }
            else {
                cursor.style.width = `${rect.width}px`;
                cursor.style.height = `${rect.height}px`;
                if (el.tagName == 'A') {
                    el.style.textShadow = `${config.link.shadow.xoffset} ${config.link.shadow.yoffset} ${config.link.shadow.blurRadius} ${config.link.shadow.color}`;
                    el.style.color = config.link.onHoverColor;
                }
                else {
                    el.style.boxShadow = `${config.button.shadow.xoffset} ${config.button.shadow.yoffset} ${config.button.shadow.blurRadius} ${config.button.shadow.spread} ${config.button.shadow.color}`;
                    el.style.color = config.button.onHoverColor;
                    el.style.backgroundColor = config.button.onHoverBgColor;
                }
                el.style.transition = 'all 0.2s ease-out';
                el.style.scale = '1.1';

                cursor.style.backgroundColor = 'transparent';
                cursor.style.border = '1px solid transparent';
            }
            cursor.style.borderRadius = `${Math.min(rect.height / 2, 12)}px`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.scale = '1';
            if (el.tagName == 'A') {
                el.style.textShadow = 'none';
            }
            else {
                el.style.boxShadow = 'none';
            }
            el.style.color = tempColor;
            el.style.backgroundColor = tempBgColor;

            cursor.style.width = '30px';
            cursor.style.height = '30px';
            cursor.style.borderRadius = '50%';
            cursor.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
            cursor.style.border = '1px solid white';
        });
    });
}
);

// Get the button
let backToTopBtn = document.getElementById("backToTopBtn");

// Show the button when the user scrolls down 20px from the top of the document
window.onscroll = function() {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    backToTopBtn.style.display = "block";  // Show karta h
  } else {
    backToTopBtn.style.display = "none";   // Hide 
  }
}

// When the user clicks the button, the page scroll to the top 
backToTopBtn.onclick = function() {
  scrollToTop();
};

function scrollToTop() {
  const scrollStep = window.scrollY / 20;  
  const scrollAnimation = () => {
    if (window.scrollY > 0) {
      window.scrollBy(0, -scrollStep); 
      requestAnimationFrame(scrollAnimation);  
    }
  };
  requestAnimationFrame(scrollAnimation);
}
