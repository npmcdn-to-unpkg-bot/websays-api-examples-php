# Websays API examples (PHP)
Complete front end example of a Websays' API integration in PHP language.

We have two code examples including a [class](src/Websays/API.php) to access to the API.

**In order to access the API you need a [3scale](https://websays.3scale.net) user key and a Websays' user credentials. You can also read the [API documentation](https://websays.3scale.net/docs).**

## [Get token example](src/getToken/getToken.php)

This example shows you how to obtain a new token from the API. Each token expires in 60 days.

You have to set the credentials in the file and execute like this:

```bash
php src/getToken/getToken.php
```

## [Example 1](src/example1/example1.php): Get Data to Draw a Chart

This example shows how you can access the ```/charts/evolution``` API resource and print charts using JavaScript.

The data is accessed by a PHP process in the background which generates a static HTML file and saves the file as ```public/example1/index.html```

You have to set the credentials in the file and execute like this:

**You need a valid token to execute this example**

```bash
./execute.example1.sh
```

This way you have a highly available website which can serve high volume of requests efficiently. You can set a cronjob to execute periodically to refresh data.

## [Example 2](src/example2/example2.php): Get facets and print them

This example shows how you can access the ```/charts/facet``` API resource and print charts using JavaScript.

The data is accessed by a PHP process in the background which generates a static HTML file and saves the file as ```public/example2/index.html```

You have to set the credentials in the file and execute like this:

**You need a valid token to execute this example**

```bash
./execute.example2.sh
```

This way you have a highly available website which can serve high volume of requests efficiently. You can set a cronjob to execute periodically to refresh data.

## [Example 3](src/example3/example3.php): Get corporate channels and print them

This example shows how you can access the ```/charts/corporate-channels``` API resource and print information and charts using JavaScript.

The data is accessed by a PHP process in the background which generates a static HTML file and saves the file as ```public/example3/index.html```

You have to set the credentials in the file and execute like this:

**You need a valid token to execute this example**

```bash
./execute.example3.sh
```

This way you have a highly available website which can serve high volume of requests efficiently. You can set a cronjob to execute periodically to refresh data.
