function compute() {
    for (var i = 0; i < 10000000000; i++) {
        true;
    }
    return i;
}

self.addEventListener('message', function(e) {
    console.log('Main has asked me:', e.data);
    var value = compute();
    self.postMessage(value);
}, false);