# emloader - a simple javascript loader for emscripten js based application


## Usage
        // what we want to load, and where
        var scriptUrl = 'emloader/compiled/javascript/url.js';
        var appContainer = document.getElementById('container');
        
        // instanciate emloader
        var emloader = emloader.load(scriptUrl, appContainer).then(function(scriptTag) {
            // emscripten app ready to launch
        }).catch(function(error) {
          console.error('error during loading script file ' + scriptUrl, error)  
        });

        // add files to the FS
        emloader.loadFiles({
            'filename-in-fs.ext' : 'http://domain.com/file/name.ext',
            'filename-in-fs2.ext' : 'http://domain.com/file/name2.ext',
        }, '/home/folder').then(function() {
            // all files loaded
        }).catch(function(error) {
            // error during load
            console.error('an error occured', error)
        })

        // run the application
        emloader.run(['args1', 'args2', 'args3']).then(function() {
            // application run OK
        }).catch(function(error) {
            console.error('an error occured during run application');
        })

## Development
### install

    npm i

### Build
  
    npm run build

