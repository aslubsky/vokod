<?php
namespace Modules\Model;

use Bazalt\ORM;

class Doctor extends Base\Doctor
{
    public static function getCollection()
    {
        $q = ORM::select('Modules\\Model\\Doctor c', 'c.*');
        return new \Bazalt\ORM\Collection($q);
    }

    public static function create()
    {
        $o = new Doctor();
        return $o;
    }
}
