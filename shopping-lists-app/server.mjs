import express from 'express';

// WARNING:
// This is a very simple version of Shopping Lists Web Application.
// - Lists are in memory;
// - Without Web API documentation;
// - There is no module organization;
// - Without users and authentication;
// - Without asynchronous operations.

const PORT = 8000;  // Port number for the tests

// DATA in memory: shopping lists and items
const SHOPPING_LISTS = [
  {
    id: 1,
    name: 'Grocery Shopping',
    items: [
      { id: 1, name: 'Milk', quantity: 2, bought: false },
      { id: 2, name: 'Bread', quantity: 1, bought: true },
      { id: 3, name: 'Eggs', quantity: 12, bought: false }
    ]
  },
  {
    id: 2,
    name: 'Office Supplies',
    items: [
      { id: 1, name: 'Printer Paper', quantity: 5, bought: false },
      { id: 2, name: 'Pens', quantity: 10, bought: true },
      { id: 3, name: 'Notepads', quantity: 2, bought: false }
    ]
  }
];

// Current ID for new shopping lists
let currentId = SHOPPING_LISTS.length + 1;

// Create an Express application
const app = express(); // Express function returns an app

// Middleware to parse JSON request bodies
app.use(express.json());

// Routes:

// GET /api/lists - Get all shopping lists
app.get('/api/lists', getLists);

// GET /api/lists/:id - Get a specific shopping list by ID
app.get('/api/lists/:id', getList);

// POST /api/lists - Create a new shopping list
app.post('/api/lists', createList);

// PUT /api/lists/:id - Update an existing shopping list by ID
app.put('/api/lists/:id', updateList);

// DELETE /api/lists/:id - Delete a shopping list by ID
app.delete('/api/lists/:id', deleteList);

// POST /api/lists/:id/items - Add an item to a specific shopping list
app.post('/api/lists/:id/items', addItem);

// PATCH /api/lists/:id/items/:itemId - Partial update an item in a specific shopping list
app.patch('/api/lists/:id/items/:itemId', updateItem);

// DELETE /api/lists/:id/items/:itemId - Delete an item from a specific shopping list
app.delete('/api/lists/:id/items/:itemId', deleteItem);


// App listening...
app.listen(PORT, () =>
  console.log(`Shopping Lists app listening on port ${PORT}!`),
);


// FUNCTIONS:

// Get all lists
function getLists(req, res){
  console.log("Getting all lists.");

  // Return the SHOPPING_LISTS array as JSON response
  res.json({lists: SHOPPING_LISTS});
}

// Get a list by id
function getList(req, res){
  console.log("Getting list of id:", req.params.id);

  // Find the list with the specified id in the SHOPPING_LISTS array
  const list = SHOPPING_LISTS.find(list => list.id == req.params.id);

  // If the list is found, return it; otherwise, return a 404 error
  if (list)
    res.json(list);
  else
    res.status(404).send("List with id " + req.params.id + " not found.");
}

// Create a new list
function createList(req, res){
  console.log("Adding list with body:");
  console.log(req.body);

  // Validate the request body for the new list
  if (typeof req.body?.name !== 'string' || req.body?.name.trim() === ""){
    res.status(400).send('List name is required.');
    return;
  }

  // Create a new list object with a unique id and an empty items array
  const newList = {
    id: currentId,
    name: req.body.name.trim(),
    items: []
  }

  // Add the new list to the SHOPPING_LISTS array
  // and increment the currentId for the next list
  SHOPPING_LISTS.push(newList);
  currentId++;

  // Send a response with the new list
  res.status(201);
  res.json({
    message: `List id ${newList.id} was added!`,
    list: newList
  });
}

// Update a list by id
function updateList(req, res){

  console.log("Updating list of id:", req.params.id);

  // Find the index of the list with the specified id in the SHOPPING_LISTS array
  const listIndex = SHOPPING_LISTS.findIndex(list => list.id == req.params.id);

  if (listIndex == -1){
    res.status(404).send(`List with id ${req.params.id} not found.`);
    return;
  }

  // Validate the request body for the list update
  if (typeof req.body?.name !== 'string' || req.body?.name.trim() === ""){
    res.status(400).send('List name is required.');
    return;
  }

  // Update the list name if provided in the request body
  SHOPPING_LISTS[listIndex].name = req.body.name.trim();

  // Send a response with the updated list
  res.json({
    message: `List with id ${req.params.id} updated.`, 
    list: SHOPPING_LISTS[listIndex]
  });
}

function deleteList(req, res){

  console.log("Deleting list of id:", req.params.id);

  // Find the index of the list with the specified id in the SHOPPING_LISTS array
  const listIndex = SHOPPING_LISTS.findIndex(list => list.id == req.params.id);
  
  if (listIndex == -1){
    res.status(404).send(`List with id ${req.params.id} not found.`);
    return;
  }

  // Remove the list from the SHOPPING_LISTS array
  const list = SHOPPING_LISTS[listIndex];
  SHOPPING_LISTS.splice(listIndex, 1);

  // Send a response confirming the deletion of the list
  res.json({
    message: `List with id ${req.params.id} deleted.`,
    list: list
  });
}

// ---- Items in a list ----

// Add an item to a list
function addItem(req, res){

  console.log("Adding item to list of id:", req.params.id);
  console.log(req.body);

  // Find the list with the specified id in the SHOPPING_LISTS array
  const list = SHOPPING_LISTS.find(list => list.id == req.params.id);
  
  if (!list){
    res.status(404).send(`List with id ${req.params.id} not found.`);
    return;
  }

  // Validate the request body for the new item:
  if (typeof req.body?.name !== 'string' || req.body?.name.trim() === ""){
    res.status(400).send('Item name is required.');
    return;
  }

  if ("quantity" in req.body && Number(req.body?.quantity) <= 0){
    res.status(400).send('Item quantity must be greater than 0.');
    return;
  }

  if ("bought" in req.body && typeof req.body?.bought !== "boolean"){
    res.status(400).send('Item bought must be a boolean.');
    return;
  }

  // New item id is the next integer after the highest existing item id in the list
  const newItemId = list.items.reduce((maxId, item) => Math.max(maxId, item.id), 0) + 1;

  // Create the new item with a unique id within the list
  const item = {
    id: newItemId,
    name: req.body.name.trim(), // required field
    quantity: req.body.quantity || 1,
    bought: req.body.bought || false
  }
  list.items.push(item);

  // Send a response confirming the addition of the new item to the list
  res.status(201);
  res.json({
    message: `Item id ${item.id} was added to list ${list.id}!`,
    item: item
  });
}

function updateItem(req, res){

  console.log("Updating item of id:", req.params.itemId, "in list:", req.params.id);
  
  // Find the list with the specified id in the SHOPPING_LISTS array
  const list = SHOPPING_LISTS.find(list => list.id == req.params.id);
  if (!list){
    res.status(404).send(`List with id ${req.params.id} not found.`);
    return;
  }

  // Find the index of the item with the specified itemId in the list's items array
  const itemIndex = list.items.findIndex(item => item.id == req.params.itemId);
  if (itemIndex == -1){
    res.status(404).send(`Item with id ${req.params.itemId} not found.`);
    return;
  }

  // TODO: Need to validate the request body for the item update
  if ("name" in req.body)
    list.items[itemIndex].name = req.body.name.trim();
  if ("quantity" in req.body)
    list.items[itemIndex].quantity = req.body.quantity;
  if ("bought" in req.body)
    list.items[itemIndex].bought = req.body.bought;

  // Send a response confirming the update of the item in the list
  res.json({
        message: `Item with id ${req.params.itemId} updated.`, 
        item: list.items[itemIndex]
    });
}

function deleteItem(req, res){

  console.log("Deleting item of id:", req.params.itemId, "from list:", req.params.id);

  // Find the list with the specified id in the SHOPPING_LISTS array
  const list = SHOPPING_LISTS.find(list => list.id == req.params.id);
  if (!list){
    res.status(404).send(`List with id ${req.params.id} not found.`);
    return;
  }

  // Find the index of the item with the specified itemId in the list's items array
  const itemIndex = list.items.findIndex(item => item.id == req.params.itemId);
  if (itemIndex == -1){
    res.status(404).send(`Item with id ${req.params.itemId} not found.`);
    return;
  }

  // Remove the item from the list
  const item = list.items[itemIndex];
  list.items.splice(itemIndex, 1);

  // Send a response confirming the deletion of the item from the list
  res.json({
    message: `Item with id ${req.params.itemId} deleted.`,
    item: item
  });
}

// Testing: for now, use the Rest Client in VScode to make the requests.
