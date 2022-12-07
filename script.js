const textInput = document.getElementById("text")
const answersInput = document.getElementById("answers")
const doneBtn = document.getElementById("btn")
// const table = document.getElementById("table")
const tableCont = document.getElementById("table-cont")


doneBtn.onclick = () => {

    let str = textInput.value.replaceAll("\t", " ")
    let answers = answersInput.value.replaceAll("\n", "\t")
    let lines = str.split("\n")
    let answersArr = answers.split("\t")

    let obj = []
    let i = 1

    let tempObj = {}
    lines.forEach(line => {
        if(line != "")
        if (!isNaN(line.charAt(0)) || line.charAt(0) != "(") {
            if (Object.keys(tempObj).length > 0) {
                obj.push(tempObj)
            }
            // if(!isNaN(line.charAt(0))){
            //     line = line.substring(line.search(". ")+2)
            // }
            tempObj = {
                question: line.trim()
            }
            i = 1
        } else {
            try {
                let sym = line.match(/(?<= |^)\([A-Z|a-z]\)/g)
                let options = line.match(/(?<=\([A-Z|a-z]\) ).+?(?=\(|$)/g)
                sym.forEach((item, index) => {
                    tempObj[item] = options[index].trim()
                    i++
                })
            } catch (error) {
                console.log(line)
            }
            // obj.push(tempObj)
        }
    })

    for(let i = 0; i < answersArr.length; i+=2){
        try {
            obj[Number(answersArr[i])-1].answer = answersArr[i+1]
        } catch (error) {
            
        }
    }
    console.log(obj)
    // let finalStr = ''
    obj.forEach((question, index) => {
        if(question.question){
// finalStr += `Question\t${question.question}
// Type\tmultiple_choice
// Option\t${question['(A)']}\t${question.answer == 'A'? 'correct': 'incorrect'}
// Option\t${question['(B)']}\t${question.answer == 'B'? 'correct': 'incorrect'}
// Option\t${question['(C)']}\t${question.answer == 'C'? 'correct': 'incorrect'}
// Option\t${question['(D)']}\t${question.answer == 'D'? 'correct': 'incorrect'}
// Option\t${question['(E)']}\t${question.answer == 'E'? 'correct': 'incorrect'}
// Solution\t${question[`(${question.answer})`]}
// Marks\t4\t1
// `
            let newTable = document.createElement("table")
            newTable.innerHTML += `<tr>
            <td>Question</td><td colspan="2">${index+1}. ${question.question}</td>
        </tr>
        <tr>
            <td>Type</td><td colspan="2">multiple_choice</td>
        </tr>
        <tr>
            <td>Option</td><td>${question['(A)']}</td><td>${question.answer == 'A'? 'correct': 'incorrect'}</td>
        </tr>
        <tr>
        <td>Option</td><td>${question['(B)']}</td><td>${question.answer == 'B'? 'correct': 'incorrect'}</td>
        </tr>
        <tr>
        <td>Option</td><td>${question['(C)']}</td><td>${question.answer == 'C'? 'correct': 'incorrect'}</td>
        </tr>
        <tr>
        <td>Option</td><td>${question['(D)']}</td><td>${question.answer == 'D'? 'correct': 'incorrect'}</td>
        </tr>
        <tr>
        <td>Option</td><td>${question['(E)']}</td><td>${question.answer == 'E'? 'correct': 'incorrect'}</td>
        </tr>
        <tr>
            <td>Solution</td><td colspan="2">${question[`(${question.answer})`]}</td>
        </tr>
        <tr>
            <td>Marks</td><td>1</td><td>0.25</td>
        </tr>`
        tableCont.appendChild(newTable)
        tableCont.innerHTML += "<br>"
        }
    })

    // navigator.clipboard.writeText(finalStr)
}



