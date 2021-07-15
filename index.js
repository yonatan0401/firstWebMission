let sickPeople = []; // the list of people
let isHiddenShows = false

if (localStorage.getItem("sickPeople")){
    sickPeople = JSON.parse(localStorage.getItem("sickPeople"))
}

/*
* the form submit method
*/
const formSubmit = () => {
    if ( validateName() && validateMail() && validateDays() ) {
        // this is when validation is ok
        const name = document.getElementById("nameInput").value
        const mail = document.getElementById("mailInput").value
        const days = document.getElementById("daysInput").value
    
        sickPeople.push({ id: sickPeople.length == 0 ? 0 : sickPeople[sickPeople.length - 1].id + 1, name: name, mail: mail, days: Number(days), date: new Date()})
        localStorage.setItem('sickPeople', JSON.stringify(sickPeople));
        buildListItems()
    } else {
        //when validation is not ok
        return false
    }
}

const showHiddenTitle = () => {
    isHiddenShows = !isHiddenShows
    if (isHiddenShows){
        document.getElementById("hidden").style.display = "block";
    }else{
        document.getElementById("hidden").style.display = "none";
    }
}

/*
*validate name
*/
const validateName = () => {
    // console.log("validating name")
    let re = /^[A-Za-z\u0590-\u05fe]+$/;
    const name = document.getElementById("nameInput").value
    if(re.test(name)){
        return true
    }else{
        alert("הכנס שם בפורמט נכון")
        return true
    }
}

/*
* validate mail
*/
const validateMail = () => {
    // console.log("validating email");
    let re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const mail = document.getElementById("mailInput").value
    if (mail.includes("@") && mail.includes(".") && re.test(mail)) {
        return true
    } else {
        alert(`"${mail}" is not a valid Email`)
        return false
    }
}

/*
*validate the date range is currect
*/
const validateDays = () => {
    // console.log("validating number of days in isolation")
    const days = document.getElementById("daysInput").value
    const num = Number(days)
    // console.log(num, isNaN(days), (num > 0 && num < 14));
    if(!isNaN(days) && ((num > 0 && num < 14) || (num == 14 || num == 0))){
        return true
    }else{
        alert("יש להכניס מספר בין 0 - 14 לשדה ימי בידוד")
        return false
    }
}

/*
*builds the list on the html document
*/
const buildListItems = () => {
    console.log("adding list item")
    const sickList = document.getElementById('mainList')
    sickList.innerHTML = '';
    console.log(sickPeople);
    sickPeople.map((person) => {
        //get the relese date
        let tempDate = new Date() 
        if (typeof(person.date) == "string"){
            console.log(person);
            let date2 = new Date(person.date)
            tempDate.setDate(date2.getDate() + person.days);
        }else{
            tempDate.setDate(person.date.getDate() + person.days);
        }

        //create all the needed elements
        const listItem = document.createElement("li")
        const nameP = document.createElement("p")
        const mailP = document.createElement("p")
        const dateP = document.createElement("p")
        const button = document.createElement("button")

        // console.log(sickList.childElementCount);

        nameP.innerText = person.name
        mailP.innerText = person.mail
        dateP.innerText = formatDate(tempDate)
        button.innerHTML = "&#10006";

        listItem.setAttribute('id', sickList.childElementCount == 0 ? sickList.childElementCount : String(Number(sickList.lastChild.getAttribute("id")) + 1))
        button.setAttribute('onClick', "deleteRow(this)")
        // console.log(listItem, nameP, mailP, dateP, sickList);

        //assign them to needed elements
        listItem.appendChild(button)
        listItem.appendChild(nameP)
        listItem.appendChild(mailP)
        listItem.appendChild(dateP)
        sickList.appendChild(listItem)
    })

    //hide gif 
    showGiff()
}

/*
*formats the date
*/
const formatDate = (date) => {
    let dd = date.getDate();
    let mm = date.getMonth() + 1;

    let yyyy = date.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    let today = dd + '/' + mm + '/' + yyyy;
    return today
}

/*
* removes an element from the list by its buttons on click
*/
const deleteRow = (element) => {

    //remove the item from current list
    let id = element.parentElement.getAttribute("id")
    const getIndex = (element) => element.id == Number(id);
    const index = sickPeople.findIndex(getIndex)
    sickPeople.splice(index, 1)

    //save delete
    localStorage.setItem('sickPeople', JSON.stringify(sickPeople));

    //rebuild the list
    buildListItems()

    showGiff()
}

const showGiff = () => {
    const sickList = document.getElementById('mainList')
    const gif = document.getElementById("gif")
    
    let count = 0
    
    for (let i = 0; i < sickPeople.length; i++) {
        if(sickPeople[i].days == 14){
            count++
        }
    }

    if (count < 5){
        gif.style.display = "none";
    }else{
        gif.style.display = "block";
    }   
}

showGiff()