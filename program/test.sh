#!/bin/bash

set -e

ALLFILES=`ls ./example -l --time-style="long-iso" | awk '{print $8}'`

EXCLUDE="test.txt|angka.jws|masukan.jwsl|hujan_salju.jwsl|nsk.jwsl"

FILTEREDFILES=`echo $ALLFILES | sed -E "s/$EXCLUDE//g"`

for FILE in $FILTEREDFILES; do
    node ./bin/jawaskrip ./example/$FILE
done

printf "\nDONE!\n"
