🔗 LinkedIn Lead Generation via Google API (n8n Workflow)
This project is an automated workflow built using n8n to extract LinkedIn profile links for lead generation using the Google Custom Search API. Instead of scraping LinkedIn directly (which violates their terms), this workflow uses Google Search to find publicly available LinkedIn profile pages.

🚀 What This Workflow Does
This n8n workflow performs the following automated steps:

Accepts a search keyword (e.g., Marketing Manager at Microsoft)

Sends a request to Google Custom Search API to get search results

Extracts public LinkedIn profile URLs from the search response

Appends those URLs and relevant data to a Google Sheet

Supports pagination to loop through multiple result pages automatically

🔧 Components Used in the Workflow
Below is a detailed explanation of each component shown in the image:

Component	Purpose
🔘 Trigger: "When clicking 'Execute workflow'"	Starts the workflow manually by clicking a button inside n8n. Useful for on-demand lead scraping.
✏️ Set Fields (Manual Input)	Allows you to manually set search parameters like job title, company, or location. This data will be passed to the Google Search API.
🌐 HTTP Request	Sends a GET request to Google Custom Search API using your search parameters to get Google results for public LinkedIn profiles.
🧩 Extract Results	Parses the JSON response from Google to extract only the relevant fields—typically the LinkedIn profile URLs, names, snippets, etc.
⏸ Wait	Adds a short delay (if needed) between requests to avoid hitting Google API limits too quickly (currently optional).
📄 Append row in Google Sheet	Takes the parsed data and appends it to a pre-created Google Sheet for recordkeeping or further analysis.
🔍 Pagination Check	Checks if there's a nextPage available in the Google response, indicating more profiles can be fetched.
➡️ IF Condition	If a next page exists, the workflow loops back to repeat the request for the next batch of search results. Otherwise, it stops.

💼 Use Cases
This workflow can be adapted to several lead generation and research use cases:

🧑‍💼 Sales Prospecting: Find potential leads based on job title, industry, or company.

🕵️‍♀️ Recruiter Sourcing: Discover LinkedIn profiles matching job roles you're hiring for.

📢 Influencer Outreach: Identify niche professionals for partnerships or content campaigns.

🎓 Academic Research: Locate experts or alumni from specific fields or universities.

⚙️ Setup Instructions
🔑 Requirements
An n8n Cloud account (or self-hosted)

A Google Custom Search API key

A Custom Search Engine (CSE ID) configured to search linkedin.com

A Google Sheet with proper headers created

A Google Service Account with access to append data to that sheet

📋 Google Sheet Format
Before running the workflow, create a Google Sheet with headers like:

mathematica
Copy
Edit
Name | LinkedIn URL | Snippet | Source Title | Position
Make sure this Sheet is accessible via the service account you’ve authorized in n8n.

🔌 Environment Variables / Secrets
Store your credentials in n8n securely:

GOOGLE_API_KEY

CSE_ID (Google Programmable Search Engine ID)

GOOGLE_SHEET_ID (The ID of the sheet where data will be appended)

💡 Notes
This workflow does not scrape LinkedIn directly, ensuring compliance with their terms of service.

You may still need to handle rate limits manually by inserting delays or batch processing.
