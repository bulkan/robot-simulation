# Robot Simulation

Simple robot simulation app command-line.

I used the following versions of node & yarn.

```
"node": "~18.17",
"yarn": ">=1.22.0"
```

To run first install dependencies.

```
yarn install
```

Run the tests to ensure it's working as expected

```
yarn test
```

Then run by;

```
yarn run [commands-file]
```

An example run would be;

`yarn run ./samples/1.txt`

# Notes

- This isn't a proper CLI in the sense that it should probably use `yarn link` along with the `bin` section in
  `package.json`
