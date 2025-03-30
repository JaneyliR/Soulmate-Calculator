document.getElementById("soulmateForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let theirName = document.getElementById("theirName").value.trim();
    let urName = document.getElementById("urName").value.trim();

    if (!theirName || !urName) {
        alert("Please fill in all fields correctly.");
        return;
    }

    // Letter Count Function
    function letterCount(name1, name2) {
        let combined = (name1 + name2).toLowerCase();
        let seenLetters = new Set();
        let sequence = [];

        for (let letter of name1.toLowerCase()) {
            if (!seenLetters.has(letter)) {
                let count = (name1 + name2).toLowerCase().split(letter).length - 1;
                sequence.push(count > 1 ? count.toString() : "1");
                seenLetters.add(letter);
            }
        }

        for (let letter of name2.toLowerCase()) {
            if (!seenLetters.has(letter)) {
                let count = name2.toLowerCase().split(letter).length - 1;
                sequence.push(count > 1 ? count.toString() : "1");
                seenLetters.add(letter);
            }
        }

        return sequence.join("");
    }

    // Calculator Function
    function calculator(sequence) {
        while (sequence.length > 2) {
            let newSeq = [];
            for (let i = 0; i < Math.floor(sequence.length / 2); i++) {
                newSeq.push((parseInt(sequence[i]) + parseInt(sequence[sequence.length - 1 - i])).toString());
            }
            if (sequence.length % 2 === 1) {
                newSeq.push(sequence[Math.floor(sequence.length / 2)]);
            }
            sequence = newSeq.join("");
        }
        return sequence;
    }

    // Soulmate Percentage Calculation
    function soulmatePercentage(name1, name2) {
        let intSeq = letterCount(name1, name2);
        return parseInt(calculator(intSeq));
    }

    // Calculate Soulmate Percentage
    let percentage = soulmatePercentage(urName, theirName);

    // Displays Results
    document.getElementById("result").innerHTML = `
        <p>There's an <strong>${percentage}% chance that you two are Soulmates!</strong></p>
    `;

    //Displays message based on percentage score
    if (percentage >= 80) {
      setTimeout(() => alert("Ooooo! I knew it was meant to be! <3"), 2000);
    }
    else if (percentage > 50) {
      setTimeout(() => alert("Wow! Are you going take your chances?"),2000);
    }
    else {
      setTimeout(() => alert("I mean... you could always change your name to get a higher score."), 2000);
    }
});
