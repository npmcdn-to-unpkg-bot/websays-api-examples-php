<!doctype html>
<html class="no-js" lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Websays API integration - Example 2</title>
    <meta name="description" content="Websays API integration - Example 1">
    <meta name="author" content="Websays, S.L.">

    <link rel="shortcut icon" href="../favicon.ico">
    <link rel="apple-touch-icon" href="../apple-touch-icon.png">

    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.4/css/bootstrap.css">
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.4/css/bootstrap-theme.min.css">

    <script src="//cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.js"></script>
</head>
<body>
    <div class="container">
        <div class="header clearfix">
<!--            <nav>-->
<!--                <ul class="nav nav-pills pull-right">-->
<!--                    <li role="presentation" class="active"><a href="#">Home</a></li>-->
<!--                    <li role="presentation"><a href="#">About</a></li>-->
<!--                    <li role="presentation"><a href="#">Contact</a></li>-->
<!--                </ul>-->
<!--            </nav>-->
            <h3 class="text-muted">Websays API: Example 2</h3>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <h2>Volume: last 7 days</h2>
                <figure id="chart-facet-date"></figure>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <h2>Sources: last 7 days</h2>
                <figure id="chart-facet-page_supertype"></figure>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <h2>Languages: last 7 days</h2>
                <figure id="chart-facet-langDetected"></figure>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <h2>Word cloud: last 7 days</h2>
                <figure id="chart-facet-phrases" style="height: 456px;"></figure>
            </div>
        </div>
        <hr />
        <footer class="footer">
            <p>Last update: <strong><?php echo date('r'); ?></strong></p>
            <p>&copy; <a href="https://websays.com" target="_blank">Websays</a>. Made with &hearts; in Barcelona.</p>
        </footer>
    </div>

    <script>var EXAMPLE_DATA = <?php echo json_encode($chartsFacetsData); ?>;</script>

    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/lodash.js/3.8.0/lodash.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/highcharts/4.1.5/highcharts.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.4/js/bootstrap.min.js"></script>
    <script src="//npmcdn.com/wordcloud@1.0.4"></script>
    <script src="wordcloud.js"></script>
    <script src="example2.js"></script>
</body>
</html>
