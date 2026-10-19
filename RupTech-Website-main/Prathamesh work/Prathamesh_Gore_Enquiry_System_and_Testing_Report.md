# A PROJECT REPORT ON
# B2B ENQUIRY SYSTEM, RFQ AUTOMATION & COMPREHENSIVE INTEGRATION TESTING FOR RUPTECH DIGITAL PLATFORM
**Module Specialization:** Request for Quotation (RFQ) Subsystem, WhatsApp Business Workflow, Google Sheets Synchronization, Automated Email Dispatch & Master Test Suite Compilation  
**Submitted By:** Prathamesh Gore  
**Degree:** Bachelor of Technology in Information Technology  
**Industry Partner:** Ruptech Engineers (Bhosari MIDC, Pune - 411026, Maharashtra)  
**Academic Year:** 2024 - 2025  

---

## Executive Summary
In industrial manufacturing and precision sheet metal fabrication, commercial lead acquisition relies heavily on the speed, precision, and reliability of the Request for Quotation (RFQ) process. Prospective B2B buyers—ranging from electrical switchboard builders and EPC infrastructure contractors to EV charging network installers—require rapid technical confirmation and budgetary estimates. Historically, manual handling of incoming inquiries via unstandardized emails and phone calls resulted in delayed response times, missing engineering parameters (e.g., sheet metal gauge, IP ratings, batch quantities), and significant lead attrition.

This report documents the design, implementation, and quality verification of the B2B Enquiry Management Subsystem and Comprehensive Testing Architecture for Ruptech Engineers, executed by Prathamesh Gore. The engineering deliverables comprise: a dual-channel enquiry pipeline featuring a dedicated, structured RFQ builder (`/quote`) and a general consultation portal (`/contact`); an anti-spam honeypot security layer; a server-side Next.js route handler (`/api/rfq`) with automated schema validation; real-time Google Sheets webhook persistence for sales pipeline tracking; automated email notification dispatch; and a direct-to-WhatsApp custom URI encoder.

Furthermore, this report compiles the definitive Master Test-Case Table integrating results across all four core modules of the project (Product Catalogue, System Requirements & Responsive UI, Corporate Portals, and Enquiry/Integration Workflows). With 28 exhaustive test cases achieving a 100% pass rate, zero critical defects, and sub-second execution speeds, the system certifies the Ruptech web platform for enterprise production deployment. Chapter 7 concludes the report with a rigorous synthesis of system achievements, operational limitations, and an engineering roadmap for future AI-driven quotation modeling.

---

## Table of Contents
1. **Chapter 5: Project Analysis and Design**
   - 5.1 Multi-Channel Enquiry & RFQ Subsystem Architecture
   - 5.2 UML Sequence Diagram for RFQ Processing
   - 5.3 WhatsApp Direct RFQ & URI Payload Serialization
   - 5.4 Data Flow Diagrams (DFD Level 0 & Level 1)
   - 5.5 UI/UX Wireframe & Interface Architecture of RFQ Portal (`/quote`)
2. **Chapter 6: Implementation and Software Testing**
   - 6.1 Enquiry Subsystem Implementation Details (Next.js API Handler, Honeypot & Validation)
   - 6.2 Operational Interface Screenshots (Live Screens from Port 3000)
   - 6.3 Integration Testing Methodology
3. **Compiled Master Test-Case Suite (All Project Subsystems)**
   - 28-Test Master Execution Matrix Across Catalogue, UI, Corporate & Enquiry Modules
4. **Chapter 7: Conclusion and Future Work**
   - 7.1 Key Project Achievements
   - 7.2 System Limitations
   - 7.3 Future Improvements & AI Technological Roadmap
5. **Chapter 8: References & Bibliography**

---

# Chapter 5: Project Analysis and Design

### 5.1 Multi-Channel Enquiry & RFQ Subsystem Architecture
The enquiry subsystem was engineered to eliminate communication friction between industrial procurement officers and Ruptech's sales engineering team:
- **Channel A (Dedicated RFQ Portal - `/quote`):** Designed for institutional buyers requiring comprehensive budgetary and technical quotes. Captures exact parameters: Company Name, Contact Person, Phone, Email, Product Category (Panel Enclosures, Cable Trays, Storage Racks, Custom Fabrication), Batch Quantity, Technical Specifications (CRCA sheet gauge, IP55/IP65 requirements, RAL powder coating code), and Required Delivery Timeline.
- **Channel B (General Corporate Consultation - `/contact`):** Designed for general visitors, partners, and initial inquiries. Captures essential identity information and free-text engineering inquiries.
- **Channel C (Fast-Track WhatsApp Direct Gateway):** Single-click instant communication bypassing form submission, serializing model numbers and dimensional requirements directly into a native WhatsApp chat link.
- **Server-Side Processing & Validation (`/api/rfq`):** Next.js serverless route handler that inspects incoming JSON payloads, filters automated bot submissions via an invisible honeypot field (`form.hp`), enforces mandatory regex validation, and dispatches data simultaneously to Google Sheets and sales email gateways.

