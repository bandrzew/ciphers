var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
var alphabet2D = [alphabet];

for (var i = 0; i < alphabet.length - 1; i++) {
    var tmp = alphabet2D[i].slice(0);
    tmp.push(tmp.shift());
    alphabet2D.push(tmp);
}

/************ Caesar cipher ************/

var caesarCode = function (inputText, shift) {
    var result = '';
    inputText.split('').forEach(element => {
        if (element == ' ') {
            result += element;
        } else {
            result += alphabet2D[shift][alphabet.indexOf(element)];
        }
    });
    return result;
}

var caesarDecoode = function (inputText, shift) {
    var result = '';
    inputText.split('').forEach(element => {
        if (element == ' ') {
            result += element;
        } else {
            result += alphabet[alphabet2D[shift].indexOf(element)];
        }
    });
    return result;
}

/************ Affine cipher ************/

var affineCode = function (inputText, a, b) {
    var result = '';
    inputText.split('').forEach(element => {
        if (element == ' ') {
            result += element;
        } else {
            var index = (a * alphabet.indexOf(element) + b) % alphabet.length;
            if (index < 0) {
                index += alphabet.length;
            }
            result += alphabet[index];
        }
    });
    return result;
}

var affineDecode = function (inputText, a, b) {
    var result = '';
    for (var i = 1; i < alphabet.length; i++) {
        if (a * i % alphabet.length == 1) { //modular multiplicative inverse
            a = i;
            break;
        }
    }

    inputText.split('').forEach(element => {
        if (element == ' ') {
            result += element;
        } else {
            result += alphabet[a * (alphabet.indexOf(element) - b) % alphabet.length];
        }
    });
    return result;
}

/************ Vigenère cipher ************/

var createKey = function (inputText, keyWord) {
    var key = '';
    var keyIndex = 0;
    for (var i = 0; i < inputText.length; i++) {
        if (inputText[i] == ' ') {
            key += ' ';
        } else {
            key += keyWord[keyIndex++ % keyWord.length];
        }
    }
    return key;
}

var vigenereCode = function (inputText, keyWord) {
    var result = '';
    var key = createKey(inputText, keyWord);
    for (var i = 0; i < inputText.length; i++) {
        if (inputText[i] == ' ') {
            result += ' ';
        } else {
            result += alphabet2D[alphabet.indexOf(inputText[i])][alphabet.indexOf(key[i])];
        }
    }
    return result;
}

var vigenereDecode = function (inputText, keyWord) {
    var invertedKeyWord = '';
    keyWord.split('').forEach(element => {
        invertedKeyWord += alphabet[(alphabet.length - alphabet.indexOf(element)) % alphabet.length];
    });
    return vigenereCode(inputText, invertedKeyWord);
}