// Measuring the Critical Rendering Path with Navigation Timing
// https://developers.google.com/web/fundamentals/performance/critical-rendering-path/measure-crp

function logCRP() {
    var t = window.performance.timing,
        dcl = t.domContentLoadedEventStart - t.domLoading,
        complete = t.domComplete - t.domLoading;
    var stats = document.getElementById("crp-stats");
    stats.textContent = 'DCL: ' + dcl + 'ms, onload: ' + complete + 'ms';
}

window.addEventListener("load", function (event) {
    logCRP();
});


WebFontConfig = {
    google: {
        families: ['Open+Sans:400italic,700italic,400,700:latin']
    }
};
(function () {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
        '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
})();