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

    public static function getReport($year, $quarter)
    {
        switch($quarter) {
            case 1:
                $dateBegin = $year.'-01-01';
                $dateEnd = $year.'-03-31';
            break;
            case 2:
                $dateBegin = $year.'-04-01';
                $dateEnd = $year.'-06-30';
            break;
            case 3:
                $dateBegin = $year.'-07-01';
                $dateEnd = $year.'-09-30';
            break;
            case 4:
                $dateBegin = $year.'-10-01';
                $dateEnd = $year.'-12-31';
            break;
        }

        $q = ORM::select('Modules\\Model\\Journal c', 'c.doctor_id,c.category_id,SUM(c.count) as count')
            ->andWhere('c.date BETWEEN ? AND ?', [$dateBegin, $dateEnd])
            ->groupBy('c.doctor_id,c.category_id');
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
