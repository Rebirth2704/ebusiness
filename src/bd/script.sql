CREATE DATABASE darkkitchen;
USE darkkitchen;

CREATE TABLE articulos_cocina (
    id_articulo INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    tipo VARCHAR(50) NOT NULL,         
    marca VARCHAR(50),
    capacidad VARCHAR(50),             
    estado ENUM('Operativo', 'En mantenimiento', 'Fuera de servicio') DEFAULT 'Operativo',
    fecha_compra DATE,
    costo DECIMAL(10,2)
);

CREATE TABLE menu (
    id_platillo INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    categoria VARCHAR(50) NOT NULL,     
    precio DECIMAL(10,2) NOT NULL,
    descripcion TEXT,
    disponible BOOLEAN DEFAULT TRUE
);