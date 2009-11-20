

//taken from yui
if (typeof pystachio == "undefined" || !pystachio)
{
    var pystachio = {};
}


pystachio._lines = [];
pystachio.linenumber = -1;

pystachio.group = function(choices)
{
    var Temp = '(';
    Temp = Temp + choices.join('|');
    Temp = Temp + ')';
    return Temp;
};

pystachio.any = function(choices)
{
    return pystachio.group(choices) + '*';
};

pystachio.maybe = function(choices)
{
    return pystachio.group(choices) + '?';
};

pystachio.Whitespace = '[ \\f\\t]*';
pystachio.Comment = '#[^\\r\\n]*?';
pystachio.Ignore = pystachio.Whitespace + pystachio.any(['\\\\\\r?\\n' + pystachio.Whitespace]) + pystachio.maybe([pystachio.Comment]);
pystachio.Name = '[a-zA-Z0-9_]\\w*';
pystachio.Hexnumber = '0[xX][\\da-fA-F]*[lL]?';
pystachio.Octnumber = '0[0-7]*[lL]?';
pystachio.Decnumber = '[1-9]\\d*[lL]?';
pystachio.Intnumber = pystachio.group([pystachio.Hexnumber, pystachio.Octnumber, pystachio.Decnumber]);
pystachio.Exponent = '[eE][-+]?\\d+';
pystachio.Pointfloat = pystachio.group(['\\d+\\.\\d*', '\\.\\d+']) + pystachio.maybe([pystachio.Exponent]);
pystachio.Expfloat = '\\d+' + pystachio.Exponent;
pystachio.Floatnumber = pystachio.group([pystachio.Pointfloat, pystachio.Expfloat]);
pystachio.Imagnumber = pystachio.group(['\\d+[jJ]', pystachio.Floatnumber + '[jJ]']);
pystachio._Number = pystachio.group([pystachio.Imagnumber, pystachio.Floatnumber, pystachio.Intnumber]);
pystachio.Single = "[^'\\\\]*(?:\\\\.[^'\\\\]*)*'", //Tail end of ' string.
pystachio.Double = '[^"\\\\]*(?:\\\\.[^"\\\\]*)*"', //Tail end of " string.
pystachio.Single3 = "[^'\\\\]*(?:(?:\\\\.|'(?!''))[^'\\\\]*)*'''", //Tail end of ''' string.
pystachio.Double3 = '[^"\\\\]*(?:(?:\\\\.|"(?!""))[^"\\\\]*)*"""', //Tail end of """ string.
pystachio.Triple = pystachio.group(["[uU]?[rR]?'''", '[uU]?[rR]?"""']);
pystachio._String = pystachio.group(['[uU]?[rR]?\'[^\\n\'\\\\]*(?:\\\\.[^\\n\'\\\\]*)*\'', '[uU]?[rR]?"[^\\n"\\\\]*(?:\\\\.[^\\n"\\\\]*)*"']), //Single-line ' or " string.
//Because of leftmost-then-longest match semantics, be sure to put the
//longest operators first (e.g., if = came before ==, == would get
//recognized as two instances of =).
pystachio.Operator = pystachio.group(['\\*\\*=?', '>>=?', '<<=?', '<>', '!=', '//=?', '[+\\-*\\/%&|^=<>]=?', '~']);
pystachio.Bracket = '[\\]\\[\\(\\)\\{\\}]';
pystachio.Special = pystachio.group(['\\r?\\n', '[:;.,`@]']);
pystachio.Funny = pystachio.group([pystachio.Operator, pystachio.Bracket, pystachio.Special]);
pystachio.PlainToken = pystachio.group([pystachio._Number, pystachio.Funny, pystachio._String, pystachio.Name]);
pystachio.Token = pystachio.Ignore + pystachio.PlainToken;
//First (or only) line of ' or " string.
pystachio.ContStr = pystachio.group(["[uU]?[rR]?'[^\\n'\\\\]*(?:\\\\.[^\\n'\\\\]*)*" + pystachio.group(["'", '\\\\\\r?\\n']), '[uU]?[rR]?"[^\\n"\\\\]*(?:\\\\.[^\\n"\\\\]*)*' + pystachio.group(['"', '\\\\\\r?\\n'])]);
pystachio.PseudoExtras = pystachio.group(['\\\\\\r?\\n', pystachio.Comment, pystachio.Triple]);
pystachio.PseudoToken = pystachio.Whitespace + pystachio.group([pystachio.PseudoExtras, pystachio._Number, pystachio.Funny, pystachio.ContStr, pystachio.Name]), //PseudoExtras, _Number, Funny, ContStr, Name
pystachio.tokenprog = new RegExp(pystachio.Token);
pystachio.pseudoprog = new RegExp(pystachio.PseudoToken);
pystachio.single3prog = new RegExp(pystachio.Single3);
pystachio.double3prog = new RegExp(pystachio.Double3);
pystachio.endprogs = {"'": new RegExp(pystachio.Single), '"': new RegExp(pystachio.Double), "'''": pystachio.single3prog, '"""': pystachio.double3prog, "r'''": pystachio.single3prog, 'r"""': pystachio.double3prog, 
                "u'''": pystachio.single3prog, 'u"""': pystachio.double3prog, "ur'''": pystachio.single3prog, 'ur"""': pystachio.double3prog, "R'''": pystachio.single3prog, 'R"""': pystachio.double3prog, 
                "U'''": pystachio.single3prog, 'U"""': pystachio.double3prog, "uR'''": pystachio.single3prog, 'uR"""': pystachio.double3prog, "Ur'''": pystachio.single3prog, 'Ur"""': pystachio.double3prog, 
                "UR'''": pystachio.single3prog, 'UR"""': pystachio.double3prog, 'r': null, 'R': null, 'u': null, 'U': null};
