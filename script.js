const questions = [
    {
        question : "Variable declared with the let keyword have what type of scope",
        answers :[
            {text : "function scope " , correct : false},
            {text : "block scope " , correct : true},
            {text : "inline scope " , correct : false},
            {text : "global scope " , correct : false},
        ]
    },
    {
        question : "How can you rewrite this function using arrow function syntax;",
        answers :[
            {text : "let product => (x,y){x*y;} " , correct : false},
            {text : "let product = (x,y)=> x*y; " , correct : true},
            {text : "let product => x*y; " , correct : false},
            {text : "et product =(x,y)-> x*y; " , correct : false},
        ]
    },
    {
        question : "Which HTML element is not considered a landmark element ",
        answers :[
            {text : "<  form  >  " , correct : false},
            {text : "<  ul    > " , correct : true},
            {text : "<  main  > " , correct : false},
            {text : "<  nav  > ", correct : false},
        ]
    },
    {
        question : "Which choice is not a render blocking resources ?",
        answers :[
            {text : "image " , correct : true},
            {text : "HTML " , correct : false},
            {text : "Css " , correct : false},
            {text : "javascript " , correct : false},
        ]
    },
    {
        question : "Lighthouse is a tool of auidtiing your website , which choice is not a category of report offered by lighthouse ?",
        answers :[
            {text : "performance  " , correct : false},
            {text : "Ux designer" , correct : true},
            {text : "accessbility  " , correct : false},
            {text : "SEO" , correct : false},
        ]
    },

];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-opt");
const nextButton = document.getElementById("next-btn");

let  currentQuestionIndex = 0;
let score = 0;

function quizstart(){
    currentQuestionIndex = 0;
     score = 0;
     nextButton.innerHTML="Next";
     showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML= questionNo+ "."+ currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });

}
function  resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const iscorrect = selectedBtn.dataset.correct === "true";
    if(iscorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length} !`;
    nextButton.innerHTML ="Play again";
    nextButton.style.display = "block";
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        quizstart();
    }
})

quizstart();