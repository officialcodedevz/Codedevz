// ==========================
// APP START
// ==========================
document.addEventListener("DOMContentLoaded", () => {

    console.log("CodeDevz App Running 🚀");

    // ==========================
    // ACCORDION
    // ==========================
    document.querySelectorAll(".accordion-item").forEach(item => {
        item.querySelector(".accordion-btn").addEventListener("click", () => {
            item.classList.toggle("active");
        });
    });

    // ==========================
    // HAMBURGER MENU
    // ==========================
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("navLinks");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navLinks.classList.toggle("active");
        });
    }

});

const phoneInput = document.getElementById("phone");
const whatsappInput = document.getElementById("whatsapp");

function restrictToNumbers(input) {
    input.addEventListener("input", () => {
        // remove non-numbers
        input.value = input.value.replace(/\D/g, "");

        // limit to 10 digits
        if (input.value.length > 10) {
            input.value = input.value.slice(0, 10);
        }
    });
}

if (phoneInput) restrictToNumbers(phoneInput);
if (whatsappInput) restrictToNumbers(whatsappInput);

const applyForm = document.getElementById("applyForm");

if (applyForm) {
    applyForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const whatsapp = document.getElementById("whatsapp").value.trim();
        const email = document.getElementById("email").value.trim();
        const college = document.getElementById("college").value.trim();
        const domain = document.getElementById("domain").value;

        // 🔴 VALIDATION
        if (!name || !phone || !whatsapp || !email || !college || !domain) {
            alert("Please fill all fields ❗");
            return;
        }

        if (!/^[0-9]{10}$/.test(phone)) {
            alert("Phone number must be 10 digits ❗");
            return;
        }

        if (!/^[0-9]{10}$/.test(whatsapp)) {
            alert("WhatsApp number must be 10 digits ❗");
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            alert("Enter valid email ❗");
            return;
        }

        // ✅ If all valid → send data
        const formData = {
            name,
            phone,
            whatsapp,
            email,
            college,
            domain
        };

        try {
            await fetch("https://script.google.com/macros/s/AKfycbzHdklneJkb1hNQY2i8dbygoOtWA47GimTzlPAh_eo_LpoZ44xVPUD_JKZACZixSMfO/exec", {
                method: "POST",
                body: JSON.stringify(formData)
            });

            alert("Application submitted successfully 🚀");
            applyForm.reset();

        } catch (error) {
            alert("Error submitting ❌");
        }
    });
}

// ==========================
// CONTACT FORM
// ==========================

(function () {
    emailjs.init("-P_K9_7myJ_PJm4PJ");
})();

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const params = {
            name: document.getElementById("contactName").value,
            email: document.getElementById("contactEmail").value,
            message: document.getElementById("contactMessage").value
        };

        emailjs.send("service_z316mf2", "template_3vnupl6", params)
            .then(() => {
                alert("Message sent successfully 🚀");
                contactForm.reset();
            })
            .catch(() => {
                alert("Failed to send message ❌");
            });
    });
}

// ==========================
// CERTIFICATE VERIFICATION
// ==========================

const verifyForm = document.getElementById("verifyForm");

if (verifyForm) {
    verifyForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = document.getElementById("certificateId").value;
    const msg = document.getElementById("verifyMessage");

    // ✅ SHOW LOADING FIRST
    msg.innerHTML = `
        <div class="verify-loading">
            ⏳ Verifying...
        </div>
    `;

    try {
        const res = await fetch("https://script.google.com/macros/s/AKfycbxj2pbv34ZTDaFqgyyo1uekkcUuqH9WZ0RmCxgyWAwAu8a19esqvGmUtQuPO4SYlPxo/exec?id=" + id);
        const data = await res.json();

        if (data.valid) {
            msg.innerHTML = `
                <div class="verify-success">
                    <h3>✅ Certificate Verified</h3>
                    <p><strong>Name:</strong> ${data.name}</p>
                    <p><strong>Domain:</strong> ${data.domain}</p>
                    <p><strong>Status:</strong> ${data.status}</p>
                </div>
            `;
        } else {
            msg.innerHTML = `
                <div class="verify-error">
                    <h3>❌ Invalid Certificate</h3>
                </div>
            `;
        }

    } catch (error) {
        msg.innerHTML = `
            <div class="verify-error">
                ❌ Error verifying
            </div>
        `;
    }
});
}

// ==========================
// TASK SUBMISSION
// ==========================

const taskForm = document.getElementById("taskForm");

if (taskForm) {
    taskForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const msg = document.createElement("div");
        msg.className = "task-message";
        taskForm.appendChild(msg);

        const formData = {
            name: document.getElementById("fullName").value,
            id: document.getElementById("candidateId").value,
            email: document.getElementById("emailId").value,
            phone: document.getElementById("phoneNumber").value,
            domain: document.getElementById("taskDomain").value,
            task: document.getElementById("taskName").value,
            link: document.getElementById("gitLink").value,
            demolink: document.getElementById("demoLink").value
        };

        // 🔥 LOADING
        msg.innerHTML = "⏳ Submitting task...";

        try {
            await fetch("https://script.google.com/macros/s/AKfycbx3RXy6aLHpafmUNA85L4s2YJJPHyQzSo35hqM2E2pfPc7NTW7EFAR85LMQic8cWtSr/exec", {
                method: "POST",
                body: JSON.stringify(formData)
            });

            msg.innerHTML = "✅ Task submitted successfully";
            taskForm.reset();

        } catch (err) {
            msg.innerHTML = "❌ Submission failed";
        }
    });
}
