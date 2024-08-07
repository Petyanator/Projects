    // Get the input and output elements
    const inputText = document.getElementById("input");
    const outputText = document.getElementById("output");
    const inputMorse = document.getElementById("input1");
    const outputMorse = document.getElementById("output2");

    // Morse code dictionary
    const morseCode = {
      'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
      'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
      'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
      'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
      'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
      '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
      '8': '---..', '9': '----.', ' ': '/'
    };

    // Reverse Morse code dictionary for Morse to text translation
    const reverseMorseCode = Object.entries(morseCode).reduce((acc, [key, value]) => {
      acc[value] = key;
      return acc;
    }, {});

    // Function to convert text to Morse code
    function convertToMorse(text) {
      let morseText = "";
      for (let char of text.toUpperCase()) {
        if (morseCode[char]) {
          morseText += morseCode[char] + " ";
        }
      }
      return morseText.trim();
    }

    // Function to convert Morse code to text
    function convertToText(morse) {
      return morse.split(" ").map(code => reverseMorseCode[code] || '').join('');
    }

    // Event listener for real-time text-to-Morse translation
    inputText.addEventListener("input", () => {
      const input = inputText.value.trim();
      const morseText = convertToMorse(input);
      outputText.textContent = morseText;
    });

    // Event listener for real-time Morse-to-text translation
    inputMorse.addEventListener("input", () => {
      const morseInput = inputMorse.value.trim();
      const justText = convertToText(morseInput);
      console.log(justText)
      outputMorse.textContent = justText;
    });



