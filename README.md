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

# Notes / Assumptions

- This isn't a proper CLI in the sense that it should probably use `yarn link` along with the `bin` section in
  `package.json`

- I've assumed that if the PLACE command puts the robot into an out bounds placement it will just start at 0,0 facing NORTH. For example given a 5x5 tabletop and PLACE 6,0,NORTH will place the bot at 0,0,NORTH

- As the origin is (0,0) (SOUTH WEST most corner) then in a 5x5 tabletop 4,4 is the top right corner (NORTH EAST)
