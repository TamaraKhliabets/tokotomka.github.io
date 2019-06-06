const COLORS = {
    current: '#009933',
    previous: '',
    red: '#ff0000',
    blue: '#0000cc',
    green: '#009933',
    yellow: '#ffcc00',
};

const FIGURES = [
    {
        x: 30, y: 10, w: 180, h: 180, color: COLORS.current,
    },
    {
        x: 215, y: 10, w: 180, h: 180, color: COLORS.current,
    },
    {
        x: 400, y: 10, w: 180, h: 180, color: COLORS.current,
    },
    {
        x: 30, y: 195, w: 180, h: 180, color: COLORS.current,
    },
    {
        x: 215, y: 195, w: 180, h: 180, color: COLORS.current,
    },
    {
        x: 400, y: 195, w: 180, h: 180, color: COLORS.current,
    },
    {
        x: 215, y: 380, w: 180, h: 180, color: COLORS.current,
    },
    {
        x: 400, y: 380, w: 180, h: 180, color: COLORS.current,
    },
    {
        x: 120, y: 470, r: 90, startEng: 0, endEng: 2 * Math.PI, color: COLORS.current,
    },
];

class FrameBasic {
    constructor(data) {
        this.figures = data;
        this.canvas = null;
        this.ctx = null;
    }

    resize() {
        this.ctx.canvas.width = window.innerWidth;
        this.ctx.canvas.height = window.innerHeight;
    }

    static isCircle(val) {
        return ('r' in val);
    }

    drawRect(val) {
        this.ctx.fillStyle = val.color;
        this.ctx.fillRect(val.x, val.y, val.w, val.h);
    }

    drawCircle(val) {
        this.ctx.beginPath();
        this.ctx.arc(val.x, val.y, val.r, val.startEng, val.endEng);
        this.ctx.fillStyle = val.color;
        this.ctx.fill();
    }

    drawShape(s) {
        if (FrameBasic.isCircle(s)) {
            this.drawCircle(s);
        } else {
            this.drawRect(s);
        }
    }

    drawFigures() {
        this.figures.map(e => this.drawShape(e));
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

    init(id) {
        this.canvas = document.getElementById(id);
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        this.drawFigures();
    }
}

class FrameRedactor extends FrameBasic {
    constructor(data) {
        super(data);
        this.dragging = false;
        this.selected = null;
        this.dragX = 0;
        this.dragY = 0;
        this.update = null;
        this.colors = COLORS;
    }

    static isCircle(val) {
        return val ? ('r' in val) : null;
    }

    getCorrectPosition(e) {
        const bounds = e.target.getBoundingClientRect();
        let x;
        let y;
        x = e.pageX - bounds.left - window.scrollX;
        y = e.pageY - bounds.top - window.scrollY;
        x /= bounds.width;
        y /= bounds.height;
        x *= this.canvas.width;
        y *= this.canvas.height;
        return [x, y];
    }

    getRectPosition(x, y) {
        return this.figures.findIndex(e => e.x < x && x < e.x + e.w && e.y < y && y < e.y + e.h);
    }

    getCirclePosition(x, y) {
        return this.figures.findIndex(e => Math.hypot(e.x - x, e.y - y) < e.r);
    }

    getShape(...a) {
        const ind = a.filter(e => e > -1)[0];
        return this.figures[ind];
    }

    setColor(val) {
        const color = (val in this.colors) ? this.colors[val] : val;
        const currentItem = document.getElementsByClassName('current')[0];
        const previousItem = document.getElementsByClassName('previous')[0];
        this.colors.previous = this.colors.current;
        previousItem.style.backgroundColor = this.colors.current;
        this.colors.current = color;
        currentItem.style.backgroundColor = this.colors.current;
    }

    findColor(e) {
        const points = this.getCorrectPosition(e);
        const rectInd = this.getRectPosition(...points);
        const circleInd = this.getCirclePosition(...points);
        const figure = this.getShape(rectInd, circleInd);
        const { color } = figure;
        this.setColor(color);
    }

    transformShape(e) {
        const points = this.getCorrectPosition(e);
        const rectInd = this.getRectPosition(...points);
        const circleInd = this.getCirclePosition(...points);
        const s = this.getShape(rectInd, circleInd);
        if (FrameRedactor.isCircle(s)) {
            s.x -= s.r;
            s.y -= s.r;
            s.w = s.r * 2;
            s.h = s.r * 2;
            delete s.r;
            delete s.startEng;
            delete s.endEng;
        } else {
            s.x += s.w / 2;
            s.y += s.h / 2;
            s.r = s.w / 2;
            s.startEng = 0;
            s.endEng = 2 * Math.PI;
            delete s.w;
            delete s.h;
        }
        this.clearCanvas();
        this.drawFigures();
    }

