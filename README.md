# Datacsv
`Data`base + `csv` is very simple file based database for node.
It uses CSV file structure and locally creates manipulates files as real db would.

Features:
- create table
- clear (truncate) table
- get row/s
- add row/s
- edit row/s
- delete row/s

## Motivation
I was in need of very simple database for creating a mock database and tought that CSV would actually do what I need. I can open csv files, edit them manually and with this package also do everything programmatically.

## Installation
To install the stable version:

```
npm i --save datacsv
```

This assumes you are using [npm](https://www.npmjs.com/) as your package manager.

## Documentation
Require package in the project.

```js
const db = require('datacsv');
```

And now we can initialise table/s.

- path: string _(Location of csv file)_
- headers: { [string]: string | Function }

Schema is entirely optional (required only if for example data needs custom transformation).

```js
// `age` will be saved and treated as number in database
const headers = {
  name: String,
  email: String,
  age: Number,
}

const users = await db('users.csv', headers)
```

### `add`
Adding data to table.

- data: { [string]: any }[]

It will automatically add `id` field.
Returns added rows.

```js
await users.add([
  {
    name: 'John',
    email: 'john.doe@localhost',
    age: 21,
  }
])
/* [ { id: 'h4HNOfnLp',
 *     name: 'John',
 *     email: 'john.doe@localhost',
 *     age: 21 } ]
 */
```

### `get`
To get all existing fields from table.

- filter?: { [string]: any }

If no filter provided, it will return all rows from table.

```js
await users.get({
  age: 21
})
/* [ { id: 'h4HNOfnLp',
 *     name: 'John',
 *     email: 'john.doe@localhost',
 *     age: 21 } ]
 */
```

### `edit`
To edit data in table.

- filter: { [string]: any }
- data: { [string]: any }

If no filter provided, it will update all rows in table.
Returns edited rows.

```js
await users.edit(
  {
    id: 'h4HNOfnLp'
  },
  {
    name: 'Jane',
    email: 'jane.doe@localhost',
  }
)
/* [ { id: 'h4HNOfnLp',
 *     name: 'Jane',
 *     email: 'jane.doe@localhost',
 *     age: 21 } ]
 */
```

### `delete`
To delete data from table.

- filter?: { [string]: any }

If no filter provided, it will update all rows in table.
Returns deleted rows.

```js
await users.delete({
  name: 'Jane'
})
/* [ { id: 'h4HNOfnLp',
 *     name: 'Jane',
 *     email: 'jane.doe@localhost',
 *     age: 21 } ]
 */
```

## Stay In Touch

- [Twitter](https://twitter.com/marcisbee)

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2019-present, Marcis (Marcisbee) Bergmanis
