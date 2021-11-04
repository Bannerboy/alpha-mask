# Alpha Mask

This script apply a mask (of the form of a transparent PNG) on a JPG file.

It accepts `img` tags or `div` with background-image as source or mask.

By default, it will replace the content of the source with the masked image, and erase the mask.

[Demo](https://bannerboy.github.io/alpha-mask/)

## Setup

1. Import the file

`import {AlphaMask} from './alpha-mask.js'`

## Usage

`new AlphaMask(image, mask, [OPTIONS])`

- The 1st parameter being the image you want to mask, most likely a JPG
- The 2nd parameter your matte image, most likely a black and transparent PNG

## Options

An array of options, intended for debug

```
debug: Boolean - default false // keeps the initial image and mask visible and show the working canvas
removeMask: Boolean - default true // hide the mask after use
replaceSource: Boolean - default true // replace the original content with the masked content (image source or div background image)
```
