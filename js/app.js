

const optionsContainer = document.getElementById("options-container");
const keyboard = document.getElementById("keyboard");
const answerSection = document.getElementById("answerSection");
const playAgain = document.getElementById("playAgain");
const playBtn = document.getElementById("playBtn");
const canvas = document.getElementById("canvas");
const result = document.getElementById("result");

//Array
let options = {

characters: ["Arya", "Bran", "Brienne", "Bronn", "Catelyn", "Cersei", "Daario", "Daenerys", "Davos", "Ned", "Ellaria", "Gendry", "Gilly", "Jaime","Jeor'Mormont", "Joffrey", "Jon", "Jorah", "Drogo", "Margaery", "Melisandre", "Missandei", "Littlefinger", "Ramsay", "Robb", "Robert", "Sam", "Hound", "Sansa", "Shae", "Stannis", "Talisa", "Theon", "Tommen", "Tormund", "Tyrion", "Tywin", "Viserys Targaryen", "Ygritte"],

// quotes: ["Tell them the North remembers. Tell them winter came for House Frey.", "Not today.", "My name is Arya Stark. I want you to know that. The last thing you're ever going to see is a Stark smiling down at you as you die.",  "Leave one wolf alive and the sheep are never safe.", "I know Death. He's got many faces. I look forward to seeing this one.", "I'm not a lady. I never have been. That's not me.", "When you play the game of thrones, you win or you die. There is no middle ground.", "An unhappy wife is a wine merchant's best friend.","What good is power if you cannot protect the ones you love?", "So we fight and die or we submit and die. I know my choice.", "I thought if I could make something so good, so pure, maybe I'm not a monster.", "Power is power.", "If you ever call me sister again I'll have you strangled in your sleep."],

};

//count
let winCount = 0;
let count = 0;

let chosenWord = "";


const displayOptions =()=> {
optionsContainer.innerHTML += `<h3>Game Of Thrones</h3>`;
let buttonCon = document.createElement("div");
for (let value in options) {
buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
}
optionsContainer.appendChild(buttonCon);
};


const blocker =()=> {
let optionsButtons = document.querySelectorAll(".options");
let letterButtons = document.querySelectorAll(".letters");

optionsButtons.forEach((button) => {
button.disabled = true;
});

letterButtons.forEach((button) => {
button.disabled.true;
});

playAgain.classList.remove("hide");

};


//Word Generator
const generateWord = (optionValue) => {
let optionsButtons = document.querySelectorAll(".options");

optionsButtons.forEach((button) => {
if (button.innerText.toLowerCase() === optionValue) {
    button.classList.add("active");
}
button.disabled = true;
});


keyboard.classList.remove("hide");
answerSection.innerText = "";

let optionArray = options[optionValue];

chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)];
chosenWord = chosenWord.toUpperCase();

//replace every letter with span containing dash
let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');


answerSection.innerHTML = displayItem;
};


const init =()=> {
winCount = 0;
count = 0;

//Initially erase all content and hide letters and new game button
answerSection.innerHTML = "";
optionsContainer.innerHTML = "";
keyboard.classList.add("hide");
playAgain.classList.add("hide");
keyboard.innerHTML = "";

//For creating letter buttons
for (let i = 65; i < 91; i++) {
let button = document.createElement("button");
button.classList.add("letters");
//Number to ASCII[A-Z]
button.innerText = String.fromCharCode(i);

button.addEventListener("click", () => {
    let charArray = chosenWord.split("");
    let dashes = document.getElementsByClassName("dashes");

    //if array contains clicked value replace the matched dash with letter else draw on canvas
        if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
            if (char === button.innerText) {
            dashes[index].innerText = char;

            winCount += 1;

        if (winCount == charArray.length) {
            result.innerHTML = `<h2 class='win-msg'>You've Won, Welcome To House Clark</h2><p>The word was <span>${chosenWord}</span></p>`;
            result.classList.add('text-center')
            
            blocker();
        }
        }
    });

    } else {
        count += 1;
        man(count);

        //Count==6 because head,body,left arm, right arm,left leg,right leg
        if (count == 6) {
            result.innerHTML = `<h2 class='lose-msg'>You Loss, Now You Die!</h2><p>The word was <span>${chosenWord}</span></p>`;
            result.classList.add('text-center')
            blocker();
        }
    }
    //disable clicked button
    button.disabled = true;
});
keyboard.append(button);
}

displayOptions();

//Call to canvasCreator (for clearing previous canvas and creating initial canvas)
let { initialDrawing } = canvasCreator();

//initialDrawing would draw the frame
initialDrawing();
};

//Canvas
const canvasCreator = () => {
let context = canvas.getContext("2d");
context.beginPath();
context.strokeStyle = "#000";
context.lineWidth = 2;

//For drawing lines
const drawLine = (fromX, fromY, toX, toY) => {
context.moveTo(fromX, fromY);
context.lineTo(toX, toY);
context.stroke();
};

const head = () => {
context.beginPath();
context.arc(70, 30, 10, 0, Math.PI * 2, true);
context.stroke();
};

const body = () => {
drawLine(70, 40, 70, 80);
};

const leftArm = () => {
drawLine(70, 50, 50, 70);
};

const rightArm = () => {
drawLine(70, 50, 90, 70);
};

const leftLeg = () => {
drawLine(70, 80, 50, 110);
};

const rightLeg = () => {
drawLine(70, 80, 90, 110);
};

//initial frame
const initialDrawing = () => {
//clear canvas
context.clearRect(0, 0, context.canvas.width, context.canvas.height);

//bottom line
drawLine(10, 130, 130, 130);

//left line
drawLine(10, 10, 10, 131);

//top line
drawLine(10, 10, 70, 10);

//small top line
drawLine(70, 10, 70, 20);
};

return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
};

//draw the man
const man = (count) => {
let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
switch (count) {
case 1:
    head();
    break;
case 2:
    body();
    break;
case 3:
    leftArm();
    break;
case 4:
    rightArm();
    break;
case 5:
    leftLeg();
    break;
case 6:
    rightLeg();
    break;
default:
    break;
}
};

//New Game
playBtn.addEventListener("click", init);
window.onload = init;