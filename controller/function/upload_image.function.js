const {mentor, Sequelize} = require('../../models/index');

getDataImage = (req, fs) => {
    req.body.data_image = fs.readFileSync(
        __basedir + '/resource/static/assets/tmp/' + req.file.filename
    );
    req.body.img = req.file.filename;
};

createAndUnlink = (req, fs, folder, data) => {
    fs.writeFileSync(
        __basedir + '/resource/static/assets/' + folder + '/' + req.file.filename, data.data_image
    );
    fs.unlinkSync(
        __basedir + '/resource/static/assets/tmp/' + req.file.filename
    );
};
updateAndUnlink = (req, fs, model, id, folder) => {
    model.findByPk(id, {}).then((updateData) => {
        createAndUnlink(req, fs, folder, updateData);
    });
};


// checkBeforeDelete = async (model, id) => {
//     var oldImg = await model.findByPk(id,{});
//     return oldImg.img;
// };
checkBeforeDelete = (model, id) => {
    // return oldImg = model.findByPk(id,{}).then((data) => {return data});
    return model.findByPk(id,{}).then((data) => {
        let myData = data.map((item) => {
            return item;
        });
    });
    return myData;
};

deleteDataImage = (fs, folder, img) => {
    fs.unlinkSync(
        __basedir + '/resource/static/assets/' + folder +'/' + img
    );
};


module.exports = {getDataImage, createAndUnlink, updateAndUnlink, deleteDataImage};