# 例子

## html

```html
<a id="on" href="javascript:;">绑定render事件</a>
<a id="off" href="javascript:;">解绑render事件</a>
<a id="emit-render" href="javascript:;">触发render事件</a>
<br>
<a id="once" href="javascript:;">init事件只执行一次</a>
<a id="emit-init" href="javascript:;">触发init事件</a>
<br>
<a id="off-all" href="javascript:;">解绑所有事件</a>
```

## js

```javascript
var on = document.getElementById('on');
var off = document.getElementById('off');
var once = document.getElementById('once');
var emitRender = document.getElementById('emit-render');
var emitInit = document.getElementById('emit-init');
var offAll = document.getElementById('off-all');
var eventEmit = new EventEmit();

bindEvent(on, 'click', function() {
  eventEmit.on('render', function() {
    console.log('render');
  });
});

bindEvent(off, 'click', function() {
  eventEmit.off('render');
});

bindEvent(once, 'click', function() {
  eventEmit.once('init', function() {
    console.log('init');
  });
});

bindEvent(emitRender, 'click', function() {
  eventEmit.emit('render');
});

bindEvent(emitInit, 'click', function() {
  eventEmit.emit('init');
});

bindEvent(offAll, 'click', function() {
  eventEmit.offAll();
});

function bindEvent(el, event, callback) {
  el.addEventListener(event, callback);
} 
```