    setPosition(e) {
        const points = this.getCorrectPosition(e);
        const indRect = this.getRectPosition(...points);
        const indCircle = this.getCirclePosition(...points);
        const figure = this.getShape(indRect, indCircle);
        const deleted = FrameRedactor.isCircle(figure) ? indCircle : indRect;
        this.dragX = points[0] - figure.x;
        this.dragY = points[1] - figure.y;
        this.dragging = true;
        this.selected = figure;
        this.figures.splice(deleted, 1);
        this.figures.push(figure);
    }

    redraw() {
        if (this.selected) {
            this.clearCanvas();
            this.drawFigures();
        }
    }

    dragFigures(e) {
        if (this.dragging) {
            const coordinates = this.getCorrectPosition(e);
            this.selected.x = coordinates[0] - this.dragX;
            this.selected.y = coordinates[1] - this.dragY;
            this.redraw();
            this.update = setTimeout(this.redraw, 30);
        }
    }

    dropFigures() {
        clearInterval(this.update);
        this.dragging = false;
        this.selected = null;
    }

    decorateFigure(e) {
        const coordinates = this.getCorrectPosition(e);
        const rectInd = this.getRectPosition(...coordinates);
        const circleInd = this.getCirclePosition(...coordinates);
        const figure = this.getShape(rectInd, circleInd);
        figure.color = this.colors.current;
        this.clearCanvas();
        this.drawFigures();
    }

    static swapToInactiveClass(id) {
        document.getElementById(id).classList.add('btn');
        document.getElementById(id).classList.remove('active-btn');
    }

    static swapToActiveClass(id) {
        document.getElementById(id).classList.add('active-btn');
        document.getElementById(id).classList.remove('btn');
    }

    static swap(c1, c2, c3, c4) {
        this.swapToInactiveClass(c1);
        this.swapToInactiveClass(c2);
        this.swapToInactiveClass(c3);
        this.swapToActiveClass(c4);
    }

    changeColor() {
        this.canvas.removeEventListener('click', this.findColor, true);
        this.canvas.removeEventListener('click', this.transformShape.bind(this));
        this.canvas.removeEventListener('mousedown', this.setPosition.bind(this));
        this.canvas.removeEventListener('mousemove', this.dragFigures.bind(this));
        this.canvas.removeEventListener('mouseup', this.dropFigures.bind(this));
        this.canvas.addEventListener('click', this.decorateFigure.bind(this));
        FrameRedactor.swap('picker', 'move', 'transform', 'bucket');
    }

    setCurrentColor() {
        this.canvas.removeEventListener('click', this.decorateFigure.bind(this));
        this.canvas.removeEventListener('click', this.transformShape.bind(this));
        this.canvas.removeEventListener('mousedown', this.setPosition.bind(this));
        this.canvas.removeEventListener('mousemove', this.dragFigures.bind(this));
        this.canvas.removeEventListener('mouseup', this.dropFigures.bind(this));
        this.canvas.addEventListener('click', this.findColor, true);
        FrameRedactor.swap('move', 'transform', 'bucket', 'picker');
    }

    moveFigure() {
        this.canvas.removeEventListener('click', this.decorateFigure.bind(this));
        this.canvas.removeEventListener('click', this.findColor, true);
        this.canvas.removeEventListener('click', this.transformShape.bind(this));
        this.canvas.addEventListener('mousedown', this.setPosition.bind(this));
        this.canvas.addEventListener('mousemove', this.dragFigures.bind(this));
        this.canvas.addEventListener('mouseup', this.dropFigures.bind(this));
        FrameRedactor.swap('transform', 'bucket', 'picker', 'move');
    }

    transformFigure() {
        this.canvas.removeEventListener('click', this.findColor, true);
        this.canvas.removeEventListener('click', this.decorateFigure.bind(this));
        this.canvas.removeEventListener('mousedown', this.setPosition.bind(this));
        this.canvas.removeEventListener('mousemove', this.dragFigures.bind(this));
        this.canvas.removeEventListener('mouseup', this.dropFigures.bind(this));
        this.canvas.addEventListener('click', this.transformShape.bind(this));
        FrameRedactor.swap('bucket', 'picker', 'move', 'transform');
    }
}

class FrameStack {
    constructor() {
        this.frames = [];
        this.innerElement = [];
        this.activeIndex = 0;
        this.canvas = null;
    }

