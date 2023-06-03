<?php
global $conn;
include 'db_connect.php';

// Получение аргументов из GET-параметров
$specialization = $_GET['specialization'] ?? '';
$discount = intval($_GET['discount']) ?? 0;
$reviews = intval($_GET['reviews']) ?? 0;
$profileCity = $_GET['profileCity'] ?? '';

// Создание SQL-запроса с использованием функции и параметров
$sql = "SELECT ChooseShop('$specialization', $discount, $reviews, '$profileCity') AS shops_json";

$result = $conn->query($sql);

if ($result) {
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();

        $shops_json = $row["shops_json"];

        // Преобразование JSON-строки в массив объектов
        $shops_array = json_decode($shops_json);

        // Отправка массива магазинов через AJAX
        header('Content-Type: application/json');
        echo json_encode($shops_array);
    } else {
        echo "Не найдено магазинов!";
    }
} else {
    echo "Ошибка при выполнении запроса к базе данных.";
}

$conn->close();
