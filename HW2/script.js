/*
 * Author: Saman Hosseini
 */

/* Navigation bar tabs */
// hide all tabs except for selected tab
function showContent(section) {
   // Hide all sections
   document.querySelectorAll('.content-section').forEach(function (div) {
      div.style.display = 'none';
   });
   // Show the selected section
   document.getElementById(section).style.display = 'block';
}

/* Average and Maximum */
// calculates the data field on change
function calculate() {
   var nums = document.getElementById("data").value.split(",");
   var avg = average(nums);
   var max = maximum(nums);
   if (isNaN(avg)) {
      document.getElementById("error").textContent = avg;
      document.getElementById("avg").value = "";
      document.getElementById("max").value = "";
   }
   else {
      document.getElementById("error").textContent = "";
      document.getElementById("avg").value = avg;
      document.getElementById("max").value = max;
   }
   if (nums[0] === "")
      document.getElementById("error").textContent = "";
}

// calculates average
function average(nums) {
   var avg = 0;
   var count = 0;
   for (let i = 0; i < nums.length; i++) {
      var num = parseFloat(nums[i].trim());
      if (isNaN(nums[i]) || isNaN(num)) {
         return "'" + nums[i] + "'" + " is not a number!";
      }
      if (num < 1 || num > 100) {
         return "'" + num + "'" + " is out of range!"
      }
      avg += num;
      count++;
   }
   if (count < 10)
      return "Please enter " + (10 - count) + " more number/s!";
   if (count > 10)
      return "Please remove " + (count - 10) + " number/s!"
   return avg / count;
}

// calculates maximum
function maximum(nums) {
   var max = 0;
   for (let i = 0; i < nums.length; i++) {
      var num = parseFloat(nums[i].trim());
      max = Math.max(max, num);
   }
   return max;
}

/*Cookie*/
// reurns a string greating based on time of day
function great() {
   const hours = new Date().getHours();
   if (hours >= 5 && hours < 12) return "Good Morning";
   else if (hours >= 12 && hours < 18) return "Good Afternoon";
   else if (hours >= 18 && hours < 22) return "Good Evening";
   else return "Good Night";
}

// prints welcome message in the survey form based on cookie
function welcome() {
   const name = getCookie("name");
   document.getElementById("great").textContent = great();

   if (!name || name === null) {
      document.getElementById("user").textContent = " Stranger, ";
      document.getElementById("setname").textContent = "Click here to enter your name.";
      document.getElementById("setname").onclick = function () {
         setCookie(prompt("Enter your name:"));
         location.reload();
      }
   }
   else {
      document.getElementById("user").textContent = name.split(" ")[0] + ", ";
      document.getElementById("setname").textContent = "Click here to change your name."
      document.getElementById("setname").onclick = function () {
         setCookie(prompt("Enter your name:"));
         location.reload();
      }
   }

   document.getElementById("welcome").textContent = "welcome to SWE642 Survey.";
}

// gets cookie
function getCookie(name) {
   const cookies = decodeURIComponent(document.cookie).split(";");
   for (let cookie of cookies) {
      const pair = cookie.split("=");
      if (name === pair[0].trim())
         return pair[1];
   }
   return null;
}

// sets cookie with expiration date 7 days from now
function setCookie(name) {
   if (name)
      document.cookie = "name=" + name + "; expires=" + new Date(new Date().getFullYear(), new
         Date().getMonth(), new Date().getDate() + 7).toUTCString() + ";";
}

