# Node API - R Bridge

## R setup

Make sure to configure `LC_ALL` and `LC_LANG` to avoid warning that may break output

Before you can test that your locale is configured correctly for R :
```
$ locale
```

If you get this output :
```
LANG=
LC_COLLATE="C"
LC_CTYPE="UTF-8"
LC_MESSAGES="C"
LC_MONETARY="C"
LC_NUMERIC="C"
LC_TIME="C"
LC_ALL=
```

You need to configure your locale. Here I use `en_US.UTF_8`, but you can use whatever you want.

```
$ export LC_ALL="en_US.UTF-8"
$ export LC_LANG="en_US.UTF-8"
```

Now you can verify that locale is correctly set

```
$ locale
LANG="en_US.UTF-8"
LC_COLLATE="en_US.UTF-8"
LC_CTYPE="en_US.UTF-8"
LC_MESSAGES="en_US.UTF-8"
LC_MONETARY="en_US.UTF-8"
LC_NUMERIC="en_US.UTF-8"
LC_TIME="en_US.UTF-8"
LC_ALL="en_US.UTF-8"
```

## Node setup

```
$ yarn
```

Or with npm :

```
$ npm install
```

## Usage

Two scripts are configured :
 - `start` to start API server that will forward some routes call to R interpreter
 - `dev` that does exactly the same as `start` but will reload server on any change to `index.js`

### With NPM

Using `start` script or `dev` script

```
$ npm start
```

```
$ npm dev
```

### With Yarn

Using `start` script or `dev` script

```
$ yarn start
```

```
$ yarn dev
```
