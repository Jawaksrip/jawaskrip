#!/bin/sh

for file in ./example_testing/*.jwsl; do
    node ./bin/jawaskrip $file
done

echo "\n DONE..."