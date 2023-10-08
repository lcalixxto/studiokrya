<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require '../js/mailer/Exception.php';
require '../js/mailer/PHPMailer.php';
require '../js/mailer/SMTP.php';

$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];

try {
	$mail = new PHPMailer();
	$mail->isSMTP();
	$mail->CharSet = "UTF-8";
	$mail->SMTPAuth = true;

	$mail->Host = 'Your host';
	$mail->Username = 'Your username';
	$mail->Password = 'Your pass';
    $mail->SMTPOptions = array(
     'ssl' => array(
         'verify_peer' => false,
         'verify_peer_name' => false,
         'allow_self_signed' => true
     )
);
	$mail->Port = 587;
	$mail->setFrom('address1', 'Larson');

	$mail->addAddress('address2');

	$mail->isHTML(true);
	$mail->Subject = 'Message from Larson';
	$mail->Body = 'Client name - ' . $name . '<br>' . 'Email - ' . $email . '<br>' . 'Message - ' . $message;
	$mail->send();
} catch (Exception $e) {
    echo $mail->ErrorInfo;
}
