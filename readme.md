# Gordo Gustavo's

```
ffmpeg -i inputvideo.ext -c:v h264 -an -r:v 24 -filter:v scale=720:-1 output.mp4
ffmpeg -i inputvideo.ext -c:v libtheora -an -r:v 24 -filter:v scale=720:-1 output.ogv
ffmpeg -i inputvideo.ext -c:v libvpx -an -r:v 24 -filter:v scale=720:-1 output.webm
ffmpeg -i input.flv -ss 00:00:14.435 -vframes 1 out.png
```
