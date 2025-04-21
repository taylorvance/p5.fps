# p5.fps

A simple FPS library for p5.js sketches. It displays the frames per second (FPS) in a small text box.

FPS is calculated as a rolling average over the last `n` frames (default 30). It can optionally display min/max FPS.

## Getting Started

Just include the source after p5.js and before your sketch.

```html
<head>
    <script src="https://cdn.jsdelivr.net/npm/p5@2.0.0/lib/p5.min.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/taylorvance/p5.fps@refs/tags/v0.1.0/p5.fps.js"></script>
    <script src="sketch.js"></script>
</head>
```

## Usage

Minimal example:

```js
// It's literally this easy.

function setup() {
  createFPS();
}

function draw() {
  updateFPS();
}
```

### Customization

You can customize the display in various ways.

1. Use the basic built-in options (see Options below):

```js
createFPS({position:[100,10], dark:true});
```

2. Alter the element directly:

```js
let myFPS;

function setup() {
  myFPS = createFPS();
  myFPS.element.style('color', 'white');
  myFPS.element.style('background', 'blue');
}

function draw() {
  updateFPS(myFPS); // To ensure the correct FPS instance is updated, pass it to the update function.
}
```

3. Provide your own element:

```js
function setup() {
  let myDiv = createDiv();
  myDiv.style('color', 'white');
  myDiv.style('background', 'blue');
  createFPS({element:myDiv});
}

function draw() {
  updateFPS();
}
```

## Options

| Option       | Type    | Default    | Description                                                         |
|--------------|---------|------------|---------------------------------------------------------------------|
| `n`          | int     | `30`       | Rolling average sample size                                         |
| `showMinMax` | bool    | `false`    | Whether to show min/max FPS                                         |
| `showTarget` | bool    | `false`    | Whether to show target FPS                                          |
| `label`      | string  | `FPS `     | Label prepended to FPS display (set to null for no label)           |
| `element`    | element | `null`     | Custom p5.Element for display                                       |
| `position`   | `[x,y]` | `[10, 10]` | Absolute position of the display (set to null for auto positioning) |
| `dark`       | bool    | `false`    | Dark mode                                                           |
| `border`     | bool    | `false`    | Show border around the display                                      |

## License

MIT
