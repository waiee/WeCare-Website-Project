const form = document.querySelector('#form')

form.addEventListener('submit',(e) =>{
    e.preventDefault();

    //clear message box
    document.getElementById("messagebox").innerHTML = ""

    //get the input value
    const usernamevalue = document.querySelector('#username').value
    const username = usernamevalue.toUpperCase()
    const date = document.querySelector('#date').value
    const time = document.querySelector('#time').value
    const day = new Date(date).getDay()
    const id = document.querySelector('#id').value

    //false validation in the beginning

    let validusername = false
    let validdate = false
    let validtime = false
    let validletter = false
    let validday = false
    let validlength = false
    let validid = false
    let valididlength = false
    let valididnumber = false

    let registereduser = true
    let timeslotfull = true

    //constant empty variable created

    let repeateduser = 0
    let repeatedtime = 0
    let notinvalidletter = 0
    let notinvalidnumber = 0
    let dayname = ""

    let message = []

    let idinarray = id.split('')
    const idnumberlist = ['1','2','3','4','5','6','7','8','9','0']
    let usernameinarray = username.split('')
    const validletterslist = ['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Z','X','C','V','B','N','M',' ']



    //check time isit empty
    if (time === '' || time == null) {
        message.push("Time is required.")
        validtime = false
    } else {
        validtime = true
    }

    //check date isit empty
    if (date === '' || date == null) {
        message.push("Date is required.")
        validdate = false
    } else {
        validdate = true
    }

    //check the day is sat/sun or not
    if (day === 6 || day === 0) {
        message.push("Closed on Saturday and Sunday.")
        validday = false
    } else {
        validday = true
    }

    //id

    if(id === '' || id == null) {
        message.push("Id number is required.")
        validid = false
    } else {
        validid = true
    }

    for (let n = idinarray.length; n > 0;){
        n = n-1
        for (let i = idnumberlist.length; i > 0;){
            i = i-1
            if (idinarray[n] === idnumberlist[i]) {
                notinvalidnumber = notinvalidnumber+1
            } 
        }
    }

    if (notinvalidnumber !== idinarray.length) {
        message.push("Invalid Id number. Only numbers are allowed.")
        valididnumber = false
    } else {
        valididnumber = true
    }

    if (idinarray.length !== 12 && validid == true){
        message.push("Id number must be 12 characters.")
        valididlength = false
    } else {
        valididlength = true
    }

    for (let i = localStorage.length; i > 0;){
        i = i-1
        var idfromstorage = localStorage.key(i)
        if (idfromstorage === id) {
            repeateduser = repeateduser + 1
        }
    }

    //registereduser is true if invalid
    if (repeateduser > 0) {
        registereduser = true
        message.push("This user had already booked a timeslot with id number.")
    } else {
        registereduser = false
    }
    

    //check username isit empty
    if(username === '' || username == null){
        message.push("Username is required.")
        validusername = false
    } else {
        validusername = true
    }

    //loop through every letter in username isit invalid
    for (let n = usernameinarray.length; n > 0;){
        n = n-1
        for (let i = validletterslist.length; i > 0;){
            i = i-1
            if (usernameinarray[n] === validletterslist[i]) {
                notinvalidletter = notinvalidletter+1
            } 
        }
    }

    //letter validation is false if invalid
    if (notinvalidletter !== usernameinarray.length) {
        message.push("Invalid Letter. Only alphabets and space are allowed.")
        validletter = false
    } else {
        validletter = true
    }
    
    //check username length less than 50
    if (usernameinarray.length > 50){
        message.push("Username must be lest than 50 characters.")
        validlength = false
    } else {
        validlength = true
    }
    
    
    for (let i = localStorage.length; i > 0;){
        i = i-1
        var idfromstorage = localStorage.key(i)
        var infofromstorage = localStorage.getItem(idfromstorage)
        var splitinfo = infofromstorage.split(",")
        var datebooked = splitinfo[1]
        var timebooked = splitinfo[3]

        if (datebooked === date) {
            if (timebooked === time) {
                repeatedtime = repeatedtime+1
            }
        }
    }
    
    if (repeatedtime >= 3) {
        timeslotfull = true
        message.push("Timeslot is full.")
    } else {
        timeslotfull = false
    }



    //find the day name if it is valid day
    if (validday == true) {
        if (day == 1) {
            dayname = "Monday"
        }
        if (day == 2) {
            dayname = "Tuesday"
        }
        if (day == 3) {
            dayname = "Wednesday"
        }
        if (day == 4) {
            dayname = "Thursday"
        }
        if (day == 5) {
            dayname = "Friday"
        }
    }

    //store the booking details in local storage

    if (validusername == true && validtime == true && validdate == true && validday == true && validletter == true && registereduser == false && validlength == true && validid == true && valididlength == true && valididnumber == true && timeslotfull == false) {
        infolist = [username,date,dayname,time]
        localStorage.setItem(id,infolist)
        var messagejoined = username+" has sucessfully booked "+time+" timeslot on "+date+"."
        message.push(messagejoined)
    } else {
        message.push('Failed to book.')
    }

    //print message
    for (let i = message.length; i >0;){
        i = i-1
        var para = document.createElement("p");
        var node = document.createTextNode(message[i]);
        para.appendChild(node);
        var element = document.getElementById("messagebox");
        element.appendChild(para);
    }

    //clear table
    var rowCount = document.getElementById('table').rows.length;
    for (let n = rowCount; n > 0;) {
        n = n - 1
        document.getElementById("table").deleteRow(0);
    }

})

