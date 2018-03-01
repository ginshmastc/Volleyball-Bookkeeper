/*
Loads a new URL.
*/
function loadUrl(newLocation)
{
  Android.test("loadURL" + newLocation);
  window.location = newLocation;
  return false;
}

/*
Creates a script object and appends it to the document.
*/
function injectJS(path)
{
Android.test("injectJS " + path);
    var script = document.createElement('script');
    script.onload = function() {
      onStart();
    };
    script.src = path;
    document.getElementsByTagName('head')[0].appendChild(script);
}

