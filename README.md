# AMZ Contracting & Carpentry - Business Setup & Launch Blueprint

Welcome to the new professional website for **AMZ Contracting & Carpentry**. Below is your step-by-step launch manual to take the site live, claim your business on Google Maps, hook up your phone notifications, and link your custom domain.

---

## 1. Setting Up Google Maps & Appearing on Google
To get customers finding you organically in local searches (e.g. searching "carpentry near me" or "home improvements"), you need to set up a free **Google Business Profile**.

### Step-by-Step Google Maps Setup:
1. **Log In**: Visit [Google Business Profile](https://www.google.com/business/) and log in with your company's Gmail/Google account.
2. **Add Your Business Name**: Enter `AMZ Contracting & Carpentry`.
3. **Choose Categories**: Set your primary category to **"Contractor"** or **"Carpenter"** and add secondary categories (e.g., *Cabinet maker, Deck builder, Kitchen remodeler*).
4. **Physical Location vs. Service Area**:
   * **If you have a workshop** clients can visit, choose **Yes** to add a physical address (enter your exact office/shop street address).
   * **If you work at clients' homes** (mobile service) and don't want people coming to your house/shop, choose **No** and set your **Service Area** by typing in your service cities or zip codes.
5. **Add Contact Details**: Enter your business phone number and your website URL (e.g., `https://www.amzcarpentry.com`).
6. **Request Verification (Important)**:
   * Google will verify your physical location before publishing it to Google Maps.
   * Typically, Google will mail a physical postcard containing a 5-digit verification code to your address (takes 5-14 business days).
   * When it arrives in the mail, log back into the Google Business Profile dashboard, type in the code, and click **Verify**.
7. **Optimize for Leads**:
   * Upload photos from your `AMZ Carpentry` gallery showing framing, custom cabinets, and finished decks.
   * Add your business hours.
   * Ask satisfied clients to leave reviews on your Google pin.

---

## 2. Registering Your Domain Name
Your domain name is your brand's digital address (e.g., `amzcarpentry.com` or `amzcontracting.com`).

1. **Pick a Domain Registrar**: We recommend:
   * **Namecheap** (Simple interface, free WHOIS privacy).
   * **Squarespace Domains** (Very premium dashboard).
   * **Hover** (Clean, minimalist).
2. **Search and Purchase**:
   * Search for `amzcarpentry.com` or `amzcontracting.com`. 
   * A standard `.com` domain typically costs around $10 to $18/year.
   * Ensure that **WHOIS Privacy Protection** is enabled (it's free on Namecheap/Hover) to prevent spammers from accessing your phone number.

---

## 3. Deploying Your Website Online (Free Static Hosting)
Because this website is a high-performance static page, it is extremely fast and costs **$0/month** to host on professional cloud services like **Netlify** or **Vercel**.

### Step-by-Step Netlify Launch:
1. **Sign Up**: Create a free account at [Netlify](https://www.netlify.com/).
2. **Drag & Drop Upload**:
   * Go to the **Sites** tab in your Netlify dashboard.
   * Drag your entire `amz-carpentry` folder from your computer and drop it into the upload box on Netlify.
   * Within 5 seconds, your site is built and live at a temporary URL (like `https://stellar-sawblade-1234.netlify.app`).
3. **Link Your Domain**:
   * On Netlify, click **Add Custom Domain** and enter the domain you purchased (e.g., `amzcarpentry.com`).
   * Netlify will generate 4 custom Nameserver lines.
4. **Update Nameservers**:
   * Go to your domain registrar (e.g., Namecheap), open your domain settings, and change Nameservers from **"Default DNS"** to **"Custom DNS"**.
   * Paste the 4 Nameservers provided by Netlify and click Save.
   * It takes between 2 and 24 hours for the domain to update globally. Netlify will automatically assign a secure padlock (`https://`) to your site for free.

---

## 4. Activating Mobile Email Notifications for Leads
To receive contact form inquiries as emails on your phone instantly:

1. **Sign up at Web3Forms**: Go to [Web3Forms](https://web3forms.com/) and sign up for a free access key (free tier includes 250 lead submissions per month).
2. **Retrieve Key**: Enter your business email, and Web3Forms will instantly email you a unique Access Key.
3. **Insert the Access Key**:
   * Open the file `index.html` in a text editor.
   * Find line 279:
     `<input type="hidden" name="access_key" id="web3forms-key" value="YOUR_WEB3FORMS_ACCESS_KEY_HERE">`
   * Replace `YOUR_WEB3FORMS_ACCESS_KEY_HERE` with your actual Access Key.
4. **Save and Update**:
   * Save the file and re-upload the folder to Netlify (or push via Git). Now, every time a customer submits a project inquiry, it sends an email straight to your phone!

---

## 5. Navigating the Built-In Admin leads Panel
To review leads and edit details:
* Go to the secret URL: `https://www.yourdomain.com/#admin` (or click **Admin Leads Portal** in the website footer).
* Enter the passcode: `1234`.
* Use the **Website Content Editor** to change phone, address, email, or main hero headlines without touching any code. Changes save instantly!
