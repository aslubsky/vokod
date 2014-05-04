<?php
namespace Modules\Model;

use Bazalt\ORM;

class Journal extends Base\Journal
{
    public static function getCollection($date)
    {
        $q = ORM::select('Modules\\Model\\Journal c', 'c.*')
            ->andWhere('c.date = ?', $date);
        return new \Bazalt\ORM\Collection($q);
    }

    public static function getOrCreate($categoryId, $doctorId, $date)
    {
        $q = ORM::select('Modules\\Model\\Journal c', 'c.*')
            ->where('c.category_id = ?', $categoryId)
            ->andWhere('c.doctor_id = ?', $doctorId)
            ->andWhere('c.date = ?', $date)
            ->limit(1);
        $item = $q->fetch();
        if(!$item) {
            $item = new Journal();
            $item->category_id = $categoryId;
            $item->doctor_id = $doctorId;
            $item->date = $date;
            $item->count = 0;
            $item->save();
        }

        return $item;
    }
}
