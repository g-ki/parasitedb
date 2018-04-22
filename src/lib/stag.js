/**
Based on the idea outlined here: http://domnit.org/blog/2007/02/stepic-explanation.html
*/

var Jimp = require('jimp');
var fs = require('fs');

const createImage = () => ({
  _index: 0,
  _width: 0,
  _height: 0,
  _clone: undefined,
  _batch: undefined,
  _password: undefined,
})

const pixelToColor = p => Jimp.rgbaToInt(p.r, p.g, p.b, p.a);
const getPixel = (image, x, y) => Jimp.intToRGBA(image.getPixelColor(x, y));
const setPixel = (image, x, y, pixel) =>
  image.setPixelColor(x, y, pixelToColor(pixel));


const unpackBit = function (b, pixel, position) {
  let color;

  switch (position % 3) {
    case 0:
      color = 'r';
      break;
    case 1:
      color = 'g';
      break;
    case 2:
      color = 'b';
      break;
  }

  // if pixel is set
  if (pixel[color] & 1) {
    b |= 1 << (7 - position);
  }

  return b;
};

/*
Sets the least significant bit to 1 or 0 (depending on the bit to set)
*/
const packBit = function (pixel, position, bit) {
  let color;

  switch (position % 3) {
    case 0:
      color = 'r';
      break;
    case 1:
      color = 'g';
      break;
    case 2:
      color = 'b';
      break;
  }

  if (bit) {
    pixel[color] |= 1;
  } else {
    pixel[color] &= ~1;
  }

  return pixel
};

/*
Reads the next section (a section ends when the least significant bit of the
blue component of the third pixel is 0)
See http://domnit.org/blog/2007/02/stepic-explanation.html
*/
const digUpNextSection = function (image) {
  let b;
  let pixel;
  let buffer = [];

  while (image._index < image._width * image._height) {
    b = 0;
    for (var i = 0; i < 8; i++) {
      if (i % 3 == 0) {
        const x = image._index % image._width
        const y = Math.floor(image._index / image._width)
        pixel = getPixel(image._clone, x, y);
        image._index++;
      }
      b = unpackBit(b, pixel, i);
    }

    buffer.push(b);
    if (pixel.b & 1) {
      break;
    }
  }

  buffer = new Buffer(buffer);
  return buffer;
};

/*
Embeds a buffer of data
See http://domnit.org/blog/2007/02/stepic-explanation.html
*/
const embedSection = function (image, buffer) {
  let pixel;
  let bit;


  let octect;
  for (let i = 0; i < buffer.length; i++) {
    octect = buffer[i];

    for (let j = 0; j < 8; j++) {
      if (j % 3 == 0) {
        if (pixel) {
          setPixel(image._clone, image._index % image._width, Math.floor(image._index / image._width), pixel);
          image._index++;
        }
        pixel = getPixel(image._clone, image._index % image._width, Math.floor(image._index / image._width));
        console.log(pixelToColor(pixel))
      }
      if (octect & (1 << (7 - j))) {
        bit = 1;
      } else {
        bit = 0;
      }
      pixel = packBit(pixel, j, bit);
    }

    if (i == (buffer.length - 1)) {
      pixel.b |= 1;
    } else {
      pixel.b &= ~1;
    }

    setPixel(image._clone, image._index % image._width, Math.floor(image._index / image._width), pixel);
    image._index++;
    pixel = undefined;
  }

};

module.exports = {
  decode: function (imageBuffer) {
    return Jimp.read(imageBuffer).then((image) => {
      const newImage = createImage();
      Object.assign(newImage, {
        _clone: image.clone(),
        _width: image.bitmap.width,
        _height: image.bitmap.height,
      })

      const buffer = digUpNextSection(newImage);
      return buffer.toString('hex');
    });
  },
  encode: function (imageBuffer, data) {
    return Jimp.read(imageBuffer).then((image) => {
      const newImage = createImage();
      Object.assign(newImage, {
        _clone: image.clone(),
        _width: image.bitmap.width,
        _height: image.bitmap.height,
      })

      embedSection(newImage, Buffer.from(data));
      return new Promise((resolve, reject) => {
        newImage._clone.getBase64(Jimp.MIME_PNG, (err, src) => {
          if (err)
            reject(err)
          resolve(src)
        })
      })
    }).catch(e => console.error(e))
  }
};

const donutPngBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=='
const img = Buffer.from(donutPngBase64, 'base64');
module.exports.encode(img, 'A').then((x) => {
  // console.log(x)
  console.log('------')

  const y = Buffer.from(x.split(',')[1], 'base64');
  module.exports.decode(y).then(console.log, console.error)
})
