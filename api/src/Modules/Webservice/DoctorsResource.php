<?php

namespace Modules\Courses\Webservice;

use Bazalt\Data\Validator;
use Tonic\Response;
use Modules\Model\Doctor;

/**
 * DoctorsResource
 *
 * @uri /doctors
 */
class DoctorsResource extends \Bazalt\Rest\Resource
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

        $collection = Doctor::getCollection();

        // table configuration
        $table = new \Bazalt\Rest\Collection($collection);
        $table
            ->sortableBy('id')
            ->sortableBy('name')

            ->filterBy('name', function ($collection, $columnName, $value) {
                if ($value) {
                    $value = '%' . strtolower($value) . '%';
                    $collection->andWhere('LOWER(c.name) LIKE ?', $value);
                }
            });

        $res = $table->fetch($this->params());
        return new Response(Response::OK, $res);
    }

    /**
     * @method POST
     * @method PUT
     * @json
     */
    public function createItem()
    {
        $res = new DoctorResource($this->app, $this->request);
        return $res->saveItem();
    }
}
