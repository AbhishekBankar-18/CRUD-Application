let cl = console.log;

const stdInfo = document.getElementById('stdInfo');
const nameControl = document.getElementById('name');
const lnameControl = document.getElementById('lname');
const emailControl = document.getElementById('email');
const contactControl = document.getElementById('Contact');
const stdDetails = document.getElementById('stdDetails');
const submitBtn = document.getElementById("submitBtn");
const updateBtn = document.getElementById("updateBtn");
const validEmail = document.getElementById("validEmail");
const validContact = document.getElementById("validContact");

let stdArray = [
    //  {fname : "adjf", lname : "djjfs",  email : "kdjfjsd", contact : 4544455R}
];


const onEdit = (eid) => {
    // cl("Editted", eid);
    let getId = eid.getAttribute("data-id");
    // cl(getId)
    localStorage.setItem("setEditId", getId)
    let getObj = stdArray.find(obj => obj.id === getId)
    // cl(getObj);
    nameControl.value = getObj.fname;
    lnameControl.value = getObj.lname;
    emailControl.value = getObj.email;
    contactControl.value = getObj.contact;
    submitBtn.classList.add("d-none")
    updateBtn.classList.remove("d-none")
}
const onDelete = (del) => {
    // cl("Deleted", del)
    let a = del.getAttribute("data-id");
    //  cl(a)
    stdArray.filter(ele => ele.id !== a)
    stdArray.splice(a,1)
//    cl( del.parentElement.parentElement)
      del.parentElement.parentElement.remove()
    // templating(stdArray);
    setStdArray();

}

const templating = (arr) => {
    let result = '';
    arr.forEach((ele, i) => {
        result += `
            <tr>
                <td>${i + 1}</td>
                <td>${ele.fname}</td>
                <td>${ele.lname}</td>
                <td>${ele.email}</td>
                <td>${ele.contact}</td>
                <td><button class="btn btn-primary" data-id="${ele.id}" onclick="onEdit(this)">Edit</button></td>
                <td><button class="btn btn-danger" data-id="${ele.id}" onclick="onDelete(this)">Delete</button></td>
            </tr>
        `
    })
    stdDetails.innerHTML = result;
}
templating(stdArray);

if (localStorage.getItem("setStdInfo")) {
    stdArray = JSON.parse(localStorage.getItem('setStdInfo'))
    templating(stdArray);
}
// uniqe identity genrator
const UUID = () =>
    ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (
            c ^
            (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
    );


const addData = (ele) => {
    ele.preventDefault()
    // cl("submitted")
    let obj = {
        fname: nameControl.value,
        lname: lnameControl.value,
        email: emailControl.value,
        contact: contactControl.value,
        id: UUID()
    }
    stdArray.push(obj);
    cl(stdArray)
    setStdArray()
    templating(stdArray);
    stdInfo.reset()
}
const onStdUpdate = ele => {
    let updatedId = localStorage.getItem("setEditId");
    cl(updatedId)
    stdArray.forEach(obj => {
        if (obj.id === updatedId) {
            obj.fname = nameControl.value;
            obj.lname = lnameControl.value;
            obj.email = emailControl.value;
            obj.contact = contactControl.value
        }
    })
    setStdArray()
//    cl(document.querySelector(`[data-id = ${updatedId}]`).closest("tr"));
    templating(stdArray)
    submitBtn.classList.remove('d-none')
    updateBtn.classList.add('d-none')
    stdInfo.reset();
}
const onEmailBlur = (ele => {
    let emArr = emailControl.value;
    if(emArr.indexOf("@") < emArr.indexOf(".")){
        validEmail.classList.add("d-none")
    }else if(emArr == ''){
        validEmail.classList.add("d-none")
    }else{
        validEmail.classList.remove("d-none")

    }
})
const onContactBlur = ele => {
    let contactArr = contactControl.value;
    // cl(contactArr)
    if(isNaN(contactArr)){
        contactControl.nextElementSibling.classList.remove('d-none');
    }else if(contactArr.length == 0){
        contactControl.nextElementSibling.classList.add('d-none');
    }
    else if((contactArr.length < 10) || (contactArr.length > 10)){
       validContact.classList.remove('d-none');
    }   
    else if(contactArr.length === 10){
        validContact.classList.add('d-none');
        contactControl.nextElementSibling.classList.add('d-none');
    }
}
function setStdArray(){
    localStorage.setItem("setStdInfo", JSON.stringify(stdArray))
}
stdInfo.addEventListener("submit", addData)
updateBtn.addEventListener("click", onStdUpdate)
emailControl.addEventListener("blur",onEmailBlur)
contactControl.addEventListener("blur",onContactBlur)
