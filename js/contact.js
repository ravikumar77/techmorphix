document.addEventListener('DOMContentLoaded', function () {
    // Initialize EmailJS with your user ID
    // This is a public key, so it's safe to include in client-side code
    emailjs.init("YOUR_USER_ID"); // Replace with your actual EmailJS User ID when ready

    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitButton = document.getElementById('submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Form validation
            if (!validateForm()) {
                return;
            }

            // Set button to loading state
            submitButton.classList.add('loading');

            // Prepare email parameters
            const serviceID = 'zoho_service'; // Create this service in EmailJS dashboard
            const templateID = 'contact_form'; // Create this template in EmailJS dashboard
            const templateParams = {
                from_name: document.getElementById('name').value,
                company: document.getElementById('company').value || 'Not specified',
                reply_to: document.getElementById('email').value,
                phone: document.getElementById('phone').value || 'Not provided',
                subject: document.getElementById('subject').value,
                service_interest: document.getElementById('service').value || 'Not specified',
                message: document.getElementById('message').value
            };

            const settings = {
                async: true,
                crossDomain: true,
                url: 'https://send.api.mailtrap.io/api/send',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Api-Token': 'e88c3b83a5c8684b547a8621bf0495a5'
                },
                processData: false,
                data: '{\n  "to": [\n    {\n      "email": "sales@techmorphix.com",\n      "name": "Ravi"\n    }\n  ],\n  "cc": [\n    {\n      "email": "sales@techmorphix.com",\n      "name": "Jane Doe"\n    }\n  ],\n  "bcc": [\n    {\n      "email": "james_doe@example.com",\n      "name": "Jim Doe"\n    }\n  ],\n  "from": {\n    "email": '+templateParams.reply_to+',\n    "name": '+templateParams.from_name+'\n  },\n  "reply_to": {\n    "email": "reply@example.com",\n    "name": "Reply"\n  },\n  "attachments": [\n    {\n      "content": "PCFET0NUWVBFIGh0bWw+CjxodG1sIGxhbmc9ImVuIj4KCiAgICA8aGVhZD4KICAgICAgICA8bWV0YSBjaGFyc2V0PSJVVEYtOCI+CiAgICAgICAgPG1ldGEgaHR0cC1lcXVpdj0iWC1VQS1Db21wYXRpYmxlIiBjb250ZW50PSJJRT1lZGdlIj4KICAgICAgICA8bWV0YSBuYW1lPSJ2aWV3cG9ydCIgY29udGVudD0id2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMCI+CiAgICAgICAgPHRpdGxlPkRvY3VtZW50PC90aXRsZT4KICAgIDwvaGVhZD4KCiAgICA8Ym9keT4KCiAgICA8L2JvZHk+Cgo8L2h0bWw+Cg==",\n      "filename": "index.html",\n      "type": "text/html",\n      "disposition": "attachment"\n    }\n  ],\n  "custom_variables": {\n    "user_id": "45982",\n    "batch_id": "PSJ-12"\n  },\n  "headers": {\n    "X-Message-Source": "techmorphix.com"\n  },\n  "subject": "Your Example Order Confirmation",\n  "text": '+templateParams.message+',\n  "category": "API Test"\n}'
            };
            debugger
            $.ajax(settings).done(function (response) {
                debugger
                console.log(response);
            });
            // Send email (commented out until configured with actual EmailJS account)
            // When ready to use, uncomment this and replace placeholder values
            /*
            emailjs.send(serviceID, templateID, templateParams)
                .then(function(response) {
                    console.log('Email sent successfully!', response);
                    showFormStatus('success', 'Thank you for your message! We will contact you shortly.');
                    contactForm.reset();
                    submitButton.classList.remove('loading');
                })
                .catch(function(error) {
                    console.error('Email failed to send:', error);
                    showFormStatus('error', 'There was a problem sending your message. Please try again or contact us directly.');
                    submitButton.classList.remove('loading');
                });
            */

            // For demonstration (remove when EmailJS is properly configured)
            setTimeout(() => {
                showFormStatus('success', 'Thank you for your message! We will contact you shortly.');
                contactForm.reset();
                submitButton.classList.remove('loading');
            }, 1500);
        });
    }

    // Form validation function
    function validateForm() {
        let isValid = true;
        const requiredFields = contactForm.querySelectorAll('[required]');

        // Clear previous error messages
        formStatus.innerHTML = '';
        formStatus.classList.remove('error');

        // Remove previous error styling
        document.querySelectorAll('.error').forEach(field => {
            field.classList.remove('error');
        });

        // Check required fields
        requiredFields.forEach(field => {
            if (field.type === 'checkbox' && !field.checked) {
                isValid = false;
                field.classList.add('error');
            } else if (field.type !== 'checkbox' && !field.value.trim()) {
                isValid = false;
                field.classList.add('error');
            }

            // Email validation
            if (field.type === 'email' && field.value.trim()) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(field.value.trim())) {
                    isValid = false;
                    field.classList.add('error');
                }
            }
        });

        if (!isValid) {
            showFormStatus('error', 'Please fill in all required fields correctly.');
        }

        return isValid;
    }

    // Show form status message
    function showFormStatus(type, message) {
        formStatus.innerHTML = message;
        formStatus.classList.remove('success', 'error');
        formStatus.classList.add(type);
    }

    // To set up EmailJS with Zoho:
    // 1. Create an EmailJS account at https://www.emailjs.com/
    // 2. Set up a Zoho Email Service in the EmailJS dashboard
    // 3. Create an email template with the variables used in templateParams above
    // 4. Replace the placeholder YOUR_USER_ID with your actual EmailJS User ID
    // 5. Uncomment the emailjs.send block above
    // 6. Remove the setTimeout demonstration code
});