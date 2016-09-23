
function loadUrl(newLocation)
{
  window.location = newLocation;
  return false;
}

function injectJS(path)
{

    var script = document.createElement('script');
    script.onload = function() {
      onStart();
    };
    script.src = path;
    document.getElementsByTagName('head')[0].appendChild(script);
}