pystachio.triple_quoted = ["'''", '"""', "r'''", 'r"""', "R'''", 'R"""', "u'''", 'u"""', "U'''", 'U"""', "ur'''", 'ur"""', "Ur'''", 'Ur"""', "uR'''", 'uR"""', "UR'''", 'UR"""'];
pystachio.single_quoted = ["'", '"', "r'", 'r"', "R'", 'R"', "u'", 'u"', "U'", 'U"', "ur'", 'ur"', "Ur'", 'Ur"', "uR'", 'uR"', "UR'", 'UR"'];
pystachio.tabsize = 4;
pystachio.PythonKeywords = ['and', 'elif', 'global', 'or', 'assert', 'else', 'if', 'pass', 'break', 'except', 'import', 'print', 'class', 'exec', 'in', 'raise', 'continue', 'finally', 'is', 'return', 'def', 'for', 'lambda', 'try', 'del', 'from', 'not', 'while'];


pystachio.is_in = function(Find, Value)
{
    if (typeof(Value) == 'object')
    {
        var i = 0;
        for(i=0;i<Value.length;i++)
        {
            if (Value[i] == Find)
            {
                return true;
            }
        }
        return false;
    }
    else if (typeof(Value) == 'string')
    {
        if (Value.indexOf(Find) != -1)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    else
    {
        alert('is_in: Type ' + typeof(Value) + ' not supported');
        return false;
    }
};



//quickly hacked together, will change
pystachio.debug_output = function(temp, script_id, script_src)
{
    var script_type = "embedded";
    if (script_id == null) { script_id = "null"; }
    if (script_src == null) {
        script_src = "null";
    }
    else {
        script_type = "external";
    }

    var output = '';
    output = output + '<table class="tokens" cellspacing="0" cellpadding="0">';
    output = output + '<caption><strong>type:</strong> ' + script_type + '&nbsp;&nbsp;&nbsp;&nbsp;<strong>id:</strong> ' + script_id + '&nbsp;&nbsp;&nbsp;&nbsp;<strong>src:</strong> ' + script_src + '</caption>';
    output = output + '<thead>';
    output = output + '<tr>';
    output = output + '<th scope="col">Token type</th><th scope="col">Token</th><th scope="col">Start pos</th><th scope="col">End pos</th><th scope="col">Line</th>';
    output = output + '</tr>';
    output = output + '</thead>';
    output = output + '<tfoot>';
    output = output + '<tr>';
    output = output + '<td colspan="5">' + temp.length + ' tokens</td>';
    output = output + '</tr>';
    output = output + '</tfoot>';
    output = output + '<tbody>';
    
    for (var i=0; i<temp.length;i++)
    {
        output = output + '<tr>';
        
        for (var j=0; j<temp[i].length;j++)
        {
            output = output + '<td>';
            if (j == 0 || j == 1 || j == 4) { output = output + '<code>'; }

        
            if (pystachio.is_in(temp[i][j], pystachio.PythonKeywords) == true)
            {
                output = output + '<strong>' + temp[i][j] + '</strong>';
            }
            else
            {
                output = output + temp[i][j];
            }
            
            if (j == 0 || j == 1 || j == 4) { output = output + '</code>'; }
            output = output + '</td>';
            
        }
        
        output = output + '</tr>';
    }
    
    output = output + '</tbody>';
    output = output + '</table>';
    document.getElementById('pystachio_debug').innerHTML = document.getElementById('pystachio_debug').innerHTML + output;
};


pystachio.readline = function()
{
    pystachio.linenumber = pystachio.linenumber + 1

    if (pystachio.linenumber < pystachio._lines.length)
    {
        return pystachio._lines[pystachio.linenumber] + "\n";
    }
    else
    {
        throw 'StopTokenizing';
    }
};



pystachio.fetch = function(url)
{
  if (window.XMLHttpRequest) {              
    AJAX=new XMLHttpRequest();              
  } else {                                  
    AJAX=new ActiveXObject("Microsoft.XMLHTTP");
  }
  if (AJAX) {
     AJAX.open("GET", url, false);
     AJAX.setRequestHeader("Content-Type", "text/plain");
     AJAX.send(null);
     return AJAX.responseText;                                         
  } else {
     return false;
  }                                             
};


pystachio.parse = function(code, script_id, script_src)
{
    //TODO: strip trailing whitespace from code
    //TODO: remove the last code line if it equals "#-->" or "#]]>"

    pystachio._lines = [];
    pystachio.linenumber = -1;

    var lines = code.split(/\r\n|\n\r|\r|\n/);
    var firstgood = true;
    var ws_baseline = "";

    for (line in lines)
    {
        if (lines[line] == "") { continue; }
        
        line = lines[line];
        
        if (firstgood == true)
        {
            //passes over <!-- and <![CDATA[ at the beginning of embedded scripts. this needs to work better.
            if (script_src == null && (line.indexOf("<!--") != -1 || line.indexOf("<![CDATA[") != -1)) { continue; }

            for (c in line)
            {
                if (line[c] == " " || line[c] == "\t")
                {
                    ws_baseline = ws_baseline + line[c];
                }
                else
                {
                   break;
                }
            }
            firstgood = false;
        }
        
        if (ws_baseline != "")
        {
            if (line.slice(0, ws_baseline.length) == ws_baseline)
            {
                line = line.slice(ws_baseline.length, line.length);
            }
        }
        
        pystachio._lines.push(line);
        //alert("|"+lines[line][0]+"|");
        //break;
    }

    var temp = pystachio.tokenize(pystachio.readline);

    if (this.debug_mode == true)
    {
        pystachio.debug_output(temp, script_id, script_src);
    }
    

    temp = pystachio.translate(temp);


    pystachio.execute_js(temp);


};


pystachio.init = function(debug_mode)
{

    this.debug_mode = debug_mode;

    if (this.debug_mode == true)
    {
        var debug_box = document.createElement("DIV");
        debug_box.id = "pystachio_debug";
        document.getElementsByTagName("body")[0].appendChild(debug_box);
        document.getElementById('pystachio_debug').innerHTML = "<p><strong>Pystachio debug box</strong></p>";
    }

    scripts = document.getElementsByTagName("script");
    for (i in scripts)
    {
        var type = scripts[i].type;
        
        if (type && type != null && type != "" && type == "text/python")
        {
            var script_id = scripts[i].id;

            if (!script_id || script_id == null || script_id == "")
            {
                script_id = null;
            }

            var src = scripts[i].src;

            if (src && src != null && src != "")
            {
                code = pystachio.fetch(src);
                pystachio.parse(code, script_id, src);
            }
            else
            {
                pystachio.parse(scripts[i].innerHTML, script_id, null);
            }
        }
    
    }
    
};



pystachio.translate = function(tokens)
{
    var type = null;
    var token = null;
    var TokenLocation = null;

    for (t in tokens)
    {
        token_type = tokens[t][0];
        token = tokens[t][1];
        token_pos = tokens[t][2];

    }

};


pystachio.execute_js = function(code)
{

};




pystachio.tokenize = function(readline)
{
    /*
    This is a port of Python 2.5's tokenize.py to JS.

    The tokenize() generator requires one argment, readline, which must be a callable object which provides
    the same interface as the readline() method of built-in file objects. Each call to the function should
    return one line of input as a string.  Alternately, readline can be a callable function terminating
    with StopIteration.

    The generator produces 5-tuples with these members: the token type; the token string; a 2-tuple (srow, scol)
    of ints specifying the row and column where the token begins in the source; a 2-tuple (erow, ecol) of ints
    specifying the row and column where the token ends in the source; and the line on which the token was found.
    The line passed is the logical line; continuation lines are included.
    */
    
    //BUG: ENDMARKER's start position will match that of the last line of code if there is no linebreak
    //between the last line of code and the </script> tag.
    
    var lnum = -1;
    var parenlev = 0;
    var continued = 0;
    var namechars = 'abcdefghijklmnopqrstuvwxyz' + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + '_';
    var numchars = '0123456789';
    var contstr = null;
    var needcont = 0;
    var contline = null;
    var indents = [0];
    var parselist = [];
    var line = '';

    while (true)
    {
        try
        {
            line = readline();
        }
        catch(err)
        {
            
            if (err=='StopTokenizing') { break; }
            else { alert(err); }
            line = null;
        }
        
        lnum = lnum + 1;
        pos = 0;
        if (line != null)
        {
            _max = line.length;
        }
        else
        {
            _max = 0;
        }

        
        if (contstr != null && contstr != '') //continued string
        {                           
            if (line == null || line == '')
            {
                //alert("EOF in multi-line string #1");
                continue; //break;
                //raise TokenError, ("EOF in multi-line string", strstart)
            }
            endmatch = endprog.exec(line);

            if (endmatch != null)
            {
                pos = endmatch[0].length;
                end = endmatch[0].length; //endmatch.lastIndex;
                parselist.push(['STRING', contstr + line.slice(0, end), strstart, [lnum, end], contline + line]);
                contstr = null;
                needcont = 0;
                contline = null;
            }
            else if (needcont == 1 && line.slice(line.length-2, line.length) != '\\\n' && line.slice(line.length-3, line.length) != '\\\r\n')
            {
                parselist.push(['ERRORTOKEN', contstr + line, strstart, [lnum, line.length], contline]);
                contstr = null;
                contline = null;
                continue;
            }
            else
            {
                contstr = contstr + line;
                contline = contline + line;
                continue;
            }
        }
        else if (parenlev == 0 && (continued == null || continued == '' || continued == 0))  // new statement
        {
            if (line == null || line == ''){  continue; }

            column = 0;
            while (pos < _max) //measure leading whitespace
            {
                if (line[pos] == ' ')
                {
                    column = column + 1;
                }
                else if (line[pos] == '\t')
                {
                    column = (column/pystachio.tabsize + 1)*pystachio.tabsize;
                }
                else if (line[pos] == '\f')
                {
                    column = 0;
                }
                else
                {
                    break;
                }
                pos = pos + 1;
            }
            
            if (pos == _max) { break; }

            if (pystachio.is_in(line[pos], '#\r\n') == true) //skip comments or blank lines
            {
                parselist.push([['NL', 'COMMENT'], line.slice(pos, line.length), [lnum, pos], [lnum, line.length], line]);
                continue;
            }

            if (column > indents[indents.length-1]) //count indents or dedents
            {
                indents.push(column);
                parselist.push(['INDENT', line.slice(0, pos), [lnum, 0], [lnum, pos], line]);
            }
            while (column < indents[indents.length-1])
            {
                if (pystachio.is_in(column, indents) == false)
                {
                    alert("unindent does not match any outer indentation level");
                    break;
                    //raise IndentationError("unindent does not match any outer indentation level",("<tokenize>", lnum, pos, line))
                }
                indents.pop();
                parselist.push(['DEDENT', '', [lnum, pos], [lnum, pos], line]);
            }
        }
        else //continued statement
        {
            if (line == null || line == '')
            {
                //alert("EOF in multi-line statement #2");
                continue;
                //break;
                //raise TokenError, ("EOF in multi-line statement", (lnum, 0))
            }
            continued = 0;
        }

        while (pos < _max)
        {
            if (line[pos] == ' ')
            {
                pos = pos + 1;
                continue;
            }

            pseudomatch = pystachio.pseudoprog.exec(line.slice(pos, line.length));

            if (pseudomatch != null) //scan for tokens
            {
                start = pos; //pseudoprog.lastIndex; //TODO: should be [0]?
                end = start+pseudomatch[0].length;
                
                spos = [lnum, start];
                epos = [lnum, end];
                pos = end;

                token = line.slice(start, end);
                
                initial = line[start];

                if (pystachio.is_in(initial, numchars) == true || (initial == '.' && token != '.')) //ordinary number
                {
                    parselist.push(['NUMBER', token, spos, epos, line]);
                }
                else if (pystachio.is_in(initial, '\r\n') == true)
                {
                    parselist.push([parenlev > 0 && NL || 'NEWLINE', token, spos, epos, line]);
                }
                else if (initial == '#')
                {
                    parselist.push(['COMMENT', token, spos, epos, line]);
                }
                else if (pystachio.is_in(token, pystachio.triple_quoted) == true)
                {
                    endprog = endprogs[token];
                    endmatch = endprog.exec(line.slice(pos, line.length));
                    if (endmatch != null) //all on one line
                    {
                        pos = endmatch.lastIndex;
                        token = line.slice(start, pos);
                        parselist.push(['STRING', token, spos, [lnum, pos], line]);
                    }
                    else
                    {
                        strstart = [lnum, start]; //multiple lines
                        contstr = line.slice(start, line.length);
                        contline = line;
                        break;
                    }
                }
                else if (pystachio.is_in(initial, pystachio.single_quoted) == true || pystachio.is_in(token.slice(0, 2), pystachio.single_quoted) == true || pystachio.is_in(token.slice(0, 3), pystachio.single_quoted) == true)
                {
                    if (token[token.length-1] == '\n') //continued string
                    {
                        alert('check if the code worked');
                        strstart = [lnum, start];
                        endprog = [endprogs[initial] || endprogs[token[1]] || endprogs[token[2]]]; //TODO: Is this going to work?
                        contstr = line.slice(start, line.length);
                        needcont = 1;
                        contline = line;
                        break;
                    }
                    else //ordinary string
                    {
                        parselist.push(['STRING', token, spos, epos, line]);
                    }
                }
                else if (pystachio.is_in(initial, namechars) == true) //ordinary name
                {
                    parselist.push(['NAME', token, spos, epos, line]);
                }
                else if (initial == '\\') //continued stmt
                {
                    continued = 1;
                }
                else
                {
                    if (pystachio.is_in(token, '([{') == true)
                    {
                        parenlev = parenlev + 1;
                    }
                    else if (pystachio.is_in(token, ')]}') == true)
                    {
                        parenlev = parenlev - 1;
                    }
                    parselist.push(['OP', token, spos, epos, line]);
                }
            }
            else
            {
                parselist.push(['ERRORTOKEN', line[pos], [lnum, pos], [lnum, pos+1], line]);
                pos = pos + 1
            }
        }
        
    } //while
    
    var i = 0;
    for (i=1;i<indents.length;i++) //pop remaining indent levels
    {
        parselist.push(['DEDENT', '', [lnum, 0], [lnum, 0], '']);
    }
    
    parselist.push(['ENDMARKER', '', [lnum, 0], [lnum, 0], '']);
    
    return parselist;
};
