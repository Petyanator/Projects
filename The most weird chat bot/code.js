import { GoogleGenerativeAI } from "@google/generative-ai"
const API_KEY = "Enter your API"
const genAI = new GoogleGenerativeAI(API_KEY);


let InputType = document.getElementById("input")
const button = document.getElementById("send")
const responseDiv = document.getElementById("chatbox")

button.addEventListener("click", function(){
    const MyAnswer = responseDiv.appendChild(document.createElement("li"))
    let Mestext = InputType.value
    MyAnswer.textContent = Mestext
    botAnswer(Mestext)
})


async function botAnswer(prompt){
    try {
        // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
      
        const result = await model.generateContent(prompt)
        const response = result.response
        const text = response.text()
        console.log(text)
        let Output = responseDiv.appendChild(document.createElement("li"))
        Output.textContent = text
      } catch (error){
        console.error("Error generating content:", error);
        responseDiv.textContent = "An error occurred while generating the response.";
      }
}

