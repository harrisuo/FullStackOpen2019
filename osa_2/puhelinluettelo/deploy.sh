#!/bin/sh
npm run build
rm -rf ../../osa_3/puhelinluettelo/build
cp -r build ../../osa_3/puhelinluettelo/
