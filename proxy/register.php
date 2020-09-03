<?php

class RemoteAuthorization {
	const APPS = 'appUrls';
	const ROUTES = 'routes';

	protected $appUrl;
	protected $scenario;
	protected $queryString;
	protected $postData;

	private $_config;

	public function __construct(){
		if (file_exists('config.php')) {
			$this->_config = require 'config.php';
		}
		else {
			throw new Exception("Missing configuration file", 500);
		}
        $appName = null;
		if(isset($_GET['appName'])){

            $appName = $_GET['appName'];
        }
		if ($appName != null && array_key_exists($appName, $this->_config[self::APPS])) {
			$this->appUrl = $this->_config[self::APPS][$appName];
			unset($_GET['appName']);
		}
		else {
			throw new Exception('Wrong application name', 500);		
		}
		if (isset($_GET['scenario'])) {
			$this->scenario = $_GET['scenario'];
			unset($_GET['scenario']);
		}
		else {
			throw new Exception("Scenario not set", 500);
		}		
		if (!empty($_GET)){
			$this->queryString = http_build_query($_GET);
		}

		$this->postData = !empty($_POST) ? $_POST : json_decode(file_get_contents('php://input'), true);
		if (empty($this->postData)) {
			throw new Exception("Register form is not set", 500);
		}
	}

	public function send() {
		$json = json_encode($this->postData);

		$url = $this->getUrl($json);
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLINFO_HEADER_OUT, true);
		curl_setopt($ch, CURLOPT_POST, true);
		curl_setopt($ch, CURLOPT_HTTPHEADER, [
				'Content-Type: application/json',
                'X-ORIGINAL-IP: ' . isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : null,
				'Content-Length: ' . strlen($json),
			]
		);
		
		curl_setopt($ch, CURLOPT_POSTFIELDS, $json);

		$response = curl_exec($ch);
		curl_close($ch);
		echo $response;
		
	}

    protected function getHash($data){
        $str = $data . $this->_config['salt'];
		return md5($str);
	}

	protected function getUrl($hashData) {
		$hash = $this->getHash($hashData);
		if (isset($this->queryString)) {
			return $this->appUrl . $this->_config[self::ROUTES][$this->scenario] . '?' . $this->queryString . '&hash=' . $hash;
		}
		else {
			return $this->appUrl . $this->_config[self::ROUTES][$this->scenario] . '?hash=' . $hash;
		}
	}

}
