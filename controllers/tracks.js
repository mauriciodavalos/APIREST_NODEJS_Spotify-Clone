const { matchedData, body } = require('express-validator');
const {tracksModel} = require ('../models');
const handleHttpError = require('../utils/handleError');

/**
 * OBTENER LISTA DE LA BASE DE DATOS
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async (req, res) => {
    try{
        const user = req.user;
        const data = await tracksModel.findAllData({});
        res.send({ data, user });
    } catch(e) {
        handleHttpError(res, "error_en_get_items")
    }
};

/**
 * OBTENER UN DETALLE 
 * @param {*} req 
 * @param {*} res 
 */
const getItem = async (req, res) => {
    try{
        const user = req.user;
        req = matchedData(req);
        const {id} = req;
        const data = await tracksModel.findOneData(id);
        res.send({ data, user });
    } catch(e) {
        handleHttpError(res, "error_en_get_item")
    }

};

/**
 * INSERTAR UN REGISTRO
 * @param {*} req 
 * @param {*} res 
 */
const createItems = async (req, res) => {
    try{
        const user = req.user;
        const body = req.body

        const data = await tracksModel.create(body)
        res.send({data, user})
    } catch(e) {
        handleHttpError(res, "error_en_create_items")
    }
};

/**
 * ACTUALIZAR UN REGISTRO
 * @param {*} req 
 * @param {*} res 
 */
const updateItems = async (req, res) => {
    try{
        const user = req.user;
        const {id, ...body} = matchedData(req);
        const data = await tracksModel.findOneAndUpdate(
            id, body
        );
        res.send({data, user});
    } catch(e) {
        handleHttpError(res, "error_en_update_items")
    }
};

/**
 * ELIMINAR UN REGISTRO
 * @param {*} req 
 * @param {*} res 
 */
const deleteItems = async (req, res) => {
    try{
        const user = req.user;
        req = matchedData(req);
        const {id} = req;
        const data = await tracksModel.delete({_id:id});
        res.send({ data, user });
    } catch(e) {
        console.log(e)
        handleHttpError(res, "error_en_delete_item");
    }

};

module.exports = {getItems, getItem, createItems, updateItems, deleteItems};