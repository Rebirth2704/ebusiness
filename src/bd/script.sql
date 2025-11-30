CREATE DATABASE darkkitchen;
USE darkkitchen;

CREATE TABLE Categoria (
    categoria_id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion TEXT,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Producto (
    producto_id INT PRIMARY KEY AUTO_INCREMENT,
    categoria_id INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    imagen_url VARCHAR(255),
    activo BOOLEAN DEFAULT TRUE,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (categoria_id) REFERENCES Categoria(categoria_id)
);

CREATE TABLE Ingrediente (
    ingrediente_id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    unidad_medida VARCHAR(20) NOT NULL -- Ej: gramos, ml, unidad
);

CREATE TABLE Producto_Ingrediente (
    producto_id INT NOT NULL,
    ingrediente_id INT NOT NULL,
    cantidad_estandar DECIMAL(8, 2) NOT NULL, -- Cantidad requerida en la receta
    PRIMARY KEY (producto_id, ingrediente_id),
    FOREIGN KEY (producto_id) REFERENCES Producto(producto_id),
    FOREIGN KEY (ingrediente_id) REFERENCES Ingrediente(ingrediente_id)
);

CREATE TABLE Cliente (
    cliente_id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    telefono VARCHAR(20), -- Para contacto por WhatsApp
    password_hash VARCHAR(255), -- Si usan la web propia
    fecha_registro DATE DEFAULT (CURRENT_DATE)
);

CREATE TABLE Direccion (
    direccion_id INT PRIMARY KEY AUTO_INCREMENT,
    cliente_id INT NOT NULL,
    calle VARCHAR(100) NOT NULL,
    colonia VARCHAR(100),
    codigo_postal VARCHAR(10),
    notas VARCHAR(255),
    FOREIGN KEY (cliente_id) REFERENCES Cliente(cliente_id)
);

CREATE TABLE ProgramaLealtad (
    cliente_id INT PRIMARY KEY,
    puntos INT DEFAULT 0,
    ultimo_uso DATE,
    FOREIGN KEY (cliente_id) REFERENCES Cliente(cliente_id)
);


CREATE TABLE Pedido (
    pedido_id INT PRIMARY KEY AUTO_INCREMENT,
    cliente_id INT NOT NULL,
    direccion_id INT NOT NULL,
    fecha_pedido DATETIME DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10, 2) NOT NULL,
    estado VARCHAR(20) NOT NULL, -- Ej: En preparación, En camino, Entregado
    canal VARCHAR(20) NOT NULL,  -- Ej: Web Propia, Uber Eats, Rappi
    tipo_pedido VARCHAR(20),     -- Ej: Normal, Grupo Grande
    FOREIGN KEY (cliente_id) REFERENCES Cliente(cliente_id),
    FOREIGN KEY (direccion_id) REFERENCES Direccion(direccion_id)
);

CREATE TABLE DetallePedido (
    detalle_id INT PRIMARY KEY AUTO_INCREMENT,
    pedido_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) AS (cantidad * precio_unitario),
    notas VARCHAR(255),
    FOREIGN KEY (pedido_id) REFERENCES Pedido(pedido_id),
    FOREIGN KEY (producto_id) REFERENCES Producto(producto_id)
);

CREATE TABLE Promocion (
    promocion_id INT PRIMARY KEY AUTO_INCREMENT,
    codigo VARCHAR(20) UNIQUE,
    descripcion TEXT,
    tipo_descuento VARCHAR(20) NOT NULL, -- Ej: Porcentaje, Monto Fijo, Item Gratis
    valor_descuento DECIMAL(10, 2) NOT NULL,
    fecha_inicio DATE,
    fecha_fin DATE
);

CREATE TABLE UsuarioAdmin (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL, -- La contraseña DEBE estar hasheada
    rol VARCHAR(50) NOT NULL -- Ej: SuperAdmin, Cocina, Gerente
);

CREATE TABLE Inventario (
    ingrediente_id INT PRIMARY KEY,
    stock_actual DECIMAL(10, 2) NOT NULL,
    stock_minimo DECIMAL(10, 2) DEFAULT 0,
    ultima_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (ingrediente_id) REFERENCES Ingrediente(ingrediente_id)
);

CREATE TABLE Proveedor (
    proveedor_id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    contacto VARCHAR(100),
    telefono VARCHAR(20)
);

CREATE TABLE Repartidor (
    repartidor_id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    plataforma VARCHAR(50) -- Ej: Uber Eats, Rappi, Propio
);

ALTER TABLE Pedido
ADD repartidor_id INT,
ADD FOREIGN KEY (repartidor_id) REFERENCES Repartidor(repartidor_id);