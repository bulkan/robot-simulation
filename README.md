# Robot Simulation

Simple robot simulation app command-line.

To run first install dependencies;

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

```yarn run ./samples/1.txt```

Or if you want to type from the command line

```
yarn run < echo '
PLACE 0,0,NORTH
MOVE
REPORT
'
```