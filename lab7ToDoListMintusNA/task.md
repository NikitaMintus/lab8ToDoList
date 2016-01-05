# JS Task 4

Your task is to create a todo-list application, which uses provided REST api to
persist changes between page reloads.

## Setting up
To run the server, you must have Node.js installed.

Navigate to task's directory (one with package.json file) in console and execute
following command to install required packages

npm install

Then, you may run the server by executing

node index.js

The server will be avalible at http://127.0.0.1:3000/

Start editing code in the frontend directory.

## Requirements

### Displaying todo items
Your application must correctly display all todo items

### Adding items
Your application must be able to add new todo items.
Do not add items with empty text.

### Deleting items
Your application must be able to remove any displayed item.

## Optional

### Updating items
Your applications must be able to update any displayed item.
This includes "done" checkbox and item text.
You may use popups, inline-editing, etc.

### API Error Handling
Make sure your application correctly handles unexpected server errors
To simulate an occasional error, start the server using following command

node index.js simulate-errors

Now, any request to API has a chance to fail.

### Filtering
Add client-side filters, to display all, completed and uncompleted items.

## References
Use following application as a reference
http://todomvc.com/examples/jquery/

Use postman Chrome extension, to explore the API
https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop
