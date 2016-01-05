# API
API is outlined as follows:
HTTP_METHOD PATH

All data passed and received is JSON serialized.

Paths that look like /todos/:id expect to receive an item's id in placeholder.
So the actual path will look like /todos/d2CZDVvNc9cPGCeQ

## GET /todos
Returns an array with all todo items.

```
[
  {
    text: "Todo 1",
    completed: false,
    _id: "d2CZDVvNc9cPGCeQ"
  },
  {
    text: "Todo 2",
    completed: true,
    _id: "FVhklIpvwHJAt6sw"
  }
]
```

## DELETE /todos
Deletes all todo items.
Returns status code 204 and empty body.

# POST /todos
Creates new todo item.
Expects an object with text property as message body.

```
  { text: "Todo 1" }
```

Returns newly created item.

```
{ text: "Todo 1", completed: false, _id: "d2CZDVvNc9cPGCeQ" }
```

## GET /todos/:id
Returns a single todo item by its id, for example
request to /todos/d2CZDVvNc9cPGCeQ would return item if it exists.

```
{ text: "Todo 1", completed: false, _id: "d2CZDVvNc9cPGCeQ" }
```

## DELETE /todos/:id
Deletes item with given id
Returns status code 204 and empty body.

## PATCH /todos/:id
Updates item with given id.
Expects new value fields as message's body.

```
{ completed: true }
```

Returns the resulting item.

```
{ text: "Todo 1", completed: true, _id: "d2CZDVvNc9cPGCeQ" }
```