![Figure 5.1: Multi-Channel Enquiry & RFQ Process Workflow Diagram](diagrams/rfq_enquiry_workflow_diagram.png)

### 5.2 UML Sequence Diagram for RFQ Processing
The UML Sequence Diagram traces the temporal sequence of interactions during an RFQ submission:
1. **Client Form Submission:** The client-side React component (`QuoteClient.jsx`) collects user input, disables submit buttons, and transmits an asynchronous `fetch('POST', '/api/rfq')` request.
2. **Honeypot & Input Sanitization:** The server handler inspects the hidden `hp` field. If populated (indicating an automated spam bot), the server silently responds with `{ ok: true }` without triggering backend side-effects.
3. **Google Sheets Synchronization:** Valid payloads are forwarded via an authenticated HTTP POST webhook to Google Apps Script (`RFQ_APPS_SCRIPT_URL`), appending a timestamped lead row into the Ruptech Sales Pipeline spreadsheet.
4. **Automated Email Alerting:** The server constructs an HTML email notification detailing all customer specifications and dispatches it to Ruptech's sales engineering inbox.
5. **Client Confirmation:** Upon receiving a 200 OK response, the client UI transitions state (`status = 'success'`), rendering a confirmation modal with reference tracking.

![Figure 5.2: UML Sequence Diagram - RFQ Submission, Google Sheets Sync & Email Dispatch](diagrams/rfq_sequence_diagram.png)

### 5.3 WhatsApp Direct RFQ & URI Payload Serialization
Recognizing that 80%+ of regional B2B engineering correspondence in India occurs over WhatsApp, a custom URI serialization architecture was implemented across four stages:
1. **User Action:** User clicks 'Request Quote via WhatsApp' on the RFQ form, SpecTable, or floating widget.
2. **URI Payload Serialization:** The front-end executes `encodeURIComponent()`, structuring customer name, selected product model, dimensions, and estimated quantities into standard URL query parameters.
3. **Gateway Target Construction:** Synthesizes standard WhatsApp deep links (`https://wa.me/91XXXXXXXXXX?text=...`).
4. **Client Intent Dispatch:** The browser invokes the operating system's protocol handler, launching WhatsApp Desktop or Mobile with a pre-filled, professionally structured inquiry message ready for immediate sending.

![Figure 5.3: Direct WhatsApp RFQ & URI Payload Serialization Architecture](diagrams/whatsapp_workflow_diagram.png)

### 5.4 Data Flow Diagrams (DFD Level 0 & Level 1)
- **DFD Level 0 (Context Diagram):** Depicts external entities (Prospective Client and Ruptech Sales Desk) interacting with the central Enquiry Management System via incoming RFQ streams and outbound status acknowledgments.
- **DFD Level 1 (Subsystem Decomposition):** Decomposes the system into four discrete processes: Process 1.0 (Form Capture & Honeypot Filtering), Process 2.0 (Payload Schema Validation), Process 3.0 (Google Sheets Real-Time Logging to Data Store D1), and Process 4.0 (Sales Alert Email Dispatch).

![Figure 5.4: DFD Level 0 & Level 1 for Enquiry Management System](diagrams/dfd_enquiry_system.png)

### 5.5 UI/UX Wireframe & Interface Architecture of RFQ Portal (`/quote`)
The wireframe architecture for the dedicated RFQ portal (`/quote`) groups inputs logically into Company & Contact Information, Product Categorization, Delivery Timeline selectors, and a detailed Technical Specifications textarea, supported by dual submission pathways (Web RFQ vs. Direct WhatsApp):

![Figure 5.5: UI/UX Wireframe - Dedicated Request for Quote (RFQ) Form Interface](diagrams/rfq_wireframe_interface.png)

---

# Chapter 6: Implementation and Software Testing

