<?php
/**
 * Journal.php
 *
 * @category  DataModels
 * @package   DataModel
 * @author    Bazalt CMS (http://bazalt-cms.com/)
 * @version   SVN: $Id$
 */
/**
 * Data model for table "Journal"
 *
 * @category  DataModels
 * @package   DataModel
 * @author    Bazalt CMS (http://bazalt-cms.com/)
 * @version   Release: $Revision$
 *
 * @property-read int $id
 * @property-read string $name
 * @property-read datetime $created_at
 * @property-read datetime $updated_at
 * @property-read int $created_by
 * @property-read int $updated_by
 */
namespace Modules\Model\Base;

abstract class Journal extends \Bazalt\ORM\Record
{
    const TABLE_NAME = 'journal';

    const MODEL_NAME = 'Modules\\Model\\Journal';

    public function __construct()
    {
        parent::__construct(self::TABLE_NAME, self::MODEL_NAME);
    }

    protected function initFields()
    {
        $this->hasColumn('id', 'PUA:int(10)');
        $this->hasColumn('date', 'N:datetime');
        $this->hasColumn('doctor_id', 'UN:int(10)');
        $this->hasColumn('category_id', 'UN:int(10)');
        $this->hasColumn('count', 'UN:int(10)');
//        $this->hasColumn('created_at', 'N:datetime');
//        $this->hasColumn('updated_at', 'N:datetime');
//        $this->hasColumn('created_by', 'UN:int(10)');
//        $this->hasColumn('updated_by', 'UN:int(10)');
    }

    public function initRelations()
    {
    }

    public function initPlugins()
    {
//        $this->hasPlugin('Bazalt\ORM\Plugin\Timestampable', array(
//            'created' => 'created_at',
//            'updated' => 'updated_at',
//        ));
//        $this->hasPlugin('Bazalt\Auth\ORM\Author', array(
//            'created_by' => 'created_by',
//            'updated_by' => 'updated_by',
//        ));
    }

}