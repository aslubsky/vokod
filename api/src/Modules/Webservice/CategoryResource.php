<?php

namespace Modules\Courses\Webservice;

use Bazalt\Data\Validator;
use Tonic\Response;
use Modules\Model\Category;

/**
 * CategoryResource
 *
 * @uri /categories/:id
 */
class CategoryResource extends \Bazalt\Rest\Resource
{
    /**
     * @method GET
     * @json
     */
    public function getItem($id)
    {
        $item = Category::getById($id);
        if (!$item) {
            return new Response(400, ['id' => sprintf('Category "%s" not found', $id)]);
        }
        $res = $item->toArray();

        return new Response(Response::OK, $res);
    }

    /**
     * @method POST
     * @method PUT
     * @json
     */
    public function saveItem($id = null)
    {
        $data = Validator::create((array)$this->request->data);
        if ($id) {
            $data->field('id')->required();
        }
        $data->field('name')->required();
        if (!$data->validate()) {
            return new Response(400, $data->errors());
        }

        if ($id) {
            $item = Category::getById($id);
        } else {
            $item = Category::create();
        }
        if (!$item) {
            return new Response(400, ['id' => sprintf('Category "%s" not found', $id)]);
        }
//
//        $curUser = \Bazalt\Auth::getUser();
//        if (!$curUser->hasPermission('courses.can_manage_courses')) {
//            return new Response(Response::FORBIDDEN, 'Permission denied');
//        }

        $item->name = $data['name'];
//        print_r($item);exit;
        $item->save();


        $res = $item->toArray();

        return new Response(Response::OK, $res);
    }

    /**
     * @method DELETE
     * @provides application/json
     * @json
     * @return \Tonic\Response
     */
    public function deleteItem($id)
    {
        $item = Category::getById((int)$id);

        if (!$item) {
            return new Response(400, ['id' => sprintf('Category "%s" not found', $id)]);
        }
        $item->delete();
        return new Response(200, true);
    }
}
