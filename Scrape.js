{
  "name": "Linkedin Lead Generation",
  "nodes": [
    {
      "parameters": {},
      "type": "n8n-nodes-base.manualTrigger",
      "typeVersion": 1,
      "position": [
        0,
        0
      ],
      "id": "ce750481-651c-4dd4-9fc8-7587040fb71d",
      "name": "When clicking ‘Execute workflow’"
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "3acebd66-8048-47fe-b886-50f48e0a1aed",
              "name": "CurrentStartIndex",
              "value": 1,
              "type": "number"
            },
            {
              "id": "d54d09ca-bd8a-4997-80bb-34a54d567dee",
              "name": "maxPages",
              "value": 5,
              "type": "number"
            }
          ]
        },
        "options": {}
      },
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        220,
        0
      ],
      "id": "355089c5-ab08-4488-bd12-c89cf69f9959",
      "name": "Set Fields"
    },
    {
      "parameters": {
        "url": "https://www.googleapis.com/customsearch",
        "sendQuery": true,
        "queryParameters": {
          "parameters": [
            {
              "name": "key",
              "value": "Insert your Key here"
            },
            {
              "name": "cx",
              "value": "137ff2d294e18482a"
            },
            {
              "name": "q",
              "value": "Data Scientist California:linkedin.com/in"
            },
            {
              "name": "start",
              "value": "={{ $runIndex == 0 \n    ? $node[\"Set Fields\"].json.CurrentStartIndex \n    : $node[\"Pagination Check\"].json.startIndex \n}}\n"
            }
          ]
        },
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            {}
          ]
        },
        "options": {}
      },
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        440,
        0
      ],
      "id": "3315ef6c-ee78-4686-bde4-89911eb4bfff",
      "name": "HTTP Request"
    },
    {
      "parameters": {},
      "type": "n8n-nodes-base.wait",
      "typeVersion": 1.1,
      "position": [
        880,
        0
      ],
      "id": "b107ff2c-058c-4ce3-9ee0-b567bc4a4d18",
      "name": "Wait",
      "webhookId": "6e15c069-43d6-4f48-9cbc-24d9627e9a8d"
    },
    {
      "parameters": {
        "jsCode": "// Get the response data\nconst response = $input.first().json;\nconst items = response.items || [];\n\n// Track pagination info\nlet nextStartIndex = 1;\nif (response.queries && response.queries.nextPage && response.queries.nextPage[0]) {\n  nextStartIndex = response.queries.nextPage[0].startIndex;\n}\n\n// Calculate if we should continue (Google only allows up to 100 results)\nconst hasMoreResults = nextStartIndex <= 100;\n\n// Process the items and include pagination info in each item\nconst results = items.map(item => {\n  const titleParts = item.title.split(\" - \");\n  return {\n    name: titleParts[0] || null,\n    title: titleParts.slice(1).join(\" - \") || null,\n    link: item.link || null,\n    snippet: item.snippet || null,\n    image: item.pagemap?.cse_thumbnail?.[0]?.src || null,\n    // Add pagination info to each item\n    startIndex: nextStartIndex,\n    hasMoreResults: hasMoreResults\n  };\n});\n\n// If there are no results, return at least one item with pagination info\nif (results.length === 0) {\n  return [{\n    json: {\n      name: null,\n      title: null,\n      link: null,\n      snippet: null,\n      image: null,\n      followers: null,\n      startIndex: nextStartIndex,\n      hasMoreResults: false\n    }\n  }];\n}\n\n// Return the processed results\nreturn results.map(r => ({ json: r }));\n"
      },
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [
        660,
        0
      ],
      "id": "31781ba9-8771-448d-beb1-783563886000",
      "name": "Extract Results"
    },
    {
      "parameters": {
        "conditions": {
          "options": {
            "caseSensitive": true,
            "leftValue": "",
            "typeValidation": "strict",
            "version": 2
          },
          "conditions": [
            {
              "id": "4278b833-e8fe-4e32-8cd3-68f436da53eb",
              "leftValue": "={{ $json.continueLoop }}",
              "rightValue": true,
              "operator": {
                "type": "boolean",
                "operation": "equals"
              }
            }
          ],
          "combinator": "and"
        },
        "options": {}
      },
      "type": "n8n-nodes-base.if",
      "typeVersion": 2.2,
      "position": [
        1540,
        0
      ],
      "id": "cf4e8e99-13d5-4f64-a026-ff87d653a8a3",
      "name": "If"
    },
    {
      "parameters": {
        "operation": "append",
        "documentId": {
          "__rl": true,
          "value": "1qsje34P4KmeKfJwTcPQRoK9fp6lDkuh5uOxYXNq43EA",
          "mode": "list",
          "cachedResultName": "Linkedin Outreach",
          "cachedResultUrl": "add google spreadsheet URL"
        },
        "sheetName": {
          "__rl": true,
          "value": 2109490717,
          "mode": "list",
          "cachedResultName": "Nutritionist ",
          "cachedResultUrl": "add google spreadsheet URL"
        },
        "columns": {
          "mappingMode": "defineBelow",
          "value": {
            "Name ": "={{ $json.name }}",
            "Title": "={{ $json.title }}",
            "Link": "={{ $json.link }}",
            "Snippet": "={{ $json.snippet }}",
            "Index": "={{ $json.startIndex }}",
            "Result": "={{ $json.hasMoreResults }}"
          },
          "matchingColumns": [],
          "schema": [
            {
              "id": "Name ",
              "displayName": "Name ",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "Title",
              "displayName": "Title",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "Snippet",
              "displayName": "Snippet",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "Link",
              "displayName": "Link",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "Index",
              "displayName": "Index",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "Result",
              "displayName": "Result",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            }
          ],
          "attemptToConvertTypes": false,
          "convertFieldsToString": false
        },
        "options": {}
      },
      "type": "n8n-nodes-base.googleSheets",
      "typeVersion": 4.6,
      "position": [
        1100,
        0
      ],
      "id": "a9507d17-7c28-49d1-a00f-3f3b5af25f2a",
      "name": "Append row in sheet",
      "credentials": {
        "add google sheet Api": {
          "id": "XXXXXXXXXXXXXXXX",
          "name": "add Google Sheets name"
        }
      }
    },
    {
      "parameters": {
        "jsCode": "// Get all input items\nconst inputItems = $input.all();\nconsole.log(\"Input items count:\", inputItems.length);\n\n// Extract pagination values with fallbacks\nlet nextStartIndex = 1;\nlet hasMoreResults = false;\n\n// Try different approaches to find the pagination info\nif (inputItems && inputItems.length > 0) {\n  const firstItem = inputItems[0];\n\n  if (firstItem.json) {\n    console.log(\"First item JSON:\", JSON.stringify(firstItem.json));\n\n    // Match exact field names: \"Index\" and \"Result\"\n    if (firstItem.json.Index !== undefined) {\n      nextStartIndex = firstItem.json.Index;\n      console.log(\"Found Index:\", nextStartIndex);\n    }\n\n    if (firstItem.json.Result !== undefined) {\n      hasMoreResults = firstItem.json.Result;\n      console.log(\"Found Result:\", hasMoreResults);\n    }\n  }\n}\n\n// Return pagination control info\nreturn {\n  json: {\n    continueLoop: hasMoreResults,\n    startIndex: nextStartIndex\n  }\n};\n"
      },
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [
        1320,
        0
      ],
      "id": "24a8cdac-a9c4-434e-9f9a-8f4800906c5a",
      "name": "Pagination Check"
    }
  ],
  "pinData": {},
  "connections": {
    "When clicking ‘Execute workflow’": {
      "main": [
        [
          {
            "node": "Set Fields",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Set Fields": {
      "main": [
        [
          {
            "node": "HTTP Request",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "HTTP Request": {
      "main": [
        [
          {
            "node": "Extract Results",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Wait": {
      "main": [
        [
          {
            "node": "Append row in sheet",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Extract Results": {
      "main": [
        [
          {
            "node": "Wait",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "If": {
      "main": [
        [
          {
            "node": "HTTP Request",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Append row in sheet": {
      "main": [
        [
          {
            "node": "Pagination Check",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Pagination Check": {
      "main": [
        [
          {
            "node": "If",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  },
  "active": false,
  "settings": {
    "executionOrder": "v1"
  },
  "versionId": "fc589182-a318-49b8-a379-0310f5d02d73",
  "meta": {
    "templateCredsSetupCompleted": true,
    "instanceId": "8635676ea76f4e07bb7b3552d47bbfea50b5edf31b748301e3e8d5db6f9c740c"
  },
  "id": "4zenYTobvfEQkm6p",
  "tags": []
}
