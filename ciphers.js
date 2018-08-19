document.addEventListener("DOMContentLoaded", function () {
    var cipher = "caesar";

    document.getElementById("cipher").onchange = function () {
        document.querySelectorAll("div").forEach(element => {
            element.style.display = "none";
        });

        cipher = this.value;
        document.querySelector("div." + cipher).style.display = "block";
    }

    var caesarShift = document.querySelector("input.caesar");
    var affineKeyA = document.getElementById("a");
    var affineKeyB = document.getElementById("b");
    var vigenereKey = document.querySelector("input.vigenere");
    var output = document.querySelector("output");

    document.getElementById("encrypt").onclick = function () {
        var input = getInputText(document.getElementById("inputText").value);
        switch (cipher) {
            case "caesar":
                output.innerHTML = caesarCode(input, parseInt(caesarShift.value) % 26);
                break;
            case "affine":
                output.innerHTML = affineCode(input, parseInt(affineKeyA.value), parseInt(affineKeyB.value));
                break;
            case "vigenere":
                output.innerHTML = vigenereCode(input, getInputWord(vigenereKey.value));
        }
    }

    document.getElementById("decrypt").onclick = function () {
        var input = getInputText(document.getElementById("inputText").value);
        switch (cipher) {
            case "caesar":
                output.innerHTML = caesarDecoode(input, parseInt(caesarShift.value) % 26);
                break;
            case "affine":
                output.innerHTML = affineDecode(input, parseInt(affineKeyA.value), parseInt(affineKeyB.value));
                break;
            case "vigenere":
                output.innerHTML = vigenereDecode(input, getInputWord(vigenereKey.value));
        }
    }

    var getInputWord = function (plainInput) {
        var inputWord = getInputText(plainInput).replace(/ /g, '');
        if (inputWord != '') {
            return inputWord;
        } else {
            return 'A';
        }
    }

    var getInputText = function (plainInput) {
        return plainInput.trim()
            .toUpperCase()
            .replace(/Ą/g, 'A')
            .replace(/Ć/g, 'C')
            .replace(/Ę/g, 'E')
            .replace(/Ł/g, 'L')
            .replace(/Ń/g, 'N')
            .replace(/Ó/g, 'O')
            .replace(/Ś/g, 'S')
            .replace(/Ź/g, 'Z')
            .replace(/Ż/g, 'Z');
    }

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
                result += alphabet[(a * alphabet.indexOf(element) + b) % 26];
            }
        });
        return result;
    }

    var affineDecode = function (inputText, a, b) {
        var result = '';
        for (var i = 1; i < 26; i++) {
            if (a * i % 26 == 1) { //modular multiplicative inverse
                a = i;
                break;
            }
        }

        inputText.split('').forEach(element => {
            if (element == ' ') {
                result += element;
            } else {
                result += alphabet[a * (alphabet.indexOf(element) - b) % 26];
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
            invertedKeyWord += alphabet[(26 - alphabet.indexOf(element)) % 26];
        });
        return vigenereCode(inputText, invertedKeyWord);
    }

});