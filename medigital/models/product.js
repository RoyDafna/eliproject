import Sequelize from 'sequelize';
import database from './database.js';

const Product = database.define('product', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    productName: Sequelize.STRING,
    productPrice: Sequelize.FLOAT,
    productMainImage: Sequelize.STRING,
    productDescription: Sequelize.TEXT,
    isAvailable: Sequelize.BOOLEAN,
    unitInStock: Sequelize.INTEGER,
    categoryID: Sequelize.INTEGER
});

export default Product;