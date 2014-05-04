<?php
namespace Modules\Model;

use Bazalt\ORM;

class Category extends Base\Category
{
    public static function getCollection()
    {
        $q = ORM::select('Modules\\Model\\Category c', 'c.*');
        return new \Bazalt\ORM\Collection($q);
    }

    public static function create()
    {
        $o = new Category();
        return $o;
    }
}
