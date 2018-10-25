findi
=====

Find duplicate images.

Install
-------

```
npm install findi -g
```

Usage
-----

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

License
-------

MIT. Copyright (c) [Daniel Moraes](https://dmoraes.org).
