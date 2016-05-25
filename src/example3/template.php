<!doctype html>
<html class="no-js" lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Websays API integration - Example 3</title>
    <meta name="description" content="Websays API integration - Example 3">
    <meta name="author" content="Websays, S.L.">

    <link rel="shortcut icon" href="../favicon.ico">
    <link rel="apple-touch-icon" href="../apple-touch-icon.png">

    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.4/css/bootstrap.css">
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.4/css/bootstrap-theme.min.css">

    <link rel="stylesheet" href="example3.css">

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
        <h3 class="text-muted">Websays API: Example 3</h3>
    </div>
    <div class="row">
        <div class="col-lg-12">
            <h2>Corporate channels: last 7 days</h2>
            <?php foreach ($corporateChannelsList as $ccItem): ?>
                <?php
                $elementId = 'corporate-channel-' . $ccItem['account']['profile_id'] . '-' . $ccItem['account']['type'] . '-' . $ccItem['account']['type_id'];

                switch ($ccItem['account']['type']) {
                    case 'twitter':
                        $faviconImage = 'images/favicon-twitter.svg';
                        break;
                    case 'facebook_user':
                    case 'facebook_page':
                    case 'facebook_group':
                        $faviconImage = 'images/favicon-facebook.svg';
                        break;
                    case 'youtube':
                        $faviconImage = 'images/favicon-youtube.svg';
                        break;
                    case 'googleplus_person':
                    case 'googleplus_page':
                        $faviconImage = 'images/favicon-googleplus.svg';
                        break;
                    case 'instagram_user':
                        $faviconImage = 'images/favicon-instagram.svg';
                        break;
                    case 'linkedin_people':
                    case 'linkedin_company':
                        $faviconImage = 'images/favicon-linkedin.svg';
                        break;
                    case 'vimeo':
                        $faviconImage = 'images/favicon-vimeo.svg';
                        break;
                    default:
                        $faviconImage = 'images/favicon-twitter.svg';
                        break;
                }
                ?>
                <figure id="<?php echo $elementId; ?>">
                    <div class="ws_corporate_block">
                        <div class="clearfix ws_corporate_channels_header ws_corporate_channels_overflow">
                            <img src="<?php echo $ccItem['account']['type_image_url']; ?>"/>
                            <p class="ws-container-channel-name">
                                <img src="<?php echo $faviconImage; ?>" width="16" height="16"/>
                                <span class="hide_text"
                                      style="width: 254px; display: inline-block;"><?php echo $ccItem['account']['type_name']; ?></span>
                            </p>
                        </div>
                        <div class="ws_corporate_channels_warning">
                            <p><strong><?php echo date('j F Y', $ccItem['period']['current']['from']); ?>
                                    - <?php echo date('j F Y', $ccItem['period']['current']['to']); ?></strong>
                                <span>vs</span> <?php echo date('j F Y', $ccItem['period']['last']['from']); ?>
                                - <?php echo date('j F Y', $ccItem['period']['last']['to']); ?></p>
                        </div>
                        <?php if ($ccItem['current']['klout_score']): ?>
                            <div class="clearfix ws-reports-metric-row-summary ws_corporate_channels_overflow">
                                <div class="ws-container-image">
                                    <img src="images/favicon-inlinks-klout.svg" width="20" height="20"/>
                                </div>
                                <div class="ws-container-name">
                                    <p>Klout</p>
                                </div>
                                <div class="ws-container-value">
                                    <p><?php echo number_format($ccItem['current']['klout_score'], 2); ?></p>
                                </div>
                                <div class="ws-container-difference">
                                    <p><span><?php echo number_format($ccItem['diff']['klout_score'], 2); ?></span></p>
                                </div>
                            </div>
                        <?php endif; ?>
                        <?php if ($ccItem['current']['followers']): ?>
                            <div class="clearfix ws-reports-metric-row-summary ws_corporate_channels_overflow">
                                <div class="ws-container-image">
                                    <img src="images/channels-followers.svg" width="23"/>
                                </div>
                                <div class="ws-container-name">
                                    <p>Followers</p>
                                </div>
                                <div class="ws-container-value">
                                    <p><?php echo number_format($ccItem['current']['followers'], 0); ?></p>
                                </div>
                                <div class="ws-container-difference">
                                    <p><span><?php echo number_format($ccItem['diff']['followers'], 0); ?></span></p>
                                </div>
                            </div>
                        <?php endif; ?>
                        <?php if ($ccItem['current']['following']): ?>
                            <div class="clearfix ws-reports-metric-row-summary ws_corporate_channels_overflow">
                                <div class="ws-container-image">
                                    <img src="images/channels-following.svg" width="23" />
                                </div>
                                <div class="ws-container-name">
                                    <p>Following</p>
                                </div>
                                <div class="ws-container-value">
                                    <p><?php echo number_format($ccItem['current']['following'], 0); ?></p>
                                </div>
                                <div class="ws-container-difference">
                                    <p><span><?php echo number_format($ccItem['diff']['following'], 0); ?></span></p>
                                </div>
                            </div>
                        <?php endif; ?>
                        <?php if ($ccItem['current']['friends']): ?>
                            <div class="clearfix ws-reports-metric-row-summary ws_corporate_channels_overflow">
                                <div class="ws-container-image">
                                    <img src="images/channels-following.svg" width="23"/>
                                </div>
                                <div class="ws-container-name">
                                    <p>Following</p>
                                </div>
                                <div class="ws-container-value">
                                    <p><?php echo number_format($ccItem['current']['friends'], 0); ?></p>
                                </div>
                                <div class="ws-container-difference">
                                    <p><span><?php echo number_format($ccItem['diff']['friends'], 0); ?></span></p>
                                </div>
                            </div>
                        <?php endif; ?>
                        <?php if ($ccItem['current']['tweets']): ?>
                            <div class="clearfix ws-reports-metric-row-summary ws_corporate_channels_overflow">
                                <div class="ws-container-image">
                                    <img src="images/favicon-inlinks-twitter.svg" width="20" height="20"/>
                                </div>
                                <div class="ws-container-name">
                                    <p>Tweets</p>
                                </div>
                                <div class="ws-container-value">
                                    <p><?php echo number_format($ccItem['current']['tweets'], 0); ?></p>
                                </div>
                                <div class="ws-container-difference">
                                    <p><span><?php echo number_format($ccItem['diff']['tweets'], 0); ?></span></p>
                                </div>
                            </div>
                        <?php endif; ?>
                        <?php if ($ccItem['current']['retweets']): ?>
                            <div class="clearfix ws-reports-metric-row-summary ws_corporate_channels_overflow">
                                <div class="ws-container-image">
                                    <img src="images/retwit_icon.svg" width="20" height="20"/>
                                </div>
                                <div class="ws-container-name">
                                    <p>Retweets</p>
                                </div>
                                <div class="ws-container-value">
                                    <p><?php echo number_format($ccItem['current']['retweets'], 0); ?></p>
                                </div>
                                <div class="ws-container-difference">
                                    <p><span><?php echo number_format($ccItem['diff']['retweets'], 0); ?></span></p>
                                </div>
                            </div>
                        <?php endif; ?>
                        <?php if ($ccItem['current']['likes']): ?>
                            <div class="clearfix ws-reports-metric-row-summary ws_corporate_channels_overflow">
                                <div class="ws-container-image">
                                    <img src="images/channels-followers.svg" width="23" />
                                </div>
                                <div class="ws-container-name">
                                    <p>Likes</p>
                                </div>
                                <div class="ws-container-value">
                                    <p><?php echo number_format($ccItem['current']['likes'], 0); ?></p>
                                </div>
                                <div class="ws-container-difference">
                                    <p><span><?php echo number_format($ccItem['diff']['likes'], 0); ?></span></p>
                                </div>
                            </div>
                        <?php endif; ?>
                        <?php if ($ccItem['current']['talking_about']): ?>
                            <div class="clearfix ws-reports-metric-row-summary ws_corporate_channels_overflow">
                                <div class="ws-container-image">
                                    <img src="images/channels-talking-about.svg" width="24" height="19" />
                                </div>
                                <div class="ws-container-name">
                                    <p>Talking about</p>
                                </div>
                                <div class="ws-container-value">
                                    <p><?php echo number_format($ccItem['current']['talking_about'], 0); ?></p>
                                </div>
                                <div class="ws-container-difference">
                                    <p><span><?php echo number_format($ccItem['diff']['talking_about'], 0); ?></span></p>
                                </div>
                            </div>
                        <?php endif; ?>
                        <?php if ($ccItem['current']['circled_by']): ?>
                            <div class="clearfix ws-reports-metric-row-summary ws_corporate_channels_overflow">
                                <div class="ws-container-image">
                                    <img src="images/channels-followers.svg" width="23" />
                                </div>
                                <div class="ws-container-name">
                                    <p>Circled by</p>
                                </div>
                                <div class="ws-container-value">
                                    <p><?php echo number_format($ccItem['current']['circled_by'], 0); ?></p>
                                </div>
                                <div class="ws-container-difference">
                                    <p><span><?php echo number_format($ccItem['diff']['circled_by'], 0); ?></span></p>
                                </div>
                            </div>
                        <?php endif; ?>
                        <?php if ($ccItem['current']['plus_one']): ?>
                            <div class="clearfix ws-reports-metric-row-summary ws_corporate_channels_overflow">
                                <div class="ws-container-image">
                                    <img src="images/favicon-inlinks-googleplus.svg" width="21" />
                                </div>
                                <div class="ws-container-name">
                                    <p>+1's</p>
                                </div>
                                <div class="ws-container-value">
                                    <p><?php echo number_format($ccItem['current']['plus_one'], 0); ?></p>
                                </div>
                                <div class="ws-container-difference">
                                    <p><span><?php echo number_format($ccItem['diff']['plus_one'], 0); ?></span></p>
                                </div>
                            </div>
                        <?php endif; ?>
                        <?php if ($ccItem['current']['photos']): ?>
                            <div class="clearfix ws-reports-metric-row-summary ws_corporate_channels_overflow">
                                <div class="ws-container-image">
                                    <img src="images/favicon-inlinks-instagram.svg" width="20" height="20" />
                                </div>
                                <div class="ws-container-name">
                                    <p>Photos</p>
                                </div>
                                <div class="ws-container-value">
                                    <p><?php echo number_format($ccItem['current']['photos'], 0); ?></p>
                                </div>
                                <div class="ws-container-difference">
                                    <p><span><?php echo number_format($ccItem['diff']['photos'], 0); ?></span></p>
                                </div>
                            </div>
                        <?php endif; ?>
                        <?php if ($ccItem['current']['subscribers']): ?>
                            <div class="clearfix ws-reports-metric-row-summary ws_corporate_channels_overflow">
                                <div class="ws-container-image">
                                    <img src="images/channels-followers.svg" width="23" />
                                </div>
                                <div class="ws-container-name">
                                    <p>Subscribers</p>
                                </div>
                                <div class="ws-container-value">
                                    <p><?php echo number_format($ccItem['current']['subscribers'], 0); ?></p>
                                </div>
                                <div class="ws-container-difference">
                                    <p><span><?php echo number_format($ccItem['diff']['subscribers'], 0); ?></span></p>
                                </div>
                            </div>
                        <?php endif; ?>
                        <?php if ($ccItem['current']['videos']): ?>
                            <div class="clearfix ws-reports-metric-row-summary ws_corporate_channels_overflow">
                                <div class="ws-container-image">
                                    <img src="images/channels-video-views.svg" width="23" height="17" />
                                </div>
                                <div class="ws-container-name">
                                    <p>Videos</p>
                                </div>
                                <div class="ws-container-value">
                                    <p><?php echo number_format($ccItem['current']['videos'], 0); ?></p>
                                </div>
                                <div class="ws-container-difference">
                                    <p><span><?php echo number_format($ccItem['diff']['videos'], 0); ?></span></p>
                                </div>
                            </div>
                        <?php endif; ?>
                        <?php if ($ccItem['current']['comments']): ?>
                            <div class="clearfix ws-reports-metric-row-summary ws_corporate_channels_overflow">
                                <div class="ws-container-image">
                                    <img src="images/clipping-comment.svg" width="21" />
                                </div>
                                <div class="ws-container-name">
                                    <p>Comments</p>
                                </div>
                                <div class="ws-container-value">
                                    <p><?php echo number_format($ccItem['current']['comments'], 0); ?></p>
                                </div>
                                <div class="ws-container-difference">
                                    <p><span><?php echo number_format($ccItem['diff']['comments'], 0); ?></span></p>
                                </div>
                            </div>
                        <?php endif; ?>
                        <?php if ($ccItem['current']['profile_views']): ?>
                            <div class="clearfix ws-reports-metric-row-summary ws_corporate_channels_overflow">
                                <div class="ws-container-image">
                                    <img src="images/top_views.svg" width="21" />
                                </div>
                                <div class="ws-container-name">
                                    <p>Profile views</p>
                                </div>
                                <div class="ws-container-value">
                                    <p><?php echo number_format($ccItem['current']['profile_views'], 0); ?></p>
                                </div>
                                <div class="ws-container-difference">
                                    <p><span><?php echo number_format($ccItem['diff']['profile_views'], 0); ?></span></p>
                                </div>
                            </div>
                        <?php endif; ?>
                        <figure class="corporate-channels-highcharts-chart"></figure>
                    </div>
                </figure>
            <?php endforeach; ?>
        </div>
    </div>
    <hr/>
    <footer class="footer">
        <p>Last update: <strong><?php echo date('r'); ?></strong></p>
        <p>&copy; <a href="https://websays.com" target="_blank">Websays</a>. Made with &hearts; in Barcelona.</p>
    </footer>
</div>

<script>var EXAMPLE_DATA = <?php echo json_encode($corporateChannelsList); ?>;</script>

<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/lodash.js/3.8.0/lodash.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/highcharts/4.1.5/highcharts.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.4/js/bootstrap.min.js"></script>
<script src="example3.js"></script>
</body>
</html>
