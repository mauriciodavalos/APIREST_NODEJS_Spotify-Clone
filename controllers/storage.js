const fs = require ("fs");
const {matchedData } = require("express-validator");
const {storageModel} = require ('../models');
const handleHttpError = require('../utils/handleError');

const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;

/**
 * OBTENER LISTA de items
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async (req, res) => {
    try{
        const data = await storageModel.find({});
        res.send({ data });
    } catch(e) {
        handleHttpError(res, "error_en_listar_items_STORAGE", 401)
        return
    }
};

/**
 * OBTENER UN DETALLE de items
 * @param {*} req 
 * @param {*} res 
 */
const getItem = async (req, res) => {
    try{
        const { id } = matchedData(req)
        const data = await storageModel.findById(id);
        res.send({ data });
    } catch(e) {
        handleHttpError(res, "error_en_detail_item_Storage")
    }
};

/**
 * crear un items
 * @param {*} req 
 * @param {*} res 
 */
const createItems = async (req, res) => {
    try{
        const { file } = req;
        const dataFile = {
            filename : file.filename,
            url: `${PUBLIC_URL}/${file.filename}`,
        }
        const data = await storageModel.create(dataFile);
        res.send({data})
    } catch(e) {
        handleHttpError(res, "error_en_create_items", 401)
        return
    }
};

/**
 * ELIMINAR UN REGISTRO del item
 * @param {*} req 
 * @param {*} res 
 */
const deleteItems = async (req, res) => {
    try{
        const { id } = matchedData(req)
        const dataFile = await storageModel.findById(id);
        await storageModel.delete({_id:id}) 
        const {filename} = dataFile;
        const filePath = `${MEDIA_PATH}/${filename}`

        //fs.unlinkSync(filePath);
        const data = {
            filePath,
            deleted:1
        }

        res.send({ data });
    } catch(e) {
        handleHttpError(res, "error_en_borrar_item_Storage")
    }

};

module.exports = {getItems, getItem, deleteItems, createItems};