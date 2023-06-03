<?php
global $conn;
include 'db_connect.php';

// Запрос магазинов
$shopsQuery = "SELECT * FROM shops";

$result = $conn->query($shopsQuery);

$shops = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $shop = array(
            'name' => $row['name'],
            'link' => $row['link'],
            'reviews' => intval($row['reviews']),
            'rating' => intval($row['rating'])
        );

        // Запрос специализаций для каждого магазина
        $specializationsQuery = "SELECT name FROM specializations
                                INNER JOIN shops_specializations ON specializations.specialization_id = shops_specializations.specialization_id
                                WHERE shops_specializations.shop_id = " . $row['shop_id'];

        $specializationsResult = $conn->query($specializationsQuery);

        $specializations = array();
        while ($specRow = $specializationsResult->fetch_assoc()) {
            $specializations[] = $specRow['name'];
        }

        $shop['specialization'] = $specializations;

        // Запрос городов для каждого магазина
        $citiesQuery = "SELECT cities.name FROM cities
                        INNER JOIN shops_cities ON cities.city_id = shops_cities.city_id
                        WHERE shops_cities.shop_id = " . $row['shop_id'];
        $citiesResult = $conn->query($citiesQuery);

        $addresses = array();
        while ($cityRow = $citiesResult->fetch_assoc()) {
            $addresses[] = $cityRow['name'];
        }

        $shop['addresses'] = $addresses;

        // Запрос скидки для каждого магазина
        $discountQuery = "SELECT percentage FROM discounts WHERE shop_id = " . $row['shop_id'];
        $discountResult = $conn->query($discountQuery);

        if ($discountResult->num_rows > 0) {
            $discountRow = $discountResult->fetch_assoc();
            $shop['discount'] = intval($discountRow['percentage']);
        } else {
            $shop['discount'] = 0; // Или установите значение по умолчанию, если скидка не найдена
        }

        // Запрос изображения магазина
        $imageQuery = "SELECT image_src FROM shop_images WHERE shop_id = " . $row['shop_id'];
        $imageResult = $conn->query($imageQuery);

        if ($imageResult->num_rows > 0) {
            $imageRow = $imageResult->fetch_assoc();
            $shop['image'] = $imageRow['image_src'];
        } else {
            $shop['image'] = ""; // Или установите значение по умолчанию, если изображение не найдено
        }

        $shops[] = $shop;

    }
}

// Возвращаем массив shops в JSON-формате

header('Content-Type: application/json');
echo json_encode($shops);
mysqli_close($conn);
