// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for all anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                const headerOffset = 80; // Account for sticky header
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form handling
    const bookingForm = document.getElementById('booking-form-element');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleFormSubmit);
    }
});

// Form submission handler
function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);
    
    // Show loading state
    submitButton.classList.add('loading');
    submitButton.textContent = 'Submitting...';
    
    // Get form values
    const formValues = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        preferredDate: formData.get('preferred-date'),
        preferredTime: formData.get('preferred-time'),
        dripSelection: formData.get('drip-selection'),
        location: formData.get('location'),
        message: formData.get('message')
    };
    
    // Configuration - UPDATE THESE EMAIL ADDRESSES
    const PRIMARY_EMAIL = 'your-primary-email@example.com'; // UPDATE THIS
    const CC_EMAIL = 'your-cc-email@example.com'; // UPDATE THIS
    
    // Option 1: Use Formspree (Recommended for Unbounce)
    // Sign up at https://formspree.io and get your form endpoint
    // Replace 'YOUR_FORMSPREE_ID' with your actual Formspree form ID
    submitViaFormspree(formValues, PRIMARY_EMAIL, CC_EMAIL, submitButton, form);
    
    // Option 2: Use mailto (fallback - less reliable)
    // Uncomment the line below and comment out Option 1 if you prefer mailto
    // submitViaMailto(formValues, PRIMARY_EMAIL, CC_EMAIL, submitButton, form);
}

// Formspree submission (Recommended)
function submitViaFormspree(formValues, primaryEmail, ccEmail, submitButton, form) {
    // IMPORTANT: Replace 'YOUR_FORMSPREE_ID' with your actual Formspree form ID
    // Get it from https://formspree.io after creating a form
    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORMSPREE_ID';
    
    const emailBody = `
New IV Booking Request

Name: ${formValues.name}
Email: ${formValues.email}
Phone: ${formValues.phone}
Preferred Date: ${formValues.preferredDate}
Preferred Time: ${formValues.preferredTime}
Drip Selection: ${formValues.dripSelection}
Location: ${formValues.location}
Additional Notes: ${formValues.message || 'None'}
    `.trim();
    
    fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            _to: primaryEmail,
            _cc: ccEmail,
            _subject: 'New IV Booking Request from ' + formValues.name,
            _replyto: formValues.email,
            name: formValues.name,
            email: formValues.email,
            phone: formValues.phone,
            preferredDate: formValues.preferredDate,
            preferredTime: formValues.preferredTime,
            dripSelection: formValues.dripSelection,
            location: formValues.location,
            message: formValues.message,
            body: emailBody
        })
    })
    .then(response => {
        if (response.ok) {
            showSuccessMessage(form);
            form.reset();
        } else {
            throw new Error('Form submission failed');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        // Fallback to mailto if Formspree fails
        submitViaMailto(formValues, primaryEmail, ccEmail, submitButton, form);
    })
    .finally(() => {
        submitButton.classList.remove('loading');
        submitButton.textContent = 'Submit Booking Request';
    });
}

// Mailto submission (Fallback)
function submitViaMailto(formValues, primaryEmail, ccEmail, submitButton, form) {
    const subject = encodeURIComponent('New IV Booking Request from ' + formValues.name);
    const body = encodeURIComponent(`
New IV Booking Request

Name: ${formValues.name}
Email: ${formValues.email}
Phone: ${formValues.phone}
Preferred Date: ${formValues.preferredDate}
Preferred Time: ${formValues.preferredTime}
Drip Selection: ${formValues.dripSelection}
Location: ${formValues.location}
Additional Notes: ${formValues.message || 'None'}
    `.trim());
    
    // Create mailto link with CC
    const mailtoLink = `mailto:${primaryEmail}?cc=${ccEmail}&subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message after a delay
    setTimeout(() => {
        showSuccessMessage(form);
        form.reset();
        submitButton.classList.remove('loading');
        submitButton.textContent = 'Submit Booking Request';
    }, 500);
}

// Show success message
function showSuccessMessage(form) {
    // Remove existing success message if any
    const existingMessage = form.querySelector('.form-success');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create success message
    const successMessage = document.createElement('div');
    successMessage.className = 'form-success show';
    successMessage.textContent = 'Thank you! Your booking request has been submitted. We\'ll contact you within 24 hours to confirm your appointment.';
    
    // Insert at the top of the form
    form.insertBefore(successMessage, form.firstChild);
    
    // Scroll to success message
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Remove message after 10 seconds
    setTimeout(() => {
        successMessage.classList.remove('show');
        setTimeout(() => {
            successMessage.remove();
        }, 300);
    }, 10000);
}

// Phone number formatting (optional enhancement)
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value.length <= 3) {
                    value = value;
                } else if (value.length <= 6) {
                    value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
                } else {
                    value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
                }
                e.target.value = value;
            }
        });
    }
});
