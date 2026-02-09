# CLIENT NAME Landing Page

A responsive landing page built for Unbounce with mobile and desktop support, featuring an IV hydration booking form.

## Files Included

- `index.html` - Main HTML structure
- `styles.css` - Responsive CSS styling
- `script.js` - Form handling and smooth scrolling functionality

## Setup Instructions for Unbounce

### 1. Upload Files to Unbounce

1. Log into your Unbounce account
2. Create a new landing page or open an existing one
3. Add a **Custom HTML** block
4. Copy and paste the contents of `index.html` into the HTML section
5. Add a **Custom CSS** block and paste the contents of `styles.css`
6. Add a **Custom JavaScript** block and paste the contents of `script.js`

### 2. Configure Email Addresses

**IMPORTANT:** You need to update the email addresses in `script.js`:

1. Open `script.js` in a text editor
2. Find these lines (around line 48-49):
   ```javascript
   const PRIMARY_EMAIL = 'your-primary-email@example.com'; // UPDATE THIS
   const CC_EMAIL = 'your-cc-email@example.com'; // UPDATE THIS
   ```
3. Replace with your actual email addresses:
   ```javascript
   const PRIMARY_EMAIL = 'bookings@clientname.com';
   const CC_EMAIL = 'admin@clientname.com';
   ```

### 3. Set Up Form Submission

You have two options for form submission:

#### Option A: Formspree (Recommended)

1. Sign up for a free account at [https://formspree.io](https://formspree.io)
2. Create a new form
3. Copy your Formspree form ID (it looks like: `xrgkjqyz`)
4. In `script.js`, find this line (around line 60):
   ```javascript
   const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORMSPREE_ID';
   ```
5. Replace `YOUR_FORMSPREE_ID` with your actual Formspree form ID:
   ```javascript
   const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xrgkjqyz';
   ```
6. In your Formspree form settings, set:
   - **To Email:** Your primary email address
   - **CC Email:** Your CC email address
   - **Subject:** "New IV Booking Request"

#### Option B: Unbounce Native Forms

If you prefer to use Unbounce's built-in form handler:

1. Replace the custom form in `index.html` with Unbounce's form builder
2. Configure the form in Unbounce's form settings to send emails to your addresses
3. You can remove the form submission JavaScript if using Unbounce forms

#### Option C: Mailto (Fallback)

The code includes a mailto fallback that will open the user's email client. This is less reliable but works without any external services.

### 4. Customize Content

Update the following placeholders in `index.html`:

- **Logo URLs:** Replace `https://via.placeholder.com/150x50?text=LOGO` with your actual logo URL
- **Phone Number:** Replace `PHONE` with your actual phone number (appears in multiple places)
- **Client Name:** Replace `CLIENT NAME` with your actual client name
- **Locations:** Update the location text in the pricing section
- **Pricing:** Update `$$$` with actual pricing
- **Drip Names/Descriptions:** Update the placeholder drip names and descriptions
- **Testimonials:** Replace placeholder testimonial content with real testimonials

### 5. Test the Form

1. Preview your Unbounce page
2. Fill out the booking form
3. Submit and verify that emails are received at both addresses
4. Test on mobile devices to ensure responsive design works correctly

## Features

- ✅ Fully responsive (mobile and desktop)
- ✅ Smooth scrolling navigation
- ✅ Form validation
- ✅ Email submission with CC functionality
- ✅ Modern, professional design
- ✅ All sections from wireframe included
- ✅ SEO-friendly structure

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Notes

- The form includes client-side validation
- Phone numbers are automatically formatted as (XXX) XXX-XXXX
- All anchor links smoothly scroll to their targets
- The header is sticky and remains visible while scrolling
- Form success messages appear after submission

## Support

If you need help customizing this landing page, refer to:
- [Unbounce Documentation](https://documentation.unbounce.com/)
- [Formspree Documentation](https://help.formspree.io/)
