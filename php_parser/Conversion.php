<?php

namespace Avantio\Connectivity\Avantio;

class Conversion
{
    protected static $SERVICES = [
        AmenityWS::ESSENTIALS => [
            'booking' => 1,
            'airbnb' => [
                'is_hotel' => 2, 'is_default' => [3, 4]
            ]
        ]
    ];
}