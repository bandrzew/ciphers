document.addEventListener("DOMContentLoaded", function () {
    var select = document.getElementById("cipher");
    var divs = document.querySelectorAll("div");
    var cipher = "";

    var toggleDivs = function () {
        divs.forEach(element => {
            element.style.display = "none";
        });

        cipher = select.value;
        document.querySelector("div." + cipher).style.display = "block";
    }

    toggleDivs();

    select.onchange = toggleDivs;

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
});