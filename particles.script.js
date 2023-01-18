particlesJS('particles-js',
    {
        "particles": {
        "number": {
            "value": 120,
            "density": {
            "enable": true,
            "value_area": window.innerWidth > 992 ? 800 : 2000
            }
        },
        "color": {
            "value": "#a5a5a5"
        },
        "shape": {
            "type": "circle",
            "stroke": {
            "width": 0,
            "color": "#000000"
            },
            "polygon": {
            "nb_sides": 3
            },
            "image": {
            "src": "img/github.svg",
            "width": 100,
            "height": 100
            }
        },
        "opacity": {
            "value": 1,
            "random": false,
            "anim": {
            "enable": false,
            "speed": 0.3,
            "opacity_min": 0.1,
            "sync": false
            }
        },
        "size": {
            "value": 5,
            "random": true,
            "anim": {
            "enable": false,
            "speed": 40,
            "size_min": 0.1,
            "sync": false
            }
        },
        "line_linked": {
            "enable": true,
            "distance": 120,
            "color": "#c5c5c5",
            "opacity": 1,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 2,
            "direction": "bottom",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
            }
        }
        },
        "interactivity": {
        "detect_on": "window",
        "events": {
            "onhover": {
            "enable": window.innerWidth > 992 ? true : false,
            "mode": "repulse"
            },
            "onclick": {
            "enable": false,
            "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "grab": {
            "distance": 400,
            "line_linked": {
                "opacity": 1
            }
            },
            "bubble": {
            "distance": 400,
            "size": 40,
            "duration": 2,
            "opacity": 8,
            "speed": 3
            },
            "repulse": {
            "distance": 170.4199634814365,
            "duration": 0.4
            },
            "push": {
            "particles_nb": 4
            },
            "remove": {
            "particles_nb": 2
            }
        }
        },
        "retina_detect": true
  }
)