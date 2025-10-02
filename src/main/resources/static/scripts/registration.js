import { validateLettersOnly, validateIdNumber, validateCellphone, validateEmail, validatePassword, capitalizeWords, 
getRoles
} from "./utility/utility.js";
import { auth } from "./Auth/auth.js";
import { courseFunctions } from "./course/course.js";

 export const eventListeners = {
    register(){  
        document.querySelector(".register-btn").addEventListener("click", async (e) => {
            e.preventDefault(); // <-- Add this line!
            alert("Submit event detected");

            // Build registerRequest with correct field names
            let type = "";
            document.getElementsByName("role").forEach((elem) => {
                if(elem.checked){
                    type = elem.value.toUpperCase();
                }
            });
            const name = document.getElementById("name").value;
            const surname = document.getElementById("surname").value;
            const idNum = document.getElementById("idNum").value;
            const cellphone = document.getElementById("cellphone").value;
            const email = document.getElementById("email").value;
            const courseOrPosition = document.getElementById("course-input").value.toUpperCase().trim();

            const registerRequest = {
                type,
                name,
                surname,
                idNum,
                cellphone,
                email,
                courseOrPosition
            };

            alert(JSON.stringify(registerRequest));
            // Validate form fields
            if (!validateLettersOnly(registerRequest.name)) {
                alert("Invalid first name");
                return;
            }
            if (!validateLettersOnly(registerRequest.surname)) {
                alert("Invalid last name");
                return;
            }
            if (!validateIdNumber(registerRequest.idNum)) {
                alert("Invalid ID number");
                return;
            }
            if (!validateCellphone(registerRequest.cellphone)) {
                alert("Invalid cellphone number");
                return;
            }
            if (!validateEmail(registerRequest.email)) {
                alert("Invalid email address");
                return;
            }

            auth.register_step1(registerRequest)
            window.location.href = "../pages/create-password.html";
                
        });
        
    },

    createPassword(){
        document.querySelector("#password").addEventListener("input", () => {
            const passwordInput = document.getElementById("password").value;
            const errors = validatePassword(passwordInput, passwordInput);

            // Get <li> and <span> elements
            const lengthHintLi = document.getElementById("lengthHint");
            const lowercaseHintLi = document.getElementById("lowercaseHint");
            const specialCharHintLi = document.getElementById("specialCharHint");
            const lengthHintSpan = document.querySelector("#lengthHint span");
            const lowercaseHintSpan = document.querySelector("#lowercaseHint span");
            const specialCharHintSpan = document.querySelector("#specialCharHint span");

            // Reset classes
            [lengthHintSpan, lowercaseHintSpan, specialCharHintSpan,
                lengthHintLi, lowercaseHintLi, specialCharHintLi].forEach(li => {
                li.classList.remove("valid", "invalid");
            });

            const hintValidMap = (hint, valdity) =>{
                const map = {
                    "8 characters": { li: lengthHintLi, span: lengthHintSpan },
                    "uppercase letter": { li: lowercaseHintLi, span: lowercaseHintSpan },
                    "special character": { li: specialCharHintLi, span: specialCharHintSpan }
                };

                if(map[hint]){
                    map[hint].li.classList.add(valdity);
                    map[hint].span.classList.add(valdity);
                }
            }

            if (errors) {
                errors.forEach(error => {
                    (error.includes("8 characters")) ? hintValidMap("8 characters", "invalid") : hintValidMap("8 characters", "valid");
                    (error.includes("uppercase letter")) ? hintValidMap("uppercase letter", "invalid") : hintValidMap("uppercase letter", "valid");
                    (error.includes("special character")) ? hintValidMap("special character", "invalid") : hintValidMap("special character", "valid");
                });
            }
            else {
                // All criteria met
                ["8 characters", "uppercase letter", "special character"].forEach(hint => {
                    hintValidMap(hint, "valid");
                });
            }
        });

        document.querySelector(".btn").addEventListener("click", (e) => {
            alert("Submit event detected");
            e.preventDefault();
            const errorMsg = document.getElementById('errorMsg');

            const password = document.getElementById("password").value;
            const confirmPassword = document.getElementById("confirmPassword").value;

            const validationError = validatePassword(password, confirmPassword);

                if (!validationError) {
                    const passwordRequest = {
                        password: password
                    };
                    auth.register_step2(passwordRequest)
                        .then(response => {
                            console.log("Registration successful:", response);
                            window.location.href = "../pages/home.html"; // Redirect to home page
                        })
                        .catch(error => {
                            console.error("Registration failed:", error);
                            alert("Registration failed. Please try again.");
                        });
                }
                else {
                    validationError.forEach(error => {
                        if(error.includes("not match")){
                            errorMsg.textContent = "Passwords do not match.";
                            errorMsg.style.display = 'block';
                        }
                    });
                }
        });

        const imgContainer = document.querySelector(".img-container");
        const passwordField = document.getElementById("password");
        if (imgContainer && passwordField) {
            // Show password while mouse/touch is held down
            const showPassword = () => passwordField.setAttribute("type", "text");
            const hidePassword = () => passwordField.setAttribute("type", "password");
            imgContainer.addEventListener("mousedown", showPassword);
            imgContainer.addEventListener("mouseup", hidePassword);
            imgContainer.addEventListener("mouseleave", hidePassword);
            imgContainer.addEventListener("touchstart", showPassword);
            imgContainer.addEventListener("touchend", hidePassword);
        }
    },

    async typingTimer(type) {
        // Get elements
        const courseInput = document.getElementById("course-input");
        const suggestionsList = document.getElementById("course-suggestions");
        const suggestionSpan = document.getElementById("role-suggestion");

        // Remove previous listeners and clear values
        if (courseInput) courseInput.value = "";
        if (suggestionsList) suggestionsList.innerHTML = "";
        if (suggestionSpan) suggestionSpan.textContent = "";

        // Replace input to remove old listeners
        const newInput = courseInput.cloneNode(true);
        courseInput.parentNode.replaceChild(newInput, courseInput);

        // Staff role autocomplete
        if (type === "staff") {
            let config;
            try {
                config = await getRoles();
            } catch (err) {
                alert("Failed to fetch roles");
                return;
            }
            let roles = config.staff.map(r => r.toLowerCase());
            // Prioritize 'admin' over 'administrator' in hints
            roles = roles.sort((a, b) => {
                if (a.startsWith('admin') && b.startsWith('admin') && a.length < b.length) return -1;
                if (a.startsWith('admin') && b.startsWith('admin') && a.length > b.length) return 1;
                return a.localeCompare(b);
            });
            alert(`Roles fetched: ${roles.join(", ")}`);

            newInput.addEventListener("input", () => {
                const val = newInput.value.toLowerCase();
                // Find all matches, prioritize shortest ('admin' before 'administrator')
                let matches = roles.filter(role => role.startsWith(val) && val.length > 0);
                let match = matches.length > 0 ? matches[0] : null;
                if (match && match.length > val.length) {
                    suggestionSpan.innerHTML = `<span style=\"color:transparent;\">${val}</span><span style=\"color:#aaa;\">${match.slice(val.length)}</span>`;
                } else {
                    suggestionSpan.textContent = "";
                }
            });

            newInput.addEventListener("keydown", (e) => {
                const val = newInput.value.toLowerCase();
                let matches = roles.filter(role => role.startsWith(val) && val.length > 0);
                let match = matches.length > 0 ? matches[0] : null;
                if (e.key === "Tab" && match && match.length > val.length) {
                    e.preventDefault();
                    newInput.value = match;
                    suggestionSpan.textContent = "";
                }
            });
        }
        // Student course suggestions
        else if (type === "student") {
            alert("Searching backend for courses...");
            let debounceTimer;
            newInput.addEventListener("input", () => {
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(async () => {
                    const query = newInput.value.trim().toLowerCase();
                    suggestionsList.innerHTML = "";
                    if (query.length === 0) return;

                    let courses = [];
                    try {
                        courses = await courseFunctions.searchCoursesBackend(query);
                    } catch (err) {
                        alert("Failed to fetch courses");
                        return;
                    }
                    courses.forEach(course => {
                        const li = document.createElement("li");
                        li.textContent = `${course.name} (${course.code})`;
                        li.classList.add("suggestion-item");
                        li.onclick = () => {
                            newInput.value = course.name;
                            suggestionsList.innerHTML = "";
                        };
                        suggestionsList.appendChild(li);
                    });
                }, 2000);
            });
        }

        // Hide suggestions when clicking outside
        document.addEventListener("click", (e) => {
            if (!newInput.contains(e.target) && !suggestionsList.contains(e.target)) {
                suggestionsList.innerHTML = "";
            }
        });
    },

    registrationType(){
        const updateHeading = () => {
            document.querySelectorAll('input[name="role"]').forEach((elem) => {
                if(elem.checked ){
                    document.querySelector("#registration-heading").textContent = `${capitalizeWords(elem.value)} Registration`;
                    document.querySelector("#courseRole-label").innerHTML = (elem.value.toUpperCase() === "STAFF") ? "Position:" : "Course:";
                    this.typingTimer(elem.value.toLowerCase()); // Restart typing timer with new type
                }
            });
        };
        // Initial update
        updateHeading();
        // Listen for changes
        document.querySelectorAll('input[name="role"]').forEach((elem) => {
            elem.addEventListener("change", updateHeading);
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    eventListeners.register();
    eventListeners.registrationType();
});