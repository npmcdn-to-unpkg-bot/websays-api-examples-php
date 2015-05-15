<?php

use Websays\API;

class APITest extends PHPUnit_Framework_TestCase {

  public function testWebsaysHasCheese()
  {
    $nacho = new API;
    $this->assertTrue($nacho->hasCheese());
  }
}
