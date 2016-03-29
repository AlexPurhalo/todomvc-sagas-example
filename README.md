# todomvc-sagas-example

This is an example of a TodoMVC app which uses [redux-saga](https://github.com/yelouafi/redux-saga) to do the asynchronous fetching.

On the server it is using [nedb](https://github.com/louischatriot/nedb) which is a lighweight, npm/node friendly mongo-like data store. It's using their in-memory DataStore to do basic create, read, update, delete operations.

## Install and Run

```bash
$ npm install && npm run start
```

## TODO

- [ ] handling failed actions in reducers
- [ ] adding tests for sagas

## CONTRIBUTING

All contributions are welcome.

## LICENSE

MIT