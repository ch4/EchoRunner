//console.log('Simply.js demo!');

simply.on('singleClick', function (e) {
    //console.log(util2.format('single clicked $button!', e));
    //simply.subtitle('Pressed ' + e.button + '!');
    if (e.button == 'up') {
        ajax({ url: 'http://echorunner.parseapp.com/getbpm' }, function (data) {
            //var headline = data.match(/<h1>(.*?)<\/h1>/)[1];
            simply.title("BPM: " + data);
            simply.subtitle("");
        });

    }
    if (e.button == 'down') {
        ajax({ url: 'http://echorunner.parseapp.com/skiptrack' }, function (data) {
            //var headline = data.match(/<h1>(.*?)<\/h1>/)[1];
            simply.subtitle("Track skipped");
        });
    }

});


simply.setText({
    title: 'EchoRunner',
    body: 'Press UP to update BPM, DOWN to skip track',
}, true);

