FROM php:8.1.0-fpm

RUN docker-php-ext-install pdo pdo_mysql