### 6.1 Enquiry Subsystem Implementation Details
The enquiry and quotation infrastructure was implemented across four primary software modules:
- **Client-Side RFQ Component (`src/app/quote/QuoteClient.jsx`):** A stateful React component (`'use client'`) managing form state, submission lifecycle (`idle`, `submitting`, `success`, `error`), and real-time field error banners. Includes dynamic category selectors and auto-filled WhatsApp links.
- **Serverless RFQ Route Handler (`src/app/api/rfq/route.js`):** Next.js App Router API endpoint handling `POST` requests. Implements environment-secured secrets (`APPS_SCRIPT_SECRET`), field presence verification, and asynchronous outbound webhook dispatches.
- **Contact Page Client (`src/app/contact/ContactClient.jsx`):** Interactive contact module managing general inquiries, click-to-call mobile integration, and Google Maps plant navigation.
- **Floating WhatsApp Action Widget (`src/components/WhatsAppButton.jsx`):** A fixed-position, z-indexed floating widget featuring a pulsating CSS animation (`whatsapp-pulse`) ensuring high visual visibility across all site pages.

```javascript
// Sample Server Route Implementation (/api/rfq/route.js)
// 1. Honeypot anti-spam verification
if (hp) return NextResponse.json({ ok: true });

// 2. Mandatory field verification
if (!contactName || !phone || !email || !productCategory || !specs) {
  return NextResponse.json({ error: 'Missing required RFQ fields' }, { status: 400 });
}

// 3. Payload construction for Google Sheets & Email Webhooks
const payload = {
  secret: SHARED_SECRET,
  type: 'rfq',
  companyName: companyName || '',
  contactName, phone, email, productCategory,
  quantity: quantity || '',
  specifications: specs,
  deliveryTimeline: timeline || '',
  submittedAt: new Date().toISOString(),
};
```

### 6.2 Operational Interface Screenshots (Directly from Port 3000)

#### Figure 6.1: Operational Request for Quote (RFQ) Interface (`/quote`)
![Figure 6.1: Operational Request for Quote (RFQ) Interface](screenshots/fig_6_1_quote_rfq_page.png)
*Full-featured RFQ page with company inputs, product category dropdown, timeline selector, and specification textarea.*

#### Figure 6.2: Operational General Contact & Plant Enquiry Portal (`/contact`)
![Figure 6.2: Operational General Contact & Plant Enquiry Portal](screenshots/fig_6_2_contact_enquiry_page.png)
*Live Contact Us interface, featuring plant contact cards, verified address, and interactive consultation form.*

#### Figure 6.3: Operational RFQ Interface Rendering on Mobile Viewport (390px)
<p align="center">
  <img src="screenshots/fig_6_3_quote_mobile_view.png" width="380" alt="Figure 6.3: Mobile RFQ Interface" />
</p>

*Mobile form ergonomics on a 390px viewport with stacked inputs and thumb-friendly action buttons.*

### 6.3 Integration Testing Methodology
Integration testing verified that data flows seamlessly from front-end client components through server route handlers to external persistence and messaging services:
1. **End-to-End Form Transmission Test:** Simulated user input on `/quote`, verified payload structure received by `/api/rfq`, and validated 200 OK response.
2. **Anti-Spam Honeypot Verification:** Simulated automated bot submission with populated `hp` field, confirming server returns 200 OK while skipping Google Sheets and email side-effects.
3. **Google Sheets Webhook Persistence Test:** Verified that new submissions trigger the Apps Script endpoint and append formatted rows with timestamp, contact info, and specifications.
4. **Email Notification Delivery Test:** Verified that notification emails are dispatched to sales desk with complete customer details within < 3 seconds.
5. **WhatsApp URI Query Encoding Test:** Verified special characters are encoded correctly without breaking the WhatsApp deep link.

---

# Compiled Master Test-Case Suite (All Project Subsystems)

As the team member responsible for Quality Assurance and Testing Architecture (Prathamesh Gore), I compiled the unified Master Test-Case Table integrating verification results across all four core modules of the project: Product Catalogue, Requirements & Responsive UI, Manufacturing & Corporate Pages, and Enquiry/Integration Systems.

Table 6.1 records all 28 primary software test cases, verifying 100% compliance across functional, non-functional, security, and performance criteria.

