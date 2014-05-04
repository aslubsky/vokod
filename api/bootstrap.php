<?php

require 'vendor/autoload.php';

use Whoops\Handler\PrettyPageHandler;
use Whoops\Handler\JsonResponseHandler;

class Bootstrap
{
    protected static $config = null;

    public static function defines()
    {
        define('SITE_DIR', __DIR__);
        define('API_DIR', __DIR__);

        date_default_timezone_set('Europe/Kiev');
        ini_set('mbstring.internal_encoding', 'UTF-8');

        define('TEMP_DIR', API_DIR . '/tmp');
        define('LOG_DIR', API_DIR . '/logs');

        define('PUBLIC_DIR', realpath(SITE_DIR . '/..'));

        if (php_sapi_name() == 'cli-server') {
            // for correct ajax on cli server
            $_SERVER['HTTP_X_REQUESTED_WITH'] = 'xmlhttprequest';
        }
    }

    public static function whoops()
    {
        $run = new \Whoops\Run;

        if(php_sapi_name() == 'cli') {
            $handler = new PrettyPageHandler;
            $run->pushHandler($handler);
        } else {
            $run->pushHandler(array('Bootstrap', 'woopsHandler'));
        }
        $run->allowQuit(true);
        $run->register();
    }

    public static function woopsHandler($exception, $inspector, $run)
    {
        http_response_code(500);

        $isProd = isset(self::$config['config']['production']) && self::$config['config']['production'];

        self::log($exception);
        if ($isProd) {
            self::sendToErrorService($exception);
        }

        $response = array(
            'error' => $exception->getMessage(),
            'file' => $exception->getFile(),
            'line' => $exception->getLine(),
            'type' => get_class($exception),
            'code' => $exception->getCode()
        );

        if ($exception instanceof \Bazalt\Rest\Exception\Upload) {
            $response['allowed_extensions'] = $exception->getAllowedExtensions();
        }

        if (!$isProd) {
            $frames = $inspector->getFrames();
            $frameData = array();

            foreach ($frames as $frame) {
                $frameData[] = array(
                    'file' => $frame->getFile(),
                    'line' => $frame->getLine(),
                    'function' => $frame->getFunction(),
                    'class' => $frame->getClass(),
                    'args' => $frame->getArgs()
                );
            }
            $response['trace'] = $frameData;
        }

        if (!headers_sent()) {
            header('Content-Type: application/json');
        }
        echo json_encode($response);
        return Whoops\Handler\Handler::QUIT;
    }

    public static function log($exception)
    {
        $fileName = sprintf(LOG_DIR . '/error_%s.log', date('Y.m.d'));
        $str = sprintf("[%s] - %s\n%s\n=======================\n",
            date('Y-m-d H:i:s'), $exception->getMessage(), $exception->getTraceAsString());
        file_put_contents($fileName, $str, FILE_APPEND);
    }

    public static function sendToErrorService($exception)
    {
        $data = array();
        if ($exception instanceof \Exception) {
            try {
                $prev = $exception->getPrevious();
                if ($prev) {
                    $exception = $prev;
                }
            } catch (\Exception $ex) {

            }
            $data['code'] = $exception->getCode();
            $data['message'] = get_class($exception) . ': ' . $exception->getMessage();
            $data['trace'] = $exception->getTraceAsString();
            $data['file'] = $exception->getFile() . ' : ' . $exception->getLine();
            $data['request'] = print_r(array_merge($_COOKIE, $_REQUEST, $_SERVER), true);
            $data['session'] = print_r(isset($_SESSION) ? $_SESSION : array(), true);
        } else {
            $data['message'] = $exception;
            $data['request'] = '-';
            $data['session'] = '-';
        }
        $data['url'] = 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
        $host = isset($_SERVER['SERVER_NAME']) ? $_SERVER['SERVER_NAME'] : '';

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'http://errors.bazalt-cms.com/add/');
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, array(
            'error' => json_encode($data),
            'host' => $host
        ));
        curl_setopt($ch, CURLOPT_HEADER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_exec($ch);
        curl_close($ch);
    }

    public static function config()
    {
        self::$config = \Bazalt\Config::container();

        self::$config['config'] = function ($c) {
            return json_decode(file_get_contents(__DIR__ . '/config.json'), true);
        };
    }

    public static function session()
    {
        // init session
        \Bazalt\Session::setTimeout(30 * 24 * 60 * 60);
    }

    public static function db()
    {
        // init database
        $connectionString = new \Bazalt\ORM\Adapter\Mysql(self::$config['config']['db']);
        \Bazalt\ORM\Connection\Manager::add($connectionString, 'default');
    }

    public static function globRecursive($path, $find, &$files)
    {
        $dh = opendir($path);
        while (($file = readdir($dh)) !== false) {
            if (substr($file, 0, 1) == '.') continue;
            $rfile = $file;
            if (is_dir($path . '/' . $rfile)) {
                self::globRecursive($path . '/' . $rfile, $find, $files);
            } else {
                if (preg_match($find, $path . '/' . $file)) $files [] = $path . '/' . $rfile;
            }
        }
        closedir($dh);
    }

    public static function getWebServices()
    {
        $files = [];
        self::globRecursive(__DIR__ . '/src', '#(.*)Webservice/(.*)Resource\.php$#', $files);
        return $files;
    }

    public static function run()
    {
        self::defines();
        self::config();
        self::session();
        self::whoops();
        self::db();
    }
}

Bootstrap::run();


function getWebServices()
{
    return Bootstrap::getWebServices();
}