Pystachio is an early-stage Python-to-JavaScript translator (written in JavaScript) aimed at providing Python scripting in any modern browser.

Example page using Pystachio ([Live demo](http://www.avatrion.com/pystachio/index.html)):
```
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="content-type" content="text/html; charset=utf-8">
        <title>Pystachio test page</title>
        <!-- debug box styles, optional -->
        <link rel="stylesheet" type="text/css" media="screen" href="screen.css">
        <!-- pystachio, required (must be included before any python fun) -->
        <script type="text/javascript" src="pystachio.js"></script>
        <!-- test external python script -->
        <script type="text/python" src="test.py"></script>
        <style type="text/css">
            body { font: normal 16px sans-serif; }
        </style>
    </head>
    <body>
        <!-- inline python -->
        <!-- note: start an event attribute's value with "python:" to use inline python -->
        <!-- note: python cannot be used within the href attribute -->
        <p>This is an example of <a href="#" onclick="python: print 'hello';" title="hello">inline Python</a>.</p>

        <!-- embedded python -->
        <!-- note: leading whitespace on the first code line counts as the starting point for indentation -->
        <script type="text/python">
        <!--
            temp = "hello, world!"
            def something(temp):
                return temp
            print something(temp)
        #-->
        </script>

        <!-- pystachio must be started after all Python is on the scene -->
        <script type="text/javascript">
        <!--
            //init params: debug_mode
            pystachio.init(true);
        //-->
        </script>
    </body>
</html>
```

## Benefits ##
  * Let's you code in Python instead of (or along with) JavaScript in the Web browser
  * Could potentially be used as an offline Python-to-JavaScript translator by running it from the command-line

## Notes! ##
  * So far Pystachio only implements a tokenizer for Python.