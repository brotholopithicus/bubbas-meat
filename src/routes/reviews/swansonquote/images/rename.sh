#!/bin/bash

a=6
for f in ./*.jpg; do
	ext="${f##*.}"
	new="image0${a}_320x200.jpeg"
	mv -i -- "$f" "$new"
	let a=a+1
done
