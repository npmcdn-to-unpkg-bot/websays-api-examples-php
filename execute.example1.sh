#!/bin/bash

BASEDIR=$(dirname $0)
APPDIR=$BASEDIR/src/example1
PUBLICDIR=$BASEDIR/public/example1

# Remove folder
if [ -f "$PUBLICDIR/index.html" ]; then
    rm -f $PUBLICDIR/index.html
fi

php $APPDIR/example1.php > $APPDIR/tmp.html

if [ $? -eq 0 ]; then
  mv $APPDIR/tmp.html $PUBLICDIR/index.html
  echo "GENERATED OK"
else
  echo "[ERROR] EXAMPLE NOT GENERATED. Error in: "$APPDIR/tmp.html
  cat $APPDIR/tmp.html

  exit 1
fi
