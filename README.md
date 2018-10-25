# findi [![npm][npm-image]][npm-url] [![downloads][downloads-image]][downloads-url] [![javascript style guide][standard-image]][standard-url]

[npm-image]: https://img.shields.io/npm/v/findi.svg
[npm-url]: https://npmjs.org/package/findi
[downloads-image]: https://img.shields.io/npm/dm/findi.svg
[downloads-url]: https://npmjs.org/package/findi
[standard-image]: https://img.shields.io/badge/code_style-standard-brightgreen.svg
[standard-url]: https://standardjs.com

Find duplicate images.

## Install

```
npm install findi -g
```

## Usage

Find best match:

```
findi f awesome-cat.jpg search-path/
{ path: 'search-path/2.jpg',
  diff: 0.0000419702 }
```

Rename best match:

```
findi r awesome-cat.jpg search-path/
{ from: 'search-path/2.jpg',
  to: 'search-path/awesome-cat.jpg' }
```

## License

MIT. Copyright (c) [Daniel Moraes](https://dmoraes.org).