/* Event handler */
function validate() {
   // event.preventDefault();
   let isValid = true;
   let errorMessage = '';
   let fieldsToClear = [];

   // Validate Name (Alphabets only)
   const nameField = document.getElementById('name');
   const name = nameField.value;
   if (!/^[A-Za-z ]+$/.test(name)) {
      errorMessage += 'Please enter a valid name.\n';
      fieldsToClear.push(nameField);
      isValid = false;
   }
   else setCookie(name);

   // Validate Address (alphanumeric characters, spaces, and basic punctuation)
   const addressField = document.getElementById('address');
   const address = addressField.value;
   if (!/^[a-zA-Z0-9\s,.'-]+$/.test(address)) {
      errorMessage += 'Please enter a valid address.\n';
      fieldsToClear.push(addressField);
      isValid = false;
   }

   // Validate Zipcode (Valid US Zipcodes)
   const zipField = document.getElementById('zip');
   const zip = zipField.value;
   if (!/^\d{5}$/.test(zip)) {
      errorMessage += 'Please enter a valid zipcode.\n';
      fieldsToClear.push(zipField);
      isValid = false;
   }

   // Validate City (valid zipcode should populate city and state fields)
   const cityField = document.getElementById('city');
   const city = cityField.value;
   if (!city) {
      errorMessage += 'Make sure zipcode is in the DMV area.\n';
      fieldsToClear.push(cityField);
      isValid = false;
   }

   // Validate Telephone (US phone number format)
   const teleField = document.getElementById('tele');
   const tele = teleField.value;
   if (!/^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/.test(tele)) {
      errorMessage += 'Please enter a valid telephone number.\n';
      fieldsToClear.push(teleField);
      isValid = false;
   }

   // Validate Email Format
   const emailField = document.getElementById('email');
   const email = emailField.value;
   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   if (!emailPattern.test(email)) {
      errorMessage += 'Please enter a valid email address.\n';
      fieldsToClear.push(emailField);
      isValid = false;
   }

   // Validate Date is selected
   const dateField = document.getElementById('date');
   const date = dateField.value;
   if (!date) {
      errorMessage += 'Please select a date.\n';
      fieldsToClear.push(dateField);
      isValid = false;
   }

   // Validate Checkboxes (At least two selected)
   const checkboxes = document.querySelectorAll('input[name="liked"]:checked');
   if (checkboxes.length < 2) {
      errorMessage += 'Please check at least two aspects you liked most about the campus.\n';
      isValid = false;
   }

   // Validate Radio Buttons (One option selected)
   const radio = document.querySelector('input[name="interest"]:checked');
   if (!radio) {
      errorMessage += 'Please select your reason for being interested in George Mason University.\n';
      isValid = false;
   }

   if (!isValid) {
      window.alert(errorMessage);
      fieldsToClear.forEach(field => { field.value = ''; });
      event.preventDefault();
      window.scrollTo(0, 0);
   } else {
      alert('Form submitted successfully!');
   }
}

/* Dialog */
function dialog() {
   document.getElementById("dialog").textContent = getCookie("name").split(" ")[0];
}

/* Ajax & JSON */
function populate() {
   let zip = document.getElementById("zip").value;
   let request = new XMLHttpRequest();
   request.open("GET", "../zipcodes.json", true);
   request.onreadystatechange = function () {
      if (request.readyState === 4 && request.status === 200) {
         var data = JSON.parse(request.responseText);
         var found = false;

         for (let i = 0; i < data.zipcodes.length; i++) {
            if (data.zipcodes[i].zip === zip) {
               document.getElementById("city").value = data.zipcodes[i].city;
               document.getElementById("state").value = data.zipcodes[i].state;
               document.getElementById("error-zip").textContent = "";
               found = true;
               break;
            }
         }

         if (!found) {
            document.getElementById("city").value = "";
            document.getElementById("state").value = "";
            document.getElementById("error-zip").textContent = "Invalid Zipcode";
            if (!zip)
               document.getElementById("error-zip").textContent = "";
         }
      }
   };
   request.send();

   // let url = "https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-postal-code&q=${zip}"
   // fetch(url)
   //    .then(response => response.json())
   //    .then(data => {
   //       if (data.city && data.state) {
   //          document.getElementById("city").value = data.city;
   //          document.getElementById("state").value = data.state;
   //          document.getElementById("error-zip").textContent = "";
   //       } else {
   //          document.getElementById("city") = "";
   //          document.getElementById("state") = "";
   //          document.getElementById("error-zip").textContent = "Invalid Zipcode";
   //       }
   //    })
   //    .catch(error => {
   //       document.getElementById("error-zip").textContent = "Error fetching data";
   //    });
}