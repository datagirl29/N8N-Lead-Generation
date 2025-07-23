# 🔗 LinkedIn Lead Generation via Google API (n8n Workflow)

This project is an automated workflow built using [n8n](https://n8n.io/) to extract LinkedIn profile links for lead generation using the **Google Custom Search API**.  
Instead of scraping LinkedIn directly (which violates their terms), this workflow uses Google Search to find publicly available LinkedIn profile pages.
<img width="2968" height="692" alt="image" src="https://github.com/user-attachments/assets/4416bb59-1308-4461-9b27-35e541a57fab" />

---

## 🚀 What This Workflow Does

This **n8n workflow** performs the following automated steps:

1. Accepts a search keyword (e.g., `Marketing Manager at Microsoft`)
2. Sends a request to Google Custom Search API to get search results
3. Extracts public LinkedIn profile URLs from the search response
4. Appends those URLs and relevant data to a **Google Sheet**
5. Supports pagination to loop through multiple result pages automatically

---

## 🧩 Components Used in the Workflow

Below is a detailed explanation of each component used in the n8n flow:

| Component                          | Purpose |
|-----------------------------------|---------|
| **🔘 Trigger: `Execute Workflow`** | Starts the workflow manually by clicking a button inside n8n. Useful for on-demand lead scraping. |
| **✏️ Set Fields (Manual Input)**   | Allows you to manually set search parameters like job title, company, or location. |
| **🌐 HTTP Request**                | Sends a **GET request** to Google Custom Search API using your search parameters to get public LinkedIn profiles. |
| **🧩 Extract Results**             | Parses the JSON response to extract relevant fields such as profile links and descriptions. |
| **⏸ Wait**                        | Optional delay to prevent hitting API rate limits (can be customized). |
| **📄 Append Row in Sheet**        | Appends parsed results to your connected Google Sheet. |
| **🔍 Pagination Check**           | Detects if additional pages of results are available via `nextPageToken`. |
| **➡️ IF Condition**               | If more pages are found, the workflow loops back to continue fetching. Otherwise, it stops. |

---

## 💼 Use Cases

This workflow is ideal for:

- 🧑‍💼 **Sales Prospecting** – Generate leads by role, industry, or company
- 🕵️‍♀️ **Recruiter Sourcing** – Discover candidates for hiring
- 📢 **Influencer Outreach** – Identify professionals for collaborations
- 🎓 **Academic Research** – Find experts or alumni from specific universities

---

## ⚙️ Setup Instructions

### ✅ Requirements

- [x] An **n8n Cloud** account (or self-hosted instance)
- [x] A **Google Custom Search API** key
- [x] A **Custom Search Engine ID (CSE ID)** configured to search `linkedin.com`
- [x] A **Google Sheet** with column headers
- [x] A **Google Service Account** connected in n8n for Google Sheets access

---

### 📋 Google Sheet Format

Create a Google Sheet with column headers like:

Name | LinkedIn URL | Snippet | Source Title | Position


Make sure this sheet is shared with the service account email used in n8n.

---

### 🔐 Secrets / API Keys in n8n

Use the `Credentials` feature in n8n to securely store:

- `GOOGLE_API_KEY`
- `CSE_ID` (Programmable Search Engine ID)
- `GOOGLE_SHEET_ID` (Google Sheet ID)

---

## 📁 Workflow Export

You can import the workflow into your own n8n environment using the `.json` export file.  
> *(Upload the `.json` in this repo or link it here)*

---

## ⚠️ Notes

- This workflow uses Google to find public LinkedIn profiles — it **does not** scrape LinkedIn directly.
- Add a short delay (via the `Wait` node) to avoid hitting Google API limits during high-volume runs.

---

## ✨ Potential Enhancements

- Integrate email finders (e.g., Hunter, Clearbit)
- Add lead scoring or filtering logic
- Sync leads to a CRM (HubSpot, Salesforce, etc.)
- Trigger from a Google Sheet or webhook

---

## 🙋 About the Author

Made by **Moksha Shah**  


---