    draw() {
        const index = this.activeIndex;
        this.innerElement = [];
        this.frames.map((e, i) => {
            const frame = (i === index) ? '<div class="slide slide-active">' : '<div class="slide">';
            const deleteBtn = (i !== 0) ? `<button id="remove-${i}" class="remove"><img src="assets/garbage.png" alt="garbage"/></button>` : '';
            this.innerElement.push(`${frame}<div class="slide-number">${i + 1}</div>`
                + `<canvas id='slide-${i}'></canvas>`
                + `<button id="duplicate-${i}" class="duplicate"><img src="assets/duplicate.png" alt="duplicate"/></button>`
                + `${deleteBtn}`
                + '</div>');
            return true;
        });
        const wrapper = document.getElementById('slides-wrapper');
        wrapper.innerHTML = this.innerElement.join('');
        this.frames.forEach((e, i) => e.frame.init(`slide-${i}`));
        this.addDduplicateHandlers();
        this.addRemoveHandlers();
        this.setCurrentFrame();
    }

    init() {
        const figures = JSON.parse(JSON.stringify(FIGURES));
        this.frames = [{ frame: new FrameBasic(figures) }];
        this.draw();
    }

    duplicateFrame(e) {
        const parentId = e.target.parentNode.id;
        const index = parentId.slice(10);
        const targetObj = this.frames[index].frame.figures;
        const str = JSON.stringify(targetObj);
        const strParse = JSON.parse(str);
        this.frames.splice(index, 0, { frame: new FrameBasic(strParse) });
        this.activeIndex = +index + 1;
        this.draw();
    }

    addDduplicateHandlers() {
        const elements = document.querySelectorAll('[id^="duplicate-"]');
        for (let i = 0; i < elements.length; i += 1) {
            const el = elements[i];
            el.addEventListener('click', this.duplicateFrame.bind(this));
        }
    }

    removeFrame(e) {
        const parentId = e.target.parentNode.id;
        const index = parentId.slice(7);
        this.frames.splice(index, 1);
        this.activeIndex = +index - 1;
        this.draw();
    }

    addRemoveHandlers() {
        const elements = document.querySelectorAll('[id^="remove-"]');
        for (let i = 0; i < elements.length; i += 1) {
            const el = elements[i];
            el.addEventListener('click', this.removeFrame.bind(this));
        }
    }

    addFrame() {
        const figures = JSON.parse(JSON.stringify(FIGURES));
        this.frames.push({ frame: new FrameBasic(figures) });
        this.activeIndex += 1;
        this.draw();
    }

    setCurrentFrame() {
        const canvasData = this.frames[this.activeIndex].frame.figures;
        const el = document.getElementById('canvas-wrapper');
        const canvasId = `canvas-slide-${this.activeIndex}`;
        el.innerHTML = `<canvas id="${canvasId}"></canvas>`;
        const frameRedactor = new FrameRedactor(canvasData);
        frameRedactor.init(canvasId);
        return frameRedactor;
    }
}

class FramePreview {
    constructor() {
        this.stack = null;
        this.fps = 1;
        this.count = 0;
        this.element = document.getElementById('canvas-preview');
    }

    createFrame() {
        this.stack[this.count].frame.init('canvas-preview');
        this.stack[this.count].frame.clearCanvas();
        this.stack[this.count].frame.drawFigures();
        this.count = (this.count === this.stack.length - 1) ? 0 : this.count + 1;
    }

    animate() {
        const timer = 1000 / this.fps;
        this.createFrame();
        setTimeout(this.animate.bind(this), timer);
    }

    enableFullscreen() {
        if (!document.fullscreenElement) {
            this.element.requestFullscreen();
        }
    }

    changeFps(value) {
        this.fps = value;
    }

    init(stack) {
        this.stack = stack;
        this.animate();
    }
}


const frameStack = new FrameStack();
frameStack.init();
const preview = new FramePreview();
preview.init(frameStack.frames);


const addFrame = () => frameStack.addFrame();
const changeColor = () => frameStack.setCurrentFrame().changeColor();
const setCurrentColor = () => frameStack.setCurrentFrame().setCurrentColor();
const moveFigure = () => frameStack.setCurrentFrame().moveFigure();
const transformFigure = () => frameStack.setCurrentFrame().transformFigure();
const enableFullscreen = () => preview.enableFullscreen();
const changeFps = value => preview.changeFps(value);
const setColor = id => frameStack.setCurrentFrame().setColor(id);

function findEvent(e) {
    switch (e.code) {
        case 'KeyS': frameStack.setCurrentFrame().changeColor();
            break;
        case 'KeyD': frameStack.setCurrentFrame().setCurrentColor();
            break;
        case 'KeyF': frameStack.setCurrentFrame().moveFigure();
            break;
        case 'KeyG': frameStack.setCurrentFrame().transformFigure();
            break;
        default:
    }
}

window.addEventListener('keydown', findEvent, true);

(function fillSelectTag() {
    const element = document.getElementById('fsp');
    for (let i = 1; i < 25; i += 1) {
        const option = document.createElement('option');
        element.appendChild(option);
        option.value = `${i}`;
        option.innerHTML = `FPS ${i}`;
    }
}());
