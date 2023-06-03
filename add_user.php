<?php
global $conn;
include 'db_connect.php';

// Получение данных из POST-запроса
$data = json_decode(file_get_contents('php://input'), true);

// Извлечение данных пользователя
$firstname = $data['firstname'];
$lastname = $data['lastname'];
$patronymic = $data['patronymic'];
$city = $data['city'];
$creditCardNumber = $data['creditCardNumber'];
$accountNumber = $data['accountNumber'];

// Подготовка и выполнение SQL-запроса для добавления данных в таблицу users
$sql = "INSERT INTO users (firstname, lastname, patronymic, city, creditCardNumber, accountNumber)
        VALUES ('$firstname', '$lastname', '$patronymic', '$city', '$creditCardNumber', '$accountNumber')";

$response = array();

try {
    if (mysqli_query($conn, $sql)) {
        // Данные успешно добавлены в таблицу
        $response['success'] = true;
        $response['message'] = 'Данные успешно добавлены';
    } else {
        // Возникла ошибка при добавлении данных
        $response['success'] = false;
        $response['message'] = 'Ошибка при добавлении данных: ' . mysqli_error($conn);
    }
    echo json_encode($response);
} catch (Exception $e) {
    // Обработка исключения при возникновении ошибки
    $response['success'] = false;
    $response['message'] = 'Ошибка при добавлении данных: ' . $e->getMessage();
    echo json_encode($response);
}

// Закрываем соединение
mysqli_close($conn);