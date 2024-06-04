'use strict';
module.exports = {
    listImages,
    createImage,
    readImage,
    updateImage,
    deleteImage
};
var testData = {
    id: "0123456789abcd",
    title: "Testowy obrazek",
    description: "Opis do obrazka",
    date: "2017-11-09T10:20:00.214Z",
    path: "/library/images/",
    size: 1024
};

var images = [
    {
        id: "0123456789abce",
        title: "Testowy obrazek 2",
        description: "Opis do obrazka 2",
        date: "2017-11-10T10:20:00.214Z",
        path: "/library/images/",
        size: 1024
    },
    {
        id: "0123456789abcd",
        title: "Testowy obrazek",
        description: "Opis do obrazka",
        date: "2017-11-09T10:20:00.214Z",
        path: "/library/images/",
        size: 1024
    },
    {
        id: "0123456789abcf",
        title: "Testowy obrazek 3",
        description: "Opis do obrazka 3",
        date: "2017-11-11T10:20:00.214Z",
        path: "/library/images/",
        size: 2048
    }
];
function findImage(id) {
    return images.find(function (image) {
        return image.id === id;
    });
}

function listImages(req, res, next) {
    res.json(images);
}
function createImage(req, res, next) {
    images.push(req.body);
    res.status(200);
    res.json(req.body);
}
function readImage(req, res, next) {
    var id = req.swagger.params.id.value;
    var image = findImage(id);
    if (!image) {
        res.status(404).json({ "message": "Image not found" });
    }
    else {
        res.status(200);
        res.json(image);
    }
}
function updateImage(req, res, next) {
    var id = req.swagger.params.id.value;
    var imageOld = findImage(id);
    var imageNew = req.body;
    if (!imageOld) {
        res.status(404).json({ "message": "Image not found" });
    } else {
        res.status(200);
        Object.assign(imageOld, imageNew);
        res.json(imageNew);
    }

}
function deleteImage(req, res, next) {
    var id = req.swagger.params.id.value;
    var image = findImage(id);
    if (!image) {
        res.status(404).json({ "message": "Image not found" });
    } else {
        res.status(200);
        var index = images.indexOf(image);
        images.splice(index, 1);
        res.json({ "id": id, "status": "deleted" });
    }

}