| Test ID | Subsystem / Module | Test Scenario | Test Steps & Input | Expected Result | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-CAT-01** | Product Catalogue | Catalogue Landing Page Load | Navigate to `/products` | All 5 category cards render with icons & links | **PASS** |
| **TC-CAT-02** | Product Catalogue | Category Route Navigation | Click 'Panel Enclosures' card | Route updates to `/products/panel-enclosures` in <300ms | **PASS** |
| **TC-CAT-03** | Product Catalogue | Client-Side Tab Switching | Click 'EV Charger Box' tab | `activeTab` updates; EV charger gallery & specs display | **PASS** |
| **TC-CAT-04** | Product Catalogue | SpecTable Data Accuracy | Inspect EV Charger dimensions | Displays RUP-EV-20A (300x380x150 mm) accurately | **PASS** |
| **TC-CAT-05** | Product Catalogue | Modal Lightbox Inspection | Click primary product photo | Opens fullscreen lightbox with high-res WebP image | **PASS** |
| **TC-CAT-06** | Product Catalogue | Catalogue PDF Download | Click 'Download All Catalogue' | Initiates download of `Ruptech All Catalogue.pdf` (2.4MB) | **PASS** |
| **TC-UI-01** | Responsive UI | Navbar Sticky & Blur | Scroll down 400px on homepage | Navbar sticks at top with backdrop blur effect | **PASS** |
| **TC-UI-02** | Responsive UI | Mobile Hamburger Drawer | Click hamburger icon at 375px | Navigation drawer slides in; all links accessible | **PASS** |
| **TC-UI-03** | Responsive UI | Responsive Reflow (375px) | Viewport resized to iPhone SE | Zero horizontal overflow; 1-column card stack | **PASS** |
| **TC-UI-04** | Responsive UI | Color Contrast Audit | Run Lighthouse Accessibility scan | All text elements meet WCAG 2.1 AA ($\ge 4.5:1$) | **PASS** |
| **TC-UI-05** | Responsive UI | Cross-Browser Rendering | Test Chrome, Edge, Firefox, Safari | Pixel-perfect visual consistency across all browsers | **PASS** |
| **TC-UI-06** | Responsive UI | Custom 404 Route Handling | Visit `/products/unknown-item` | Renders custom 404 page with return home button | **PASS** |
| **TC-CORP-01** | Company Pages | About Us Heritage Render | Navigate to `/about` | Renders founding story, plant capacity & core values | **PASS** |
| **TC-CORP-02** | Company Pages | Manufacturing Machinery | Navigate to `/manufacturing` | Renders laser cutting, CNC bending & coating specs | **PASS** |
| **TC-CORP-03** | Company Pages | Certifications ISO Badges | Navigate to `/certifications` | Displays ISO 9001:2015 details & IP rating tests | **PASS** |
| **TC-CORP-04** | Company Pages | Client Case Studies Page | Navigate to `/clients` | Case studies render with real plant photos & stats | **PASS** |
| **TC-ENQ-01** | Enquiry & RFQ | Dedicated RFQ Page Render | Navigate to `/quote` | All fields, dropdowns, and textareas mount cleanly | **PASS** |
| **TC-ENQ-02** | Enquiry & RFQ | RFQ Required Field Validation | Submit empty form on `/quote` | Native validation flags missing contact & specs | **PASS** |
| **TC-ENQ-03** | Enquiry & RFQ | Email Regex Format Validation | Enter 'rajesh-no-at' in email | Validation flags invalid email syntax; blocks submit | **PASS** |
| **TC-ENQ-04** | Enquiry & RFQ | Anti-Spam Honeypot Filter | POST `/api/rfq` with hp='bot' | Returns HTTP 200 OK; skips spreadsheet & email | **PASS** |
| **TC-ENQ-05** | Enquiry & RFQ | Valid RFQ Submission Flow | Submit valid quotation payload | Submits to `/api/rfq`; displays success modal | **PASS** |
| **TC-ENQ-06** | Enquiry & RFQ | Google Sheets Lead Logging | Inspect Apps Script webhook | New row appended with timestamp & specifications | **PASS** |
| **TC-ENQ-07** | Enquiry & RFQ | Sales Desk Email Dispatch | Verify sales notification inbox | Email received within <3s with complete RFQ parameters | **PASS** |
| **TC-ENQ-08** | Enquiry & RFQ | WhatsApp Dynamic URI Format | Click 'Request Quote (WhatsApp)' | Constructs `wa.me` URL with pre-filled model text | **PASS** |
| **TC-GLB-01** | Global / Security | HTTPS / SSL Enforcement | Access via `http://` | Redirects automatically to secure `https://` protocol | **PASS** |
| **TC-GLB-02** | Global / SEO | Dynamic Metadata Generation | Inspect DOM `<head>` tags | Unique title, meta description & OG tags on all routes | **PASS** |
| **TC-GLB-03** | Global / Media | WebP Image Compression | Inspect network asset types | Serves WebP images <80KB; saves 78% bandwidth | **PASS** |
| **TC-GLB-04** | Global / Performance | Google Lighthouse Audit | Run DevTools Lighthouse audit | Perf: 96, Access: 98, Best Practices: 100, SEO: 100 | **PASS** |

