<?php

$toEmail = 'raj@hotmail.com';

function send_mail($toEmail, $emailSubject, $body, $headers, $data){
    if (mail($toEmail, $emailSubject, $body, $headers)) {
        $data['success'] = true;
        $data['message'] = 'Success!';
    } else {
        $data['success'] = false;
        $data['errors']  ='Errors!';
    }
    echo json_encode($data);
}
function send_mail_attach($toEmail, $emailSubject, $bodyParagraphs, $data, $path ){
    $fp = fopen($path,"r");

    if (!$fp) {
      print "Файл $path не может быть прочитан";
      exit();
    }
    $file = fread($fp, filesize($path));
    fclose($fp);
    $boundary = "--".md5(uniqid(time())); // генерируем разделитель
    $headers = ['From' => $email, 'Reply-To' => $email ];
    $headers .= "MIME-Version: 1.0\n";
    $headers .="Content-Type: multipart/mixed; boundary=\"$boundary\"\n";
    $multipart .= "--$boundary\n";
    $kod = 'koi8-r'; // или $kod = 'windows-1251';
    $multipart .= "Content-Type: text/html; charset=$kod\n";
    $multipart .= "Content-Transfer-Encoding: Quot-Printed\n\n";
    $multipart .= "$bodyParagraphs\n\n";
    $message_part .= "--$boundary\n";
    $message_part .= "Content-Type: application/octet-stream\n";
    $message_part .= "Content-Transfer-Encoding: base64\n";
    $message_part .= "Content-Disposition: attachment; filename = \"".$path."\"\n\n";
    $message_part .= chunk_split(base64_encode($file))."\n";
    $multipart .= $message_part."--$boundary--\n";

    if (mail($toEmail, $emailSubject, $multipart, $headers)) {
        $data['success'] = true;
        $data['message'] = 'Success!';
    } else {
        $data['success'] = false;
        $data['errors']  ='Errors!';
    }
    echo json_encode($data);
}

if (!empty($_POST)) {
    $name = $_POST['name'] ? $_POST['name'] : '';
    $email = $_POST['email'] ? $_POST['email'] : '';
    $phone = $_POST['phone'] ? $_POST['phone'] : '';
    $message = $_POST['message'] ? $_POST['message'] : '';
    switch ('CONTACT') {
        case 'CONTACT':
            $data['redirect'] = true;
            $headers = ['From' => $email, 'Reply-To' => $email, 'Content-type' => 'text/html; charset=iso-8859-1'];
            $emailSubject = 'Contact us';
            $bodyParagraphs = ["<b>Name:</b> {$name}<br>", "<b>Email:</b> {$email}<br>",  "<b>Phone:</b> {$phone}<br>", "<b>Message:</b>", $message];
            $body = join(PHP_EOL, $bodyParagraphs);
            send_mail($toEmail, $emailSubject, $body, $headers, $data);
            break;
        default:
            $data['redirect'] = false;
            $headers = ['From' => $email, 'Reply-To' => $email, 'Content-type' => 'text/html; charset=iso-8859-1'];
            $emailSubject = 'Join our newsletter';
            $bodyParagraphs = ["<b>Email:</b> {$newsletter_email}<br>"];
            $body = join(PHP_EOL, $bodyParagraphs);
            send_mail($toEmail, $emailSubject, $body, $headers, $data);
            break;
    }
}

?>