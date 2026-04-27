// Google Sheets Integration Script
// IMPORTANT: Replace this URL with your Google Apps Script Web App URL
const GOOGLE_SHEETS_API_URL = 'https://script.google.com/macros/s/AKfycbzutgtSAijHgwvV_i7O_P7-GwEv3t45oN1Iokf2niseCdci9_uWDy-DKrSmJ5km_QZ7/exec';

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const statusDiv = document.getElementById('formStatus');
    
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Submitting...';
            submitBtn.disabled = true;
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                company: document.getElementById('company').value,
                service: document.getElementById('service').value,
                message: document.getElementById('message').value,
                timestamp: new Date().toISOString(),
                source: window.location.pathname
            };
            
            try {
                // Method 1: Using Google Apps Script (recommended)
                if (GOOGLE_SHEETS_API_URL !== 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
                    const response = await fetch(GOOGLE_SHEETS_API_URL, {
                        method: 'POST',
                        mode: 'no-cors',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData)
                    });
                    
                    showStatus('Thank you! We\'ll contact you within 24 hours.', 'success');
                    form.reset();
                } else {
                    // Method 2: Log to console and show demo message
                    console.log('Form Data (Demo Mode):', formData);
                    showStatus('Demo: Form submitted successfully! To connect to Google Sheets, follow the setup instructions below.', 'success');
                    form.reset();
                    showSetupInstructions();
                }
                
            } catch (error) {
                console.error('Error:', error);
                showStatus('An error occurred. Please email us directly at akhileshgurjar630@gmail.com', 'error');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
});

function showStatus(message, type) {
    const statusDiv = document.getElementById('formStatus');
    statusDiv.textContent = message;
    statusDiv.className = `form-status ${type}`;
    
    // Hide after 5 seconds
    setTimeout(() => {
        statusDiv.style.display = 'none';
        statusDiv.className = 'form-status';
    }, 5000);
}

function showSetupInstructions() {
    const instructions = `
        <div style="background: #f0f0f0; padding: 1rem; margin-top: 1rem; border-radius: 5px;">
            <strong>📧 To connect this form to Google Sheets:</strong><br>
            1. Create a new Google Sheet<br>
            2. Go to Extensions → Apps Script<br>
            3. Paste the Apps Script code (provided in the setup guide)<br>
            4. Deploy as Web App<br>
            5. Copy the URL and replace 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE' in contact-form.js<br>
            <br>
            <strong>Need help? Email: akhileshgurjar630@gmail.com</strong>
        </div>
    `;
    
    const formContainer = document.querySelector('.contact-form-container');
    const existing = document.querySelector('.setup-instructions');
    if (!existing) {
        const div = document.createElement('div');
        div.className = 'setup-instructions';
        div.innerHTML = instructions;
        formContainer.appendChild(div);
    }
}

// Google Apps Script code (copy this into your Google Apps Script editor):
/*
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      data.timestamp,
      data.name,
      data.email,
      data.phone,
      data.company,
      data.service,
      data.message,
      data.source
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput("Form submission endpoint is active");
}
*/