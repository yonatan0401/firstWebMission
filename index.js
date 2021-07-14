const formSubmit = () => {
    if ( validateName() && validateMail() && validateDays() ) {
        // this is when validation is ok
        const name = document.getElementById("nameInput").value
        const mail = document.getElementById("mailInput").value
        const days = document.getElementById("daysInput").value
        console.log(name, mail, days);
        addListItem(name, mail, Number(days))
    } else {
        //when validation is not ok
        return false
    }
}

const validateName = () => {
    console.log("validating name")
    let re = /^[A-Za-z]+$/;
    const name = document.getElementById("nameInput").value
    if(re.test(name)){
        return true
    }else{
        alert("הכנס שם בפורמט נכון")
        return true
    }
}

const validateMail = () => {
    console.log("validating email");
    let re = /\S+@\S+\.\S+/;
    const mail = document.getElementById("mailInput").value
    if (mail.includes("@") && mail.includes(".") && re.test(mail)) {
        return true
    } else {
        alert(`"${mail}" is not a valid Email`)
        return false
    }
}

const validateDays = () => {
    console.log("validating number of days in isolation")
    const days = document.getElementById("daysInput").value
    const num = Number(days)
    console.log(num, isNaN(days), (num > 0 && num < 14));
    if(!isNaN(days) && ((num > 0 && num < 14) || (num == 14 || num == 0))){
        return true
    }else{
        alert("יש להכניס מספר בין 0 - 14 לשדה ימי בידוד")
        return false
    }
}

const addListItem = (name, mail, dateInDays) => {
    console.log("adding list item")
    const sickList = document.getElementById('mainList')

    //get the relese date
    var tempDate = new Date();
    tempDate.setDate(tempDate.getDate() + dateInDays);

    //create all the needed elements
    const listItem = document.createElement("li")
    const nameP = document.createElement("p")
    const mailP = document.createElement("p")
    const dateP = document.createElement("p")
    const button = document.createElement("button")

    console.log(sickList.childElementCount);

    nameP.innerText = name
    mailP.innerText = mail
    dateP.innerText = formatDate(tempDate)
    button.innerHTML = "&#10006";

    listItem.setAttribute('id', sickList.childElementCount == 0 ? sickList.childElementCount:String(Number(sickList.lastChild.getAttribute("id")) + 1))
    button.setAttribute('onClick', "deleteRow(this)")
    console.log(listItem, nameP, mailP, dateP, sickList);
    
    //assign them to needed elements
    listItem.appendChild(button)
    listItem.appendChild(nameP)
    listItem.appendChild(mailP)
    listItem.appendChild(dateP)   
    sickList.appendChild(listItem)
}

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

const deleteRow = (element) => {
    // deletes the row
    console.log("deleting the current row");
    element.parentElement.remove()
}