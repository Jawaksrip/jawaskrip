#!/bin/bash

DIRS=`ls ./example -l --time-style="long-iso" | awk '{print $8}'`

STDINFILE="test.txt|angka.jws|masukan.jwsl|hujan_salju.jwsl|nsk.jwsl"

for EXCLUDE in $STDINFILE; do
    DIRS=`echo $DIRS | sed -E "s/$STDINFILE//g"`
done

for DIR in $DIRS; do
    node ./bin/jawaskrip ./example/$DIR
done

printf "\nDONE!\n"