function checkbooking() {

    const id = document.querySelector('#checkid').value

    let validid = false
    let valididlength = false
    let valididnumber = false
    let notinvalidnumber = 0
    let message = []
    let registereduser = true

    let idinarray = id.split('')
    const idnumberlist = ['1','2','3','4','5','6','7','8','9','0']


    var table = document.getElementById("table");
    var rowCount = document.getElementById('table').rows.length;
    document.getElementById("messagebox").innerHTML = ""

    if(id === '' || id == null) {
        message.push("Id number is required to check.")
        validid = false
    } else {
        validid = true
    }

    for (let n = idinarray.length; n > 0;){
        n = n-1
        for (let i = idnumberlist.length; i > 0;){
            i = i-1
            if (idinarray[n] === idnumberlist[i]) {
                notinvalidnumber = notinvalidnumber+1
            } 
        }
    }

    if (notinvalidnumber !== idinarray.length) {
        message.push("Invalid Id number. Only numbers are allowed.")
        valididnumber = false
    } else {
        valididnumber = true
    }

    if (idinarray.length !== 12 && validid == true){
        message.push("Id number must be 12 characters.")
        valididlength = false
    } else {
        valididlength = true
    }

    //show the table if not shown
    try {
        var e = document.getElementById("hiddentable");
        e.id = "visibletable";
    }
    catch(err) {
        console.log('table is shown')
    }

    //delete the previous table
    for (let n = rowCount; n > 1;) {
        n = n - 1
        document.getElementById("table").deleteRow(1);
    }

    //create the table header

    //print the data from the local storage
    if (validid == true && valididnumber == true && valididlength == true) {

        if (rowCount === 0) {
            var header = table.createTHead();
            var headerrow = header.insertRow(0);
            var usernameheader = headerrow.insertCell(0);
            var dateheader = headerrow.insertCell(1);
            var dayheader = headerrow.insertCell(2);
            var timeheader = headerrow.insertCell(3);
            usernameheader.innerHTML = "<b>Username</b>";
            dateheader.innerHTML = "<b>Date</b>";
            dayheader.innerHTML = "<b>Day</b>";
            timeheader.innerHTML = "<b>Time</b>";
        }
    
        try{
            var infoinstorage = localStorage.getItem(id)
    
            var splitinfo = infoinstorage.split(",")
            var usernamebooked = splitinfo[0]
            var datebooked = splitinfo[1]
            var daybooked = splitinfo[2]
            var timebooked = splitinfo[3]
        
            var row = table.insertRow(1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
        
            cell1.innerHTML = usernamebooked;
            cell2.innerHTML = datebooked;
            cell3.innerHTML = daybooked;
            cell4.innerHTML = timebooked;
        }
    
        catch(err) {
            console.log('Cant find this id')
            message.push("This user had not registered.")
            try{
                for (let n = rowCount; n > -1;) {
                    n = n - 1
                    document.getElementById("table").deleteRow(0);
                }
            }
            catch(err){
                console.log('All row is deleted')
            }
        }

    }

    for (let i = message.length; i >0;){
        i = i-1
        var para = document.createElement("p");
        var node = document.createTextNode(message[i]);
        para.appendChild(node);
        var element = document.getElementById("messagebox");
        element.appendChild(para);
    }

}