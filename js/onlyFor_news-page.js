$(document).ready(function () {

    var btnSharing = $(".singleNew_sharing");


    btnSharing.on("click", function () {

        $(this).toggleClass("active");

    });


    'use strict';

    const CANVAS = document.getElementsByTagName('canvas')[0],
        CTX = CANVAS.getContext('2d'),
        W = window.innerWidth,
        H = 384,
        S = Math.min(W, H),
        NUM_CIRCLES = 500,
        ATTRACTION = 0.13,
        SPREAD = 1.4,
        RANGE = 0.9,
        MAX_CIRCLE_SIZE = 2.2,
        CIRCLES = [];

    class Circle {
        constructor() {
            this.pos = new Vector(W / 2, H / 2);
            this.vel = new Vector(Math.random() * SPREAD + RANGE, Math.random() * SPREAD + RANGE);
            this.rot = Math.random() * Math.PI * 2;
            this.color = 'rgba(19,255,116,0.4)';
            this.r = Math.random() * (MAX_CIRCLE_SIZE - 1) + 0.5;
        }

        update() {
            const ROT_VEL = Math.random() * ATTRACTION;
            const XCoord = this.pos.x - W / 2;
            const YCoord = this.pos.y - H / 2;

            let dx = this.vel.x * Math.cos(this.rot);
            let dy = this.vel.y * Math.sin(this.rot);
            dx -= XCoord / (S / 2);
            dy -= YCoord / (S / 2);
            this.pos.add(dx, dy);

            this.rot += (Math.random() - Math.random()) * ROT_VEL;
        }

        draw() {
            CTX.beginPath();
            CTX.fillStyle = this.color;
            CTX.arc(this.pos.x, this.pos.y, this.r, 0, Math.PI * 2);
            CTX.fill();
            CTX.closePath();
        }
    }

    class Vector {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }

        add(a, b) {
            this.x += a;
            this.y += b;
        }
    }

    function renderCircles() {
        for (let i = 0; i < CIRCLES.length; i++) {
            CIRCLES[i].update();
            CIRCLES[i].draw();
        }
    }

    function loop() {
        window.requestAnimationFrame(loop);
        CTX.fillStyle = 'rgba(0,0,0,0.1)';
        CTX.fillRect(0, 0, W, H);
        renderCircles();
    }

    function createCircles() {
        for (let i = 0; i < NUM_CIRCLES; i++) {
            CIRCLES.push(new Circle());
        }
    }

    function init() {
        CANVAS.width = W;
        CANVAS.height = H;
        createCircles();
        loop();
    }
    init();



});


