// Elements by Ids
const optionsContainer = document.getElementById("options-container");
const keyboard = document.getElementById("keyboard");
const answerSection = document.getElementById("answerSection");
const playAgain = document.getElementById("playAgain");
const playBtn = document.getElementById("playBtn");
const canvas = document.getElementById("canvas");
const result = document.getElementById("result");


let options = {
    
    characters: ["Arya", "Bran", "Brienne", "Bronn", "Catelyn", "Cersei", "Daario", "Daenerys", "Davos", "Ned", "Ellaria", "Gendry", "Gilly", "Jaime","Jeor'Mormont", "Joffrey", "Jon", "Jorah", "Drogo", "Margaery", "Melisandre", "Missandei", "Littlefinger", "Ramsay", "Robb", "Robert", "Sam", "Hound", "Sansa", "Shae", "Stannis", "Talisa", "Theon", "Tommen", "Tormund", "Tyrion", "Tywin", "Viserys", "Ygritte"],

    houses: ["Lannister", "Baratheon", "Tyrell", "Targaryen", "Karstark", "Glover", "Macklyn", "Tarly", "Martell", "Greyjoy", "Arryn", "Umber", "Mormont", "Royce", "Reed", "Clegane", "Frey", "Bolton", "Tully", "Stark"]
};

let winCount = 0
let count = 0

let chosenWord = ""

// Display function
const displayOptions =()=> {
    
    optionsContainer.innerHTML += `<h1>Game Of Thrones</h1>`

    let buttonCon = document.createElement('div')

    for (let value in options) {
        buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`
    }

    optionsContainer.appendChild(buttonCon)
};

// Blocker Function 
const blocker =()=> {
    
    let optionsButtons = document.querySelectorAll('options')
    
    let letterButtons = document.querySelectorAll('.letters')

    optionsButtons.forEach(button => {
        buttons.disabled = true;
    })

    letterButtons.forEach(button => {
        button.disabled.true
    })
    
    playAgain.classList.remove('hide')

};


//Word Generator
const generateWord = (optionValue) => {
    
    keyboard.classList.remove('hide');
    answerSection.innerText = '';
    
    let optionsButtons = document.querySelectorAll('.options')

    optionsButtons.forEach(button => {
        if (button.innerText.toLowerCase() === optionValue) {
            button.classList.add('active')
        }

        button.disabled = true
    });

    let optionArray = options[optionValue]

    // chooses word at random
    chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)];
    chosenWord = chosenWord.toUpperCase()

    let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>',);

    answerSection.innerHTML = displayItem;

};

// Initialization
const init =()=> {
    
    winCount = 0;
    count = 0;

    // erase all content, hide letters and new game button
    answerSection.innerHTML = "";
    optionsContainer.innerHTML = "";
    keyboard.innerHTML = "";
    keyboard.classList.add("hide");
    playAgain.classList.add("hide");

    // For creating letter buttons, ASCII stands for American Standard Code for Information Interchange, table converter
    for (let i = 65; i < 91 ; i++) {
        let button = document.createElement('button')

        button.classList.add('letters')
        button.innerText = String.fromCharCode(i);

        button.addEventListener('click', ()=> {
            let charArray = chosenWord.split("")
            
            let dashes = document.getElementsByClassName("dashes")

            //if array contains clicked value replace the matched dash with letter else draw on canvas
            if (charArray.includes(button.innerText)) {
                charArray.forEach((char, index) => {
                    
                    if (char === button.innerText) {
                        
                        dashes[index].innerText = char;

                        winCount += 1;

                        if (winCount === charArray.length) {
                            
                            result.innerHTML = `<h2 class='win-msg'>You've Won, Welcome To House Clark</h2><p>The word was <span>${chosenWord}</span></p>`;
                            
                            result.classList.add('text-center')
                            
                            blocker();
                        }
                    }
                });
            } else {
                count += 1;

                man(count);

                //Count equal to 9 for each body part
                if (count == 9) {
                    
                    result.innerHTML = `<h2 class='lose-msg'>You Loss, Now You Die!</h2><p>The word was <span>${chosenWord}</span></p>`;
                    
                    result.classList.add('text-center')
                    
                    blocker();
                }

            }

            button.disabled = true;

        });

        keyboard.append(button);
    }

    displayOptions();

    //Call to canvasCreator (for clearing previous canvas and creating initial canvas)
    let { initialDrawing } = canvasCreator();

    initialDrawing();

};

// Canvas
const canvasCreator =()=> {
    
    let ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2.3;
    
    //For drawing lines
    const drawLine = (fromX, fromY, toX, toY) => {
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);
        ctx.stroke();
    };
    
    const head =()=> {
        
        ctx.beginPath();
        ctx.arc(70, 30, 10, 0, Math.PI * 2, true);
        ctx.stroke();
    };
    
    const rightEye =()=> {

        drawLine(75, 28, 73, 28);
    };

    const leftEye =()=> {

        drawLine(65, 28, 67, 28);
    };

    const mouth =()=> {

        drawLine(75, 33, 65, 33);
    };

    const body =()=> {
        
        drawLine(70, 40, 70, 80);
    };
    
    const leftArm =()=> {
        
        drawLine(70, 50, 50, 70);
    };
    
    const rightArm =()=> {
    
        drawLine(70, 50, 90, 70);
    };
    
    const leftLeg =()=> {
    
        drawLine(70, 80, 50, 110);
    };
    
    const rightLeg =()=> {
    
        drawLine(70, 80, 90, 110);
    };
    
    //initial frame
    const initialDrawing =()=> {
        
        //clear canvas
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
        //bottom line
        drawLine(10, 130, 130, 130);
        
        //left line
        drawLine(10, 10, 10, 131);
        
        //top line
        drawLine(10, 10, 70, 10);
        
        //small top line
        drawLine(70, 10, 70, 20);

    };
    
    return { initialDrawing, head, rightEye, leftEye, mouth, body, leftArm, rightArm, leftLeg, rightLeg };

};

//draw the man
const man =(count)=> {
    
    let { head, rightEye, leftEye, mouth, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
    
    switch (count) {
    case 1:
        head();
        break;
    case 2:
        rightEye();
        break;
    case 3:
        leftEye();
        break;
    case 4:
        mouth();
        break;
    case 5:
        body();
        break;
    case 6:
        rightArm();
        break;
    case 7:
        leftArm();
        break;
    case 8:
        leftLeg();
        break;
    case 9:
        rightLeg();
        break;
    default:
        break;
    }
};


//New Game
playBtn.addEventListener("click", init);
window.onload = init;



