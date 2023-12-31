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
yarn simulate [commands-file]
```

An example run would be;

```
yarn simulate ./samples/1.txt
```

# Notes / Assumptions

- This isn't a proper CLI in the sense that it should probably use `yarn link` along with the `bin` section in `package.json` as we just run it via `yarn simulate`

- I added support for `# comment` lines in the input file

- I've assumed that if the PLACE command puts the robot into an out bounds placement it will just start at 0,0 facing NORTH. For example given a 5x5 tabletop and PLACE 6,0,NORTH will place the bot at 0,0,NORTH

- As the origin is (0,0) (SOUTH WEST most corner) then in a 5x5 tabletop (4,4) is the x,y position for the top right corner (NORTH EAST)
