import Sequelize from 'sequelize';
import database from './database.js';

const Category = database.define('category', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    categoryName: Sequelize.STRING,
    categoryMainImage: Sequelize.STRING
});

export default Category;