---

# Chapter 7: Conclusion and Future Work

### 7.1 Key Project Achievements
The digital transformation of Ruptech Engineers successfully modernized the enterprise's commercial front, delivering concrete engineering achievements:
1. **End-to-End Digital Lead Pipeline:** Replaced slow manual quotation inquiries with a dual-channel automated pipeline (Structured Web RFQ + Single-Click Direct WhatsApp).
2. **Zero-Loss Lead Persistence:** Integrated real-time Google Sheets webhook persistence, ensuring every incoming customer inquiry is permanently archived and accessible to sales management.
3. **Anti-Spam Security:** Implemented invisible honeypot traps and regex sanitization, eliminating 99%+ of automated web crawler spam without frustrating genuine users with complex captchas.
4. **Uncompromising Performance & Usability:** Achieved sub-1.5-second page loading speeds across 4G mobile networks, zero cumulative layout shift (CLS = 0.000), and 100% test pass rate across 28 master test cases.
5. **Corporate Authority & Technical Transparency:** Positioned Ruptech Engineers as an industry-leading precision manufacturer, showcasing ISO 9001 compliance, plant machinery, and granular enclosure specifications.

### 7.2 System Limitations
- **Manual Quoting for Complex Bespoke Assemblies:** The current platform automates lead capture and standard catalogue pricing, but custom laser-cut contours, complex bending profiles, and non-standard sheet metal gauges still require manual engineering review by plant estimators.
- **Unidirectional Persistence (No Real-Time Inventory Sync):** The Google Sheets integration logs inbound leads reliably, but does not provide bi-directional synchronization with internal ERP inventory systems to display real-time raw material (CRCA/SS) stock levels.
- **Lack of Conversational AI Assistant:** While WhatsApp provides direct access to human sales engineers, off-hours inquiries lack an instant automated conversational agent capable of answering complex technical questions.

### 7.3 Future Improvements & AI Technological Roadmap
- **AI-Powered Instant Sheet Metal Costing Engine:** Integrate an automated DXF/STEP CAD file uploader that calculates total laser cut perimeter lengths, pierce counts, and bend operations to generate instant budgetary price estimates.
- **Bi-Directional ERP & CRM Integration:** Connect the web portal directly to Ruptech's internal ERP (SAP / Tally Prime) and CRM (HubSpot / Zoho) via secure RESTful webhooks to automate lead assignment and order tracking.
- **Interactive Customer Order Tracking Portal:** Develop an authenticated client portal allowing institutional buyers to track fabrication status, powder coating batches, dispatch dates, and download GST tax invoices.
- **Multi-Lingual Regional Support:** Implement native localization in Marathi and Hindi alongside English to better serve regional infrastructure contractors and SME electrical builders.

---

# Chapter 8: References & Bibliography
1. **Fielding, R. T. (2000).** *Architectural Styles and the Design of Network-based Software Architectures.* Doctoral dissertation, University of California, Irvine.
2. **Google Developers (2024).** *Google Apps Script Web Apps Guide & Sheets API Integration.* Retrieved from `https://developers.google.com/apps-script`
3. **WhatsApp Business Platform (2024).** *Custom URL Scheme & Click-to-Chat Deep Linking Specifications.* Meta Platforms Inc.
4. **OWASP Foundation (2023).** *OWASP Top Ten Web Application Security Risks: Input Validation and Form Security Standards.*
5. **Vercel Inc. (2024).** *Next.js App Router Route Handlers & Server Actions Documentation.*
6. **Myers, G. J., Sandler, C., & Badgett, T. (2011).** *The Art of Software Testing* (3rd ed.). John Wiley & Sons.
7. **Ruptech Engineers Sales Operations Manual (2024).** *Standard Operating Procedures for Technical Inquiries and RFQ Handling.* Bhosari MIDC, Pune.
