<?php

namespace Modules\Courses\Webservice;

use Bazalt\Data\Validator;
use Tonic\Response;
use Modules\Model\Doctor;
use Modules\Model\Category;
use Modules\Model\Journal;

/**
 * JournalsResource
 *
 * @uri /journals
 */
class JournalsResource extends \Bazalt\Rest\Resource
{
    /**
     * @method GET
     * @json
     */
    public function getList()
    {
//        $curUser = \Bazalt\Auth::getUser();
//        if (!$curUser->hasPermission('courses.can_manage_courses')) {
//            return new Response(Response::FORBIDDEN, 'Permission denied');
//        }
        $data = Validator::create($_GET);
        $data->field('date')->required();
        if (!$data->validate()) {
            return new Response(400, $data->errors());
        }

        $categories = Category::getCollection()->fetchAll();
        $doctors = Doctor::getCollection()->fetchAll();


        $collection = Journal::getCollection($data['date']);
        $res = [
            'data' => []
        ];
        $data = $collection->fetchAll();
        $dataArr = [];
        foreach($data as $item) {
            $dataArr[$item->category_id.'_'.$item->doctor_id] = (int)$item->count;
        }

        foreach($categories as $category) {
            $sum = 0;
            foreach($doctors as $doctor) {
                $res['data'][$category->id.'_'.$doctor->id] =
                    isset($dataArr[$category->id.'_'.$doctor->id]) ? $dataArr[$category->id.'_'.$doctor->id] : 0;
                $sum += $res['data'][$category->id.'_'.$doctor->id];
            }
            $res['data'][$category->id.'_sum'] = $sum;
        }

        return new Response(Response::OK, $res);
    }

    /**
     * @method GET
     * @action getReport
     * @json
     */
    public function getReport()
    {
//        $curUser = \Bazalt\Auth::getUser();
//        if (!$curUser->hasPermission('courses.can_manage_courses')) {
//            return new Response(Response::FORBIDDEN, 'Permission denied');
//        }
        $data = Validator::create($_GET);
        $data->field('year')->required();
        $data->field('month')->required();
        if (!$data->validate()) {
            return new Response(400, $data->errors());
        }

        $categories = Category::getCollection()->fetchAll();
        $doctors = Doctor::getCollection()->fetchAll();


        $collection = Journal::getReport($data['year'], $data['month']);
//        $collection = Journal::getCollection('2014-05-01');
        $res = [
            'data' => []
        ];
        $data = $collection->fetchAll();
        $dataArr = [];
        foreach($data as $item) {
            $dataArr[$item->category_id.'_'.$item->doctor_id] = (int)$item->count;
        }

        foreach($categories as $category) {
            $sum = 0;
            foreach($doctors as $doctor) {
                $res['data'][$category->id.'_'.$doctor->id] =
                    isset($dataArr[$category->id.'_'.$doctor->id]) ? $dataArr[$category->id.'_'.$doctor->id] : 0;
                $sum += $res['data'][$category->id.'_'.$doctor->id];
            }
            $res['data'][$category->id.'_sum'] = $sum;
        }

        return new Response(Response::OK, $res);
    }

    /**
     * @method POST
     * @method PUT
     * @json
     */
    public function saveItems()
    {
        $data = Validator::create((array)$this->request->data);
//        $data->field('data')->required();
        $data->field('date')->required();
        if (!$data->validate()) {
            return new Response(400, $data->errors());
        }

//        print_r((array)$data['data']);exit;
        foreach($data['data'] as $k => $cnt) {
            $tmp = explode('_', $k);
            $item = Journal::getOrCreate((int)$tmp[0], (int)$tmp[1], $data['date']);
            $item->count = (int)$cnt;
            $item->save();
        }

        return new Response(Response::OK, null);
    }
}
